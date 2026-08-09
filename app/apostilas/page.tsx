"use client";

import { useState, useMemo, useEffect } from "react";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import type { Product, Category } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

export default function ApostilasPage() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" }).then(r => r.ok ? r.json() : null).then(data => {
      if (data?.products?.length) setProducts(data.products);
      if (data?.categories?.length) setCategories(data.categories);
    }).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (categoryId !== null) {
      result = result.filter((p) => p.categoryId === categoryId);
    }
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "sales": result.sort((a, b) => b.salesCount - a.salesCount); break;
      case "featured": result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
      default: break;
    }
    return result;
  }, [search, categoryId, sort, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">📚 Todas as Apostilas</h1>
        <p className="text-gray-500 dark:text-gray-400">{products.length} apostilas disponíveis</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar apostilas..."
          className="flex-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="featured">Destaques primeiro</option>
          <option value="sales">Mais vendidos</option>
          <option value="rating">Melhor avaliados</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
        </select>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        >
          <SlidersHorizontal size={16} /> Filtros
        </button>
      </div>

      {/* Filter bar */}
      {showFilters && (
        <div className="mb-6 flex flex-wrap gap-2 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setCategoryId(null)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${categoryId === null ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryId(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${categoryId === cat.id ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Active filters */}
      {(search || categoryId !== null) && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">{filtered.length} resultados</span>
          {search && (
            <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
              &ldquo;{search}&rdquo;
              <button onClick={() => setSearch("")}><X size={12} /></button>
            </span>
          )}
          {categoryId !== null && (
            <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
              {categories.find((c) => c.id === categoryId)?.name}
              <button onClick={() => setCategoryId(null)}><X size={12} /></button>
            </span>
          )}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nenhuma apostila encontrada</h3>
          <p className="text-gray-500">Tente buscar com outros termos</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
