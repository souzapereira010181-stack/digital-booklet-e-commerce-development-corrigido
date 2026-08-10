"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Eye, Tag, ShoppingCart, Check } from "lucide-react";
import { useCartStore, useFavoritesStore } from "@/lib/store";
import type { Product } from "@/lib/data";
import { formatPrice, getDiscount } from "@/lib/utils";
import { getPaymentLinks } from "@/lib/payment-links";
import ProductCover from "./ProductCover";
import StarRating from "./StarRating";

/**
 * Mini payment picker that appears when the user clicks "Comprar".
 * Opens the external MP or PagBank link — no internal checkout.
 */
function paymentUrl(product: Product, provider: "mercadoPago" | "pagBank") {
  const links = getPaymentLinks(product);
  return provider === "mercadoPago" ? links.mercadoPago : links.pagBank;
}

function BuyPopover({ product, onClose }: { product: Product; onClose: () => void }) {
  const mp = paymentUrl(product, "mercadoPago");
  const pag = paymentUrl(product, "pagBank");
  const hasPayment = Boolean(mp || pag);

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-b-2xl rounded-t-xl shadow-2xl p-4 flex flex-col gap-2">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-center mb-1">
        {hasPayment ? "Escolha como pagar:" : "Pagamento ainda não configurado"}
      </p>

      {mp && (
        <a
          href={mp}
          target="_self"
          className="flex items-center justify-center gap-2 bg-[#009ee3] hover:bg-[#0087c4] text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
        >
          💳 Mercado Pago
        </a>
      )}

      {pag && (
        <a
          href={pag}
          target="_self"
          className="flex items-center justify-center gap-2 bg-[#f4b000] hover:bg-[#dba000] text-gray-900 text-sm font-bold py-2.5 rounded-xl transition-colors"
        >
          🏦 PagBank
        </a>
      )}

      {!hasPayment && (
        <Link
          href={`/produto/${product.slug}`}
          className="text-sm text-blue-600 hover:underline text-center py-2"
        >
          Ver produto e configurar pagamento
        </Link>
      )}

      <button
        type="button"
        onClick={onClose}
        className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mt-1 text-center"
      >
        Fechar
      </button>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isFavorite } = useFavoritesStore();
  const fav = isFavorite(product.id);
  const discount = product.originalPrice ? getDiscount(product.originalPrice, product.price) : 0;

  const [showBuy, setShowBuy] = useState(false);
  const [added, setAdded]     = useState(false);

  const handleAddCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col">

      {/* ── Cover area ── */}
      <div className="relative flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-4 pt-6">
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            -{discount}%
          </div>
        )}
        {product.featured && (
          <div className="absolute top-3 right-10 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            ⭐ Destaque
          </div>
        )}
        <button
          onClick={() => toggle(product.id)}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          aria-label="Favoritar"
        >
          <Heart size={16} className={fav ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>
        <Link href={`/produto/${product.slug}`}>
          <ProductCover
            coverImage={product.coverImage}
            title={product.title}
            size="normal"
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        <Link href={`/produto/${product.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2">
            {product.title}
          </h3>
        </Link>

        <StarRating rating={product.rating} count={product.reviewCount} size="xs" />

        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-400 dark:text-gray-500">📄 {product.pages}p</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">📥 {product.format}</span>
        </div>

        {/* ── Price ── */}
        <div className="mt-auto pt-2">
          {product.originalPrice && (
            <div className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</div>
          )}
          <div className="text-xl font-black text-green-600 dark:text-green-400">{formatPrice(product.price)}</div>
          <div className="text-xs text-gray-400">ou 3x de {formatPrice(product.price / 3)} sem juros</div>
        </div>

        {/* ── Action row ── */}
        <div className="flex gap-2 mt-3">
          {/* Add to cart */}
          <button
            onClick={handleAddCart}
            className={`flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border-2 transition-all ${
              added
                ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600"
                : "border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            }`}
            title="Adicionar ao carrinho"
          >
            {added ? <Check size={14} /> : <ShoppingCart size={14} />}
          </button>

          {/* Detail */}
          <Link
            href={`/produto/${product.slug}`}
            className="flex items-center justify-center p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
            title="Ver detalhes"
          >
            <Eye size={14} />
          </Link>

          {/* Buy — opens picker */}
          {(() => {
            const mp = paymentUrl(product, "mercadoPago");
            const pag = paymentUrl(product, "pagBank");
            const payment = mp || pag;
            if (payment && (!mp || !pag)) {
              return (
                <a
                  href={payment}
                  target="_self"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 rounded-xl transition-colors"
                >
                  💳 Comprar
                </a>
              );
            }
            return (
              <button
                type="button"
                onClick={() => setShowBuy(true)}
                className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 rounded-xl transition-colors"
              >
                💳 Comprar
              </button>
            );
          })()}
        </div>
      </div>

      {/* ── Payment picker popover ── */}
      {showBuy && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowBuy(false)}
          />
          <BuyPopover product={product} onClose={() => setShowBuy(false)} />
        </>
      )}
    </div>
  );
}
