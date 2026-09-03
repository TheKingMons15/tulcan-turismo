import L from 'leaflet';

const categoryColorMap = {
  turismo: '#10b981',    // Emerald
  iglesias: '#a855f7',   // Purple
  cultura: '#f59e0b',    // Amber
  naturaleza: '#06b6d4', // Cyan
  hoteles: '#3b82f6',    // Blue
  restaurantes: '#f97316',// Orange
  salud: '#ef4444',      // Red
  servicios: '#94a3b8',  // Slate
};

const categoryIconSymbols = {
  turismo: '⭐',
  iglesias: '⛪',
  cultura: '🏛️',
  naturaleza: '🌿',
  hoteles: '🏨',
  restaurantes: '🍽️',
  salud: '🏥',
  servicios: '🚌',
};

export function createCategoryIcon(category = 'turismo', isSelected = false) {
  const color = categoryColorMap[category] || '#10b981';
  const symbol = categoryIconSymbols[category] || '📍';
  const size = isSelected ? 46 : 38;

  const html = `
    <div class="custom-map-pin flex items-center justify-center relative cursor-pointer group" style="width: ${size}px; height: ${size}px;">
      <!-- Glowing pulse halo -->
      <div class="absolute inset-0 rounded-full opacity-60 animate-ping" style="background-color: ${color}; filter: blur(2px);"></div>
      <!-- Outer pin bubble with glass effect -->
      <div class="relative w-full h-full rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 ${isSelected ? 'ring-4 ring-white ring-offset-2 ring-offset-slate-950 scale-110' : 'ring-2 ring-white/40'}" 
           style="background: linear-gradient(135deg, ${color}ee, #0f172add); backdrop-filter: blur(8px); border: 2px solid ${color};">
        <span class="text-sm font-bold drop-shadow-md select-none">${symbol}</span>
      </div>
      <!-- Little triangle pointer -->
      <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style="background-color: ${color};"></div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-leaflet-marker-container',
    html: html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size + 2],
    popupAnchor: [0, -(size + 6)]
  });
}

export function createUserLocationIcon() {
  const html = `
    <div class="relative flex items-center justify-center w-8 h-8">
      <div class="absolute w-8 h-8 bg-sky-500/40 rounded-full animate-ping"></div>
      <div class="relative w-5 h-5 bg-sky-500 border-2 border-white rounded-full shadow-lg flex items-center justify-center">
        <div class="w-2 h-2 bg-white rounded-full"></div>
      </div>
    </div>
  `;
  return L.divIcon({
    className: 'user-location-marker',
    html: html,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
}

export function createRouteStopIcon(order, color = '#10b981') {
  const html = `
    <div class="relative flex items-center justify-center w-8 h-8 shadow-xl">
      <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white border-2 border-white shadow-lg"
           style="background-color: ${color};">
        ${order}
      </div>
    </div>
  `;
  return L.divIcon({
    className: 'route-stop-marker',
    html: html,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
}
