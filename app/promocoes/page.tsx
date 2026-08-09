import { readStore } from "@/db/local-store";
import ProductCard from "@/components/ProductCard";

export default async function PromocoesPage() {
  const promos = (await readStore()).products.filter((p) => p.originalPrice && p.originalPrice > p.price)
    .sort((a, b) => {
      const da = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
      const db = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
      return db - da;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-8 text-white text-center mb-8 shadow-xl">
        <div className="text-5xl mb-3">🔥</div>
        <h1 className="text-3xl font-black mb-2">Promoções Especiais</h1>
        <p className="text-white/80">Aproveite os melhores descontos em apostilas profissionais</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-500 dark:text-gray-400">{promos.length} apostilas em promoção</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {promos.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
