"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from './src/services/api';
import { LogOut, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface DashboardData {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.clear();
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    if (!token || !email) {
      router.push("/login");
      return;
    }

    async function fetchData() {
      try {
        const dashRes = await api.get(`/transactions/dashboard?email=${email}`);
        setDashboard(dashRes.data);

        const listRes = await api.get(`/transactions?email=${email}`);
        setTransactions(listRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
        logout();
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router, logout]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
        Carregando...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <header className="flex justify-between items-center mb-10 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-emerald-400">FinStack</h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <LogOut size={20} /> Sair
        </button>
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="Saldo Total"
            value={dashboard?.totalBalance || 0}
            icon={<DollarSign />}
            color="text-white"
            bg="bg-emerald-600"
          />
          <Card
            title="Entradas"
            value={dashboard?.totalIncome || 0}
            icon={<TrendingUp />}
            color="text-emerald-400"
            bg="bg-slate-800"
          />
          <Card
            title="Saídas"
            value={dashboard?.totalExpense || 0}
            icon={<TrendingDown />}
            color="text-red-400"
            bg="bg-slate-800"
          />
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-700 pb-2">
            Últimas Transações
          </h2>
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <p className="text-slate-500">Nenhuma transação encontrada.</p>
            ) : (
              transactions.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center p-3 hover:bg-slate-700 rounded transition"
                >
                  <div>
                    <p className="font-medium">{t.description}</p>
                    <p className="text-sm text-slate-400">{t.date}</p>
                  </div>
                  <span
                    className={`font-bold ${
                      t.type === "INCOME" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {t.type === "EXPENSE" ? "- " : "+ "}
                    {formatMoney(t.amount)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

function Card({ title, value, icon, color, bg }: CardProps) {
  const formatMoney = (val: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  return (
    <div
      className={`${bg} p-6 rounded-lg shadow-lg flex items-center justify-between`}
    >
      <div>
        <p className="text-slate-300 text-sm mb-1">{title}</p>
        <h3 className={`text-2xl font-bold ${color}`}>{formatMoney(value)}</h3>
      </div>
      <div className={`p-3 rounded-full bg-black/20 ${color}`}>{icon}</div>
    </div>
  );
}