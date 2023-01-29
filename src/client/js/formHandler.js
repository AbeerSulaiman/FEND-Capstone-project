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
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.floor(
      (Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
        Date.UTC(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
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
  updateUI();
  document.getElementById(
    "days"
  ).innerHTML = ` your trip is ${getTripLength} days`;
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
  });
  // .then((res) => res.json())
  // .then((res) => {
  //   let elem = document.getElementById("results");
  //   elem.innerHTML = ` <strong>You are going to have ${res.input.length} days trip! </strong></br><strong> The trip destination is: ${res.input.location} , ${res.coords.country}</strong></br><strong>The weather is ${res.forecast.wether_desc} the tempreture is ${res.forecast.temp} </strong></br>
  //       <img src="${res.pics.picture}" alt="" class="image"> <br> `;
  //   // if (res.forecast.max_temp != null) { document.getElementById('wether').innerHTML += `<br> Maximum tempreture for the future wether is  ${res.forecast.max_temp}, and the lowest tempreture is  ${res.forecast.low_temp}`; }
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
}
function updateUI() {
  console.log("Update UI  Begins");
  fetch(`${Url}/data`, { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      //console.log(res);
      document.getElementById(
        "days"
      ).innerHTML = ` You are going to have ${res.input.length} days trip`;
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
    .catch((error) => {
      console.log(error);
    });
}
export { handleSubmit, updateUI };
