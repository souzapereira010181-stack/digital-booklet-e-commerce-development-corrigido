"use client";

/**
 * Botões de pagamento por link externo.
 * Redireciona o cliente diretamente para o Mercado Pago ou PagBank.
 * Nenhum checkout interno, nenhum ID de transação gerado.
 */

import type { Product } from "@/lib/data";
import { getPaymentLinks } from "@/lib/payment-links";

type Size = "sm" | "md" | "lg";

interface Props {
  product: Product;
  size?: Size;
  /** Se true, empilha os botões verticalmente; se false, exibe lado a lado */
  stacked?: boolean;
}

export default function PaymentButtons({ product, size = "md", stacked = true }: Props) {
  const padding =
    size === "sm" ? "py-2 px-3 text-xs" :
    size === "lg" ? "py-4 px-6 text-base" :
                   "py-3 px-5 text-sm";

  const wrap = stacked ? "flex flex-col gap-2 w-full" : "flex flex-row gap-2 w-full";

  return (
    <div className={wrap}>
      {/* ── Mercado Pago ── */}
      {getPaymentLinks(product).mercadoPago ? <a
        href={getPaymentLinks(product).mercadoPago}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 font-bold rounded-xl transition-all shadow-sm
          bg-[#009ee3] hover:bg-[#0087c4] text-white ${padding} w-full`}
      >
        <MercadoPagoIcon />
        Pagar com Mercado Pago
      </a> : null}

      {/* ── PagBank ── */}
      {getPaymentLinks(product).pagBank ? <a
        href={getPaymentLinks(product).pagBank}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 font-bold rounded-xl transition-all shadow-sm
          bg-[#f4b000] hover:bg-[#dba000] text-gray-900 ${padding} w-full`}
      >
        <PagBankIcon />
        Pagar com PagBank
      </a> : null}
    </div>
  );
}

/* ── Inline SVG logos ─────────────────────────────────────────────────────── */

function MercadoPagoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#fff" />
      <path
        d="M4.5 12c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5"
        stroke="#009ee3" strokeWidth="2" strokeLinecap="round"
      />
      <path
        d="M7.5 12a4.5 4.5 0 0 1 9 0"
        stroke="#009ee3" strokeWidth="2" strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="1.5" fill="#009ee3" />
    </svg>
  );
}

function PagBankIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#f4b000" />
      <path
        d="M6 8h12M6 12h8M6 16h10"
        stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"
      />
    </svg>
  );
}
