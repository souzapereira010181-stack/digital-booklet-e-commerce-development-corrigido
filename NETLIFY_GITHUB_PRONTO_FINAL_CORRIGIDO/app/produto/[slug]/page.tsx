import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, formatPrice } from "@/lib/data";
import { readStore } from "@/db/local-store";
import { getDiscount } from "@/lib/utils";
import ProductCover from "@/components/ProductCover";
import StarRating from "@/components/StarRating";
import ProductCard from "@/components/ProductCard";
import ProductActions from "./ProductActions";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const store = await readStore();
  return [...PRODUCTS, ...store.products].map((p) => ({ slug: p.slug })).filter((v, i, a) => a.findIndex(x => x.slug === v.slug) === i);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const localProduct = (await readStore()).products.find((p) => p.slug === slug && p.active);
  const product = localProduct ?? getProductBySlug(slug);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: `${product.title} – Kleber Store`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const localProduct = (await readStore()).products.find((p) => p.slug === slug && p.active);
  const product = localProduct ?? getProductBySlug(slug);
  if (!product) notFound();

  const currentStore = await readStore();
  const category = currentStore.categories.find((c) => c.id === product.categoryId);
  const catalog = currentStore.products.filter((p) => p.active);
  const related = catalog.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? getDiscount(product.originalPrice, product.price) : 0;

  const reviews = [
    { name: "Carlos M.", rating: 5, date: "Jan 2025", comment: "Material excelente e muito completo. Recomendo!" },
    { name: "Ana P.", rating: 5, date: "Dez 2024", comment: "Didático e bem estruturado. Ajudou muito nos estudos." },
    { name: "Roberto S.", rating: 4, date: "Nov 2024", comment: "Bom material, conteúdo atualizado e bem organizado." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <a href="/" className="hover:text-blue-600">Início</a>
        <span>/</span>
        <a href="/apostilas" className="hover:text-blue-600">Apostilas</a>
        <span>/</span>
        {category && <a href={`/categorias/${category.slug}`} className="hover:text-blue-600">{category.name}</a>}
        <span>/</span>
        <span className="text-gray-900 dark:text-white truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Left: Cover + info */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            {discount > 0 && (
              <div className="absolute -top-3 -right-3 z-10 bg-red-500 text-white font-black text-lg w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                -{discount}%
              </div>
            )}
            <ProductCover
              coverImage={product.coverImage}
              title={product.title}
              size="large"
              className="shadow-2xl"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
            {[
              { label: "Formato", value: product.format, icon: "📄" },
              { label: "Páginas", value: `${product.pages}p`, icon: "📖" },
              { label: "Vendas", value: `${product.salesCount}+`, icon: "🛒" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <span className="text-xl">{s.icon}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{s.value}</span>
                <span className="text-xs text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details + actions */}
        <div className="flex flex-col gap-4">
          {category && (
            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full w-fit">
              {category.icon} {category.name}
            </span>
          )}

          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white leading-tight">
            {product.title}
          </h1>

          <StarRating rating={product.rating} count={product.reviewCount} size="md" />

          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-lg">
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>

          {/* Price */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-5 border border-green-100 dark:border-green-800">
            {product.originalPrice && (
              <div className="text-gray-400 text-sm line-through mb-1">
                De {formatPrice(product.originalPrice)}
              </div>
            )}
            <div className="text-4xl font-black text-green-600 dark:text-green-400 mb-1">
              {formatPrice(product.price)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ou 3x de {formatPrice(product.price / 3)} sem juros
            </div>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
              <span>💳 Cartão de crédito</span>
              <span>📱 PIX</span>
              <span>🏦 Boleto</span>
            </div>
          </div>

          <ProductActions product={product} />

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "📥", text: "Download imediato" },
              { icon: "🔒", text: "Compra 100% segura" },
              { icon: "♾️", text: "Acesso vitalício" },
              { icon: "📱", text: "Qualquer dispositivo" },
            ].map((g) => (
              <div key={g.text} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>{g.icon}</span> {g.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">⭐ Avaliações dos Alunos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <StarRating rating={r.rating} size="sm" />
                <span className="text-xs text-gray-400">{r.date}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">&ldquo;{r.comment}&rdquo;</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center font-bold text-blue-700 dark:text-blue-400 text-sm">
                  {r.name[0]}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Produtos Relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
