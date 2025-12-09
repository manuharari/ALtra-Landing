import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      onLoginSuccess();
      setError('');
      setUsername('');
      setPassword('');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative animate-fade-in-up border border-stone-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-900 mb-4">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-brand-900">Acceso Administrativo</h2>
          <p className="text-sm text-stone-500 mt-1">Ingrese sus credenciales para editar el sitio.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-stone-900 text-white border border-stone-700 rounded px-4 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 placeholder-stone-600 transition-colors"
              placeholder="Usuario"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-900 text-white border border-stone-700 rounded px-4 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 placeholder-stone-600 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-300 text-xs font-bold text-center bg-red-900/10 border border-red-200 py-2 rounded">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-brand-900 text-white font-bold py-3 rounded hover:bg-brand-800 transition-colors shadow-lg mt-2"
          >
            Entrar al Panel
          </button>
        </form>
      </div>
    </div>
  );
};