import React from 'react';
import { X, Phone, PhoneCall, ShieldAlert, HeartPulse, Hospital, AlertTriangle } from 'lucide-react';

export function QuickEmergencyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const emergencyContacts = [
    {
      name: "ECU 911 Emergencias Nacionales",
      desc: "Ambulancia, Bomberos, Policía y Tránsito en todo Carchi",
      phone: "911",
      icon: ShieldAlert,
      color: "from-red-600 to-rose-700",
      isPrimary: true
    },
    {
      name: "Hospital General Provincial Luis G. Dávila",
      desc: "Emergencias médicas 24 horas y especialidades",
      phone: "062999400",
      displayPhone: "(06) 299-9400",
      icon: Hospital,
      color: "from-emerald-600 to-teal-700"
    },
    {
      name: "Policía Nacional - Subzona Carchi",
      desc: "Seguridad ciudadana y auxilio inmediato",
      phone: "062980101",
      displayPhone: "(06) 298-0101",
      icon: PhoneCall,
      color: "from-blue-600 to-indigo-700"
    },
    {
      name: "Cuerpo de Bomberos de Tulcán",
      desc: "Rescate, incendios y asistencia de siniestros",
      phone: "062980102",
      displayPhone: "(06) 298-0102",
      icon: AlertTriangle,
      color: "from-amber-600 to-orange-700"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-red-500/30 overflow-hidden shadow-2xl p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-2xl">
              <HeartPulse className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Números de Emergencia</h3>
              <p className="text-xs text-slate-400">Atención 24/7 en Tulcán, Carchi</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contacts List */}
        <div className="mt-6 flex flex-col gap-3">
          {emergencyContacts.map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <a
                key={idx}
                href={`tel:${contact.phone}`}
                className="group flex items-center justify-between p-4 rounded-2xl glass-panel-subtle hover:border-red-500/40 hover:bg-slate-800/80 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${contact.color} text-white shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-red-400 transition text-sm md:text-base">
                      {contact.name}
                    </h4>
                    <p className="text-xs text-slate-400">{contact.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl text-xs font-bold text-white group-hover:bg-red-500 group-hover:text-white transition">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{contact.displayPhone || contact.phone}</span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-slate-900/80 border border-white/5 text-xs text-slate-400 text-center">
          💡 <span className="text-slate-200">Recomendación para la altura (2.980 m.s.n.m.):</span> Si experimentas dolor de cabeza o náuseas intensas, mantente hidratado y consulta en farmacias céntricas o en el Hospital Luis G. Dávila.
        </div>
      </div>
    </div>
  );
}
