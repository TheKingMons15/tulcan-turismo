import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { createCategoryIcon, createUserLocationIcon, createRouteStopIcon } from '../../utils/mapIcons';
import { MapPopupCard } from './MapPopupCard';
import { Layers, Navigation, Plus, Minus, Compass, Maximize2 } from 'lucide-react';

const TILE_LAYERS = {
  voyager: {
    name: "CartoDB Voyager (Claro Moderno)",
    url: "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_2vhd_1_ecbb4873526f384d73614efd",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
  dark: {
    name: "CartoDB Dark Matter (Elegante Oscuro)",
    url: "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=cb1_2vhd_1_ecbb4873526f384d73614efd",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
  osm: {
    name: "OpenStreetMap Estándar",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
  topo: {
    name: "OpenTopoMap (Relieve & Volcanes)",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
  }
};

// Tulcán center coordinates
const TULCAN_CENTER = [0.8115, -77.7185];

export function InteractiveMap({
  places = [],
  activePlace,
  onSelectPlace,
  onShowDetails,
  userLocation,
  activeRoute,
  onRequestLocation,
  isFavorite,
  onToggleFavorite
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const userMarkerRef = useRef(null);

  const [currentLayerKey, setCurrentLayerKey] = useState('dark');
  const [showLayerPicker, setShowLayerPicker] = useState(false);

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: TULCAN_CENTER,
        zoom: 14,
        minZoom: 9,
        maxZoom: 18,
        zoomControl: false
      });

      // Layer groups
      tileLayerRef.current = L.tileLayer(TILE_LAYERS[currentLayerKey].url, {
        attribution: TILE_LAYERS[currentLayerKey].attribution,
        maxZoom: 19
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      routeLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Map cleanup if component completely unmounts
    };
  }, []);

  // 2. Switch Tile Layers
  const handleLayerChange = (layerKey) => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    tileLayerRef.current = L.tileLayer(TILE_LAYERS[layerKey].url, {
      attribution: TILE_LAYERS[layerKey].attribution,
      maxZoom: 19
    }).addTo(mapInstanceRef.current);
    setCurrentLayerKey(layerKey);
    setShowLayerPicker(false);
  };

  // 3. Render Markers when Places list updates
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    places.forEach((place) => {
      const isSelected = activePlace && activePlace.id === place.id;
      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], {
        icon: createCategoryIcon(place.category, isSelected),
        title: place.name
      });

      // Glassmorphism popup inside Leaflet
      const popupHtml = ReactDOMServer.renderToString(
        <MapPopupCard
          place={place}
          onShowDetails={onShowDetails}
          userLocation={userLocation}
          isFavorite={isFavorite ? isFavorite(place.id) : false}
          onToggleFavorite={onToggleFavorite}
        />
      );

      const popup = L.popup({
        closeButton: false,
        offset: [0, -32],
        className: 'glassmorphism-leaflet-popup'
      }).setContent(popupHtml);

      marker.bindPopup(popup);

      marker.on('click', () => {
        onSelectPlace(place);
      });

      markersLayer.addLayer(marker);
    });
  }, [places, activePlace, userLocation, isFavorite]);

  // 4. Focus active place
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activePlace) return;

    map.flyTo([activePlace.coordinates.lat, activePlace.coordinates.lng], 16, {
      duration: 1.2,
      easeLinearity: 0.25
    });
  }, [activePlace]);

  // 5. Render User Geolocation marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
      } else {
        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
          icon: createUserLocationIcon(),
          title: "Tu ubicación"
        }).addTo(map);
      }
    } else if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }
  }, [userLocation]);

  // 6. Render Active Route Polyline and numbered stops
  useEffect(() => {
    const map = mapInstanceRef.current;
    const routeLayer = routeLayerRef.current;
    if (!map || !routeLayer) return;

    routeLayer.clearLayers();

    if (activeRoute && activeRoute.places && activeRoute.places.length > 0) {
      const latLngs = [];

      activeRoute.places.forEach((item, index) => {
        const place = item.place || places.find(p => p.id === (item.placeId || item.id));
        if (place && place.coordinates) {
          const pt = [place.coordinates.lat, place.coordinates.lng];
          latLngs.push(pt);

          // Add numbered stop marker
          const stopMarker = L.marker(pt, {
            icon: createRouteStopIcon(item.order || index + 1, activeRoute.color || '#10b981'),
            zIndexOffset: 500
          });
          routeLayer.addLayer(stopMarker);
        }
      });

      if (latLngs.length > 1) {
        // Draw Polyline
        const polyline = L.polyline(latLngs, {
          color: activeRoute.color || '#10b981',
          weight: 5,
          opacity: 0.85,
          dashArray: '10, 10',
          lineCap: 'round'
        });
        routeLayer.addLayer(polyline);

        // Fit map bounds to show complete route
        map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
      }
    }
  }, [activeRoute, places]);

  // Map Controls Handlers
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetView = () => mapInstanceRef.current?.flyTo(TULCAN_CENTER, 14);

  return (
    <div className="relative w-full h-[650px] lg:h-[750px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
      {/* Leaflet Map Div */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Header Inside Map */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="px-4 py-2 rounded-2xl glass-panel border border-white/15 backdrop-blur-xl flex items-center gap-2 shadow-2xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-bold text-white">Mapa Abierto de Tulcán</span>
          <span className="text-[10px] text-emerald-400 font-medium">Free OSM / CartoDB</span>
        </div>
      </div>

      {/* Floating Layer Switcher and Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
        {/* Layer Picker Toggle */}
        <button
          onClick={() => setShowLayerPicker(!showLayerPicker)}
          className="p-3 rounded-2xl glass-panel border border-white/15 text-slate-200 hover:text-white hover:border-emerald-500/40 shadow-xl transition"
          title="Cambiar capa del mapa"
        >
          <Layers className="w-5 h-5 text-emerald-400" />
        </button>

        {/* Layer Selection Dropdown */}
        {showLayerPicker && (
          <div className="p-3 rounded-2xl glass-panel border border-white/15 shadow-2xl flex flex-col gap-1.5 w-60 animate-fade-in text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">Capas Disponibles</p>
            {Object.entries(TILE_LAYERS).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleLayerChange(key)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  currentLayerKey === key
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {config.name}
              </button>
            ))}
          </div>
        )}

        {/* GPS Locate Me Button */}
        <button
          onClick={onRequestLocation}
          className="p-3 rounded-2xl glass-panel border border-white/15 text-slate-200 hover:text-sky-400 hover:border-sky-500/40 shadow-xl transition"
          title="Centrar en mi ubicación"
        >
          <Navigation className="w-5 h-5 text-sky-400" />
        </button>

        {/* Reset View Button */}
        <button
          onClick={handleResetView}
          className="p-3 rounded-2xl glass-panel border border-white/15 text-slate-200 hover:text-white hover:border-emerald-500/40 shadow-xl transition"
          title="Centrar en Tulcán"
        >
          <Compass className="w-5 h-5 text-emerald-400" />
        </button>

        {/* Zoom Controls */}
        <div className="flex flex-col rounded-2xl glass-panel border border-white/15 overflow-hidden shadow-xl">
          <button
            onClick={handleZoomIn}
            className="p-2.5 text-slate-200 hover:text-white hover:bg-white/10 transition border-b border-white/10"
            title="Acercar"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2.5 text-slate-200 hover:text-white hover:bg-white/10 transition"
            title="Alejar"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Bottom Legend */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
        <div className="max-w-max mx-auto px-4 py-2 rounded-2xl glass-panel border border-white/10 backdrop-blur-xl pointer-events-auto flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold text-slate-300 shadow-2xl">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Turismo</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Iglesias</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Naturaleza</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Cultura</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Hoteles</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Gastronomía</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Salud</div>
        </div>
      </div>
    </div>
  );
}
