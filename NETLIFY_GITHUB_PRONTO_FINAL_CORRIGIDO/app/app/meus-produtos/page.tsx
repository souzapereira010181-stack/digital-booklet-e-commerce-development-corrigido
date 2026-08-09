"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import ProductCover from "@/components/ProductCover";
import Link from "next/link";

export default function MeusProdutosPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  // Demo: show first 3 products as "purchased"
  const myProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">📚 Meus Produtos</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{myProducts.length} apostilas compradas</p>

      {myProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nenhum produto ainda</h2>
          <p className="text-gray-500 mb-6">Compre suas primeiras apostilas</p>
          <Link href="/apostilas" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors">
            Ver Apostilas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myProducts.map((p) => (
            <div key={p.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-100 dark:border-gray-800 p-5 flex gap-4 items-start">
              <ProductCover coverImage={p.coverImage} title={p.title} size="small" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 line-clamp-2">{p.title}</h3>
                <p className="text-xs text-gray-400 mb-2">{p.pages} páginas • PDF</p>
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold mb-3">✅ Comprado – {formatPrice(p.price)}</p>
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2.5 rounded-xl transition-colors font-semibold">
                  📥 Baixar PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
