async function getWeather() {
  try {
    console.log("Fetching Abuja weather...");
    // Abuja coordinates
    const url = "https://api.open-meteo.com/v1/forecast?latitude=9.0765&longitude=7.3986&current_weather=true";
    
    const response = await fetch(url);
    const data = await response.json();
    
    const weather = data.current_weather;
    console.log("--- WEATHER RESULT ---");
    console.log("Temperature:", weather.temperature + "°C");
    console.log("Wind Speed:", weather.windspeed + " km/h");
    console.log("Time:", weather.time);

  } catch (error) {
    console.log("Error:", error.message);
  }
}

getWeather();
