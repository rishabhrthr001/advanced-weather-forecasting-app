import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const TemperatureDisplay = ({
  temperature,
  unit,
  toggleUnit,
  alerts = [],
  weatherCondition,
}) => {
  let backgroundImage;

  console.log("Weather Condition:", weatherCondition);
  // Set background image based on the weather condition
  if (temperature < 0) {
    backgroundImage = "snowfall.jpeg";
  } else if (weatherCondition === "clear") {
    backgroundImage = "sunny.jpeg";
  } else if (
    weatherCondition === "mist" ||
    weatherCondition === "haze" ||
    weatherCondition === "fog"
  ) {
    backgroundImage = "haze.jpeg";
  } else if (weatherCondition === "rain" || weatherCondition === "drizzle") {
    backgroundImage = "raining.jpeg";
  } else if (weatherCondition === "thunderstorm") {
    backgroundImage = "thunderstorm.jpeg";
  } else if (weatherCondition === "clouds") {
    backgroundImage = "cloudy.jpeg";
  } else {
    backgroundImage = "cloudy.jpeg";
  }

  return (
    <div
      className="w-full h-[300px] p-8 rounded-md flex items-center justify-between relative"
      style={{
        backgroundImage: `url(/${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 rounded-md"></div>

      <div className="flex flex-col items-start mt-8 relative z-10">
        <div className="text-6xl font-bold mb-2 text-white">
          {temperature.toFixed(1)}°{unit}
        </div>
        <div className="flex items-center mb-4">
          <span className="mr-2 text-white">°C</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={unit === "F"}
              onChange={toggleUnit}
              className="sr-only"
            />
            <div className="w-12 h-6 bg-gray-200 rounded-full shadow-inner"></div>
            <div
              className={`absolute left-0 w-6 h-6 bg-white rounded-full shadow toggle-circle transition duration-200 ease-in-out ${
                unit === "F" ? "translate-x-full bg-blue-500" : ""
              }`}
            ></div>
          </label>
          <span className="ml-2 text-white">°F</span>
        </div>
      </div>

      {/* Alert Button */}
      <div className="ml-auto relative group z-10">
        <button className="bg-white text-gray-600 p-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-200 ease-in-out relative">
          <FiAlertCircle size={28} />
        </button>

        {/* Alert Box on Hover */}
        <div className="absolute right-0 mt-2 w-56 bg-white p-4 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {alerts.length > 0 ? (
            <ul>
              {alerts.map((alert, index) => (
                <li key={index} className="text-red-600">
                  {alert}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-green-600">No alerts. You are safe!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemperatureDisplay;
