import React from 'react';
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
