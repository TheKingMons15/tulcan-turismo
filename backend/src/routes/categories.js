import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const categoriesPath = path.join(__dirname, "../data/categories.json");
const placesPath = path.join(__dirname, "../data/places.json");

router.get("/", (req, res) => {
  try {
    const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf-8"));
    const places = JSON.parse(fs.readFileSync(placesPath, "utf-8"));

    // Add count of places for each category
    const categoriesWithCounts = categories.map(cat => {
      const count = cat.id === "todos" 
        ? places.length 
        : places.filter(p => p.category === cat.id).length;
      return { ...cat, count };
    });

    res.json({
      success: true,
      data: categoriesWithCounts
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;