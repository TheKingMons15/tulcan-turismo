import React from 'react';

export function GlassCard({ children, className = '', hover = true, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`rounded-2xl backdrop-blur-xl border shadow-xl transition-all duration-300 ${
        hover ? 'glass-panel-hover' : 'glass-panel-subtle'
      } bg-slate-900/60 border-white/10 text-slate-100 ${className}`}
    >
      {children}
    </div>
  );
}
