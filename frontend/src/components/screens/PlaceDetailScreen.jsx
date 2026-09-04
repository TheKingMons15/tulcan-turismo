import React, { useState } from 'react';
import { ArrowLeft, Heart, Clock, MapPin, Tag, Star, Navigation, Sparkles, Share2, Calendar, Phone, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function PlaceDetailScreen() {
  const { 
    selectedPlace, 
    goBack, 
    navigateTo, 
    isFavorite, 
    toggleFavorite, 
    setIsNewBookingModalOpen 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!selectedPlace) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>No se ha seleccionado ningún lugar.</p>
        <button onClick={goBack} className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold">
          Regresar
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`${selectedPlace.name} en Tulcán, Ecuador: ${window.location.href}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComoLlegar = () => {
    navigateTo('route-map', { destination: selectedPlace });
  };

  return (
    <div className="flex flex-col max-w-md mx-auto w-full pb-24 animate-fade-in text-slate-100 min-h-screen">
      {/* Top Header Floating Overlay (Back arrow & Favorite Heart from wireframe Screen 5) */}
      <div className="relative w-full h-72 sm:h-80 bg-slate-900 overflow-hidden">
        <img
          src={selectedPlace.images && selectedPlace.images[activeImageIndex]}
          alt={selectedPlace.name}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/40"></div>

        {/* Top Floating Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={goBack}
            className="p-3 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/20 text-white hover:bg-slate-900 transition shadow-xl"
            title="Regresar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-3 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/20 text-white hover:bg-slate-900 transition shadow-xl"
              title="Compartir"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
            </button>

            <button
              onClick={() => toggleFavorite(selectedPlace.id)}
              className="p-3 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/20 text-white hover:text-rose-400 transition shadow-xl"
              title="Favoritos"
            >
              <Heart className={`w-5 h-5 ${isFavorite(selectedPlace.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Carousel Dots */}
        {selectedPlace.images && selectedPlace.images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
            {selectedPlace.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeImageIndex === idx ? 'w-5 bg-emerald-400' : 'w-2 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Place Content Body */}
      <div className="p-5 sm:p-6 flex flex-col gap-6 -mt-4 relative z-10 rounded-t-3xl bg-slate-950 border-t border-white/10 shadow-2xl">
        {/* Title, Category & Rating (Screen 5 Details) */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {selectedPlace.shortName || selectedPlace.name}
            </h1>
          </div>
          <p className="text-xs text-emerald-400 font-semibold mt-0.5">{selectedPlace.categoryLabel}</p>

          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-300">
            <div className="flex items-center gap-1 font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{selectedPlace.rating}</span>
            </div>
            <span className="text-slate-400">({selectedPlace.reviewsCount || '120'} opiniones)</span>
          </div>
        </div>

        {/* 3 Info Chips Grid: Horario, Ubicación, Precio (Screen 5 Icons) */}
        <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-900 border border-white/10 text-center">
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/60">
            <Clock className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-bold">Horario</span>
            <span className="text-[11px] font-semibold text-slate-200 mt-0.5 line-clamp-1">
              {selectedPlace.hours ? selectedPlace.hours.split('(')[0].replace('Lunes a Domingo de ', '').replace('Lunes a Viernes de ', '') : '8:00 - 18:00'}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/60">
            <MapPin className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-bold">Ubicación</span>
            <span className="text-[11px] font-semibold text-slate-200 mt-0.5 truncate max-w-full">
              Tulcán
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/60">
            <Tag className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-bold">Precio</span>
            <span className="text-[11px] font-semibold text-emerald-300 mt-0.5 truncate max-w-full">
              {selectedPlace.price ? (selectedPlace.price.includes('$') ? selectedPlace.price.split(' ')[0] : 'Gratis') : '$2.00'}
            </span>
          </div>
        </div>

        {/* Description & History (Screen 5 Description) */}
        <div>
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Descripción</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-2xl border border-white/5">
            {selectedPlace.description}
          </p>
        </div>

        {selectedPlace.history && (
          <div>
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Historia & Tradición</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-2xl border border-white/5">
              {selectedPlace.history}
            </p>
          </div>
        )}

        {/* Direct Phone / Contact if available */}
        {selectedPlace.phone && selectedPlace.phone !== 'N/A' && (
          <div className="flex items-center justify-between p-3.5 rounded-2xl glass-panel-subtle border border-white/10 text-xs">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Contacto Directo</span>
                <span className="font-semibold text-white">{selectedPlace.phone}</span>
              </div>
            </div>
            <a
              href={`tel:${selectedPlace.phone}`}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold hover:bg-emerald-500 hover:text-slate-950 transition"
            >
              Llamar
            </a>
          </div>
        )}

        {/* Action Buttons: "Cómo llegar" (Screen 5 CTA) & Reservar */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={handleComoLlegar}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:scale-[1.02] transition flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span>🧭 Cómo llegar</span>
          </button>

          <button
            onClick={() => setIsNewBookingModalOpen(true)}
            className="w-full py-3 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 text-xs font-bold text-slate-200 hover:text-white transition flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Reservar Tour / Actividad</span>
          </button>
        </div>
      </div>
    </div>
  );
}
