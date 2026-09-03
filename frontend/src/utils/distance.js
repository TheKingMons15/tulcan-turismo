// Algoritmo Haversine para cálculo de distancias reales
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function formatDistance(distanceKm) {
  if (distanceKm === null || distanceKm === undefined) return null;
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

export function estimateTravelTime(distanceKm, mode = 'driving') {
  if (!distanceKm) return null;
  if (mode === 'walking') {
    // ~4.5 km/h walking speed
    const minutes = Math.round((distanceKm / 4.5) * 60);
    if (minutes < 60) return `${minutes} min a pie`;
    const hours = Math.floor(minutes / 60);
    const restMin = minutes % 60;
    return `${hours}h ${restMin}m a pie`;
  }
  // ~25 km/h urban mountain driving speed
  const minutes = Math.round((distanceKm / 25) * 60);
  if (minutes < 60) return `${Math.max(2, minutes)} min en auto`;
  const hours = Math.floor(minutes / 60);
  const restMin = minutes % 60;
  return `${hours}h ${restMin}m en auto`;
}
