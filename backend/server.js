import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Make sure this runs first
console.log('API Key loaded:', process.env.FSQ_API_KEY ? 'Yes' : 'No'); // Debug log
const app = express();
app.use(cors());

app.get("/api/places", async (req, res) => {
  try {
    const { latne, lngne,latsw,lngsw, fsq_category_ids } = req.query;
    console.log(fsq_category_ids)
    const options = {
      method: "GET",
      url: "https://places-api.foursquare.com/places/search",
      params: {fsq_category_ids: fsq_category_ids, ne: `${latne},${lngne}`, sw: `${latsw},${lngsw}`},
      headers: {
        accept: "application/json",
        "X-Places-Api-Version": "2025-06-17",
        authorization: `Bearer ${process.env.FSQ_API_KEY}`,
      },
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from Foursquare" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
