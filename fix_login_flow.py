import os

# 1. Update AppContext.jsx
with open("frontend/src/context/AppContext.jsx", "w", encoding="utf-8") as f:
    f.write('''import React, { createContext, useContext, useState, useEffect } from 'react';
import placesData from '../../../backend/src/data/places.json';
import categoriesData from '../../../backend/src/data/categories.json';
import routesData from '../../../backend/src/data/routes.json';
import { calculateDistanceKm } from '../utils/distance';

const AppContext = createContext();

const DEFAULT_GUEST = {
  name: 'Yohana',
  email: 'yohana.tulcan@gmail.com',
  phone: '+593 99 876 5432',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  isAuthenticated: false,
  memberSince: 'Septiembre 2026'
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
  // Screen State: 'onboarding' | 'auth' | 'home' | 'explore' | 'place-detail' | 'route-map' | 'favorites' | 'bookings' | 'profile'
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [previousScreen, setPreviousScreen] = useState('onboarding');

  // Modals & Drawers
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // App View Frame Toggle (Mobile phone mockup vs Full screen)
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // User State - Start not logged in so Login Screen is shown
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('turismo_conecta_user');
      return saved ? JSON.parse(saved) : DEFAULT_GUEST;
    } catch {
      return DEFAULT_GUEST;
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
  const [filterChip, setFilterChip] = useState('todos');

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

  // User Geolocation
  const [userLocation, setUserLocation] = useState({ lat: 0.8115, lng: -77.7185 });

  // Notifications
  const [notifications] = useState([
    { id: 1, title: "¡Bienvenida Yohana!", desc: "Disfruta de Tulcán y sus atractivos turísticos.", time: "Hace 5 min", read: false },
    { id: 2, title: "Clima en Carchi", desc: "Temperatura andina agradable (14°C) para recorrer el centro.", time: "Hace 1 hora", read: false },
    { id: 3, title: "Reserva confirmada", desc: "Tu tour al Cementerio de Tulcán está agendado para el 15 de mayo.", time: "Ayer", read: true },
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
    if (payload?.place) setSelectedPlace(payload.place);
    if (payload?.destination) setRouteDestination(payload.destination);
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

# 2. Update OnboardingScreen.jsx (Screen 1)
with open("frontend/src/components/screens/OnboardingScreen.jsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState } from 'react';
import { Menu, Bell, MapPin, Compass, ArrowRight, Sparkles, Mountain, LogIn } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function OnboardingScreen() {
  const { navigateTo, setAuthMode, setIsSideDrawerOpen, setIsNotificationModalOpen } = useApp();
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

  const handleStartLogin = (mode = 'login') => {
    setAuthMode(mode);
    navigateTo('auth');
  };

  return (
    <div className="relative min-h-[820px] h-full flex flex-col justify-between p-6 overflow-hidden bg-slate-950 text-slate-100 animate-fade-in">
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
      <div className="relative z-10 max-w-sm mx-auto my-auto text-center flex flex-col items-center gap-5">
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
        <div className="px-4 min-h-[60px]">
          <p className="text-sm font-medium text-slate-200 leading-relaxed drop-shadow">
            {slides[activeSlide].title}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {slides[activeSlide].subtitle}
          </p>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-2 mt-1">
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

      {/* Bottom Actions (Screen 1 Buttons from wireframe) */}
      <div className="relative z-10 max-w-sm mx-auto w-full flex flex-col gap-3 pb-4">
        <button
          onClick={() => handleStartLogin('login')}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Explorar</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleStartLogin('login')}
          className="w-full py-2.5 text-center text-xs font-semibold text-slate-300 hover:text-emerald-400 transition"
        >
          ¿Ya tienes cuenta? <span className="underline font-bold text-emerald-400">Iniciar sesión</span>
        </button>
      </div>
    </div>
  );
}
''')

# 3. Create full dedicated AuthScreen.jsx (Screen 2 from wireframe)
with open("frontend/src/components/screens/AuthScreen.jsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Check, Sparkles, LogIn, KeyRound } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function AuthScreen() {
  const { authMode, setAuthMode, setUser, navigateTo, goBack } = useApp();
  const [email, setEmail] = useState('yohana.tulcan@gmail.com');
  const [password, setPassword] = useState('yohana2026');
  const [name, setName] = useState('Yohana');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    setTimeout(() => {
      setUser({
        name: name || 'Yohana',
        email: email || 'yohana.tulcan@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        phone: '+593 99 876 5432',
        isAuthenticated: true,
        memberSince: 'Septiembre 2026'
      });
      setIsLoading(false);
      setMessage(`¡Bienvenida, ${name || 'Yohana'}! Iniciando sesión...`);
      setTimeout(() => {
        navigateTo('home');
      }, 700);
    }, 500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        name: 'Yohana (Google)',
        email: 'yohana.tulcan@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        isAuthenticated: true,
        memberSince: 'Septiembre 2026'
      });
      setIsLoading(false);
      setMessage('¡Autenticado con Google con éxito!');
      setTimeout(() => {
        navigateTo('home');
      }, 700);
    }, 400);
  };

  return (
    <div className="relative min-h-[820px] h-full flex flex-col justify-between p-6 overflow-y-auto bg-slate-950 text-slate-100 animate-fade-in">
      {/* Top Header: Back Arrow (Screen 2 from wireframe) */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => navigateTo('onboarding')}
          className="p-3 rounded-2xl glass-panel-subtle border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 transition shadow-lg"
          title="Regresar a inicio"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Turismo Conecta Tulcán
        </span>
      </div>

      {/* Profile Avatar Icon & Title (Screen 2 Header) */}
      <div className="max-w-sm mx-auto w-full my-auto flex flex-col items-center text-center">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-emerald-500/40 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
            <User className="w-12 h-12 text-emerald-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-slate-950 shadow-md">
            <KeyRound className="w-4 h-4" />
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {authMode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          Ingresa tus credenciales para acceder a todos los atractivos y rutas de Tulcán.
        </p>

        {/* Tabs: Iniciar sesión | Registrarse (Screen 2 Tabs) */}
        <div className="w-full grid grid-cols-2 p-1.5 rounded-2xl bg-slate-900 border border-white/10 my-6 shadow-inner">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2.5 text-xs font-extrabold rounded-xl transition ${
              authMode === 'login'
                ? 'bg-emerald-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`py-2.5 text-xs font-extrabold rounded-xl transition ${
              authMode === 'register'
                ? 'bg-emerald-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Form Inputs (Screen 2 Inputs from wireframe) */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5 text-left">
          {authMode === 'register' && (
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Nombre</label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  required
                  className="w-full py-3.5 pl-10 pr-4 rounded-2xl glass-input text-xs sm:text-sm font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Correo electrónico</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yohana.tulcan@gmail.com"
                required
                className="w-full py-3.5 pl-10 pr-4 rounded-2xl glass-input text-xs sm:text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Contraseña</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="yohana2026"
                required
                className="w-full py-3.5 pl-10 pr-4 rounded-2xl glass-input text-xs sm:text-sm font-medium"
              />
            </div>
          </div>

          {authMode === 'login' && (
            <div className="text-right">
              <button 
                type="button" 
                onClick={() => alert("Usa la contraseña: yohana2026")}
                className="text-[11px] text-emerald-400 hover:underline font-semibold"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {message && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-1.5 animate-fade-in">
              <Check className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}

          {/* Action Button: Iniciar sesión (Screen 2 Button) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
          >
            {isLoading ? 'Verificando...' : (authMode === 'login' ? 'Iniciar sesión' : 'Crear cuenta')}
          </button>
        </form>

        {/* Separator "o" (Screen 2 Separator) */}
        <div className="w-full relative flex items-center justify-center my-4">
          <div className="w-full border-t border-white/10"></div>
          <span className="absolute px-3 bg-slate-950 text-slate-400 text-xs font-bold">o</span>
        </div>

        {/* Continuar con Google (Screen 2 Social Button) */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3.5 rounded-2xl glass-panel-subtle border border-white/10 hover:border-white/25 text-xs font-bold text-slate-200 hover:text-white transition flex items-center justify-center gap-2.5 shadow-lg"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continuar con Google</span>
        </button>
      </div>

      {/* Bottom hint */}
      <div className="text-center text-[11px] text-slate-500 pb-2">
        Credenciales demo: <span className="text-emerald-400 font-bold">yohana.tulcan@gmail.com</span> / <span className="text-emerald-400 font-bold">yohana2026</span>
      </div>
    </div>
  );
}
''')

# 4. Update App.jsx to route 'auth' screen
with open("frontend/src/App.jsx", "w", encoding="utf-8") as f:
    f.write('''import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BottomNavBar } from './components/navigation/BottomNavBar';
import { SideDrawer } from './components/navigation/SideDrawer';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { PlaceDetailScreen } from './components/screens/PlaceDetailScreen';
import { RouteNavigationScreen } from './components/screens/RouteNavigationScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { BookingsScreen } from './components/screens/BookingsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { NewBookingModal } from './components/modals/NewBookingModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { NotificationModal } from './components/modals/NotificationModal';
import { FilterModal } from './components/modals/FilterModal';
import { QuickEmergencyModal } from './components/common/QuickEmergencyModal';
import { Smartphone, Monitor } from 'lucide-react';

function AppContent() {
  const { 
    currentScreen, 
    isMobileFrame, 
    setIsMobileFrame, 
    isEmergencyModalOpen, 
    setIsEmergencyModalOpen 
  } = useApp();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'home':
        return <HomeScreen />;
      case 'explore':
        return <ExploreScreen />;
      case 'place-detail':
        return <PlaceDetailScreen />;
      case 'route-map':
        return <RouteNavigationScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'bookings':
        return <BookingsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <OnboardingScreen />;
    }
  };

  const showBottomNav = currentScreen !== 'onboarding' && currentScreen !== 'auth';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative">
      {/* Top Device View Toggle Bar */}
      <div className="fixed top-2 right-2 z-40 flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs shadow-xl hidden sm:flex">
        <button
          onClick={() => setIsMobileFrame(true)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition ${
            isMobileFrame ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
          title="Vista Prototipo Móvil"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Móvil</span>
        </button>
        <button
          onClick={() => setIsMobileFrame(false)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition ${
            !isMobileFrame ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
          title="Vista Pantalla Completa"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Expandida</span>
        </button>
      </div>

      {/* Main Container Wrapper */}
      <div className={`w-full transition-all duration-300 ${
        isMobileFrame 
          ? 'max-w-md my-4 sm:my-6 rounded-[36px] border-4 border-slate-800 shadow-[0_0_60px_rgba(16,185,129,0.15)] overflow-hidden bg-slate-950 relative min-h-[840px] flex flex-col justify-between'
          : 'max-w-3xl min-h-screen flex flex-col justify-between'
      }`}>
        {/* Dynamic Screen Content */}
        <div className="flex-grow flex flex-col">
          {renderActiveScreen()}
        </div>

        {/* Bottom Navigation Bar (Hidden on Onboarding & Auth) */}
        {showBottomNav && <BottomNavBar />}
      </div>

      {/* Side Drawer & Global Modals */}
      <SideDrawer />
      <NewBookingModal />
      <EditProfileModal />
      <NotificationModal />
      <FilterModal />
      <QuickEmergencyModal 
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
''')

print("Login flow updated with dedicated AuthScreen successfully.")
