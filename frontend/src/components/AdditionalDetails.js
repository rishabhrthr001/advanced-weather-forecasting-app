import React from 'react';
import '../App.css';
const AdditionalDetails = ({ showMoreDetails, toggleMoreDetails, weatherData }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      {showMoreDetails && weatherData && (
        <div className="flex flex-wrap justify-center space-x-4 space-y-4">
          <div className="bg-white shadow-lg rounded-lg feels-like-box p-4 w-full sm:w-32 md:w-48 h-40 flex flex-col items-center justify-center"> 
            <div className="text-lg font-bold">Feels Like</div>
            <div className="text-xl">{weatherData.feelsLike}°</div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-32 md:w-48 h-40 flex flex-col items-center justify-center"> 
            <div className="text-lg font-bold">Humidity</div>
            <div className="text-xl">{weatherData.humidity}%</div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-32 md:w-48 h-40 flex flex-col items-center justify-center"> 
            <div className="text-lg font-bold">Wind Speed</div>
            <div className="text-xl">{weatherData.wind.speed} km/h</div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-32 md:w-48 h-40 flex flex-col items-center justify-center"> 
            <div className="text-lg font-bold">Visibility</div>
            <div className="text-xl">{weatherData.visibility} km</div>
          </div>
        </div>
      )}
      <button
        onClick={toggleMoreDetails}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        {showMoreDetails ? 'See Less Details' : 'See More Details'}
      </button>
    </div>
  );
};

export default AdditionalDetails;
