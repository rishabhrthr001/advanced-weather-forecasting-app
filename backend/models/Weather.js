const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
  city: String,
  currentTemp: Number,
  averageTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  condition: String,
  feelsLike: Number,
  humidity: Number,
  wind: {
    speed: Number,
  },
  visibility: Number,
  dateFetched: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Weather", WeatherSchema);
