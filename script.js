let apiKey = `9b8a1ecfca5941d5437fb74764c62af8`;

function answer(response){
  let temp = response.data.main.temp;

  let degreesC = document.querySelector("#c");
  let degreesF = document.querySelector("#f");
  let degrees = document.querySelector(".temperature");

  degrees.innerHTML = Math.round(temp);     
  degreesC.addEventListener("click", function(){
    degrees.innerHTML = Math.round(temp);
    degreesC.style.color = "rgb(114, 114, 209)";
    degreesF.style.color = "black";
  })
  degreesF.addEventListener("click", function(){
    degrees.innerHTML = Math.round(temp*1.8 + 32);
    degreesF.style.color = "rgb(114, 114, 209)";
    degreesC.style.color = "black";
  })

  let city = document.querySelector(".city");
  let currentCity = response.data.name;
  city.innerHTML = currentCity;

  let description = response.data.weather[0].description;
  let desc = document.querySelector(".wet");
  desc.innerHTML = description;

  let humidity = response.data.main.humidity;
  let hum = document.querySelector(".hum");
  hum.innerHTML = `Humidity: ${humidity} %`;

  let wind = response.data.wind.speed;
  let speed = document.querySelector(".wind");
  speed.innerHTML = `Wind: ${wind} km/h`;

  let pressure = response.data.main.pressure;
  let press = document.querySelector(".pres");
  press.innerHTML = `Pressure: ${pressure} hPa`;

  let icon = response.data.weather[0].icon;
  console.log(icon);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
  iconElement.setAttribute("alt", description);

}

function setDate(){
  let date = new Date();
  let day = document.querySelector(".day");
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let today = date.getDay();
  day.innerHTML = days[today];

  let time = document.querySelector(".time");
  let hour = date.getHours();
  let min = date.getMinutes();
  if(min<10){
    min = "0"+ min;
  }
  time.innerHTML = `${hour}:${min}`;
}

function setCurrentWeather(){
  setDate();
  navigator.geolocation.getCurrentPosition(function(position){
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;
      let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;
      axios.get(apiURL).then(answer);
  });
}

function setWeather(){
  let form = document.querySelector("form");
  form.addEventListener("submit", function(event){
    event.preventDefault();
    setDate();
    let inputCity = document.querySelector(".enter");
    let apiURL2 = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&&units=metric`;
    axios.get(apiURL2).then(answer);
  })
}

let currentButton = document.querySelector(".current");
currentButton.addEventListener("click", setCurrentWeather);
setDate();
setWeather();
setCurrentWeather();
