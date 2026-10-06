const API_KEY = "5f95fec355ea0c30d03adba0bcc8bada"; // put your OpenWeatherMap key

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const result = document.getElementById("result");

async function getWeather(city){
  try{
if(!city){ error.textContent = "Please enter a city"; return; }
    loading.textContent = "Loading...";
    error.textContent = "";
    result.classList.add("hidden");

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    if(!res.ok){ const e = await res.json(); throw new Error(e.message); }
    const data = await res.json();

    document.getElementById("city").textContent = data.name;
    document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    document.getElementById("desc").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`;


    localStorage.setItem("lastCity", city);
    localStorage.setItem("lastWeather", JSON.stringify(data));
    result.classList.remove("hidden");
  }catch(err){
    error.textContent = err.message;
  }finally{
    loading.textContent = "";
  }
}

searchBtn.addEventListener("click", ()=> getWeather(cityInput.value.trim()));
cityInput.addEventListener("keypress", (e)=> {if(e.key==="Enter") getWeather(cityInput.value.trim())});

// load last searched
const cached = JSON.parse(localStorage.getItem("lastWeather"));
const last = localStorage.getItem("lastCity");
if(!navigator.onLine && cached){
  cityInput.value = cached.name;
  document.getElementById("city").textContent = cached.name;
  document.getElementById("temp").textContent = `${Math.round(cached.main.temp)}°C`;
  document.getElementById("icon").src = "https://openweathermap.org/img/wn/" + cached.weather[0].icon + "@2x.png";
  document.getElementById("desc").textContent = cached.weather[0].description;
  document.getElementById("humidity").textContent = `Humidity: ${cached.main.humidity}%`;
  document.getElementById("wind").textContent = `Wind: ${cached.wind.speed} m/s`;
  result.classList.remove("hidden");
} else if(last){ cityInput.value = last; getWeather(last); }
