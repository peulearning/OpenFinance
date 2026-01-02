'use client';

// CORREÇÃO 1: Importar de next/navigation no App Router
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import api from '../../services/api';

export default function LoginPage(){

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setError(''); // Limpa erro anterior ao tentar de novo

    try {
      // CORREÇÃO 3: Usar api.post em vez de fetch
      // Isso garante que bata em localhost:8080/api/auth/login
      const response = await api.post('/auth/login', { email, password });

      // Axios retorna os dados em .data
      const data = response.data;

      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', email);

      // CORREÇÃO 4: Redirecionar para a raiz (/) onde está o dashboard
      router.push('/');
    } catch(err) {
      setError('Falha no login. Verifique suas credenciais.');
      console.error(err);
    }
  }

  return (
   <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-emerald-400">FinStack Login</h1>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:border-emerald-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:border-emerald-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 p-2 rounded font-bold transition">
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-400">
          Ainda não tem conta? <Link href="/register" className="text-emerald-400 hover:underline">Registre-se</Link>
        </p>
      </div>
    </div>
  );
}