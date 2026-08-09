"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, X, User, Moon, Sun, BookOpen, LogOut } from "lucide-react";
import { useCartStore, useFavoritesStore, useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function Header({ dark, setDark, hydrated = false }: { dark: boolean; setDark: (v: boolean) => void; hydrated?: boolean }) {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const count = cartItems.reduce((sum, item) => sum + (Number.isFinite(item?.quantity) ? item.quantity : 0), 0);
  const favCount = useFavoritesStore((s) => s.ids.length);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/busca?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setMenu(false);
    }
  };

  const NAV = [
    { href: "/", label: "🏠 Início" },
    { href: "/apostilas", label: "📚 Apostilas" },
    { href: "/categorias", label: "🗂️ Categorias" },
    { href: "/promocoes", label: "🔥 Promoções" },
    { href: "/contato", label: "📞 Contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      {/* Top bar */}
      <div className="bg-blue-900 dark:bg-gray-950 text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <span className="hidden sm:block">📚 Apostilas em PDF • Download Imediato • PIX, Cartão e Boleto</span>
        <span className="sm:hidden">📚 KLEBER STORE</span>
        <div className="flex items-center gap-3">
          <span>📞 (11) 98852-0458</span>
          <span className="hidden sm:block">✉️ contato@kleberstore.com.br</span>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow">
              <BookOpen size={22} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-black text-lg text-blue-900 dark:text-white leading-tight">KLEBER STORE</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Segurança • APH • Resgate</div>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 flex max-w-2xl mx-auto">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar apostilas..."
              className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-l-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-r-xl flex items-center gap-2 transition-colors"
            >
              <Search size={18} />
              <span className="hidden sm:block text-sm font-medium">Buscar</span>
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
              title="Alternar tema"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link href="/favoritos" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
              <Heart size={20} />
              {hydrated && favCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {favCount}
                </span>
              )}
            </Link>

            <Link href="/carrinho" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
              <ShoppingCart size={20} />
              {hydrated && count > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
              >
                <User size={20} />
                {user && <span className="hidden md:block text-sm font-medium text-gray-900 dark:text-white max-w-24 truncate">{user.name.split(" ")[0]}</span>}
              </button>
              {userMenu && (
                <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">{user.name}</div>
                        <div className="text-xs text-gray-500 truncate">{user.email}</div>
                      </div>
                      <Link href="/minha-conta" onClick={() => setUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                        <User size={16} /> Minha Conta
                      </Link>
                      <Link href="/meus-produtos" onClick={() => setUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                        <BookOpen size={16} /> Meus Produtos
                      </Link>
                      {user.role === "admin" && (
                        <Link href="/admin" onClick={() => setUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                          📊 Painel Admin
                        </Link>
                      )}
                      <button
                        onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); logout(); setUserMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-red-500"
                      >
                        <LogOut size={16} /> Sair
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                        <User size={16} /> Entrar
                      </Link>
                      <Link href="/cadastro" onClick={() => setUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                        ✨ Cadastrar
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu btn */}
            <button
              onClick={() => setMenu(!menu)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            >
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden lg:flex max-w-7xl mx-auto px-4 gap-1 pb-2">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Mobile nav */}
        {menu && (
          <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenu(false)}
                className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-b border-gray-50 dark:border-gray-800"
              >
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
