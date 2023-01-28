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
  postData(`${Url}/getCityWaether`, { location: location });
  updateUI();
  document.getElementById(
    "days"
  ).innerHTML = ` your trip is ${getTripLength} days`;
}
function postData(location = "", data = {}) {
  return fetch(location, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      let elem = document.getElementById("results");
      elem.innerHTML = ` <strong>You are going to have ${res.input.length} days trip! </strong></br><strong> The trip destination is: ${res.input.location} , ${res.coords.country}</strong></br><strong>The weather is ${res.forecast.wether_desc} the tempreture is ${res.forecast.temp} </strong></br>
          <img src="${res.pics.picture1}" alt="" class="image"> <br> <img src="${res.pics.picture2}" alt="" class="image"> `;
      // if (res.forecast.max_temp != null) { document.getElementById('wether').innerHTML += `<br> Maximum tempreture for the future wether is  ${res.forecast.max_temp}, and the lowest tempreture is  ${res.forecast.low_temp}`; }
    })
    .catch((error) => {
      console.log(error);
    });
}

export { handleSubmit };
