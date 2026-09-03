import React, { useState } from 'react';
import { Route, Clock, MapPin, Navigation, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Sparkles, Compass } from 'lucide-react';

export function RouteExplorer({
  routes = [],
  activeRoute,
  onSelectRoute,
  onShowPlaceDetails,
  onOpenRouteBuilder
}) {
  const [expandedRouteId, setExpandedRouteId] = useState(routes[0]?.id || null);

  const toggleExpand = (routeId) => {
    setExpandedRouteId(prev => prev === routeId ? null : routeId);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>DESCUBRE TULCÁN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Rutas Turísticas Curadas
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Itinerarios inteligentes diseñados paso a paso para aprovechar al máximo tu estancia en Carchi.
          </p>
        </div>

        <button
          onClick={onOpenRouteBuilder}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Route className="w-4 h-4" />
          <span>Crear Mi Propia Ruta Personalizada</span>
        </button>
      </div>

      {/* Routes Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {routes.map((route) => {
          const isSelectedOnMap = activeRoute && activeRoute.id === route.id;
          const isExpanded = expandedRouteId === route.id;

          return (
            <div
              key={route.id}
              className={`rounded-3xl glass-panel border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                isSelectedOnMap
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-slate-900/90 shadow-2xl shadow-emerald-500/15'
                  : 'border-white/10 hover:border-white/25'
              }`}
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span 
                      className="px-3 py-1 rounded-xl text-[11px] font-extrabold tracking-wide uppercase shadow-md"
                      style={{ backgroundColor: `${route.color}25`, color: route.color, border: `1px solid ${route.color}50` }}
                    >
                      {route.tagline}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{route.name}</h3>
                  </div>

                  {isSelectedOnMap && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> En Mapa
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {route.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/60 border border-white/5 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Distancia</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400">{route.totalDistanceKm} km</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Duración</span>
                    <span className="text-xs sm:text-sm font-bold text-cyan-400">{route.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Paradas</span>
                    <span className="text-xs sm:text-sm font-bold text-amber-400">{route.places?.length} lugares</span>
                  </div>
                </div>

                {/* Route Stops List (Collapsible) */}
                <div className="mt-4">
                  <button
                    onClick={() => toggleExpand(route.id)}
                    className="w-full flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white py-1"
                  >
                    <span>Ver paradas del itinerario ({route.places?.length})</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 flex flex-col gap-2.5 pl-2 border-l-2 border-emerald-500/30 animate-fade-in">
                      {route.places.map((item, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start justify-between gap-3 text-xs p-2 rounded-xl hover:bg-white/5 transition cursor-pointer"
                          onClick={() => item.place && onShowPlaceDetails(item.place)}
                        >
                          <div className="flex items-start gap-2.5">
                            <span 
                              className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white shrink-0 mt-0.5"
                              style={{ backgroundColor: route.color }}
                            >
                              {item.order || idx + 1}
                            </span>
                            <div>
                              <span className="font-semibold text-white block">
                                {item.place ? (item.place.shortName || item.place.name) : `Parada ${idx+1}`}
                              </span>
                              <span className="text-[11px] text-slate-400">{item.activity}</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded shrink-0">
                            {item.suggestedTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-white/10 bg-slate-950/40 flex items-center gap-2">
                <button
                  onClick={() => onSelectRoute(route)}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                    isSelectedOnMap
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isSelectedOnMap ? 'Trazado Activo en Mapa' : 'Ver Ruta en Mapa'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
