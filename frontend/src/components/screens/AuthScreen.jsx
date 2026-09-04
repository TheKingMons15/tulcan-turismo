import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Check, Sparkles, LogIn, KeyRound } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function AuthScreen() {
  const { authMode, setAuthMode, setUser, navigateTo, goBack } = useApp();
  const [email, setEmail] = useState('yohana.tulcan@gmail.com');
  const [password, setPassword] = useState('yohana2026');
  const [name, setName] = useState('Yohana');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    setTimeout(() => {
      setUser({
        name: name || 'Yohana',
        email: email || 'yohana.tulcan@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        phone: '+593 99 876 5432',
        isAuthenticated: true,
        memberSince: 'Septiembre 2026'
      });
      setIsLoading(false);
      setMessage(`¡Bienvenida, ${name || 'Yohana'}! Iniciando sesión...`);
      setTimeout(() => {
        navigateTo('home');
      }, 700);
    }, 500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        name: 'Yohana (Google)',
        email: 'yohana.tulcan@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        isAuthenticated: true,
        memberSince: 'Septiembre 2026'
      });
      setIsLoading(false);
      setMessage('¡Autenticado con Google con éxito!');
      setTimeout(() => {
        navigateTo('home');
      }, 700);
    }, 400);
  };

  return (
    <div className="relative min-h-[820px] h-full flex flex-col justify-between p-6 overflow-y-auto bg-slate-950 text-slate-100 animate-fade-in">
      {/* Top Header: Back Arrow (Screen 2 from wireframe) */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => navigateTo('onboarding')}
          className="p-3 rounded-2xl glass-panel-subtle border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 transition shadow-lg"
          title="Regresar a inicio"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Turismo Conecta Tulcán
        </span>
      </div>

      {/* Profile Avatar Icon & Title (Screen 2 Header) */}
      <div className="max-w-sm mx-auto w-full my-auto flex flex-col items-center text-center">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-emerald-500/40 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
            <User className="w-12 h-12 text-emerald-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-slate-950 shadow-md">
            <KeyRound className="w-4 h-4" />
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {authMode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          Ingresa tus credenciales para acceder a todos los atractivos y rutas de Tulcán.
        </p>

        {/* Tabs: Iniciar sesión | Registrarse (Screen 2 Tabs) */}
        <div className="w-full grid grid-cols-2 p-1.5 rounded-2xl bg-slate-900 border border-white/10 my-6 shadow-inner">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`py-2.5 text-xs font-extrabold rounded-xl transition ${
              authMode === 'login'
                ? 'bg-emerald-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`py-2.5 text-xs font-extrabold rounded-xl transition ${
              authMode === 'register'
                ? 'bg-emerald-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Form Inputs (Screen 2 Inputs from wireframe) */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5 text-left">
          {authMode === 'register' && (
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Nombre</label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  required
                  className="w-full py-3.5 pl-10 pr-4 rounded-2xl glass-input text-xs sm:text-sm font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Correo electrónico</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yohana.tulcan@gmail.com"
                required
                className="w-full py-3.5 pl-10 pr-4 rounded-2xl glass-input text-xs sm:text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Contraseña</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="yohana2026"
                required
                className="w-full py-3.5 pl-10 pr-4 rounded-2xl glass-input text-xs sm:text-sm font-medium"
              />
            </div>
          </div>

          {authMode === 'login' && (
            <div className="text-right">
              <button 
                type="button" 
                onClick={() => alert("Usa la contraseña: yohana2026")}
                className="text-[11px] text-emerald-400 hover:underline font-semibold"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {message && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-1.5 animate-fade-in">
              <Check className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}

          {/* Action Button: Iniciar sesión (Screen 2 Button) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
          >
            {isLoading ? 'Verificando...' : (authMode === 'login' ? 'Iniciar sesión' : 'Crear cuenta')}
          </button>
        </form>

        {/* Separator "o" (Screen 2 Separator) */}
        <div className="w-full relative flex items-center justify-center my-4">
          <div className="w-full border-t border-white/10"></div>
          <span className="absolute px-3 bg-slate-950 text-slate-400 text-xs font-bold">o</span>
        </div>

        {/* Continuar con Google (Screen 2 Social Button) */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3.5 rounded-2xl glass-panel-subtle border border-white/10 hover:border-white/25 text-xs font-bold text-slate-200 hover:text-white transition flex items-center justify-center gap-2.5 shadow-lg"
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

      {/* Bottom hint */}
      <div className="text-center text-[11px] text-slate-500 pb-2">
        Credenciales demo: <span className="text-emerald-400 font-bold">yohana.tulcan@gmail.com</span> / <span className="text-emerald-400 font-bold">yohana2026</span>
      </div>
    </div>
  );
}
