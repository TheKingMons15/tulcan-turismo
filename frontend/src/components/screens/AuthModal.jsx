import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Check, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, setUser, navigateTo } = useApp();
  const [email, setEmail] = useState('maria.lopez@gmail.com');
  const [password, setPassword] = useState('tulcan2026');
  const [name, setName] = useState('María López');
  const [message, setMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      name: name || 'Viajero',
      email: email || 'usuario@turismo.ec',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      phone: '+593 99 876 5432',
      isAuthenticated: true,
      memberSince: 'Septiembre 2026'
    });
    setMessage(`¡Bienvenido de vuelta, ${name || 'Viajero'}!`);
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setMessage('');
      navigateTo('home');
    }, 600);
  };

  const handleGoogleLogin = () => {
    setUser({
      name: 'María López (Google)',
      email: 'maria.lopez@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isAuthenticated: true,
      memberSince: 'Septiembre 2026'
    });
    setMessage('Autenticado con Google con éxito');
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setMessage('');
      navigateTo('home');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-sm rounded-3xl glass-panel border border-white/15 bg-slate-950/95 text-slate-100 p-6 sm:p-8 shadow-2xl my-auto">
        {/* Back Arrow */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-6 left-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Profile Avatar Icon (Wireframe element) */}
        <div className="flex flex-col items-center text-center mt-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-emerald-500/40 flex items-center justify-center shadow-xl shadow-emerald-500/10 mb-3">
            <User className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {authMode === 'login' ? 'Iniciar sesión' : 'Crear tu cuenta'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Accede a tus reservas y favoritos en Tulcán</p>
        </div>

        {/* Tabs: Iniciar sesión | Registrarse */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2 text-xs font-bold rounded-xl transition ${
              authMode === 'login'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`py-2 text-xs font-bold rounded-xl transition ${
              authMode === 'register'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {authMode === 'register' && (
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre completo"
                required
                className="w-full py-3.5 pl-10 pr-4 rounded-2xl glass-input text-xs sm:text-sm"
              />
            </div>
          )}

          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
              className="w-full py-3.5 pl-10 pr-4 rounded-2xl glass-input text-xs sm:text-sm"
            />
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="w-full py-3.5 pl-10 pr-4 rounded-2xl glass-input text-xs sm:text-sm"
            />
          </div>

          {authMode === 'login' && (
            <div className="text-right">
              <button type="button" className="text-[11px] text-emerald-400 hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {message && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-1.5 animate-fade-in">
              <Check className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-xl hover:scale-[1.02] transition"
          >
            {authMode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>

        {/* Separator "o" */}
        <div className="relative flex items-center justify-center my-4">
          <div className="w-full border-t border-white/10"></div>
          <span className="absolute px-3 bg-slate-950 text-slate-400 text-xs">o</span>
        </div>

        {/* Continuar con Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-2xl glass-panel-subtle border border-white/10 hover:border-white/25 text-xs font-semibold text-slate-200 hover:text-white transition flex items-center justify-center gap-2"
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
    </div>
  );
}
