// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const weatherRoutes = require("./routes/weatherRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const { fetchWeatherData } = require("./controllers/weatherController");
const cron = require("node-cron");

dotenv.config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", weatherRoutes);

app.get("/api/test", (req, res) => {
  res.send("Test route is working!");
});

// Scheduled task to fetch weather data every 5 minutes
const metroCities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Kolkata",
];
cron.schedule("*/5 * * * *", async () => {
  try {
    for (const city of metroCities) {
      const data = await fetchWeatherData(city);
      console.log(`Weather data for ${city} updated.`);
    }
  } catch (error) {
    console.error("Scheduled task failed:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
