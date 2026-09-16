'use client';

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Contraseña incorrecta");
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <Image
            src="/logo.jpg"
            alt="Alina Shop"
            width={120}
            height={50}
            className="h-12 w-auto object-contain mx-auto mb-3"
          />
          <h1 className="font-display font-bold text-lg text-slate-900">
            Administración Alina Shop
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Ingresa tu clave de acceso</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Contraseña de Administrador
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-alina-600 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-display font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
          >
            <span>{loading ? "Accediendo..." : "Ingresar al Panel"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Clave de acceso protegida · Alina Shop 2026
        </div>
      </div>
    </div>
  );
}
