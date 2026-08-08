"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/data";

type Props = {
  initialPrice: number;
  href: string;
  className?: string;
};

export default function PackPriceButton({ initialPrice, href, className = "" }: Props) {
  const [price, setPrice] = useState(initialPrice);

  useEffect(() => {
    let cancelled = false;

    const loadCurrentPrice = async () => {
      try {
        const response = await fetch(`/api/products?packPrice=${Date.now()}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        if (!response.ok) return;
        const data = await response.json();
        const pack = Array.isArray(data?.products)
          ? data.products.find((p: any) => p?.slug === "pack-completo-50-apostilas")
          : null;
        const current = Number(pack?.price);
        if (!cancelled && Number.isFinite(current) && current >= 0) {
          setPrice(current);
        }
      } catch {
        // O preço inicial renderizado pelo servidor continua válido.
      }
    };

    loadCurrentPrice();
    return () => { cancelled = true; };
  }, []);

  return (
    <Link href={href} prefetch={false} className={className}>
      📦 Pack Completo – {formatPrice(price)}
    </Link>
  );
}
