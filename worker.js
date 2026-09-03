import places from "./backend/src/data/places.json";
import categories from "./backend/src/data/categories.json";
import routes from "./backend/src/data/routes.json";

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json; charset=utf-8"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // API: Health
    if (pathname === "/api/health") {
      return new Response(JSON.stringify({
        status: "online",
        city: "Tulcán, Carchi, Ecuador",
        platform: "Cloudflare Workers",
        altitude: "2,980 m.s.n.m.",
        timestamp: new Date().toISOString()
      }), { headers: corsHeaders });
    }

    // API: Categories
    if (pathname === "/api/categories") {
      const categoriesWithCounts = categories.map(cat => {
        const count = cat.id === "todos" 
          ? places.length 
          : places.filter(p => p.category === cat.id).length;
        return { ...cat, count };
      });
      return new Response(JSON.stringify({
        success: true,
        data: categoriesWithCounts
      }), { headers: corsHeaders });
    }

    // API: Search
    if (pathname === "/api/places/search") {
      const q = (url.searchParams.get("q") || "").toLowerCase().trim();
      if (!q) {
        return new Response(JSON.stringify({ success: true, data: [] }), { headers: corsHeaders });
      }
      const matched = places.filter(p => {
        if (p.name.toLowerCase().includes(q)) return true;
        if (p.shortName.toLowerCase().includes(q)) return true;
        if (p.description.toLowerCase().includes(q)) return true;
        if (p.category.toLowerCase().includes(q)) return true;
        if (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) return true;
        if (q.includes("hotel") && p.category === "hoteles") return true;
        if (q.includes("hornado") && p.category === "restaurantes") return true;
        if (q.includes("iglesia") && p.category === "iglesias") return true;
        if (q.includes("hospital") && p.category === "salud") return true;
        return false;
      });
      return new Response(JSON.stringify({
        success: true,
        query: q,
        count: matched.length,
        data: matched
      }), { headers: corsHeaders });
    }

    // API: Places list & single place
    if (pathname === "/api/places" || pathname.startsWith("/api/places/")) {
      const id = pathname.replace("/api/places/", "").replace("/api/places", "").replace("/", "");
      if (id) {
        const place = places.find(p => p.id === id);
        if (!place) {
          return new Response(JSON.stringify({ success: false, message: "Lugar no encontrado" }), { status: 404, headers: corsHeaders });
        }
        const nearby = place.nearbyIds ? places.filter(p => place.nearbyIds.includes(p.id)) : [];
        return new Response(JSON.stringify({
          success: true,
          data: { ...place, nearbyPlaces: nearby }
        }), { headers: corsHeaders });
      }

      let list = [...places];
      const category = url.searchParams.get("category");
      const featured = url.searchParams.get("featured");
      const photoOnly = url.searchParams.get("photoOnly");
      const search = url.searchParams.get("search");

      if (category && category !== "todos") list = list.filter(p => p.category === category);
      if (featured === "true") list = list.filter(p => p.featured);
      if (photoOnly === "true") list = list.filter(p => p.recommendedForPhoto);
      if (search) {
        const q = search.toLowerCase().trim();
        list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }

      return new Response(JSON.stringify({
        success: true,
        count: list.length,
        data: list
      }), { headers: corsHeaders });
    }

    // API: Routes
    if (pathname === "/api/routes" || pathname.startsWith("/api/routes/")) {
      const populated = routes.map(r => ({
        ...r,
        places: r.places.map(item => ({
          ...item,
          place: places.find(p => p.id === item.placeId) || null
        }))
      }));
      return new Response(JSON.stringify({
        success: true,
        count: populated.length,
        data: populated
      }), { headers: corsHeaders });
    }

    // Static Assets Fallback (Cloudflare Static Assets / Pages)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Tulcán Turismo API - Cloudflare Worker Online", {
      headers: { "Content-Type": "text/plain" }
    });
  }
};
