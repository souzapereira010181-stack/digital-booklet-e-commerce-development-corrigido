import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import StarRating from "@/components/StarRating";
import ProductCover from "@/components/ProductCover";
import { formatPrice } from "@/lib/data";
import { readStore } from "@/db/local-store";
import PackPriceButton from "@/components/PackPriceButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function HomePage() {
  // Always read the local catalog so payment links saved in Admin are reflected
  // on the storefront immediately. Static PRODUCTS are only the initial seed.
  const store = await readStore();
  const catalog = store.products.filter((p) => p.active);
  const categories = store.categories;
  const featured = catalog.filter((p) => p.featured);
  const bestsellers = [...catalog].sort((a, b) => b.salesCount - a.salesCount).slice(0, 8);
  const newest = catalog.slice(-6).reverse();
  const pack = catalog.find((p) => p.slug === "pack-completo-50-apostilas");
  const packPrice = pack?.price ?? 297;
  const packOriginalPrice = pack?.originalPrice ?? 599;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 dark:from-gray-950 dark:via-blue-950 dark:to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">📋</div>
          <div className="absolute top-20 right-20 text-6xl">🏥</div>
          <div className="absolute bottom-10 left-1/3 text-7xl">🚒</div>
          <div className="absolute top-1/2 right-10 text-5xl">🦺</div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-full px-4 py-1.5 text-amber-300 text-sm font-medium mb-6">
              ⭐ +3.400 apostilas vendidas • 4.9★
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-4">
              Apostilas<br />
              <span className="text-amber-400">Profissionais</span><br />
              em PDF
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-lg">
              Segurança do Trabalho • APH • Resgate • Download Imediato
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/apostilas"
                className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5"
              >
                📚 Ver Apostilas
              </Link>
              <PackPriceButton
                initialPrice={packPrice}
                href="/produto/pack-completo-50-apostilas"
                className="bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 font-bold px-8 py-4 rounded-2xl text-lg transition-all"
              />
            </div>
            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-blue-200 text-sm">
              <span>✅ Download imediato</span>
              <span>💳 PIX, Cartão e Boleto</span>
              <span>🔒 Compra Segura</span>
            </div>
          </div>
          {/* Featured stack */}
          <div className="flex gap-4 flex-wrap justify-center">
            {featured.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/produto/${p.slug}`}>
                <ProductCover coverImage={p.coverImage} title={p.title} size="normal" className="hover:scale-105 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Apostilas", value: "50+", icon: "📚" },
            { label: "Alunos", value: "3.400+", icon: "👥" },
            { label: "Avaliação", value: "4.9★", icon: "⭐" },
            { label: "Formato", value: "PDF", icon: "📥" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 py-2">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xl font-black text-blue-700 dark:text-blue-400">{s.value}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">🗂️ Categorias</h2>
          <Link href="/categorias" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">Ver todas →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categorias/${cat.slug}`}
              className="flex flex-col items-center gap-2 p-5 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-md border border-gray-100 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="font-semibold text-sm text-center text-gray-800 dark:text-gray-200">{cat.name}</span>
              <span className="text-xs text-gray-400">{cat.count} apostilas</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Pack destaque */}
      <section className="max-w-7xl mx-auto px-4 mb-10">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-8 flex flex-col lg:flex-row items-center gap-8 text-white shadow-xl">
          <div className="text-6xl">📦</div>
          <div className="flex-1 text-center lg:text-left">
            <div className="text-sm font-medium opacity-80 mb-1">🔥 OFERTA ESPECIAL</div>
            <h3 className="text-2xl lg:text-3xl font-black mb-2">Pack Completo – 50 Apostilas</h3>
            <p className="text-white/80 text-sm mb-4">Todas as apostilas da Kleber Store em PDF. Acesso vitalício + atualizações gratuitas.</p>
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div>
                {packOriginalPrice > 0 && (
                  <div className="text-white/60 text-sm line-through">{formatPrice(packOriginalPrice)}</div>
                )}
                <div className="text-3xl font-black">{formatPrice(packPrice)}</div>
              </div>
              {packOriginalPrice > 0 && packPrice < packOriginalPrice && (
                <div className="bg-white/20 rounded-xl px-3 py-1 text-sm font-bold">
                  -{Math.round((1 - packPrice / packOriginalPrice) * 100)}% OFF
                </div>
              )}
            </div>
          </div>
          <Link
            href="/produto/pack-completo-50-apostilas"
            className="bg-white text-orange-600 font-black px-8 py-4 rounded-2xl text-lg hover:bg-orange-50 transition-colors shadow-lg whitespace-nowrap"
          >
            Quero o Pack! →
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">⭐ Em Destaque</h2>
          <Link href="/apostilas" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">Ver todas →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">🔥 Mais Vendidos</h2>
          <Link href="/apostilas" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">Ver todos →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-blue-900 dark:bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-center mb-8">Por que escolher a Kleber Store?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📥", title: "Download Imediato", desc: "Acesse o PDF logo após a confirmação do pagamento" },
              { icon: "🔒", title: "Compra Segura", desc: "Pagamento processado pelo Mercado Pago com SSL" },
              { icon: "💳", title: "Parcelado sem Juros", desc: "PIX, cartão de crédito ou boleto bancário" },
              { icon: "♾️", title: "Acesso Vitalício", desc: "Pague uma vez e tenha acesso para sempre" },
            ].map((b) => (
              <div key={b.title} className="flex flex-col items-center gap-3 text-center p-6 bg-white/5 rounded-2xl">
                <div className="text-4xl">{b.icon}</div>
                <div className="font-bold text-lg">{b.title}</div>
                <div className="text-blue-200 text-sm">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-center text-gray-900 dark:text-white mb-8">💬 O que nossos alunos dizem</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Carlos M.", role: "Técnico de Segurança", text: "Material excelente! NR-35 muito completa, me ajudou muito no meu trabalho diário.", rating: 5 },
            { name: "Ana P.", role: "Socorrista SAMU", text: "O APH Básico é muito didático. Consegui revisar todo o conteúdo antes da prova de residência.", rating: 5 },
            { name: "Roberto S.", role: "Bombeiro Civil", text: "O material de BREC é completo e atualizado. Recomendo para todos os resgatistas!", rating: 5 },
          ].map((t) => (
            <div key={t.name} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-800">
              <StarRating rating={t.rating} size="sm" />
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 mb-4 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center font-bold text-blue-700 dark:text-blue-400">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newest */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">🆕 Novidades</h2>
          <Link href="/apostilas" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">Ver todas →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {newest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-black mb-3">Pronto para estudar?</h2>
          <p className="text-green-100 mb-6">Escolha sua apostila e tenha acesso imediato ao PDF</p>
          <Link
            href="/apostilas"
            className="inline-block bg-white text-green-700 font-black px-10 py-4 rounded-2xl text-lg hover:bg-green-50 transition-colors shadow-lg"
          >
            Ver todas as apostilas →
          </Link>
        </div>
      </section>
    </div>
  );
}
