import os

# 1. modals/NewBookingModal.jsx
with open("frontend/src/components/modals/NewBookingModal.jsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function NewBookingModal() {
  const { isNewBookingModalOpen, setIsNewBookingModalOpen, places, addBooking, navigateTo } = useApp();
  const [selectedPlaceId, setSelectedPlaceId] = useState(places[0]?.id || '');
  const [date, setDate] = useState('2026-09-10');
  const [time, setTime] = useState('09:30');
  const [people, setPeople] = useState('2');
  const [success, setSuccess] = useState(false);

  if (!isNewBookingModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const place = places.find(p => p.id === selectedPlaceId) || places[0];
    const newBooking = {
      id: `b-${Date.now()}`,
      title: `Tour en ${place.shortName || place.name}`,
      category: place.categoryLabel,
      date: date,
      time: time,
      people: `${people} ${people === '1' ? 'persona' : 'personas'}`,
      status: 'Confirmada',
      price: place.price || '$15.00',
      image: place.images && place.images[0],
      meetingPoint: place.address,
      guide: 'Guía Turístico Municipal de Tulcán'
    };

    addBooking(newBooking);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setIsNewBookingModalOpen(false);
      navigateTo('bookings');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-sm rounded-3xl glass-panel border border-emerald-500/30 bg-slate-950 p-6 text-slate-100 shadow-2xl my-auto">
        <button
          onClick={() => setIsNewBookingModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Reservar Actividad</h3>
            <p className="text-xs text-slate-400">Tours guiados y visitas en Tulcán</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Selecciona el atractivo:</label>
            <select
              value={selectedPlaceId}
              onChange={(e) => setSelectedPlaceId(e.target.value)}
              className="w-full p-3 rounded-2xl glass-input text-xs font-semibold"
            >
              {places.map(p => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Fecha:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full p-2.5 rounded-2xl glass-input text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Hora:</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full p-2.5 rounded-2xl glass-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Número de personas:</label>
            <select
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="w-full p-3 rounded-2xl glass-input text-xs font-semibold"
            >
              <option value="1" className="bg-slate-900 text-white">1 persona</option>
              <option value="2" className="bg-slate-900 text-white">2 personas</option>
              <option value="3" className="bg-slate-900 text-white">3 personas</option>
              <option value="4" className="bg-slate-900 text-white">4 personas</option>
              <option value="5+" className="bg-slate-900 text-white">5+ personas (Grupo)</option>
            </select>
          </div>

          {success && (
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-fade-in">
              <Check className="w-4 h-4" />
              <span>¡Reserva confirmada con éxito!</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-xl hover:scale-[1.02] transition"
          >
            Confirmar Reserva
          </button>
        </form>
      </div>
    </div>
  );
}
''')

# 2. modals/EditProfileModal.jsx
with open("frontend/src/components/modals/EditProfileModal.jsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState } from 'react';
import { X, User, Mail, Phone, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function EditProfileModal() {
  const { isEditProfileModalOpen, setIsEditProfileModalOpen, user, setUser } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '+593 99 876 5432');
  const [saved, setSaved] = useState(false);

  if (!isEditProfileModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      email,
      phone
    }));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setIsEditProfileModalOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl glass-panel border border-white/15 bg-slate-950 p-6 text-slate-100 shadow-2xl">
        <button
          onClick={() => setIsEditProfileModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-white mb-1">Mis Datos de Perfil</h3>
        <p className="text-xs text-slate-400 mb-4">Actualiza tu información de contacto</p>

        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Nombre completo:</label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full py-2.5 pl-10 pr-3 rounded-2xl glass-input text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Correo electrónico:</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-2.5 pl-10 pr-3 rounded-2xl glass-input text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Teléfono:</label>
            <div className="relative flex items-center">
              <Phone className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-2.5 pl-10 pr-3 rounded-2xl glass-input text-xs sm:text-sm"
              />
            </div>
          </div>

          {saved && (
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-1">
              <Check className="w-4 h-4" />
              <span>Datos guardados correctamente</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-emerald-400 transition"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
''')

# 3. modals/NotificationModal.jsx
with open("frontend/src/components/modals/NotificationModal.jsx", "w", encoding="utf-8") as f:
    f.write('''import React from 'react';
import { X, Bell, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function NotificationModal() {
  const { isNotificationModalOpen, setIsNotificationModalOpen, notifications } = useApp();

  if (!isNotificationModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl glass-panel border border-white/15 bg-slate-950 p-6 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Notificaciones</h3>
          </div>
          <button
            onClick={() => setIsNotificationModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-4 flex flex-col gap-2.5 max-h-80 overflow-y-auto">
          {notifications.map((n) => (
            <div key={n.id} className="p-3 rounded-2xl glass-panel-subtle border border-white/10 flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{n.title}</span>
                <span className="text-[10px] text-slate-400">{n.time}</span>
              </div>
              <p className="text-slate-300">{n.desc}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsNotificationModalOpen(false)}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold hover:text-white"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
''')

# 4. modals/FilterModal.jsx
with open("frontend/src/components/modals/FilterModal.jsx", "w", encoding="utf-8") as f:
    f.write('''import React from 'react';
import { X, SlidersHorizontal, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function FilterModal() {
  const { 
    isFilterModalOpen, 
    setIsFilterModalOpen, 
    categories, 
    selectedCategory, 
    setSelectedCategory,
    filterChip,
    setFilterChip
  } = useApp();

  if (!isFilterModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl glass-panel border border-white/15 bg-slate-950 p-6 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Filtros de Búsqueda</h3>
          </div>
          <button
            onClick={() => setIsFilterModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-4 flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase block mb-2">Ordenar por:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'todos', label: 'Sin orden' },
                { id: 'popular', label: '⭐ Más popular' },
                { id: 'distancia', label: '📍 Más cercano' },
                { id: 'precio', label: '🏷️ Por precio' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setFilterChip(item.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition ${
                    filterChip === item.id
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'glass-panel-subtle text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase block mb-2">Categoría:</label>
            <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'glass-panel-subtle text-slate-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsFilterModalOpen(false)}
          className="w-full py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
}
''')

# 5. App.jsx (Main Container & Screen Orchestrator)
with open("frontend/src/App.jsx", "w", encoding="utf-8") as f:
    f.write('''import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BottomNavBar } from './components/navigation/BottomNavBar';
import { SideDrawer } from './components/navigation/SideDrawer';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { PlaceDetailScreen } from './components/screens/PlaceDetailScreen';
import { RouteNavigationScreen } from './components/screens/RouteNavigationScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { BookingsScreen } from './components/screens/BookingsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { AuthModal } from './components/screens/AuthModal';
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
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative">
      {/* Top Device View Toggle Bar (Allows previewing in Mobile Phone Frame or Fullscreen) */}
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
          ? 'max-w-md my-4 sm:my-6 rounded-[36px] border-4 border-slate-800 shadow-[0_0_60px_rgba(16,185,129,0.15)] overflow-hidden bg-slate-950 relative min-h-[850px] flex flex-col justify-between'
          : 'max-w-3xl min-h-screen flex flex-col justify-between'
      }`}>
        {/* Dynamic Screen Content */}
        <div className="flex-grow flex flex-col">
          {renderActiveScreen()}
        </div>

        {/* Bottom Navigation Bar */}
        <BottomNavBar />
      </div>

      {/* Side Drawer & Global Modals */}
      <SideDrawer />
      <AuthModal />
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

print("All prototype screen components and App.jsx generated successfully.")
