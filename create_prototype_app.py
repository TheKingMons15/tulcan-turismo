import os

# Create directories
os.makedirs("frontend/src/context", exist_ok=True)
os.makedirs("frontend/src/components/navigation", exist_ok=True)
os.makedirs("frontend/src/components/screens", exist_ok=True)
os.makedirs("frontend/src/components/modals", exist_ok=True)

# 1. context/AppContext.jsx
with open("frontend/src/context/AppContext.jsx", "w", encoding="utf-8") as f:
    f.write('''import React, { createContext, useContext, useState, useEffect } from 'react';
import placesData from '../../../backend/src/data/places.json';
import categoriesData from '../../../backend/src/data/categories.json';
import routesData from '../../../backend/src/data/routes.json';
import { calculateDistanceKm } from '../utils/distance';

const AppContext = createContext();

const INITIAL_USER = {
  name: 'María López',
  email: 'maria.lopez@gmail.com',
  phone: '+593 99 876 5432',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  isAuthenticated: true,
  memberSince: 'Mayo 2024'
};

const INITIAL_BOOKINGS = {
  upcoming: [
    {
      id: 'b1',
      title: 'Tour Cultural Tulcán & Cipreses',
      category: 'Atractivo turístico',
      date: '15 de mayo',
      time: '10:00 am',
      people: '2 personas',
      status: 'Confirmada',
      price: '$25.00',
      image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=600&q=80',
      meetingPoint: 'Entrada Principal Cementerio de Tulcán',
      guide: 'Carlos Benavides (Guía Certificado)'
    },
    {
      id: 'b2',
      title: 'Excursión Frailejones Reserva El Ángel',
      category: 'Naturaleza & Aventura',
      date: '22 de mayo',
      time: '08:30 am',
      people: '1 persona',
      status: 'Confirmada',
      price: '$35.00',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
      meetingPoint: 'Terminal Terrestre de Tulcán',
      guide: 'Guías Nativos del Carchi'
    }
  ],
  past: [
    {
      id: 'b3',
      title: 'Ruta Gastronómica Hornado Pastuso',
      category: 'Gastronomía',
      date: '10 de abril',
      time: '12:00 pm',
      people: '2 personas',
      status: 'Completada',
      price: '$20.00',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
      meetingPoint: 'Mercado Central Plaza Gastronómica',
      guide: 'Degustación Autoguiada'
    }
  ]
};

export function AppProvider({ children }) {
  // Navigation Screen State: 'onboarding' | 'home' | 'explore' | 'place-detail' | 'route-map' | 'favorites' | 'bookings' | 'profile'
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [previousScreen, setPreviousScreen] = useState('home');

  // Modals & Drawers
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // App View Frame Toggle (Mobile phone mockup vs Full screen)
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // User State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('turismo_conecta_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // Places & Categories
  const [places] = useState(placesData);
  const [categories] = useState(categoriesData);
  const [routes] = useState(routesData);

  // Selections
  const [selectedPlace, setSelectedPlace] = useState(placesData[0]);
  const [routeDestination, setRouteDestination] = useState(placesData[0]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChip, setFilterChip] = useState('todos'); // 'todos' | 'precio' | 'distancia' | 'popular'

  // Favorites
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const saved = localStorage.getItem('turismo_conecta_favs');
      return saved ? JSON.parse(saved) : [placesData[0].id, placesData[13].id, placesData[14].id];
    } catch {
      return [placesData[0].id];
    }
  });

  // Bookings
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('turismo_conecta_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // User Geolocation (default to Central Tulcan)
  const [userLocation, setUserLocation] = useState({ lat: 0.8115, lng: -77.7185 });

  // Notifications
  const [notifications] = useState([
    { id: 1, title: "¡Bienvenido a Tulcán!", desc: "Disfruta de la Centinela del Norte y su arte en ciprés.", time: "Hace 10 min", read: false },
    { id: 2, title: "Clima en Carchi", desc: "Día fresco andino (12°C). Ideal para visitar Aguas Hediondas.", time: "Hace 1 hora", read: false },
    { id: 3, title: "Reserva confirmada", desc: "Tu tour al Cementerio de Tulcán está listo para el 15 de mayo.", time: "Ayer", read: true },
  ]);

  // Persist User & Favorites
  useEffect(() => {
    try {
      localStorage.setItem('turismo_conecta_user', JSON.stringify(user));
      localStorage.setItem('turismo_conecta_favs', JSON.stringify(favoriteIds));
      localStorage.setItem('turismo_conecta_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [user, favoriteIds, bookings]);

  // Navigation helpers
  const navigateTo = (screen, payload = null) => {
    setPreviousScreen(currentScreen);
    if (payload?.place) {
      setSelectedPlace(payload.place);
    }
    if (payload?.destination) {
      setRouteDestination(payload.destination);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setCurrentScreen(previousScreen || 'home');
  };

  const toggleFavorite = (placeId) => {
    setFavoriteIds(prev =>
      prev.includes(placeId) ? prev.filter(id => id !== placeId) : [...prev, placeId]
    );
  };

  const isFavorite = (placeId) => favoriteIds.includes(placeId);

  const addBooking = (newBooking) => {
    setBookings(prev => ({
      ...prev,
      upcoming: [newBooking, ...prev.upcoming]
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        goBack,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isSideDrawerOpen,
        setIsSideDrawerOpen,
        isNewBookingModalOpen,
        setIsNewBookingModalOpen,
        isEditProfileModalOpen,
        setIsEditProfileModalOpen,
        isNotificationModalOpen,
        setIsNotificationModalOpen,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isFilterModalOpen,
        setIsFilterModalOpen,
        isMobileFrame,
        setIsMobileFrame,
        user,
        setUser,
        places,
        categories,
        routes,
        selectedPlace,
        setSelectedPlace,
        routeDestination,
        setRouteDestination,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        filterChip,
        setFilterChip,
        favoriteIds,
        toggleFavorite,
        isFavorite,
        bookings,
        addBooking,
        userLocation,
        setUserLocation,
        notifications
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
''')

# 2. navigation/BottomNavBar.jsx
with open("frontend/src/components/navigation/BottomNavBar.jsx", "w", encoding="utf-8") as f:
    f.write('''import React from 'react';
import { Home, Compass, Heart, User, CalendarDays } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function BottomNavBar() {
  const { currentScreen, navigateTo, favoriteIds } = useApp();

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'explore', label: 'Explorar', icon: Compass },
    { id: 'bookings', label: 'Reservas', icon: CalendarDays },
    { id: 'favorites', label: 'Favoritos', icon: Heart, badge: favoriteIds.length },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  // Don't render on onboarding or auth screen
  if (currentScreen === 'onboarding') return null;

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 w-full bg-slate-950/90 backdrop-blur-2xl border-t border-white/10 px-4 py-2 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || 
            (item.id === 'explore' && (currentScreen === 'place-detail' || currentScreen === 'route-map'));

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-emerald-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px] animate-pulse-subtle' : 'stroke-[1.75px]'}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center shadow-md">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-0.5 shadow-sm shadow-emerald-400"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
''')

# 3. navigation/SideDrawer.jsx
with open("frontend/src/components/navigation/SideDrawer.jsx", "w", encoding="utf-8") as f:
    f.write('''import React from 'react';
import { X, Home, Compass, CalendarDays, Heart, MessageSquare, Settings, HelpCircle, LogOut, ShieldAlert, Sparkles, ChevronRight, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function SideDrawer() {
  const { 
    isSideDrawerOpen, 
    setIsSideDrawerOpen, 
    navigateTo, 
    user, 
    setUser,
    setIsAuthModalOpen,
    setIsEmergencyModalOpen
  } = useApp();

  if (!isSideDrawerOpen) return null;

  const handleLinkClick = (screen) => {
    setIsSideDrawerOpen(false);
    if (screen === 'emergency') {
      setIsEmergencyModalOpen(true);
      return;
    }
    navigateTo(screen);
  };

  const handleLogout = () => {
    setUser({
      name: 'Invitado',
      email: '',
      isAuthenticated: false
    });
    setIsSideDrawerOpen(false);
    navigateTo('onboarding');
  };

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in bg-black/75 backdrop-blur-sm">
      {/* Drawer Container (Slide from left) */}
      <div className="relative w-full max-w-xs h-full bg-slate-950/95 border-r border-white/10 text-slate-100 flex flex-col justify-between p-6 shadow-2xl overflow-y-auto">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-emerald-400 text-sm">
                  TC
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white tracking-tight">TURISMO CONECTA</h3>
                <p className="text-[10px] text-emerald-400 font-medium">Tulcán, Carchi</p>
              </div>
            </div>

            <button
              onClick={() => setIsSideDrawerOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card in Drawer */}
          {user.isAuthenticated ? (
            <div 
              onClick={() => handleLinkClick('profile')}
              className="my-5 p-3.5 rounded-2xl glass-panel-subtle border border-white/10 flex items-center justify-between gap-3 cursor-pointer hover:border-emerald-500/40 transition group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/40"
                />
                <div>
                  <h4 className="font-bold text-xs text-white group-hover:text-emerald-400 transition">{user.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate max-w-[130px]">{user.email}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition" />
            </div>
          ) : (
            <div className="my-5 p-4 rounded-2xl glass-panel-subtle border border-white/10 flex flex-col gap-2">
              <p className="text-xs text-slate-300 font-semibold">¿Tienes cuenta?</p>
              <button
                onClick={() => {
                  setIsSideDrawerOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
              >
                Iniciar sesión / Registrarse
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex flex-col gap-1.5 mt-2">
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition text-left"
            >
              <Home className="w-4 h-4 text-emerald-400" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => handleLinkClick('explore')}
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition text-left"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Explorar</span>
            </button>

            <button
              onClick={() => handleLinkClick('bookings')}
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition text-left"
            >
              <CalendarDays className="w-4 h-4 text-amber-400" />
              <span>Mis reservas</span>
            </button>

            <button
              onClick={() => handleLinkClick('favorites')}
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition text-left"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Favoritos</span>
            </button>

            <button
              onClick={() => handleLinkClick('profile')}
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition text-left"
            >
              <User className="w-4 h-4 text-purple-400" />
              <span>Mi Perfil & Datos</span>
            </button>

            <button
              onClick={() => handleLinkClick('emergency')}
              className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition text-left"
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Ayuda & Emergencias (ECU 911)</span>
            </button>
          </div>
        </div>

        {/* Bottom Drawer Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
          {user.isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión</span>
            </button>
          )}
          <p className="text-[10px] text-slate-500 px-3">
            Turismo Conecta Tulcán v1.2 • Carchi, Ecuador
          </p>
        </div>
      </div>

      {/* Dimmed backdrop area that closes drawer on click */}
      <div 
        onClick={() => setIsSideDrawerOpen(false)}
        className="flex-grow cursor-pointer"
      />
    </div>
  );
}
''')

print("Context, BottomNavBar and SideDrawer created.")
