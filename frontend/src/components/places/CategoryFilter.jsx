import React from 'react';
import { Compass, Landmark, Church, Palette, Trees, Bed, Utensils, HeartPulse, Bus, Camera, Star } from 'lucide-react';

const iconComponents = {
  Compass,
  Landmark,
  Church,
  Palette,
  Trees,
  Bed,
  Utensils,
  HeartPulse,
  Bus
};

export function CategoryFilter({
  categories = [],
  selectedCategory,
  onSelectCategory,
  photoOnly,
  onTogglePhotoOnly,
  featuredOnly,
  onToggleFeaturedOnly
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = iconComponents[cat.icon] || Compass;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-white/30 scale-105'
                  : 'glass-panel-subtle text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.name}</span>
              {cat.count !== undefined && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Secondary Fast Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-white/5">
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePhotoOnly}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
              photoOnly
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'glass-panel-subtle text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Imperdible para Fotografía</span>
          </button>

          <button
            onClick={onToggleFeaturedOnly}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
              featuredOnly
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'glass-panel-subtle text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Lugares Más Destacados</span>
          </button>
        </div>
      </div>
    </div>
  );
}
