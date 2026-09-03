import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const routesPath = path.join(__dirname, "../data/routes.json");
const placesPath = path.join(__dirname, "../data/places.json");

// Helper: Haversine distance in km
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

router.get("/", (req, res) => {
  try {
    const routes = JSON.parse(fs.readFileSync(routesPath, "utf-8"));
    const places = JSON.parse(fs.readFileSync(placesPath, "utf-8"));

    const populatedRoutes = routes.map(route => {
      const fullPlaces = route.places.map(item => {
        const placeInfo = places.find(p => p.id === item.placeId);
        return {
          ...item,
          place: placeInfo || null
        };
      });

      return {
        ...route,
        places: fullPlaces
      };
    });

    res.json({
      success: true,
      count: populatedRoutes.length,
      data: populatedRoutes
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const routes = JSON.parse(fs.readFileSync(routesPath, "utf-8"));
    const places = JSON.parse(fs.readFileSync(placesPath, "utf-8"));

    const route = routes.find(r => r.id === id);
    if (!route) {
      return res.status(404).json({ success: false, message: "Ruta no encontrada" });
    }

    const fullPlaces = route.places.map(item => {
      const placeInfo = places.find(p => p.id === item.placeId);
      return {
        ...item,
        place: placeInfo || null
      };
    });

    res.json({
      success: true,
      data: {
        ...route,
        places: fullPlaces
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/routes/calculate - Custom route builder calculation
router.post("/calculate", (req, res) => {
  try {
    const { placeIds, startCoords } = req.body;
    if (!placeIds || !Array.isArray(placeIds) || placeIds.length === 0) {
      return res.status(400).json({ success: false, message: "Se requiere un arreglo de placeIds" });
    }

    const places = JSON.parse(fs.readFileSync(placesPath, "utf-8"));
    const selectedPlaces = placeIds
      .map(id => places.find(p => p.id === id))
      .filter(Boolean);

    let totalDist = 0;
    let points = [];

    if (startCoords && startCoords.lat && startCoords.lng) {
      points.push({ lat: startCoords.lat, lng: startCoords.lng, name: "Tu Ubicación Actual" });
    }

    selectedPlaces.forEach(p => {
      points.push({ lat: p.coordinates.lat, lng: p.coordinates.lng, name: p.name, id: p.id });
    });

    for (let i = 0; i < points.length - 1; i++) {
      totalDist += calculateDistanceKm(
        points[i].lat,
        points[i].lng,
        points[i + 1].lat,
        points[i + 1].lng
      );
    }

    // Estimate 20 km/h in urban + 45 min per stop
    const travelTimeMinutes = Math.round((totalDist / 25) * 60);
    const stopTimeMinutes = selectedPlaces.length * 45;
    const totalTimeMinutes = travelTimeMinutes + stopTimeMinutes;

    res.json({
      success: true,
      data: {
        totalDistanceKm: Math.round(totalDist * 10) / 10,
        estimatedTimeMinutes: totalTimeMinutes,
        placesCount: selectedPlaces.length,
        places: selectedPlaces,
        waypoints: points
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;