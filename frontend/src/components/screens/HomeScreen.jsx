import React from 'react';
import { Menu, Bell, Search, MapPin, Star, Heart, Navigation, ArrowRight, Utensils, Mountain, Church, Bed, Landmark, Trees, ShieldAlert, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateDistanceKm, formatDistance } from '../../utils/distance';

export function HomeScreen() {
  const { 
    user, 
    places, 
    navigateTo, 
    setSelectedCategory, 
    setIsSideDrawerOpen, 
    setIsNotificationModalOpen,
    isFavorite,
    toggleFavorite,
    userLocation
  } = useApp();

  const categoryCards = [
    { id: 'turismo', label: 'Atracciones', icon: Landmark, color: 'from-emerald-500 to-teal-600', iconColor: 'text-emerald-400' },
    { id: 'restaurantes', label: 'Restaurantes', icon: Utensils, color: 'from-orange-500 to-amber-600', iconColor: 'text-orange-400' },
    { id: 'naturaleza', label: 'Actividades', icon: Mountain, color: 'from-cyan-500 to-blue-600', iconColor: 'text-cyan-400' },
    { id: 'hoteles', label: 'Hospedaje', icon: Bed, color: 'from-blue-500 to-indigo-600', iconColor: 'text-blue-400' },
    { id: 'iglesias', label: 'Iglesias & Fe', icon: Church, color: 'from-purple-500 to-pink-600', iconColor: 'text-purple-400' },
  ];

  const recommendedDestinations = [
    {
      id: "dest-tulcan",
      name: "Tulcán",
      tagline: "Centinela del Norte",
      price: "$1.00",
      image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=600&q=80",
      targetPlaceId: "cementerio-municipal-jose-maria-azael-franco"
    },
    {
      id: "dest-ipiales",
      name: "Ipiales / Rumichaca",
      tagline: "Paso Binacional & Las Lajas",
      price: "$0.00",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
      targetPlaceId: "puente-internacional-rumichaca"
    },
    {
      id: "dest-tufino",
      name: "Tufiño (Termas)",
      tagline: "Aguas Hediondas 50°C",
      price: "$2.50",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      targetPlaceId: "complejo-termal-aguas-hediondas"
    },
    {
      id: "dest-el-angel",
      name: "El Ángel",
      tagline: "Bosque de Frailejones",
      price: "Gratis",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
      targetPlaceId: "reserva-ecologica-el-angel"
    }
  ];

  const popularPlaces = places.slice(0, 5);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    navigateTo('explore');
  };

  const handleDestinationClick = (placeId) => {
    const p = places.find(item => item.id === placeId);
    if (p) {
      navigateTo('place-detail', { place: p });
    } else {
      navigateTo('explore');
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-md mx-auto w-full pb-20 animate-fade-in text-slate-100">
      {/* Header Greeting & Notifications (Screen 3 Header) */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSideDrawerOpen(true)}
            className="p-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-slate-200 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight">
              ¡Hola, {user.name ? user.name.split(' ')[0] : 'viajero'}! 👋
            </h2>
            <p className="text-xs text-slate-400">¿A dónde quieres ir hoy?</p>
          </div>
        </div>

        <button
          onClick={() => setIsNotificationModalOpen(true)}
          className="p-2.5 rounded-2xl glass-panel-subtle border border-white/10 text-slate-200 hover:text-emerald-400 relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400"></span>
        </button>
      </div>

      {/* Quick Search Bar (Clicks into Explore screen) */}
      <div 
        onClick={() => navigateTo('explore')}
        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl glass-input cursor-pointer border border-white/10 hover:border-emerald-500/40 transition shadow-lg shadow-black/20"
      >
        <Search className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-xs sm:text-sm text-slate-400 font-medium truncate">
          Buscar lugares, actividades...
        </span>
      </div>

      {/* Categories Horizontal List (Screen 3 Categories) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Categorías</h3>
          <button onClick={() => navigateTo('explore')} className="text-[11px] text-emerald-400 hover:underline">
            Ver todas
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 hover:scale-105 transition min-w-[76px] shrink-0"
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-md`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-200 text-center line-clamp-1">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Destinos Recomendados (Screen 3 Destinos) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Destinos recomendados</h3>
          <span className="text-[10px] text-slate-400">Carchi & Frontera</span>
        </div>

        <div className="flex items-center gap-3.5 overflow-x-auto pb-2 scrollbar-none">
          {recommendedDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleDestinationClick(dest.targetPlaceId)}
              className="relative w-44 h-48 rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-emerald-500/40 transition shrink-0 cursor-pointer group shadow-xl"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Price badge */}
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/15 text-[10px] font-bold text-emerald-300">
                {dest.price}
              </div>

              {/* Content bottom */}
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="font-extrabold text-sm text-white group-hover:text-emerald-400 transition truncate">
                  {dest.name}
                </h4>
                <p className="text-[10px] text-slate-300 truncate mt-0.5">{dest.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Atractivos Populares */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Lugares Populares</h3>
          <button onClick={() => navigateTo('explore')} className="text-[11px] text-emerald-400 hover:underline">
            Explorar mapa
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {popularPlaces.map((place) => {
            const dist = userLocation
              ? calculateDistanceKm(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng)
              : null;

            return (
              <div
                key={place.id}
                onClick={() => navigateTo('place-detail', { place })}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl glass-panel-subtle border border-white/10 hover:border-emerald-500/40 transition cursor-pointer group shadow-lg"
              >
                <img
                  src={place.images && place.images[0]}
                  alt={place.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition"
                />
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-xs text-white group-hover:text-emerald-400 transition truncate">
                    {place.shortName || place.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 block truncate">{place.categoryLabel}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{place.rating}</span>
                    </div>
                    {dist !== null && (
                      <span className="text-[10px] text-sky-400 font-medium">
                        • {formatDistance(dist)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(place.id);
                  }}
                  className="p-2 rounded-xl glass-panel-subtle text-slate-400 hover:text-rose-400 transition shrink-0"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(place.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
