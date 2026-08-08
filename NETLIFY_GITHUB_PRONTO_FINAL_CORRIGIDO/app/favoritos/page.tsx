"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/lib/store";
import type { Product } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function FavoritosPage() {
  const { ids } = useFavoritesStore();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { fetch("/api/products", { cache: "no-store" }).then(r => r.ok ? r.json() : null).then(data => setProducts(data?.products ?? [])).catch(() => {}); }, []);
  const favorites = products.filter((p) => ids.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
        <Heart className="fill-red-500 text-red-500" size={32} /> Favoritos
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{favorites.length} apostila{favorites.length !== 1 ? "s" : ""} salva{favorites.length !== 1 ? "s" : ""}</p>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-7xl mb-4">❤️</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nenhum favorito ainda</h2>
          <p className="text-gray-500 mb-6">Clique no ❤️ em qualquer apostila para salvar</p>
          <Link href="/apostilas" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors">
            Explorar Apostilas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {favorites.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
