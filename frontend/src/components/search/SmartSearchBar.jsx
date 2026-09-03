import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export function SmartSearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const smartSuggestions = [
    { label: "Cipreses en el Cementerio", query: "cementerio" },
    { label: "Dónde comer Hornado Pastuso", query: "hornado" },
    { label: "Frailejones Reserva El Ángel", query: "frailejones" },
    { label: "Aguas Termales de Tufiño", query: "aguas hediondas" },
    { label: "Hoteles cerca de la Catedral", query: "hoteles" },
    { label: "Cafeterías tradicionales", query: "cafe" },
    { label: "Paso Fronterizo Rumichaca", query: "rumichaca" },
  ];

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  const handleSelectSuggestion = (suggestQuery) => {
    setQuery(suggestQuery);
    onSearch(suggestQuery);
    setIsFocused(false);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    if (inputRef.current) inputRef.current.focus();
  };

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (inputRef.current) inputRef.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full z-30">
      <div className={`relative flex items-center w-full rounded-2xl glass-panel border transition-all duration-300 ${
        isFocused 
          ? 'border-emerald-500 ring-4 ring-emerald-500/20 bg-slate-900/90 shadow-2xl shadow-emerald-500/20' 
          : 'border-white/15 bg-slate-900/70 hover:border-white/25'
      }`}>
        <div className="pl-4 pr-2 text-emerald-400">
          <Search className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          placeholder="Escribe 'iglesias', 'hornado pastuso', 'hoteles', 'frailejones'..."
          className="w-full py-4 pr-10 bg-transparent text-white placeholder-slate-400 text-sm md:text-base focus:outline-none font-medium"
        />

        {query && (
          <button
            onClick={handleClear}
            className="p-1.5 mr-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestion Dropdown */}
      {isFocused && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 rounded-2xl glass-panel border border-white/10 shadow-2xl animate-fade-in text-left">
          <div className="flex items-center gap-1.5 px-2 pb-2 text-xs font-semibold text-slate-400 border-b border-white/5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Búsquedas frecuentes en Tulcán:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
            {smartSuggestions.map((item, idx) => (
              <button
                key={idx}
                onMouseDown={() => handleSelectSuggestion(item.query)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-emerald-500/10 hover:border-emerald-500/30 border border-transparent transition text-left"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3 h-3 text-emerald-400 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
