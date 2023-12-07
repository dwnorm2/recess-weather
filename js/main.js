// //Change true/false at end to show more/less data
// //for weather icons: https://developer.accuweather.com/weather-icons
// //show weathertext and weathericon

// Declare variables
let realFeel, precipitation;

// Fetch weather data and update the DOM
function fetchWeather() {
  const apiKey = "FTr7D9KwDJzIbFpLNTVAJyWnAhMMfb4H";
  const apiUrl = `https://dataservice.accuweather.com/currentconditions/v1/332667?apikey=${apiKey}&language=en-US&details=true`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const weatherData = data[0];
      updateDOM(weatherData);
      return {
        realFeel: weatherData.RealFeelTemperature.Imperial.Value,
        precipitation: weatherData.HasPrecipitation,
      };
    })
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      throw err;
    });
}

// Update the DOM with weather information
function updateDOM(data) {
  document.getElementById(
    "temp"
  ).textContent = `${data.Temperature.Imperial.Value}f`;
  document.getElementById("precipitation").textContent = data.HasPrecipitation;
  document.getElementById("RealFeel").textContent = `${
    data.RealFeelTemperature.Imperial.Value
  }f (${data.RealFeelTemperature.Imperial.Phrase.toLowerCase()})${
    data.RealFeelTemperature.Imperial.Value < 60 ? "🧥" : ""
  }`;
}

// Apply weather conditions to the UI
function applyWeatherConditions({ realFeel, precipitation }) {
  let body = document.querySelector("body");
  let playgroundImg = document.getElementById("outdoor");
  let classroomImg = document.getElementById("indoor");

  if (realFeel >= 90 || realFeel < 30) {
    body.style.backgroundColor = "yellow";
    classroomImg.style.display = "block";
    playgroundImg.style.display = "block";
  }

  if (precipitation === true || realFeel < 9 || realFeel > 95) {
    body.style.backgroundColor = "red";
    playgroundImg.style.display = "none";
    classroomImg.style.display = "block";
  }
}

// Fetch weather and apply conditions
fetchWeather()
  .then(applyWeatherConditions)
  .catch((error) => {
    console.error("Error:", error);
  });
