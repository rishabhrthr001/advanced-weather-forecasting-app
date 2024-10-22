import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TemperatureDisplay from "./TemperatureDisplay";
import WeatherDetails from "./WeatherDetails";
import AdditionalDetails from "./AdditionalDetails";
import HistoricalWeatherChart from "./HistoricalWeatherChart";
import mockHistoricalData from "../utils/mockData";

const WeatherDashboard = () => {
  const [selectedCity, setSelectedCity] = useState("Delhi"); // Default city
  const [temperature, setTemperature] = useState(0);
  const [unit, setUnit] = useState("C");
  const [averageTemp, setAverageTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [condition, setCondition] = useState();
  const [lastUpdated, setLastUpdated] = useState("");
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState("");

  const cities = [
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Kolkata",
  ];

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5001/api/weather/${city}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather data");
      }

      setTemperature(data.currentTemp);
      setAverageTemp(data.averageTemp);
      setMaxTemp(data.maxTemp);
      setMinTemp(data.minTemp);
      setCondition(data.condition);
      setLastUpdated(new Date(data.dateFetched).toLocaleString());

      setWeatherData({
        currentTemp: data.currentTemp,
        averageTemp: data.averageTemp,
        maxTemp: data.maxTemp,
        minTemp: data.minTemp,
        condition: data.condition,
        wind: {
          speed: data.wind.speed,
        },
        visibility: data.visibility / 1000,
        humidity: data.humidity,
        feelsLike: data.feelsLike,
        lastUpdated: data.dateFetched,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async (city) => {
    setHistoricalData(mockHistoricalData[city]);
  };

  useEffect(() => {
    fetchWeatherData(selectedCity);
    fetchHistoricalData(selectedCity);
  }, [selectedCity]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const displayTemperature = (temp) => {
    return unit === "C" ? temp : (temp * 9) / 5 + 32;
  };

  const toggleMoreDetails = () => {
    setShowMoreDetails((prev) => !prev);
  };

  const handleEmailToggle = (isEnabled) => {
    console.log("Email Notifications Enabled:", isEnabled);
  };

  const handleEmailChange = (email) => {
    setRecipientEmail(email);
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar
        cities={cities}
        selectedCity={selectedCity}
        onCitySelect={handleCitySelect}
        onEmailToggle={handleEmailToggle}
        emailRecipient={recipientEmail}
        onEmailChange={handleEmailChange}
      />

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        <>
          <TemperatureDisplay
            temperature={displayTemperature(temperature)}
            unit={unit}
            toggleUnit={toggleUnit}
            weatherCondition={condition}
          />
          <WeatherDetails
            averageTemp={displayTemperature(averageTemp)}
            maxTemp={displayTemperature(maxTemp)}
            minTemp={displayTemperature(minTemp)}
            condition={condition}
          />
          <AdditionalDetails
            showMoreDetails={showMoreDetails}
            toggleMoreDetails={toggleMoreDetails}
            weatherData={weatherData}
          />
          <div className="text-center mt-4">Last Updated: {lastUpdated}</div>
          <HistoricalWeatherChart historicalData={historicalData} />
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;
