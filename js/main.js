// //Change true/false at end to show more/less data
// //for weather icons: https://developer.accuweather.com/weather-icons
// //show weathertext and weathericon

let realFeel, precipitation;

function weather() {
  const apiKey = 'FTr7D9KwDJzIbFpLNTVAJyWnAhMMfb4H';

  return new Promise((resolve, reject) => {
    fetch(
      `https://dataservice.accuweather.com/currentconditions/v1/332667?apikey=${apiKey}&language=en-US&details=true`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data[0]);
        document.getElementById('temp').textContent =
          data[0].Temperature.Imperial.Value + 'f';
        document.getElementById('precipitation').textContent =
          data[0].HasPrecipitation;
        document.getElementById('RealFeel').textContent = `${
          data[0].RealFeelTemperature.Imperial.Value
        }f (${data[0].RealFeelTemperature.Imperial.Phrase.toLowerCase()})`;
        realFeel = data[0].RealFeelTemperature.Imperial.Value;
        precipitation = data[0].HasPrecipitation;
        resolve({ realFeel, precipitation });
      })
      .catch((err) => {
        console.error(`Error: ${err.message}`);
        reject(err);
      });
  });
}

let body = document.querySelector('body');
let playgroundImg = document.getElementById('outdoor');
let classroomImg = document.getElementById('indoor');

weather()
  .then(({ realFeel, precipitation }) => {
    // precipitation = true;
    // realFeel = 1;
    if (realFeel >= 90 || realFeel < 30) {
      body.style.backgroundColor = 'yellow';
      classroomImg.style.display = 'block';
      playgroundImg.style.display = 'block';
    }
    if (precipitation === true || realFeel < 9 || realFeel > 95) {
      body.style.backgroundColor = 'red';
      playgroundImg.style.display = 'none';
      classroomImg.style.display = 'block';
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
