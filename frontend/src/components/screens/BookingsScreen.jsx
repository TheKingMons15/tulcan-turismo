import React, { useState } from 'react';
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
