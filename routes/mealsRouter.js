// /routes/mealsRouter.js
const express = require("express");
const axios = require("axios");
require("dotenv").config(); // It's better to load environment variables in the entry file (e.g., app.js)
const mealsRouter = express.Router();
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// Define your routes using mealsRouter
mealsRouter.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      "https://themealdb.p.rapidapi.com/search.php",
      {
        params: { s: query },
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "themealdb.p.rapidapi.com",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error searching recipes:", error); // Consider using a more sophisticated logging mechanism for production.
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = mealsRouter;
