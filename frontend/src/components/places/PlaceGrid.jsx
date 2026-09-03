import React, { useState, useMemo } from 'react';
import { PlaceCard } from './PlaceCard';
import { SkeletonCard } from '../common/SkeletonCard';
import { calculateDistanceKm } from '../../utils/distance';
import { ArrowUpDown, SlidersHorizontal, MapPin } from 'lucide-react';

export function PlaceGrid({
  places = [],
  loading,
  onSelectPlace,
  onShowDetails,
  isFavorite,
  onToggleFavorite,
  userLocation,
  onAddToRoute
}) {
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'distance', 'name'

  const sortedPlaces = useMemo(() => {
    let list = [...places];
    if (sortBy === 'distance' && userLocation) {
      list.sort((a, b) => {
        const distA = calculateDistanceKm(userLocation.lat, userLocation.lng, a.coordinates.lat, a.coordinates.lng) || 9999;
        const distB = calculateDistanceKm(userLocation.lat, userLocation.lng, b.coordinates.lat, b.coordinates.lng) || 9999;
        return distA - distB;
      });
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [places, sortBy, userLocation]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 my-8">
        <MapPin className="w-12 h-12 text-emerald-400 mx-auto mb-3 opacity-60 animate-bounce" />
        <h3 className="text-xl font-bold text-white mb-2">No se encontraron lugares</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Intenta con otros términos como 'hornado', 'cementerio', 'frailejones' o selecciona otra categoría.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Top count and sort selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          Mostrando <span className="font-bold text-emerald-400">{places.length}</span> lugares en Tulcán
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span>Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="glass-input px-3 py-1.5 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="rating" className="bg-slate-900 text-white">⭐ Mejor Calificados</option>
            {userLocation && (
              <option value="distance" className="bg-slate-900 text-white">📍 Más Cercanos</option>
            )}
            <option value="name" className="bg-slate-900 text-white">🔤 Nombre A-Z</option>
          </select>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onSelect={onSelectPlace}
            onShowDetails={onShowDetails}
            isFavorite={isFavorite(place.id)}
            onToggleFavorite={onToggleFavorite}
            userLocation={userLocation}
            onAddToRoute={onAddToRoute}
          />
        ))}
      </div>
    </div>
  );
}
