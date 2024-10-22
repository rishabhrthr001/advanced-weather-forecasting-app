import React, { useState } from 'react';

const WeatherDetails = ({ averageTemp, maxTemp, minTemp, condition }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const getConditionDescription = (condition) => {
    const normalizedCondition = condition.trim().toLowerCase(); // Normalize the condition string
    switch (normalizedCondition) {
      case 'sunny':
        return 'Clear skies and plenty of sunshine.';
      case 'cloudy':
        return 'Overcast skies with little to no sunlight.';
      case 'rainy':
      case 'drizzle':
        return 'Precipitation expected, with possible rain showers.';
      case 'snowy':
        return 'Snowfall occurring, temperatures are low.';
      case 'thunderstorm':
        return 'Severe weather with lightning and thunder.';
      case 'haze':
        return 'Reduced visibility due to dust or smoke.';
      case 'mist':
        return 'Foggy conditions reducing visibility significantly.';
      default:
        return 'Weather condition is not specified.';
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center mt-8 space-x-0 md:space-x-4 space-y-4 md:space-y-0">
      <div className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-32 md:w-48 h-40 flex flex-col items-center justify-center">
        <div className="text-lg font-bold">Average</div>
        <div className="text-xl">{averageTemp.toFixed(1)}°</div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-32 md:w-48 h-40 flex flex-col items-center justify-center">
        <div className="text-lg font-bold">Max</div>
        <div className="text-xl">{maxTemp.toFixed(1)}°</div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-32 md:w-48 h-40 flex flex-col items-center justify-center">
        <div className="text-lg font-bold">Min</div>
        <div className="text-xl">{minTemp.toFixed(1)}°</div>
      </div>
      <div 
        className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-32 md:w-48 h-40 flex flex-col items-center justify-center relative"
        onMouseEnter={() => setTooltipVisible(true)} 
        onMouseLeave={() => setTooltipVisible(false)} 
      >
        <div className="text-lg font-bold">Condition</div>
        <div className="text-xl">{condition}</div>
        {tooltipVisible && (
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 w-48 bg-gray-200 p-2 rounded-md text-center shadow-md">
            {getConditionDescription(condition)}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDetails;
