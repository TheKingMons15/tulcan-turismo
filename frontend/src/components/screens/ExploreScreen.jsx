import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, Star, Heart, MapPin, Layers, Map as MapIcon, ListFilter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateDistanceKm, formatDistance } from '../../utils/distance';
import { InteractiveMap } from '../map/InteractiveMap';

export function ExploreScreen() {
  const { 
    places, 
    navigateTo, 
    goBack,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filterChip,
    setFilterChip,
    isFavorite,
    toggleFavorite,
    userLocation,
    setIsFilterModalOpen
  } = useApp();

  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [activePlace, setActivePlace] = useState(null);

  const chips = [
    { id: 'todos', label: 'Todos' },
    { id: 'precio', label: 'Precio' },
    { id: 'distancia', label: 'Distancia' },
    { id: 'popular', label: 'Popular' },
  ];

  // Filtering & Sorting logic
  const filteredPlaces = useMemo(() => {
    let list = [...places];

    if (selectedCategory && selectedCategory !== 'todos') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.shortName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sort by chip
    if (filterChip === 'popular') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filterChip === 'distancia' && userLocation) {
      list.sort((a, b) => {
        const dA = calculateDistanceKm(userLocation.lat, userLocation.lng, a.coordinates.lat, a.coordinates.lng) || 999;
        const dB = calculateDistanceKm(userLocation.lat, userLocation.lng, b.coordinates.lat, b.coordinates.lng) || 999;
        return dA - dB;
      });
    } else if (filterChip === 'precio') {
      list.sort((a, b) => (a.price || '').localeCompare(b.price || ''));
    }

    return list;
  }, [places, selectedCategory, searchQuery, filterChip, userLocation]);

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-md mx-auto w-full pb-20 animate-fade-in text-slate-100 min-h-screen">
      {/* Top Search & Filter Bar (Screen 4 Header) */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={goBack}
          className="p-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-slate-200 hover:text-white"
          title="Regresar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Search Input */}
        <div className="relative flex-grow flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-emerald-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar..."
            className="w-full py-2.5 pl-10 pr-3 rounded-2xl glass-input text-xs sm:text-sm font-medium"
          />
        </div>

        {/* Filter Dialog Button */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="p-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-slate-200 hover:text-emerald-400 hover:border-emerald-500/40"
          title="Opciones de filtro"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Chips row (Screen 4 Chips) */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {chips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setFilterChip(chip.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filterChip === chip.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'glass-panel-subtle text-slate-300 hover:text-white'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* View mode toggle button */}
        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          className="p-1.5 rounded-xl glass-panel-subtle border border-white/10 text-emerald-400 hover:bg-white/10 transition shrink-0"
          title={viewMode === 'list' ? "Ver en Mapa" : "Ver en Lista"}
        >
          {viewMode === 'list' ? <MapIcon className="w-4 h-4" /> : <ListFilter className="w-4 h-4" />}
        </button>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
        <span>{filteredPlaces.length} lugares encontrados en Tulcán</span>
        {selectedCategory !== 'todos' && (
          <button 
            onClick={() => setSelectedCategory('todos')} 
            className="text-emerald-400 hover:underline"
          >
            Limpiar categoría ({selectedCategory})
          </button>
        )}
      </div>

      {/* Map View */}
      {viewMode === 'map' ? (
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[480px]">
          <InteractiveMap
            places={filteredPlaces}
            activePlace={activePlace}
            onSelectPlace={(place) => setActivePlace(place)}
            onShowDetails={(place) => navigateTo('place-detail', { place })}
            userLocation={userLocation}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      ) : (
        /* List View (Screen 4 Cards from wireframe) */
        <div className="flex flex-col gap-3.5">
          {filteredPlaces.length === 0 ? (
            <div className="p-8 text-center rounded-3xl glass-panel border border-white/10 my-4 text-slate-400 text-xs">
              No se encontraron lugares para esta búsqueda.
            </div>
          ) : (
            filteredPlaces.map((place) => {
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
                        <span className="text-[11px] font-medium text-slate-300 bg-slate-900 px-2 py-0.5 rounded-lg">
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
                    className="p-2.5 rounded-2xl glass-panel-subtle text-slate-400 hover:text-rose-400 transition shrink-0"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(place.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
