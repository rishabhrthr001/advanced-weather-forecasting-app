const express = require("express");
const { fetchWeatherData } = require("../controllers/weatherController");
const Weather = require("../models/Weather");
const router = express.Router();

router.get("/weather/:city", async (req, res) => {
  const { city } = req.params;
  const { recipientEmail } = req.body;
  const weatherData = await fetchWeatherData(city);
  res.json(weatherData);
});

router.get("/weather/history/:city", async (req, res) => {
  const { city } = req.params;
  const { limit = 10, startDate, endDate } = req.query;
  try {
    let query = { city };
    if (startDate || endDate) {
      query.dateFetched = {};
      if (startDate) {
        query.dateFetched.$gte = new Date(startDate);
      }
      if (endDate) {
        query.dateFetched.$lte = new Date(endDate);
      }
    }

    const historicalData = await Weather.find(query)
      .sort({ dateFetched: -1 })
      .limit(parseInt(limit));

    res.json(historicalData);
  } catch (error) {
    console.error("Error fetching historical weather data:", error);
    res
      .status(500)
      .json({ message: "Error fetching historical weather data." });
  }
});

module.exports = router;
