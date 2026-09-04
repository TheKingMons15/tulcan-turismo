import React, { useState } from 'react';
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
