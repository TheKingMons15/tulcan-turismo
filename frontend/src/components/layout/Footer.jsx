import React from 'react';
import { Compass, Heart, Shield, Mountain, CloudSnow, Globe, MapPin, ExternalLink } from 'lucide-react';

export function Footer({ onNavigateToSection }) {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-slate-950/80 backdrop-blur-2xl text-slate-400 pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-emerald-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight">TULCÁN TURISMO</span>
                <p className="text-xs text-emerald-400 font-medium">Guía Digital & Mapa Abierto</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Plataforma turística oficial y libre de la ciudad de Tulcán, capital de la provincia del Carchi. Construida con tecnología web moderna y datos 100% verificados.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Mountain className="w-4 h-4 text-emerald-400" />
              <span>Altitud: 2.980 m.s.n.m.</span>
              <span>•</span>
              <CloudSnow className="w-4 h-4 text-sky-400" />
              <span>Clima Andino: 6°C - 16°C</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Navegación Rápida</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <button onClick={() => onNavigateToSection('mapa')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Mapa Interactivo de Tulcán
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('lugares')} className="hover:text-emerald-400 transition">
                  Atractivos & Patrimonio Histórico
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('rutas')} className="hover:text-emerald-400 transition">
                  Rutas Turísticas Curadas (1 Día, Frailejones, Sabor)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('servicios')} className="hover:text-emerald-400 transition">
                  Hospitales, Farmacias & Transporte
                </button>
              </li>
            </ul>
          </div>

          {/* Patrimonios Clave */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Íconos del Carchi</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li className="flex items-center justify-between text-slate-300">
                <span>Cementerio de Cipreses</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Patrimonio Nac.</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>Hornado Pastuso</span>
                <span className="text-[10px] text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">Mercado Central</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>Reserva Ecológica El Ángel</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Frailejones</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>Termas Aguas Hediondas</span>
                <span className="text-[10px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">Tufiño 50°C</span>
              </li>
            </ul>
          </div>

          {/* Mapa Libre & Privacidad */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Tecnología & Open Data</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Esta plataforma utiliza <strong>Leaflet</strong> y capas de mapas abiertas de <strong>OpenStreetMap & CartoDB</strong>, garantizando navegación fluida, privacidad y cero costo de licencias o APIs privativas.
            </p>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-[11px] text-slate-300">
              🛡️ Datos georreferenciados con coordenadas satelitales verificadas de Tulcán.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Tulcán Turismo. Diseñado con orgullo para Carchi, Ecuador.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>React + Tailwind + Leaflet (Free Maps)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
