import Link from "next/link";
import { readStore } from "@/db/local-store";

export const dynamic = "force-dynamic";

export default async function CategoriasPage() {
  const { categories, products } = await readStore();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">🗂️ Categorias</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Encontre apostilas por área de conhecimento</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const categoryProducts = products.filter((p) => p.categoryId === cat.id && p.active);
          return (
            <Link key={cat.id} href={`/categorias/${cat.slug}`} className="group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow hover:shadow-lg border border-gray-100 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-5xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <div><h2 className="text-xl font-bold text-gray-900 dark:text-white">{cat.name}</h2><p className="text-sm text-gray-500 dark:text-gray-400">{cat.description}</p></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{categoryProducts.length} apostilas</span>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">Ver apostilas →</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {categoryProducts.slice(0, 3).map((p) => <span key={p.id} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">{p.title.split("–")[0].trim().slice(0, 25)}</span>)}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
