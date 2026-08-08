"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { getPaymentLinks } from "@/lib/payment-links";

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, clearCart, total, count } = useCartStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="max-w-5xl mx-auto px-4 py-12 min-h-96" />;

  const validItems = items.filter((item) => item?.product && Number.isFinite(item.product.id));

  if (validItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-5" />
        <h1 className="text-2xl font-black mb-2">Seu carrinho está vazio</h1>
        <p className="text-gray-500 mb-6">Escolha uma apostila para continuar.</p>
        <Link href="/apostilas" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
          <ArrowLeft size={18} /> Ver apostilas
        </Link>
      </div>
    );
  }

  const grandTotal = total();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black">🛒 Carrinho</h1>
          <p className="text-gray-500">{count()} item(ns)</p>
        </div>
        <button onClick={clearCart} className="text-sm text-red-500 hover:underline">Limpar carrinho</button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-3">
          {validItems.map(({ product, quantity }) => (
            <div key={product.id} className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-4 flex gap-4 items-center">
              <img src={product.coverImage} alt={product.title} className="w-20 h-24 object-contain rounded-lg bg-gray-50" />
              <div className="flex-1 min-w-0">
                <Link href={`/produto/${product.slug}`} className="font-bold hover:text-blue-600 line-clamp-2">{product.title}</Link>
                <div className="text-green-600 font-black mt-1">{formatPrice(product.price)}</div>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))} className="p-1.5 rounded-lg border"><Minus size={14}/></button>
                  <span className="w-8 text-center font-bold">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 rounded-lg border"><Plus size={14}/></button>
                </div>
              </div>
              <div className="text-right self-stretch flex flex-col justify-between items-end">
                <button onClick={() => removeItem(product.id)} className="text-red-500 p-2" aria-label="Remover"><Trash2 size={17}/></button>
                <div className="font-black">{formatPrice(product.price * quantity)}</div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-5 h-fit sticky top-24">
          <h2 className="font-black text-lg mb-4">Resumo</h2>
          <div className="flex justify-between mb-5"><span>Total</span><strong className="text-2xl text-green-600">{formatPrice(grandTotal)}</strong></div>
          {validItems.length > 0 && (
            <Link
              href="/checkout"
              className="flex items-center justify-center w-full mb-3 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3.5 font-black transition-colors"
            >
              🔒 Finalizar compra
            </Link>
          )}
          <div className="space-y-2">
            {validItems.map(({ product }) => {
              const payment = getPaymentLinks(product);
              return (
                <div key={product.id} className="grid grid-cols-2 gap-2">
                  {payment.mercadoPago && <a target="_self" href={payment.mercadoPago} className="flex items-center justify-center gap-1 bg-[#009ee3] text-white rounded-xl py-2.5 text-sm font-bold"><CreditCard size={15}/> Mercado Pago</a>}
                  {payment.pagBank && <a target="_self" href={payment.pagBank} className="flex items-center justify-center gap-1 bg-[#f4b000] text-gray-900 rounded-xl py-2.5 text-sm font-bold"><CreditCard size={15}/> PagBank</a>}
                  {!payment.mercadoPago && !payment.pagBank && (
                    <Link href={`/produto/${product.slug}`} className="col-span-2 text-center text-amber-700 bg-amber-50 border border-amber-200 rounded-xl py-2.5 text-sm font-semibold">
                      Pagamento não configurado
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-4">O pagamento é concluído no checkout oficial informado para cada apostila.</p>
        </aside>
      </div>
    </div>
  );
}
