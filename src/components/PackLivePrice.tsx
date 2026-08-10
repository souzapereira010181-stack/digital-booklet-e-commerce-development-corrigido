"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/data";

export default function PackLivePrice({
  initialPrice,
  initialOriginalPrice,
}: {
  initialPrice: number;
  initialOriginalPrice: number;
}) {
  const [price, setPrice] = useState(initialPrice);
  const [originalPrice, setOriginalPrice] = useState(initialOriginalPrice);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/products?packPrice=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const pack = data?.products?.find?.((p: any) => p?.slug === "pack-completo-50-apostilas");
        const nextPrice = Number(pack?.price);
        const nextOriginal = Number(pack?.originalPrice);
        if (cancelled) return;
        if (Number.isFinite(nextPrice) && nextPrice >= 0) setPrice(nextPrice);
        if (Number.isFinite(nextOriginal) && nextOriginal >= 0) setOriginalPrice(nextOriginal);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const discount =
    originalPrice > 0
      ? Math.max(0, Math.round((1 - price / originalPrice) * 100))
      : 0;

  return (
    <div className="flex items-center gap-4 justify-center lg:justify-start">
      <div>
        <div className="text-white/60 text-sm line-through">{formatPrice(originalPrice)}</div>
        <div className="text-3xl font-black">{formatPrice(price)}</div>
      </div>
      {discount > 0 && (
        <div className="bg-white/20 rounded-xl px-3 py-1 text-sm font-bold">
          -{discount}% OFF
        </div>
      )}
    </div>
  );
}
