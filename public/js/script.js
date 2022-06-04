var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const Icon = document.querySelector('.Icon i');
const WConditions = document.querySelector('.WConditions');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + " " + monthNames[new Date().getMonth()].substring(0, 3)+ " 2021";


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading Application...";
    tempElement.textContent = "";
    WConditions.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                WConditions.textContent = "";
            } else {
                console.log()
                if(data.description === "rain" || data.description === "fog") {
                    Icon.className = "wi wi-day-" + data.description
                } else {
                    Icon.className = "CloudIcon"
                }
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
                WConditions.textContent = data.description.toUpperCase();
            }
        }) 
    });
})