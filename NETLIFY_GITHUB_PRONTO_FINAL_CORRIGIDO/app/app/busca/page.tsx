"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import type { Product } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

function SearchResults() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [results, setResults] = useState<Product[]>([]);
  useEffect(() => {
    let alive = true;
    fetch("/api/products", { cache: "no-store" }).then(r => r.ok ? r.json() : null).then(data => {
      if (!alive) return;
      const all: Product[] = data?.products ?? [];
      const query = q.toLowerCase().trim();
      setResults(query ? all.filter(p => p.title.toLowerCase().includes(query) || p.shortDescription.toLowerCase().includes(query) || p.tags.some(t => t.toLowerCase().includes(query))) : []);
    }).catch(() => { if (alive) setResults([]); });
    return () => { alive = false; };
  }, [q]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
          🔍 Resultados para: &ldquo;{q}&rdquo;
        </h1>
        <p className="text-gray-500 dark:text-gray-400">{results.length} apostilas encontradas</p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nenhum resultado encontrado</h2>
          <p className="text-gray-500 mb-6">Tente buscar com termos diferentes</p>
          <a href="/apostilas" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Ver todas as apostilas
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-96"><div className="text-gray-500">Buscando...</div></div>}>
      <SearchResults />
    </Suspense>
  );
}
