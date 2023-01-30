let projectData = {};
/* Setup env for API keys */
const dotenv = require("dotenv");
dotenv.config();
GEOCODES_USERNAME = "abeerssuu";
WEATHERBIT_KEY = "58a0316a234e4988b92879ce24d56143";
PIXABAY_KEY = "33094381-d646e4d0297ffabc4774f2a14";
console.log(GEOCODES_USERNAME);
console.log(WEATHERBIT_KEY);
console.log(PIXABAY_KEY);
/* setup global variables and initialize express */
const fetch = require("node-fetch");
const express = require("express");
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Spin up the server
const PORT = 8081;

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/", function (req, res) {
  res.sendFile(path.resolve("src/client/views/index.html"));
});

app.post("/getCityWaether", function (req, res) {
  // console.log(req.body);
  projectData.input = req.body;
  console.log(req.body, 'req');
  console.log(projectData.input.location);
  // res.send(projectData)
  getGeonames(projectData.input.location)
    .then(() =>
      getWeatherbit(
        projectData.input.length,
        projectData.input.start_date,
        projectData.input.end_date
      )
    )
    .then(() => getPixabay(projectData.input.location))
    .then(() => {res.json(projectData)})
});

//TODO: geoname Api
async function getGeonames(location) {
   await fetch(
    `http://api.geonames.org/searchJSON?placename==${location}&maxRows=1&username=${GEOCODES_USERNAME}`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      const coordinatesObj = {
        lat: res.geonames[0].lat,
        lng: res.geonames[0].lng,
        countryCode: res.geonames[0].countryCode,
        city: res.geonames[0].name,
        country: res.geonames[0].countryName,
      };
      projectData.coords = coordinatesObj;
      console.log(projectData.coords);
    })
    .catch((error) => {
      console.log(error);
    });
  //console.log(projectData.coords);
}

//TODO:Weatherbit
async function getWeatherbit(date, start_date, end_date) {
  console.log(start_date, " start");
  console.log(end_date, " end");

  let url = "";
  console.log(projectData.coords.countryCode);
  if (date >= 7) {
    console.log(date);
    url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${projectData.input.location}&country=${projectData.coords.countryCode}&lat=${projectData.coords.lat}&lon=${projectData.coords.lng}&key=${WEATHERBIT_KEY}`;
  } else {
    url = `https://api.weatherbit.io/v2.0/current?city=${projectData.input.location}&country=${projectData.coords.countryCode}&lat=${projectData.coords.lat}&lon=${projectData.coords.lng}&key=${WEATHERBIT_KEY}`;
  }
   await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      //console.log(res);
      const forecast = {
        temp: res.data[0].temp,
        low_temp: res.data[0].low_temp,
        max_temp: res.data[0].max_temp,
        wether_desc: res.data[0].weather.description,
        wether_icon: res.data[0].weather.icon,
        wwther_code: res.data[0].weather.code,
      };
      projectData.forecast = forecast;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(projectData);
}

// TODO: pixaapi > get pictures based on the city enterd
async function getPixabay(location) {
 await fetch(
    `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${location}&image_type=photo&per_page=3`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      //console.log(res);
      const pic = {
        picture: res.hits[0].webformatURL,
      };
      projectData.pics = pic;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(projectData);
}

//To do test for the server remove the comments
module.exports = { getPixabay, getWeatherbit, getGeonames };
