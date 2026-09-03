import React, { useState } from 'react';
import { X, Plus, Trash2, Navigation, Route, Sparkles, MapPin, Clock, ArrowRight, Check } from 'lucide-react';
import { calculateDistanceKm, formatDistance, estimateTravelTime } from '../../utils/distance';

export function RouteBuilder({
  isOpen,
  onClose,
  allPlaces = [],
  customRoutePlaces = [],
  onAddPlaceToRoute,
  onRemovePlaceFromRoute,
  onClearRoute,
  onApplyRouteToMap,
  userLocation
}) {
  if (!isOpen) return null;

  const [selectedPlaceIdToAdd, setSelectedPlaceIdToAdd] = useState('');

  // Calculate total route distance
  let totalKm = 0;
  const points = [];
  if (userLocation) {
    points.push({ lat: userLocation.lat, lng: userLocation.lng, name: "Tu Posición Actual" });
  }
  customRoutePlaces.forEach(p => {
    points.push({ lat: p.coordinates.lat, lng: p.coordinates.lng, name: p.name });
  });

  for (let i = 0; i < points.length - 1; i++) {
    totalKm += calculateDistanceKm(points[i].lat, points[i].lng, points[i+1].lat, points[i+1].lng) || 0;
  }
  totalKm = Math.round(totalKm * 10) / 10;

  const estimatedDrivingMinutes = Math.round((totalKm / 25) * 60) + (customRoutePlaces.length * 40);

  const handleAddSelected = () => {
    if (!selectedPlaceIdToAdd) return;
    const place = allPlaces.find(p => p.id === selectedPlaceIdToAdd);
    if (place) {
      onAddPlaceToRoute(place);
      setSelectedPlaceIdToAdd('');
    }
  };

  const handleApply = () => {
    if (customRoutePlaces.length === 0) return;
    const customRoute = {
      id: "custom-user-route",
      name: "Mi Ruta Personalizada de Tulcán",
      tagline: "Itinerario a tu medida",
      color: "#10b981",
      totalDistanceKm: totalKm,
      duration: `${Math.round(estimatedDrivingMinutes / 60)} horas aprox.`,
      places: customRoutePlaces.map((p, idx) => ({
        placeId: p.id,
        order: idx + 1,
        place: p,
        activity: `Visita a ${p.shortName || p.name}`
      }))
    };
    onApplyRouteToMap(customRoute);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-emerald-500/30 overflow-hidden shadow-2xl bg-slate-950/95 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Route className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Generador de Rutas Personalizadas</h3>
              <p className="text-xs text-slate-400">Selecciona los atractivos y calcula el recorrido óptimo</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-6">
          {/* Add Place Selector */}
          <div className="flex gap-2">
            <select
              value={selectedPlaceIdToAdd}
              onChange={(e) => setSelectedPlaceIdToAdd(e.target.value)}
              className="glass-input flex-grow py-3 px-4 rounded-2xl text-xs sm:text-sm focus:outline-none"
            >
              <option value="" className="bg-slate-900 text-slate-400">Selecciona un lugar de Tulcán para agregar...</option>
              {allPlaces.map((p) => {
                const alreadyIn = customRoutePlaces.some(item => item.id === p.id);
                return (
                  <option key={p.id} value={p.id} disabled={alreadyIn} className="bg-slate-900 text-white">
                    {p.name} ({p.categoryLabel}) {alreadyIn ? '✓ Agregado' : ''}
                  </option>
                );
              })}
            </select>

            <button
              onClick={handleAddSelected}
              disabled={!selectedPlaceIdToAdd}
              className="px-5 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-400 transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar</span>
            </button>
          </div>

          {/* Current Places in Route List */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
              <span>Paradas en tu Itinerario ({customRoutePlaces.length})</span>
              {customRoutePlaces.length > 0 && (
                <button
                  onClick={onClearRoute}
                  className="text-rose-400 hover:underline flex items-center gap-1 font-normal"
                >
                  <Trash2 className="w-3 h-3" /> Limpiar todo
                </button>
              )}
            </div>

            {customRoutePlaces.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-white/10 bg-slate-900/40 text-slate-400 text-xs">
                Aún no has agregado lugares a tu ruta. Selecciona arriba los atractivos que deseas visitar (ej. Cementerio de Tulcán, Mercado Central, Aguas Hediondas).
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {userLocation && (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-xs text-sky-300">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-bold text-[10px] flex items-center justify-center">0</span>
                      <span className="font-semibold">Punto de Partida: Tu Ubicación Actual</span>
                    </div>
                  </div>
                )}

                {customRoutePlaces.map((place, idx) => (
                  <div
                    key={place.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl glass-panel-subtle border border-white/10 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h5 className="font-bold text-white text-sm">{place.shortName || place.name}</h5>
                        <span className="text-slate-400 text-[11px]">{place.address}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemovePlaceFromRoute(place.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                      title="Eliminar de la ruta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Metric Summary */}
          {customRoutePlaces.length > 0 && (
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Distancia Total Estimada</span>
                <span className="text-base font-extrabold text-emerald-400">{totalKm} km</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Tiempo Recomendado</span>
                <span className="text-base font-extrabold text-cyan-400">{Math.round(estimatedDrivingMinutes / 60)}h {estimatedDrivingMinutes % 60}m</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-slate-950/60 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl glass-panel-subtle text-slate-300 hover:text-white text-xs font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={handleApply}
            disabled={customRoutePlaces.length === 0}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs disabled:opacity-40 hover:scale-105 transition flex items-center gap-2 shadow-lg shadow-emerald-500/25"
          >
            <Check className="w-4 h-4" />
            <span>Trazar Ruta en el Mapa</span>
          </button>
        </div>
      </div>
    </div>
  );
}
