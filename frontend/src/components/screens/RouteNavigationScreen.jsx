import React from 'react';
import { ArrowLeft, Navigation, Car, Footprints, MapPin, Compass, ExternalLink, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateDistanceKm, formatDistance, estimateTravelTime } from '../../utils/distance';
import { InteractiveMap } from '../map/InteractiveMap';

export function RouteNavigationScreen() {
  const { routeDestination, goBack, userLocation, places, isFavorite, toggleFavorite } = useApp();

  const destination = routeDestination || places[0];

  const distanceKm = userLocation
    ? calculateDistanceKm(userLocation.lat, userLocation.lng, destination.coordinates.lat, destination.coordinates.lng) || 1.2
    : 1.2;

  const drivingTime = estimateTravelTime(distanceKm, 'driving');
  const walkingTime = estimateTravelTime(distanceKm, 'walking');

  // Simulated active route object for Leaflet polyline
  const activeRouteObj = {
    id: "route-nav",
    name: `Ruta hacia ${destination.shortName || destination.name}`,
    color: "#10b981",
    places: [
      {
        order: 1,
        place: {
          id: "user-loc",
          name: "Tu Ubicación Actual",
          coordinates: userLocation
        }
      },
      {
        order: 2,
        place: destination
      }
    ]
  };

  const handleOpenExternalGPS = () => {
    const { lat, lng } = destination.coordinates;
    const url = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${userLocation.lat}%2C${userLocation.lng}%3B${lat}%2C${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative max-w-md mx-auto w-full h-[90vh] flex flex-col justify-between overflow-hidden animate-fade-in text-slate-100">
      {/* Top Header: Back Arrow + Title "Cómo llegar" (Screen 6 Header) */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 shadow-2xl">
          <button
            onClick={goBack}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
            title="Regresar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="pr-3">
            <h2 className="text-sm font-bold text-white tracking-tight">Cómo llegar</h2>
            <p className="text-[10px] text-emerald-400 truncate max-w-[170px]">{destination.shortName || destination.name}</p>
          </div>
        </div>

        <button
          onClick={handleOpenExternalGPS}
          className="p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-sky-400 hover:text-white shadow-2xl transition"
          title="Abrir en OpenStreetMap GPS"
        >
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>

      {/* Full Interactive Leaflet Map with Route Polyline (Screen 6 Map) */}
      <div className="w-full h-full">
        <InteractiveMap
          places={[destination]}
          activePlace={destination}
          onSelectPlace={() => {}}
          onShowDetails={() => {}}
          userLocation={userLocation}
          activeRoute={activeRouteObj}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      </div>

      {/* Floating Bottom Card: "Desde mi ubicación", time & "Iniciar ruta" (Screen 6 Bottom Card) */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="p-4 sm:p-5 rounded-3xl glass-panel border border-emerald-500/40 bg-slate-950/95 text-slate-100 shadow-2xl flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Punto de partida</span>
                <h4 className="text-xs font-bold text-white">Desde mi ubicación actual</h4>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Car className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-extrabold text-emerald-400">
                {drivingTime || '15 min'} ({formatDistance(distanceKm) || '1.2 km'})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <Footprints className="w-3.5 h-3.5 text-cyan-400" />
              <span>A pie: <strong>{walkingTime || '20 min'}</strong></span>
            </div>
            <span>Destino: <strong>{destination.shortName || destination.name}</strong></span>
          </div>

          {/* Action Button: "Iniciar ruta" (Screen 6 CTA) */}
          <button
            onClick={handleOpenExternalGPS}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs sm:text-sm shadow-xl hover:scale-[1.02] transition flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Iniciar ruta en tiempo real</span>
          </button>
        </div>
      </div>
    </div>
  );
}
