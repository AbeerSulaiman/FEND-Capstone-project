const { json } = require("body-parser");
const Url = "http://localhost:8081";
//TODO: Take the input, then post into the server
function handleSubmit(event) {
  event.preventDefault();
  let location = document.getElementById("user-location").value;
  const start_date = document.getElementById("start-date").value;
  const end_date = document.getElementById("end-date").value;
  console.log(location);
  console.log(start_date);
  console.log(end_date);
  const getTripLength = ((start, end) => {
    const start_date = new Date(start);
    const end_date = new Date(end);
    return Math.floor(
      (Date.UTC(end_date.getFullYear(), end_date.getMonth(), end_date.getDate()) -
        Date.UTC(
          start_date.getFullYear(),
          start_date.getMonth(),
          start_date.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
  })(start_date, end_date);

  console.log(getTripLength);
  //   Client.validateDate(start_date);
  postData(`${Url}/getCityWaether`, {
    location: location,
    start_date: start_date,
    end_date: end_date,
  });
  // updateUI();
  document.getElementById(
    "days"
  ).innerHTML = ` You are going to have ${getTripLength} days trip`;
  document.getElementById(
    "city"
  ).innerHTML = ` The destination is:  ${location}`;
}
function postData(url = "", data = {}) {
  return fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    //console.log(res);
    document.getElementById(
      "city"
    ).innerHTML = ` The destination is:  ${res.input.location} , ${res.coords.country}`;
    document.getElementById(
      "weather"
    ).innerHTML = ` The weather is ${res.forecast.wether_desc} the tempreture is ${res.forecast.temp} `;
    document.getElementById(
      "images"
    ).innerHTML = ` <img src="${res.pics.picture}" alt="" class="image"> <br>`;
  })
}

module.export = { handleSubmit };
