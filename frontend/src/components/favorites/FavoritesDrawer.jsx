import React from 'react';
import { X, Heart, MapPin, Trash2, Route, ArrowRight } from 'lucide-react';

export function FavoritesDrawer({
  isOpen,
  onClose,
  favoritePlaces = [],
  onRemoveFavorite,
  onShowDetails,
  onSelectOnMap,
  onBuildRouteFromFavorites
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md h-full glass-panel border-l border-white/15 bg-slate-950/95 text-slate-100 flex flex-col shadow-2xl p-6 overflow-y-auto">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <div>
              <h3 className="text-lg font-bold text-white">Lugares Guardados</h3>
              <p className="text-xs text-slate-400">{favoritePlaces.length} guardados</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-grow py-6 overflow-y-auto flex flex-col gap-3">
          {favoritePlaces.length === 0 ? (
            <div className="my-auto text-center p-6 text-slate-400">
              <Heart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-300">Aún no tienes favoritos</p>
              <p className="text-xs mt-1 text-slate-500">
                Haz clic en el corazón de cualquier lugar turístico para guardarlo aquí y armar tu viaje.
              </p>
            </div>
          ) : (
            favoritePlaces.map((place) => (
              <div
                key={place.id}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/30 transition group"
              >
                <img
                  src={place.images && place.images[0]}
                  alt={place.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 cursor-pointer"
                  onClick={() => {
                    onShowDetails(place);
                    onClose();
                  }}
                />
                <div className="flex-grow min-w-0">
                  <h4 
                    onClick={() => {
                      onShowDetails(place);
                      onClose();
                    }}
                    className="font-bold text-xs text-white group-hover:text-emerald-400 transition truncate cursor-pointer"
                  >
                    {place.shortName || place.name}
                  </h4>
                  <span className="text-[10px] text-emerald-400 block">{place.categoryLabel}</span>
                  <span className="text-[10px] text-slate-400 truncate block">{place.address}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      onSelectOnMap(place);
                      onClose();
                    }}
                    className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white transition"
                    title="Ver en mapa"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveFavorite(place.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
                    title="Eliminar de favoritos"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {favoritePlaces.length > 0 && (
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                onBuildRouteFromFavorites();
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <Route className="w-4 h-4" />
              <span>Crear Ruta con Mis Favoritos</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
