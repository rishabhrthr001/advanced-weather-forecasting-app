const axios = require("axios");
const Weather = require("../models/Weather");
const sendEmail = require("../mailer");

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

const THRESHOLDS = {
  temperature: {
    max: 40,
    min: 0,
  },
  weatherCondition: [
    "Rain",
    "Thunderstorm",
    "thunderstorm",
    "light rain",
    "heavy rain",
  ],
};

const checkForAlerts = async (weatherData) => {
  let alertMessages = [];
  if (weatherData.currentTemp > THRESHOLDS.temperature.max) {
    const message = `Alert: Temperature exceeds ${THRESHOLDS.temperature.max}°C in ${weatherData.city}`;
    console.log(message);
    alertMessages.push(message);
  }

  if (
    THRESHOLDS.weatherCondition.some((condition) =>
      weatherData.condition.toLowerCase().includes(condition.toLowerCase()),
    )
  ) {
    const message = `Alert: Severe weather condition (${weatherData.condition}) detected in ${weatherData.city}`;
    console.log(message);
    alertMessages.push(message);
  }

  if (alertMessages.length > 0) {
    const subject = `Weather Alert for ${weatherData.city}`;
    const text = alertMessages.join("\n");
    await sendEmail(subject, text);
  }
};

exports.fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `${WEATHER_API_URL}?q=${city}&appid=${process.env.API_KEY}&units=metric`,
    );

    const weatherData = {
      city: city,
      currentTemp: response.data.main.temp,
      averageTemp: response.data.main.temp,
      maxTemp: response.data.main.temp_max,
      minTemp: response.data.main.temp_min,
      condition: response.data.weather[0].description,
      feelsLike: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      wind: {
        speed: response.data.wind.speed,
      },
      visibility: response.data.visibility,
      dateFetched: new Date(),
    };

    await Weather.create(weatherData);

    await checkForAlerts(weatherData);

    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
};
