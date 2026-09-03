import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const placesPath = path.join(__dirname, "../data/places.json");

const getPlaces = () => {
  const data = fs.readFileSync(placesPath, "utf-8");
  return JSON.parse(data);
};

// GET /api/places - List all places with optional filters (category, featured, search)
router.get("/", (req, res) => {
  try {
    let places = getPlaces();
    const { category, featured, search, photoOnly } = req.query;

    if (category && category !== "todos") {
      places = places.filter(p => p.category === category);
    }

    if (featured === "true") {
      places = places.filter(p => p.featured);
    }

    if (photoOnly === "true") {
      places = places.filter(p => p.recommendedForPhoto);
    }

    if (search) {
      const q = search.toLowerCase().trim();
      places = places.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.shortName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    res.json({
      success: true,
      count: places.length,
      data: places
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/places/search - Smart search endpoint
router.get("/search", (req, res) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      return res.json({ success: true, data: [] });
    }

    const query = q.toLowerCase().trim();
    const places = getPlaces();

    // Natural language search helper
    const matched = places.filter(p => {
      // Direct keyword matches
      if (p.name.toLowerCase().includes(query)) return true;
      if (p.shortName.toLowerCase().includes(query)) return true;
      if (p.description.toLowerCase().includes(query)) return true;
      if (p.category.toLowerCase().includes(query)) return true;
      if (p.categoryLabel.toLowerCase().includes(query)) return true;
      if (p.tags && p.tags.some(t => t.toLowerCase().includes(query))) return true;

      // Smart intent matching
      if (query.includes("hotel") || query.includes("dormir") || query.includes("hospedaje")) {
        if (p.category === "hoteles") return true;
      }
      if (query.includes("comer") || query.includes("comida") || query.includes("restaurante") || query.includes("hornado") || query.includes("cafe")) {
        if (p.category === "restaurantes") return true;
      }
      if (query.includes("iglesia") || query.includes("misa") || query.includes("catedral") || query.includes("santuario")) {
        if (p.category === "iglesias") return true;
      }
      if (query.includes("hospital") || query.includes("salud") || query.includes("medico") || query.includes("farmacia") || query.includes("emergencia")) {
        if (p.category === "salud") return true;
      }
      if (query.includes("foto") || query.includes("fotografia") || query.includes("selfie")) {
        if (p.recommendedForPhoto) return true;
      }
      if (query.includes("1 dia") || query.includes("un dia") || query.includes("visitar") || query.includes("turismo")) {
        if (p.featured || p.interestLevel === "Muy Alto") return true;
      }

      return false;
    });

    res.json({
      success: true,
      query,
      count: matched.length,
      data: matched
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/places/:id - Single place details
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const places = getPlaces();
    const place = places.find(p => p.id === id);

    if (!place) {
      return res.status(404).json({ success: false, message: "Lugar no encontrado" });
    }

    // Include nearby populated objects
    const nearby = place.nearbyIds 
      ? places.filter(p => place.nearbyIds.includes(p.id))
      : [];

    res.json({
      success: true,
      data: {
        ...place,
        nearbyPlaces: nearby
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;