import { notFound } from "next/navigation";
import { readStore } from "@/db/local-store";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return (await readStore()).categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = (await readStore()).categories.find((c) => c.slug === slug);
  return { title: category ? `${category.name} – Kleber Store` : "Categoria" };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { categories, products } = await readStore();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const categoryProducts = products.filter((p) => p.categoryId === category.id && p.active);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <a href="/" className="hover:text-blue-600">Início</a><span>/</span>
        <a href="/categorias" className="hover:text-blue-600">Categorias</a><span>/</span>
        <span className="text-gray-900 dark:text-white">{category.name}</span>
      </nav>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{category.icon}</span>
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">{category.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{category.description} • {categoryProducts.length} apostilas</p>
        </div>
      </div>
      {categoryProducts.length === 0 ? (
        <div className="py-16 text-center text-gray-500">Nenhuma apostila disponível nesta categoria.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categoryProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
