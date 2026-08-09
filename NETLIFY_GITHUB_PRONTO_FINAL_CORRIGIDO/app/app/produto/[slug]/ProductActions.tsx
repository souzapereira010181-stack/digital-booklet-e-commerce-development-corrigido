"use client";

/**
 * Botões de ação na página de detalhe do produto.
 * O pagamento é feito por link externo (Mercado Pago ou PagBank).
 * Não gera checkout interno, não cria IDs de pedido/transação.
 */

import { useState } from "react";
import { getPaymentLinks } from "@/lib/payment-links";
import { ShoppingCart, Heart, Share2, Check } from "lucide-react";
import { useCartStore, useFavoritesStore } from "@/lib/store";
import type { Product } from "@/lib/data";

export default function ProductActions({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isFavorite } = useFavoritesStore();
  const fav = isFavorite(product.id);
  const payment = getPaymentLinks(product);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex flex-col gap-3">

      {/* ── Payment section label ── */}
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        Escolha como pagar:
      </p>

      {/* ── Mercado Pago ── */}
      {payment.mercadoPago ? <a
        href={payment.mercadoPago}
        target="_self"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-3 rounded-2xl font-black text-lg py-4 transition-all shadow-lg hover:-translate-y-0.5
          bg-[#009ee3] hover:bg-[#0087c4] text-white hover:shadow-blue-400/30"
      >
        <MercadoPagoLogo />
        Pagar com Mercado Pago
      </a> : null}

      {/* ── PagBank ── */}
      {payment.pagBank ? <a
        href={payment.pagBank}
        target="_self"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-3 rounded-2xl font-black text-lg py-4 transition-all shadow-lg hover:-translate-y-0.5
          bg-[#f4b000] hover:bg-[#dba000] text-gray-900 hover:shadow-yellow-400/30"
      >
        <PagBankLogo />
        Pagar com PagBank
      </a> : null}

      {!payment.mercadoPago && !payment.pagBank && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-800 px-4 py-3 text-sm">
          ⚠️ O pagamento desta apostila ainda não foi configurado no painel Admin.
        </div>
      )}

      {/* ── Info strip ── */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 justify-center py-1">
        <span>💳 Cartão de crédito</span>
        <span>📱 PIX</span>
        <span>🏦 Boleto</span>
        <span>🔒 Pagamento seguro</span>
      </div>

      {/* ── Finalizar compra ── */}
      {(payment.mercadoPago || payment.pagBank) && (
        <a
          href={payment.mercadoPago || payment.pagBank}
          target="_self"
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black text-lg py-4 shadow-lg transition-all hover:-translate-y-0.5"
        >
          🔒 Finalizar compra
        </a>
      )}

      {/* ── Secondary actions ── */}
      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-2xl border-2 transition-all ${
            added
              ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600"
              : "border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          }`}
        >
          {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          {added ? "Adicionado!" : "Adicionar ao Carrinho"}
        </button>

        <button
          onClick={() => toggle(product.id)}
          className={`p-3 rounded-2xl border-2 transition-all ${
            fav
              ? "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-500"
              : "border-gray-200 dark:border-gray-700 text-gray-400 hover:border-red-300 hover:text-red-400"
          }`}
          aria-label="Favoritar"
        >
          <Heart size={20} className={fav ? "fill-red-500" : ""} />
        </button>

        <button
          onClick={handleShare}
          className="p-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-400 hover:border-blue-300 hover:text-blue-400 transition-all"
          aria-label="Compartilhar"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
}

/* ── Inline brand logos (SVG) ─────────────────────────────────────────────── */

function MercadoPagoLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#fff" />
      <path d="M4.5 12c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5"
        stroke="#009ee3" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M7.5 12a4.5 4.5 0 0 1 9 0"
        stroke="#009ee3" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.6" fill="#009ee3" />
    </svg>
  );
}

function PagBankLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#1a1a1a" />
      <path d="M5 8.5h14M5 12h9M5 15.5h11"
        stroke="#f4b000" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
