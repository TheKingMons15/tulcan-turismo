import React from 'react';
import { Compass, MapPin, Sparkles, Navigation, ArrowRight, Camera, Utensils, Mountain, Church, Bed, Shield } from 'lucide-react';
import { SmartSearchBar } from '../search/SmartSearchBar';

export function Hero({ 
  onSearch, 
  onSelectCategory, 
  onExploreMap, 
  onOpenRouteBuilder,
  placesCount = 32 
}) {
  const quickCategories = [
    { id: 'turismo', label: 'Topiaria & Monumentos', icon: Camera, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { id: 'restaurantes', label: 'Hornado Pastuso & Café', icon: Utensils, color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
    { id: 'iglesias', label: 'Catedral & Santuarios', icon: Church, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
    { id: 'naturaleza', label: 'Frailejones & Termales', icon: Mountain, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
    { id: 'hoteles', label: 'Hoteles Céntricos', icon: Bed, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  ];

  return (
    <div className="relative min-h-[90vh] pt-28 pb-16 flex flex-col justify-center items-center px-4 md:px-8 overflow-hidden">
      {/* Background Image with High Quality Andean Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=2000&q=85')`
        }}
      >
        {/* Deep Gradient & Blur Overlay for Glassmorphism readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/85 to-slate-950"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>

      {/* Floating decorative light halos */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-6 shadow-xl animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>La Centinela del Norte • Carchi, Ecuador</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
          Descubre la Magia de <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Tulcán & Carchi
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8 drop-shadow-md">
          El camposanto de cipreses esculpidos más bello del mundo, el auténtico hornado pastuso, los frailejones gigantes de El Ángel y aguas termales volcánicas a 2.980 m.s.n.m.
        </p>

        {/* Intelligent Search Bar */}
        <div className="w-full max-w-2xl mb-8">
          <SmartSearchBar onSearch={onSearch} />
        </div>

        {/* Quick Category Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mb-8">
          {quickCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border backdrop-blur-md transition-all duration-200 hover:scale-105 ${cat.color}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Direct Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreMap}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-500/40 hover:scale-105 transition-all"
          >
            <MapPin className="w-4 h-4" />
            <span>Explorar Mapa Interactivo ({placesCount} Lugares)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenRouteBuilder}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl glass-panel text-slate-200 font-semibold text-sm hover:text-white hover:border-emerald-500/40 hover:bg-slate-800/80 transition-all"
          >
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>Generar Ruta Turística</span>
          </button>
        </div>
      </div>
    </div>
  );
}
