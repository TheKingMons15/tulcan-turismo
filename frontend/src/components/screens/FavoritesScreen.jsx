import React from 'react';
import { Menu, Heart, MapPin, Star, Trash2, ArrowRight, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateDistanceKm, formatDistance } from '../../utils/distance';

export function FavoritesScreen() {
  const { 
    places, 
    favoriteIds, 
    toggleFavorite, 
    navigateTo, 
    setIsSideDrawerOpen, 
    userLocation 
  } = useApp();

  const favoritePlaces = places.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-md mx-auto w-full pb-20 animate-fade-in text-slate-100 min-h-screen">
      {/* Header: Menu Icon + "Mis favoritos" (Screen 7 Header) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSideDrawerOpen(true)}
            className="p-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-slate-200 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Mis favoritos
          </h2>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold">
          <Heart className="w-3.5 h-3.5 fill-rose-500" />
          <span>{favoritePlaces.length}</span>
        </div>
      </div>

      {/* Favorites List (Screen 7 List from wireframe) */}
      {favoritePlaces.length === 0 ? (
        <div className="my-auto p-8 text-center rounded-3xl glass-panel border border-white/10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-600">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">No tienes favoritos aún</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Guarda atractivos, restaurantes y monumentos de Tulcán haciendo clic en el corazón.
            </p>
          </div>
          <button
            onClick={() => navigateTo('explore')}
            className="px-5 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Explorar Atractivos</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {favoritePlaces.map((place) => {
            const dist = userLocation
              ? calculateDistanceKm(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng)
              : null;

            return (
              <div
                key={place.id}
                onClick={() => navigateTo('place-detail', { place })}
                className="flex items-center justify-between gap-3 p-3.5 rounded-3xl glass-panel border border-white/10 hover:border-emerald-500/40 transition cursor-pointer group shadow-xl"
              >
                <img
                  src={place.images && place.images[0]}
                  alt={place.name}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition"
                />

                <div className="flex-grow min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-emerald-400 transition truncate">
                      {place.shortName || place.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 block truncate">{place.categoryLabel}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{place.rating}</span>
                    </div>

                    {dist !== null && (
                      <span className="text-[10px] text-slate-400">
                        {formatDistance(dist)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(place.id);
                  }}
                  className="p-2.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition shrink-0"
                  title="Quitar de favoritos"
                >
                  <Heart className="w-4 h-4 fill-rose-500" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
