"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CreditCard, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { getPaymentLinks } from "@/lib/payment-links";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-96" />;

  const valid = items.filter((item) => item?.product && Number.isFinite(item.product.id) && typeof item.product.slug === "string");
  if (!valid.length) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black mb-3">Seu carrinho está vazio</h1>
        <Link href="/apostilas" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
          <ArrowLeft size={18} /> Escolher apostila
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black mb-2">Finalizar compra</h1>
      <p className="text-gray-500 mb-7">Escolha o meio de pagamento. Você será levado ao checkout oficial.</p>
      <div className="space-y-4">
        {valid.map(({ product, quantity }) => {
          const payment = getPaymentLinks(product);
          return (
            <div key={product.id} className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between gap-4 mb-4">
                <div>
                  <h2 className="font-bold">{product.title}</h2>
                  <p className="text-sm text-gray-500">Quantidade: {quantity}</p>
                </div>
                <strong className="text-green-600">{formatPrice(product.price * quantity)}</strong>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {payment.mercadoPago && (
                  <a href={payment.mercadoPago} target="_self" className="flex items-center justify-center gap-2 bg-[#009ee3] text-white rounded-xl py-3 font-bold">
                    <CreditCard size={17}/> Finalizar com Mercado Pago
                  </a>
                )}
                {payment.pagBank && (
                  <a href={payment.pagBank} target="_self" className="flex items-center justify-center gap-2 bg-[#f4b000] text-gray-900 rounded-xl py-3 font-bold">
                    <CreditCard size={17}/> Finalizar com PagBank
                  </a>
                )}
              </div>
              {!payment.mercadoPago && !payment.pagBank && (
                <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm">Pagamento deste produto ainda não foi configurado no Admin.</p>
              )}
            </div>
          );
        })}
      </div>
      <Link href="/carrinho" className="inline-flex items-center gap-2 mt-6 text-blue-600 font-semibold">
        <ArrowLeft size={17}/> Voltar ao carrinho
      </Link>
    </div>
  );
}
