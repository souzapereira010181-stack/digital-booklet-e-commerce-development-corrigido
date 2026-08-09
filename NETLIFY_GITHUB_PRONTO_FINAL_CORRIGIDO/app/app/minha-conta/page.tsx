"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import ProductCover from "@/components/ProductCover";

export default function MinhaContaPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return <div className="flex items-center justify-center min-h-screen"><div className="text-gray-500">Redirecionando...</div></div>;

  const purchasedProducts = user.purchasedIds?.length
    ? PRODUCTS.filter((p) => user.purchasedIds.includes(p.id))
    : PRODUCTS.slice(0, 3); // Demo: show first 3

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Profile */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-8 text-white mb-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center font-black text-2xl">
            {user.name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-black">Olá, {user.name.split(" ")[0]}! 👋</h1>
            <p className="text-blue-200">{user.email}</p>
            {user.role === "admin" && (
              <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-bold mt-1">
                🔑 Administrador
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-3">
          {[
            { href: "/minha-conta", label: "👤 Meu Perfil", active: true },
            { href: "/meus-produtos", label: "📚 Meus Produtos" },
            { href: "/favoritos", label: "❤️ Favoritos" },
            { href: "/carrinho", label: "🛒 Carrinho" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                l.active
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 shadow border border-gray-100 dark:border-gray-800"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {user.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
            >
              📊 Painel Admin
            </Link>
          )}
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-white dark:bg-gray-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 shadow border border-gray-100 dark:border-gray-800 transition-colors"
          >
            🚪 Sair
          </button>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* My products */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">📚 Meus Produtos</h2>
              <Link href="/meus-produtos" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Ver todos</Link>
            </div>
            <div className="space-y-3">
              {purchasedProducts.map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <ProductCover coverImage={p.coverImage} title={p.title} size="small" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2">{p.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{p.pages} páginas • PDF</div>
                    <div className="text-green-600 dark:text-green-400 text-xs font-semibold mt-1">
                      ✅ Comprado • {formatPrice(p.price)}
                    </div>
                  </div>
                  <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap font-semibold">
                    📥 Baixar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Apostilas", value: purchasedProducts.length, icon: "📚" },
              { label: "Total gasto", value: formatPrice(purchasedProducts.reduce((s, p) => s + p.price, 0)), icon: "💰" },
              { label: "Favoritos", value: "–", icon: "❤️" },
            ].map((s) => (
              <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow border border-gray-100 dark:border-gray-800 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-lg font-black text-gray-900 dark:text-white">{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
