import React, { useState } from 'react';
import { usePlaces } from './hooks/usePlaces';
import { useGeolocation } from './hooks/useGeolocation';
import { useFavorites } from './hooks/useFavorites';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { CategoryFilter } from './components/places/CategoryFilter';
import { PlaceGrid } from './components/places/PlaceGrid';
import { PlaceDetailModal } from './components/places/PlaceDetailModal';
import { InteractiveMap } from './components/map/InteractiveMap';
import { RouteExplorer } from './components/routes/RouteExplorer';
import { RouteBuilder } from './components/routes/RouteBuilder';
import { FavoritesDrawer } from './components/favorites/FavoritesDrawer';
import { QuickEmergencyModal } from './components/common/QuickEmergencyModal';
import { HeartPulse, Hospital, ShieldAlert, Bus, Sparkles, MapPin, Compass } from 'lucide-react';

export function App() {
  const {
    places,
    filteredPlaces,
    categories,
    routes,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    photoOnly,
    setPhotoOnly,
    featuredOnly,
    setFeaturedOnly,
    activePlace,
    setActivePlace,
    modalPlace,
    setModalPlace,
    activeRoute,
    setActiveRoute
  } = usePlaces();

  const {
    userLocation,
    isLocating,
    locationError,
    requestLocation
  } = useGeolocation();

  const {
    favoriteIds,
    toggleFavorite,
    isFavorite,
    favoritesCount
  } = useFavorites();

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isRouteBuilderOpen, setIsRouteBuilderOpen] = useState(false);
  const [customRoutePlaces, setCustomRoutePlaces] = useState([]);
  const [activeSection, setActiveSection] = useState('inicio');

  // Favorites as place objects
  const favoritePlaces = places.filter(p => favoriteIds.includes(p.id));

  // Custom route helpers
  const handleAddPlaceToCustomRoute = (place) => {
    if (!customRoutePlaces.some(p => p.id === place.id)) {
      setCustomRoutePlaces(prev => [...prev, place]);
    }
  };

  const handleRemovePlaceFromCustomRoute = (placeId) => {
    setCustomRoutePlaces(prev => prev.filter(p => p.id !== placeId));
  };

  const handleClearCustomRoute = () => {
    setCustomRoutePlaces([]);
  };

  const handleApplyCustomRouteToMap = (route) => {
    setActiveRoute(route);
    scrollToSection('mapa');
  };

  const handleBuildRouteFromFavorites = () => {
    setCustomRoutePlaces(favoritePlaces);
    setIsRouteBuilderOpen(true);
  };

  // Scroll navigation helper
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPlaceOnMap = (place) => {
    setActivePlace(place);
    scrollToSection('mapa');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => {
          scrollToSection('inicio');
          const input = document.querySelector('input[type="text"]');
          if (input) input.focus();
        }}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        favoritesCount={favoritesCount}
        onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        onNavigateToSection={scrollToSection}
        activeSection={activeSection}
        onOpenRouteBuilder={() => setIsRouteBuilderOpen(true)}
        userLocation={userLocation}
        onRequestLocation={requestLocation}
        isLocating={isLocating}
      />

      {/* Main Container */}
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section id="inicio">
          <Hero
            onSearch={setSearchQuery}
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              scrollToSection('lugares');
            }}
            onExploreMap={() => scrollToSection('mapa')}
            onOpenRouteBuilder={() => setIsRouteBuilderOpen(true)}
            placesCount={places.length}
          />
        </section>

        {/* PROTAGONIST INTERACTIVE MAP SECTION */}
        <section id="mapa" className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>CENTRO GEOGRÁFICO DE TULCÁN</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Mapa Turístico Interactivo
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Explora atractivos clasificados con marcadores interactivos, cálculo de distancia y capas abiertas 100% libres de APIs de pago.
                </p>
              </div>

              {activeRoute && (
                <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 px-4 py-2 rounded-2xl text-xs text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Ruta activa: <strong>{activeRoute.name}</strong></span>
                  <button 
                    onClick={() => setActiveRoute(null)}
                    className="ml-2 underline text-slate-400 hover:text-white"
                  >
                    Quitar
                  </button>
                </div>
              )}
            </div>

            {/* Interactive Leaflet Component */}
            <InteractiveMap
              places={filteredPlaces}
              activePlace={activePlace}
              onSelectPlace={setActivePlace}
              onShowDetails={setModalPlace}
              userLocation={userLocation}
              activeRoute={activeRoute}
              onRequestLocation={requestLocation}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </section>

        {/* EXPLORE PLACES & CATEGORIES SECTION */}
        <section id="lugares" className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-white/10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>GUÍA DIGITAL COMPLETA</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Explorar Tulcán por Categoría
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Patrimonio religioso, parques, gastronomía típica, hoteles y naturaleza andina.
                </p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              photoOnly={photoOnly}
              onTogglePhotoOnly={() => setPhotoOnly(!photoOnly)}
              featuredOnly={featuredOnly}
              onToggleFeaturedOnly={() => setFeaturedOnly(!featuredOnly)}
            />

            {/* Places Grid with Cards */}
            <PlaceGrid
              places={filteredPlaces}
              loading={loading}
              onSelectPlace={handleSelectPlaceOnMap}
              onShowDetails={setModalPlace}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              userLocation={userLocation}
              onAddToRoute={handleAddPlaceToCustomRoute}
            />
          </div>
        </section>

        {/* CURATED ROUTES SECTION */}
        <section id="rutas" className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-white/10">
          <RouteExplorer
            routes={routes}
            activeRoute={activeRoute}
            onSelectRoute={(r) => {
              setActiveRoute(r);
              scrollToSection('mapa');
            }}
            onShowPlaceDetails={setModalPlace}
            onOpenRouteBuilder={() => setIsRouteBuilderOpen(true)}
          />
        </section>

        {/* SERVICES, HEALTH & MOBILITY SECTION */}
        <section id="servicios" className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-white/10">
          <div className="flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold mb-2">
                <HeartPulse className="w-3.5 h-3.5" />
                <span>INFORMACIÓN DE UTILIDAD</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Salud, Seguridad & Movilidad
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Servicios esenciales para una visita segura y confortable en la frontera norte.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Health Box */}
              <div className="p-6 rounded-3xl glass-panel border border-red-500/30 bg-slate-900/60 flex flex-col justify-between gap-4">
                <div>
                  <div className="p-3 w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mb-4">
                    <Hospital className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Hospital Luis G. Dávila</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Atención de emergencias médicas las 24 horas con ambulancias y quirófano.
                  </p>
                  <p className="text-xs text-emerald-400 mt-2 font-semibold">
                    📞 (06) 299-9400 / Av. San Francisco
                  </p>
                </div>
                <button
                  onClick={() => setIsEmergencyModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold hover:bg-red-500 hover:text-white transition"
                >
                  Ver Números de Emergencia
                </button>
              </div>

              {/* Police & Safety */}
              <div className="p-6 rounded-3xl glass-panel border border-blue-500/30 bg-slate-900/60 flex flex-col justify-between gap-4">
                <div>
                  <div className="p-3 w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Policía Turística & ECU 911</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Resguardo ciudadano, orientación a visitantes extranjeros y auxilio inmediato.
                  </p>
                  <p className="text-xs text-blue-400 mt-2 font-semibold">
                    🚨 Marcación rápida: 911
                  </p>
                </div>
                <a
                  href="tel:911"
                  className="w-full py-2.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold hover:bg-blue-500 hover:text-white transition text-center block"
                >
                  Llamar al ECU 911
                </a>
              </div>

              {/* Terminal & Border Transport */}
              <div className="p-6 rounded-3xl glass-panel border border-slate-500/30 bg-slate-900/60 flex flex-col justify-between gap-4">
                <div>
                  <div className="p-3 w-12 h-12 rounded-2xl bg-slate-500/20 text-slate-300 flex items-center justify-center mb-4">
                    <Bus className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Terminal Terrestre & Rumichaca</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Conexión directa hacia Quito, Ibarra, San Gabriel y transporte binacional a Ipiales.
                  </p>
                  <p className="text-xs text-slate-400 mt-2 font-semibold">
                    📍 Av. Rafael Arellano y Carabobo
                  </p>
                </div>
                <button
                  onClick={() => {
                    const terminal = places.find(p => p.id === 'terminal-terrestre-tulcan');
                    if (terminal) setModalPlace(terminal);
                  }}
                  className="w-full py-2.5 rounded-xl glass-panel-subtle text-slate-200 text-xs font-bold hover:text-white hover:border-white/30 transition"
                >
                  Detalles del Terminal
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer onNavigateToSection={scrollToSection} />

      {/* MODALS AND DRAWERS */}
      {/* 1. Place Detail Modal */}
      <PlaceDetailModal
        place={modalPlace}
        onClose={() => setModalPlace(null)}
        onSelectOnMap={handleSelectPlaceOnMap}
        isFavorite={modalPlace ? isFavorite(modalPlace.id) : false}
        onToggleFavorite={toggleFavorite}
        userLocation={userLocation}
        onAddToRoute={handleAddPlaceToCustomRoute}
        isPlaceInCustomRoute={modalPlace ? customRoutePlaces.some(p => p.id === modalPlace.id) : false}
      />

      {/* 2. Custom Route Builder Modal */}
      <RouteBuilder
        isOpen={isRouteBuilderOpen}
        onClose={() => setIsRouteBuilderOpen(false)}
        allPlaces={places}
        customRoutePlaces={customRoutePlaces}
        onAddPlaceToRoute={handleAddPlaceToCustomRoute}
        onRemovePlaceFromRoute={handleRemovePlaceFromCustomRoute}
        onClearRoute={handleClearCustomRoute}
        onApplyRouteToMap={handleApplyCustomRouteToMap}
        userLocation={userLocation}
      />

      {/* 3. Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favoritePlaces={favoritePlaces}
        onRemoveFavorite={toggleFavorite}
        onShowDetails={setModalPlace}
        onSelectOnMap={handleSelectPlaceOnMap}
        onBuildRouteFromFavorites={handleBuildRouteFromFavorites}
      />

      {/* 4. Quick Emergency Contacts Modal */}
      <QuickEmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
    </div>
  );
}
