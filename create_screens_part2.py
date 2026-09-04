import os

# 1. screens/PlaceDetailScreen.jsx (PANTALLA 5)
with open("frontend/src/components/screens/PlaceDetailScreen.jsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState } from 'react';
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
''')

# 2. screens/RouteNavigationScreen.jsx (PANTALLA 6)
with open("frontend/src/components/screens/RouteNavigationScreen.jsx", "w", encoding="utf-8") as f:
    f.write('''import React from 'react';
import { ArrowLeft, Navigation, Car, Footprints, MapPin, Compass, ExternalLink, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateDistanceKm, formatDistance, estimateTravelTime } from '../../utils/distance';
import { InteractiveMap } from '../map/InteractiveMap';

export function RouteNavigationScreen() {
  const { routeDestination, goBack, userLocation, places, isFavorite, toggleFavorite } = useApp();

  const destination = routeDestination || places[0];

  const distanceKm = userLocation
    ? calculateDistanceKm(userLocation.lat, userLocation.lng, destination.coordinates.lat, destination.coordinates.lng) || 1.2
    : 1.2;

  const drivingTime = estimateTravelTime(distanceKm, 'driving');
  const walkingTime = estimateTravelTime(distanceKm, 'walking');

  // Simulated active route object for Leaflet polyline
  const activeRouteObj = {
    id: "route-nav",
    name: `Ruta hacia ${destination.shortName || destination.name}`,
    color: "#10b981",
    places: [
      {
        order: 1,
        place: {
          id: "user-loc",
          name: "Tu Ubicación Actual",
          coordinates: userLocation
        }
      },
      {
        order: 2,
        place: destination
      }
    ]
  };

  const handleOpenExternalGPS = () => {
    const { lat, lng } = destination.coordinates;
    const url = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${userLocation.lat}%2C${userLocation.lng}%3B${lat}%2C${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative max-w-md mx-auto w-full h-[90vh] flex flex-col justify-between overflow-hidden animate-fade-in text-slate-100">
      {/* Top Header: Back Arrow + Title "Cómo llegar" (Screen 6 Header) */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 shadow-2xl">
          <button
            onClick={goBack}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
            title="Regresar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="pr-3">
            <h2 className="text-sm font-bold text-white tracking-tight">Cómo llegar</h2>
            <p className="text-[10px] text-emerald-400 truncate max-w-[170px]">{destination.shortName || destination.name}</p>
          </div>
        </div>

        <button
          onClick={handleOpenExternalGPS}
          className="p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-sky-400 hover:text-white shadow-2xl transition"
          title="Abrir en OpenStreetMap GPS"
        >
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>

      {/* Full Interactive Leaflet Map with Route Polyline (Screen 6 Map) */}
      <div className="w-full h-full">
        <InteractiveMap
          places={[destination]}
          activePlace={destination}
          onSelectPlace={() => {}}
          onShowDetails={() => {}}
          userLocation={userLocation}
          activeRoute={activeRouteObj}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      </div>

      {/* Floating Bottom Card: "Desde mi ubicación", time & "Iniciar ruta" (Screen 6 Bottom Card) */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="p-4 sm:p-5 rounded-3xl glass-panel border border-emerald-500/40 bg-slate-950/95 text-slate-100 shadow-2xl flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Punto de partida</span>
                <h4 className="text-xs font-bold text-white">Desde mi ubicación actual</h4>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Car className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-extrabold text-emerald-400">
                {drivingTime || '15 min'} ({formatDistance(distanceKm) || '1.2 km'})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <Footprints className="w-3.5 h-3.5 text-cyan-400" />
              <span>A pie: <strong>{walkingTime || '20 min'}</strong></span>
            </div>
            <span>Destino: <strong>{destination.shortName || destination.name}</strong></span>
          </div>

          {/* Action Button: "Iniciar ruta" (Screen 6 CTA) */}
          <button
            onClick={handleOpenExternalGPS}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs sm:text-sm shadow-xl hover:scale-[1.02] transition flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Iniciar ruta en tiempo real</span>
          </button>
        </div>
      </div>
    </div>
  );
}
''')

# 3. screens/FavoritesScreen.jsx (PANTALLA 7)
with open("frontend/src/components/screens/FavoritesScreen.jsx", "w", encoding="utf-8") as f:
    f.write('''import React from 'react';
import { Menu, Heart, MapPin, Star, Trash2, ArrowRight, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateDistanceKm, formatDistance } from '../../utils/distance';

export function FavoritesScreen() {
  const { 
    places, 
    favoriteIds, 
    toggleFavorite, 
    navigateTo, 
    setIsSideDrawerOpen, 
    userLocation 
  } = useApp();

  const favoritePlaces = places.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-md mx-auto w-full pb-20 animate-fade-in text-slate-100 min-h-screen">
      {/* Header: Menu Icon + "Mis favoritos" (Screen 7 Header) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSideDrawerOpen(true)}
            className="p-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-slate-200 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Mis favoritos
          </h2>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold">
          <Heart className="w-3.5 h-3.5 fill-rose-500" />
          <span>{favoritePlaces.length}</span>
        </div>
      </div>

      {/* Favorites List (Screen 7 List from wireframe) */}
      {favoritePlaces.length === 0 ? (
        <div className="my-auto p-8 text-center rounded-3xl glass-panel border border-white/10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-600">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">No tienes favoritos aún</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Guarda atractivos, restaurantes y monumentos de Tulcán haciendo clic en el corazón.
            </p>
          </div>
          <button
            onClick={() => navigateTo('explore')}
            className="px-5 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Explorar Atractivos</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {favoritePlaces.map((place) => {
            const dist = userLocation
              ? calculateDistanceKm(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng)
              : null;

            return (
              <div
                key={place.id}
                onClick={() => navigateTo('place-detail', { place })}
                className="flex items-center justify-between gap-3 p-3.5 rounded-3xl glass-panel border border-white/10 hover:border-emerald-500/40 transition cursor-pointer group shadow-xl"
              >
                <img
                  src={place.images && place.images[0]}
                  alt={place.name}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition"
                />

                <div className="flex-grow min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-emerald-400 transition truncate">
                      {place.shortName || place.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 block truncate">{place.categoryLabel}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{place.rating}</span>
                    </div>

                    {dist !== null && (
                      <span className="text-[10px] text-slate-400">
                        {formatDistance(dist)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(place.id);
                  }}
                  className="p-2.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition shrink-0"
                  title="Quitar de favoritos"
                >
                  <Heart className="w-4 h-4 fill-rose-500" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
''')

# 4. screens/BookingsScreen.jsx (PANTALLA 8)
with open("frontend/src/components/screens/BookingsScreen.jsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState } from 'react';
import { CalendarDays, Clock, Users, CheckCircle2, ArrowRight, Plus, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function BookingsScreen() {
  const { bookings, setIsNewBookingModalOpen, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);

  const currentBookings = activeTab === 'upcoming' ? bookings.upcoming : bookings.past;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-md mx-auto w-full pb-20 animate-fade-in text-slate-100 min-h-screen">
      {/* Header: "Mis reservas" (Screen 8 Header) */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-xl font-extrabold text-white tracking-tight">
          Mis reservas
        </h2>
        <button
          onClick={() => setIsNewBookingModalOpen(true)}
          className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition flex items-center gap-1.5 text-xs font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva</span>
        </button>
      </div>

      {/* Tabs: Próximas | Pasadas (Screen 8 Tabs) */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900 border border-white/10">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'upcoming'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Próximas ({bookings.upcoming.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'past'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Pasadas ({bookings.past.length})
        </button>
      </div>

      {/* Bookings List (Screen 8 Reservation Cards) */}
      <div className="flex flex-col gap-4">
        {currentBookings.length === 0 ? (
          <div className="p-8 text-center rounded-3xl glass-panel border border-white/10 text-slate-400 text-xs">
            No tienes reservas {activeTab === 'upcoming' ? 'próximas' : 'pasadas'}.
          </div>
        ) : (
          currentBookings.map((b) => (
            <div
              key={b.id}
              className="rounded-3xl glass-panel border border-white/10 p-4 flex flex-col gap-3 shadow-xl hover:border-emerald-500/40 transition"
            >
              <div className="flex items-start gap-3">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <span className="text-[10px] text-emerald-400 font-bold block">{b.category}</span>
                  <h4 className="font-extrabold text-xs sm:text-sm text-white truncate">{b.title}</h4>
                  
                  <div className="flex items-center gap-2 text-[11px] text-slate-300 mt-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{b.date} - {b.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{b.people}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge & Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{b.status}</span>
                </div>

                <button
                  onClick={() => setSelectedBookingDetails(b)}
                  className="px-3.5 py-1.5 rounded-xl glass-panel-subtle border border-white/10 text-xs font-bold text-slate-200 hover:text-white hover:border-emerald-500/40 transition"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Button: "Buscar más actividades" (Screen 8 CTA) */}
      <button
        onClick={() => setIsNewBookingModalOpen(true)}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-500/25 hover:scale-[1.02] transition flex items-center justify-center gap-2 mt-auto"
      >
        <Plus className="w-4 h-4" />
        <span>Buscar más actividades / Reservar Tour</span>
      </button>

      {/* Booking Details Modal */}
      {selectedBookingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl glass-panel border border-emerald-500/30 bg-slate-950 p-6 text-slate-100 shadow-2xl">
            <h3 className="text-lg font-bold text-white">{selectedBookingDetails.title}</h3>
            <p className="text-xs text-emerald-400 font-semibold mt-0.5">{selectedBookingDetails.category}</p>

            <div className="my-4 p-3.5 rounded-2xl bg-slate-900 border border-white/10 flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Fecha y Hora:</span>
                <span className="font-bold text-white">{selectedBookingDetails.date} - {selectedBookingDetails.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Asistentes:</span>
                <span className="font-bold text-white">{selectedBookingDetails.people}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Punto de Encuentro:</span>
                <span className="font-semibold text-slate-200">{selectedBookingDetails.meetingPoint}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Guía asignado:</span>
                <span className="font-semibold text-emerald-300">{selectedBookingDetails.guide}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBookingDetails(null)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
''')

# 5. screens/ProfileScreen.jsx (PANTALLA 9)
with open("frontend/src/components/screens/ProfileScreen.jsx", "w", encoding="utf-8") as f:
    f.write('''import React from 'react';
import { Menu, CalendarDays, Heart, User, Settings, LogOut, ChevronRight, ShieldAlert, Sparkles, Phone, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ProfileScreen() {
  const { 
    user, 
    setUser, 
    navigateTo, 
    setIsSideDrawerOpen, 
    setIsEditProfileModalOpen,
    setIsEmergencyModalOpen
  } = useApp();

  const handleLogout = () => {
    setUser({
      name: 'Invitado',
      email: '',
      isAuthenticated: false
    });
    navigateTo('onboarding');
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-md mx-auto w-full pb-20 animate-fade-in text-slate-100 min-h-screen">
      {/* Header: Menu icon + "Mi perfil" (Screen 9 Header) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSideDrawerOpen(true)}
            className="p-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-slate-200 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Mi perfil
          </h2>
        </div>
      </div>

      {/* User Card: Avatar, Name (María López), Email (Screen 9 Card) */}
      <div className="p-5 rounded-3xl glass-panel border border-white/10 flex items-center gap-4 shadow-xl">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-500/40 shadow-lg shrink-0"
        />
        <div className="flex-grow min-w-0">
          <h3 className="text-base font-extrabold text-white truncate">{user.name}</h3>
          <p className="text-xs text-slate-400 truncate">{user.email}</p>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 mt-1.5">
            Explorador Carchense
          </span>
        </div>
      </div>

      {/* Menu Options List with Chevrons (Screen 9 Menu List) */}
      <div className="flex flex-col gap-2">
        {/* Mis reservas */}
        <button
          onClick={() => navigateTo('bookings')}
          className="flex items-center justify-between p-4 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 hover:bg-slate-900 transition group"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <CalendarDays className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-white">Mis reservas</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition" />
        </button>

        {/* Mis favoritos */}
        <button
          onClick={() => navigateTo('favorites')}
          className="flex items-center justify-between p-4 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 hover:bg-slate-900 transition group"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
              <Heart className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-white">Mis favoritos</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition" />
        </button>

        {/* Mis datos */}
        <button
          onClick={() => setIsEditProfileModalOpen(true)}
          className="flex items-center justify-between p-4 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 hover:bg-slate-900 transition group"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
              <User className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-white">Mis datos</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition" />
        </button>

        {/* Configuración */}
        <button
          onClick={() => setIsEditProfileModalOpen(true)}
          className="flex items-center justify-between p-4 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 hover:bg-slate-900 transition group"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
              <Settings className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-white">Configuración</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition" />
        </button>

        {/* Cerrar sesión */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-between p-4 rounded-2xl glass-panel-subtle border border-white/10 hover:border-rose-500/40 hover:bg-rose-950/20 transition group text-rose-400 mt-2"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xs sm:text-sm">Cerrar sesión</span>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-400 transition" />
        </button>
      </div>
    </div>
  );
}
''')

print("Screens 5, 6, 7, 8, 9 generated successfully.")
