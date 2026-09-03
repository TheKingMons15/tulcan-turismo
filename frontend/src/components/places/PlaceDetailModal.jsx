import React, { useState } from 'react';
import { X, MapPin, Clock, Phone, Globe, Star, Heart, Navigation, Share2, Plus, Check, ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { calculateDistanceKm, formatDistance, estimateTravelTime } from '../../utils/distance';

export function PlaceDetailModal({
  place,
  onClose,
  onSelectOnMap,
  isFavorite,
  onToggleFavorite,
  userLocation,
  onAddToRoute,
  isPlaceInCustomRoute
}) {
  if (!place) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const distanceKm = userLocation
    ? calculateDistanceKm(userLocation.lat, userLocation.lng, place.coordinates.lat, place.coordinates.lng)
    : null;

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `${place.name} - Tulcán Turismo`,
        text: place.description,
        url: url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${place.name} en Tulcán, Ecuador: ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openNavigationUrl = () => {
    const { lat, lng } = place.coordinates;
    window.open(`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${userLocation ? `${userLocation.lat}%2C${userLocation.lng}` : ''}%3B${lat}%2C${lng}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl my-auto rounded-3xl glass-panel border border-white/15 overflow-hidden shadow-2xl bg-slate-950/90 text-slate-100 flex flex-col max-h-[92vh]">
        {/* Header Close & Actions */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-slate-300 hover:text-white hover:scale-110 transition shadow-lg"
            title="Compartir este lugar"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onToggleFavorite(place.id)}
            className="p-2.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-slate-300 hover:text-rose-400 hover:scale-110 transition shadow-lg"
            title={isFavorite ? "Eliminar de favoritos" : "Guardar en favoritos"}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-slate-300 hover:text-white hover:scale-110 transition shadow-lg"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow">
          {/* Photo Gallery Banner */}
          <div className="relative h-64 sm:h-96 w-full bg-slate-900 overflow-hidden">
            <img
              src={place.images && place.images[activeImageIndex]}
              alt={place.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30"></div>

            {/* Gallery Arrows if multiple images */}
            {place.images && place.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : place.images.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 backdrop-blur-md text-white hover:bg-slate-900 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev < place.images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 backdrop-blur-md text-white hover:bg-slate-900 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Category and Rating floating badges */}
            <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-emerald-500/90 backdrop-blur-md text-slate-950 text-xs font-bold shadow-lg">
                {place.categoryLabel}
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{place.rating}</span>
                <span className="text-slate-400 font-normal">({place.reviewsCount} reseñas)</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Datos Verificados</span>
              </div>
            </div>
          </div>

          {/* Modal Main Information */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {place.name}
              </h2>
              <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{place.address}</span>
              </div>
              {distanceKm !== null && (
                <div className="mt-1 flex items-center gap-2 text-xs text-sky-400 font-medium">
                  <Navigation className="w-3.5 h-3.5 shrink-0" />
                  <span>A {formatDistance(distanceKm)} de distancia ({estimateTravelTime(distanceKm, 'driving')})</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="p-5 rounded-2xl glass-panel-subtle border border-white/10 text-sm text-slate-200 leading-relaxed">
              <p>{place.description}</p>
            </div>

            {/* History Section if available */}
            {place.history && (
              <div>
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Historia & Antecedentes</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                  {place.history}
                </p>
              </div>
            )}

            {/* Quick Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Hours */}
              <div className="p-4 rounded-2xl glass-panel-subtle flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase">Horarios de Atención</h5>
                  <p className="text-sm font-semibold text-white mt-0.5">{place.hours || 'Abierto permanentemente'}</p>
                </div>
              </div>

              {/* Price */}
              <div className="p-4 rounded-2xl glass-panel-subtle flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-400 uppercase">Tarifa / Costo</h5>
                  <p className="text-sm font-semibold text-white mt-0.5">{place.price || 'Acceso Libre'}</p>
                </div>
              </div>

              {/* Phone */}
              {place.phone && place.phone !== 'N/A' && (
                <div className="p-4 rounded-2xl glass-panel-subtle flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase">Teléfono / Contacto</h5>
                    <a href={`tel:${place.phone}`} className="text-sm font-semibold text-emerald-400 hover:underline mt-0.5 block">
                      {place.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Website */}
              {place.website && (
                <div className="p-4 rounded-2xl glass-panel-subtle flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase">Sitio Oficial</h5>
                    <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-400 hover:underline mt-0.5 block truncate max-w-[200px]">
                      Visitar Enlace Externo
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Tourist Tips Box */}
            {place.tips && (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200">
                <span className="font-bold">💡 Consejo para visitantes:</span> {place.tips}
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onSelectOnMap(place);
              onClose();
            }}
            className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-xl hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Localizar en Mapa</span>
          </button>

          <button
            onClick={openNavigationUrl}
            className="py-3 px-5 rounded-2xl glass-panel text-slate-200 hover:text-white hover:border-white/30 text-sm font-semibold transition flex items-center gap-2"
          >
            <Navigation className="w-4 h-4 text-sky-400" />
            <span>Cómo Llegar (Ruta Abierta)</span>
          </button>

          {onAddToRoute && (
            <button
              onClick={() => onAddToRoute(place)}
              className={`py-3 px-4 rounded-2xl border text-sm font-semibold transition flex items-center gap-1.5 ${
                isPlaceInCustomRoute
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'glass-panel-subtle text-slate-300 hover:text-white'
              }`}
            >
              {isPlaceInCustomRoute ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
              <span>{isPlaceInCustomRoute ? 'En tu ruta' : 'Agregar a Ruta'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
