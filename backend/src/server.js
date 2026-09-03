import express from "express";
import cors from "cors";
import placesRoutes from "./routes/places.js";
import categoriesRoutes from "./routes/categories.js";
import itinerariesRoutes from "./routes/itineraries.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoints
app.use("/api/places", placesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/routes", itinerariesRoutes);

// Quick helper endpoints for specific categories
app.get("/api/hotels", (req, res) => res.redirect("/api/places?category=hoteles"));
app.get("/api/restaurants", (req, res) => res.redirect("/api/places?category=restaurantes"));
app.get("/api/hospitals", (req, res) => res.redirect("/api/places?category=salud"));
app.get("/api/search", (req, res) => res.redirect(`/api/places/search?q=${encodeURIComponent(req.query.q || "")}`));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    city: "Tulcán, Carchi, Ecuador",
    altitude: "2,980 m.s.n.m.",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Tulcán Turismo API ejecutándose en http://localhost:${PORT}`);
});