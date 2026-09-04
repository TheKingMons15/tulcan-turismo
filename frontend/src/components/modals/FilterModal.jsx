import React from 'react';
import { X, SlidersHorizontal, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function FilterModal() {
  const { 
    isFilterModalOpen, 
    setIsFilterModalOpen, 
    categories, 
    selectedCategory, 
    setSelectedCategory,
    filterChip,
    setFilterChip
  } = useApp();

  if (!isFilterModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl glass-panel border border-white/15 bg-slate-950 p-6 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Filtros de Búsqueda</h3>
          </div>
          <button
            onClick={() => setIsFilterModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-4 flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase block mb-2">Ordenar por:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'todos', label: 'Sin orden' },
                { id: 'popular', label: '⭐ Más popular' },
                { id: 'distancia', label: '📍 Más cercano' },
                { id: 'precio', label: '🏷️ Por precio' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setFilterChip(item.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition ${
                    filterChip === item.id
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'glass-panel-subtle text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase block mb-2">Categoría:</label>
            <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'glass-panel-subtle text-slate-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsFilterModalOpen(false)}
          className="w-full py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
}
