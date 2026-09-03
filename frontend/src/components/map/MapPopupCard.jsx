import React from 'react';
import { Star, MapPin, Clock, Phone, Navigation, ArrowRight, Heart } from 'lucide-react';
import { calculateDistanceKm, formatDistance, estimateTravelTime } from '../../utils/distance';

export function MapPopupCard({
  place,
  onShowDetails,
  userLocation,
  isFavorite,
  onToggleFavorite
}) {
  if (!place) return null;

  const distanceKm = userLocation
    ? calculateDistanceKm(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng)
    : null;

  const openDirections = () => {
    const { lat, lng } = place.coordinates;
    window.open(`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${userLocation ? `${userLocation.lat}%2C${userLocation.lng}` : ''}%3B${lat}%2C${lng}`, '_blank');
  };

  return (
    <div className="w-72 rounded-2xl overflow-hidden glass-panel border border-emerald-500/30 bg-slate-950/95 text-slate-100 shadow-2xl p-0 font-sans">
      {/* Photo Header */}
      <div className="relative h-32 w-full bg-slate-900 overflow-hidden">
        <img
          src={place.images && place.images[0]}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white">
          {place.categoryLabel}
        </div>

        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900/90 text-[11px] font-bold text-white">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{place.rating}</span>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-3.5 flex flex-col gap-2">
        <h4 className="font-bold text-sm text-white line-clamp-1">
          {place.shortName || place.name}
        </h4>

        <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
          {place.description}
        </p>

        <div className="flex flex-col gap-1 text-[11px] text-slate-400 pt-1 border-t border-white/10">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">{place.address}</span>
          </div>

          {distanceKm !== null && (
            <div className="flex items-center gap-1.5 text-sky-400 font-medium">
              <Navigation className="w-3 h-3 shrink-0" />
              <span>{formatDistance(distanceKm)} ({estimateTravelTime(distanceKm, 'driving')})</span>
            </div>
          )}

          {place.hours && (
            <div className="flex items-center gap-1.5 text-slate-400 truncate">
              <Clock className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">{place.hours}</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-2 flex items-center gap-1.5 pt-2 border-t border-white/10">
          <button
            onClick={() => onShowDetails(place)}
            className="flex-1 py-1.5 px-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs transition hover:opacity-90 flex items-center justify-center gap-1"
          >
            <span>Ver Detalles</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={openDirections}
            className="py-1.5 px-2 rounded-xl glass-panel-subtle text-xs text-sky-300 hover:text-white border border-white/10 transition"
            title="Cómo llegar con OpenStreetMap"
          >
            <Navigation className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
