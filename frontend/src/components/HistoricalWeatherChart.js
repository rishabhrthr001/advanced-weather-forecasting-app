import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const HistoricalWeatherChart = ({ historicalData }) => {
  const labels = historicalData.map(data => new Date(data.dateFetched).toLocaleDateString());
  const temperatures = historicalData.map(data => data.currentTemp);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (temperatures.length === 0) {
    return <div>No temperature data available to display.</div>;
  }

  return (
    <div>
      <h2>Historical Temperature Area Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default HistoricalWeatherChart;
