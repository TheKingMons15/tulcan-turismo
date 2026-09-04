import React, { useState } from 'react';
import { Menu, Bell, MapPin, Compass, ArrowRight, Sparkles, Mountain } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function OnboardingScreen() {
  const { navigateTo, setIsAuthModalOpen, setAuthMode, setIsSideDrawerOpen, setIsNotificationModalOpen } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Conoce, disfruta y conecta con lo mejor de cada destino",
      subtitle: "Descubre Tulcán: la capital del Carchi a 2.980 m.s.n.m., famosa por su arte en ciprés y gastronomía andina.",
      image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "El Camposanto de Esculturas de Ciprés",
      subtitle: "Patrimonio Cultural del Ecuador con más de 8 hectáreas de figuras talladas de culturas precolombinas.",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Páramo de Frailejones & Aguas Termales",
      subtitle: "Senderos mágicos en la Reserva El Ángel y termales volcánicas medicinales a los pies del Volcán Chiles.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between p-6 overflow-hidden bg-slate-950 text-slate-100">
      {/* Background Image with Ambient Glow */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style={{ backgroundImage: `url(${slides[activeSlide].image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/75 to-slate-950"></div>
        <div className="absolute inset-0 backdrop-blur-[3px]"></div>
      </div>

      {/* Top App Header (Screen 1 header from wireframe) */}
      <div className="relative z-10 flex items-center justify-between pt-2">
        <button 
          onClick={() => setIsSideDrawerOpen(true)}
          className="p-3 rounded-2xl glass-panel-subtle text-slate-200 hover:text-white hover:border-emerald-500/40 transition shadow-lg"
          title="Abrir menú lateral"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button 
          onClick={() => setIsNotificationModalOpen(true)}
          className="p-3 rounded-2xl glass-panel-subtle text-slate-200 hover:text-emerald-400 hover:border-emerald-500/40 transition shadow-lg relative"
          title="Notificaciones"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      </div>

      {/* Central Brand Illustration & Tagline */}
      <div className="relative z-10 max-w-sm mx-auto my-auto text-center flex flex-col items-center gap-6">
        {/* Mountain & Location Logo Icon */}
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-1 shadow-2xl shadow-emerald-500/30">
            <div className="w-full h-full bg-slate-950/90 rounded-[22px] flex flex-col items-center justify-center p-3 backdrop-blur-md">
              <Mountain className="w-10 h-10 text-emerald-400" />
              <MapPin className="w-4 h-4 text-white -mt-2 drop-shadow" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-wider text-white font-space">
            TURISMO<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              CONECTA
            </span>
          </h1>
          <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400 block mt-1">
            Tulcán • Carchi
          </span>
        </div>

        {/* Dynamic Tagline */}
        <div className="px-4 min-h-[70px]">
          <p className="text-sm font-medium text-slate-200 leading-relaxed drop-shadow">
            {slides[activeSlide].title}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {slides[activeSlide].subtitle}
          </p>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-2 mt-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx 
                  ? 'w-6 bg-emerald-400 shadow-sm shadow-emerald-400' 
                  : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="relative z-10 max-w-sm mx-auto w-full flex flex-col gap-3 pb-6">
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Explorar</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            setAuthMode('login');
            setIsAuthModalOpen(true);
          }}
          className="w-full py-3 text-center text-xs font-semibold text-slate-300 hover:text-emerald-400 transition"
        >
          ¿Ya tienes cuenta? <span className="underline">Iniciar sesión</span>
        </button>
      </div>
    </div>
  );
}
