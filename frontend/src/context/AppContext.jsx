import React, { createContext, useContext, useState, useEffect } from 'react';
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
