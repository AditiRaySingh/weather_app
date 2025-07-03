const apiKey = "e6988552eca1a7e9764ce2e43dd52088";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBOX = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherSection = document.querySelector(".weather");

async function checkWeather(city) {
  if (!city) return; // Do nothing if input is empty

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

    const weatherMain = data.weather[0].main;

    if (weatherMain === "Clouds") {
      weatherIcon.src = "img/clouds.png";
    } else if (weatherMain === "Clear") {
      weatherIcon.src = "img/clear.png";
    } else if (weatherMain === "Rain") {
      weatherIcon.src = "img/rain.png";
    } else if (weatherMain === "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } else if (weatherMain === "Mist") {
      weatherIcon.src = "img/mist.png";
    } else {
      weatherIcon.src = "img/default.png";
    }

    // ✅ Show weather card only after successful fetch
    weatherSection.style.display = "block";

  } catch (error) {
    alert("City not found. Try another one.");
    weatherSection.style.display = "none"; // 🔒 Hide if error
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBOX.value.trim();
  checkWeather(city);
});


