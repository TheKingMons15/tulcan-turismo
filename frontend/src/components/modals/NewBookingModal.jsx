import React, { useState } from 'react';
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
