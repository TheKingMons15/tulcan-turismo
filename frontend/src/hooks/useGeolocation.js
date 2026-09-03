import { useState, useEffect, useCallback } from 'react';

// Centro de Tulcán por defecto: 0.8115, -77.7185 (Parque Central de Tulcán)
const DEFAULT_TULCAN_COORDS = { lat: 0.8115, lng: -77.7185 };

export function useGeolocation() {
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [isSimulated, setIsSimulated] = useState(false);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Tu navegador no soporta geolocalización.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setIsLocating(false);
        setIsSimulated(false);
      },
      (error) => {
        console.warn('Geolocation denied or unavailable. Providing simulated Tulcan central location.', error);
        // Fallback or simulated position in central Tulcan for easy testing
        setUserLocation(DEFAULT_TULCAN_COORDS);
        setIsSimulated(true);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  }, []);

  const simulateTulcanCenter = useCallback(() => {
    setUserLocation(DEFAULT_TULCAN_COORDS);
    setIsSimulated(true);
    setLocationError(null);
  }, []);

  return {
    userLocation,
    isLocating,
    locationError,
    isSimulated,
    requestLocation,
    simulateTulcanCenter
  };
}
