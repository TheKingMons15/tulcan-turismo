import React from 'react';
import { Star, MapPin, Clock, Phone, Heart, Navigation, ArrowUpRight, Camera } from 'lucide-react';
import { calculateDistanceKm, formatDistance, estimateTravelTime } from '../../utils/distance';

export function PlaceCard({
  place,
  onSelect,
  onShowDetails,
  isFavorite,
  onToggleFavorite,
  userLocation,
  onAddToRoute
}) {
  const distanceKm = userLocation 
    ? calculateDistanceKm(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng)
    : null;

  return (
    <div className="group relative flex flex-col rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
      {/* Image Thumbnail */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onShowDetails(place)}>
        <img
          src={place.images && place.images[0]}
          alt={place.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white shadow-lg">
          <span>{place.categoryLabel}</span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(place.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/15 text-slate-300 hover:text-rose-400 hover:scale-110 transition shadow-lg"
          title={isFavorite ? "Eliminar de favoritos" : "Guardar en favoritos"}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Photo badge if recommended */}
        {place.recommendedForPhoto && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/80 backdrop-blur-sm text-slate-950 text-[10px] font-black shadow-md">
            <Camera className="w-3 h-3" />
            <span>FOTO SPOT</span>
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/15 text-xs font-bold text-white shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{place.rating}</span>
          <span className="text-[10px] text-slate-400 font-normal">({place.reviewsCount})</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <h3 
            onClick={() => onShowDetails(place)}
            className="text-lg font-bold text-white group-hover:text-emerald-400 transition cursor-pointer line-clamp-1"
          >
            {place.shortName || place.name}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
            {place.description}
          </p>

          {/* Details metadata */}
          <div className="mt-4 flex flex-col gap-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{place.address}</span>
            </div>

            {distanceKm !== null && (
              <div className="flex items-center gap-2 text-sky-400 font-medium">
                <Navigation className="w-3.5 h-3.5 shrink-0" />
                <span>A {formatDistance(distanceKm)} de ti ({estimateTravelTime(distanceKm, 'driving')})</span>
              </div>
            )}

            {place.hours && (
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{place.hours}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <button
            onClick={() => onSelect(place)}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Ver en Mapa</span>
          </button>

          <button
            onClick={() => onShowDetails(place)}
            className="p-2 rounded-xl glass-panel-subtle text-slate-300 hover:text-white hover:border-white/20 transition"
            title="Ver detalles completos"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
