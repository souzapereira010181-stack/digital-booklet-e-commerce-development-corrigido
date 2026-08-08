"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAuthStore, useCartStore, useFavoritesStore } from "@/lib/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);

    // Zustand persistence is deliberately rehydrated only after the first
    // client render. This makes the SSR HTML and the first client HTML equal
    // and prevents the cart/favorites/auth state from causing hydration errors.
    Promise.all([
      useCartStore.persist.rehydrate(),
      useFavoritesStore.persist.rehydrate(),
      useAuthStore.persist.rehydrate(),
    ]).finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header dark={dark} setDark={setDark} hydrated={hydrated} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
