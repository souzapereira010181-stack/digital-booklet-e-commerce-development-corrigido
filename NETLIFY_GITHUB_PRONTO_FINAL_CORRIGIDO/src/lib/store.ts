"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./data";

export type CartItem = {
  product: Product;
  quantity: number;
};

function isValidProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const p = value as Partial<Product>;
  return Number.isFinite(p.id) && typeof p.title === "string" && typeof p.slug === "string" && Number.isFinite(Number(p.price));
}

function sanitizeItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is { product: unknown; quantity: unknown } =>
      !!item && typeof item === "object" && "product" in item
    )
    .filter((item) => isValidProduct(item.product))
    .map((item) => ({
      product: item.product as Product,
      quantity: Math.max(1, Math.floor(Number(item.quantity) || 1)),
    }));
}

type CartStore = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!isValidProduct(product)) return;
        const existing = get().items.find((i) => i?.product?.id === product.id);
        if (existing) {
          set((s) => ({
            items: sanitizeItems(s.items).map((i) =>
              i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
        } else {
          set((s) => ({ items: [...sanitizeItems(s.items), { product, quantity: 1 }] }));
        }
      },
      removeItem: (productId) =>
        set((s) => ({ items: sanitizeItems(s.items).filter((i) => i.product.id !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((s) => ({
          items: sanitizeItems(s.items)
            .map((i) => i.product.id === productId ? { ...i, quantity: Math.max(1, Math.floor(quantity)) } : i),
        })),
      clearCart: () => set({ items: [] }),
      total: () => sanitizeItems(get().items).reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0),
      count: () => sanitizeItems(get().items).reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "kleber-cart",
      skipHydration: true,
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<CartStore>),
        items: sanitizeItems((persisted as Partial<CartStore> | undefined)?.items),
      }),
    }
  )
);

type FavoritesStore = {
  ids: number[];
  toggle: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        const ids = Array.isArray(get().ids) ? get().ids.filter(Number.isFinite) : [];
        set({ ids: ids.includes(productId) ? ids.filter((i) => i !== productId) : [...ids, productId] });
      },
      isFavorite: (productId) => Array.isArray(get().ids) && get().ids.includes(productId),
    }),
    {
      name: "kleber-favorites",
      skipHydration: true,
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<FavoritesStore>),
        ids: Array.isArray((persisted as Partial<FavoritesStore> | undefined)?.ids)
          ? (persisted as Partial<FavoritesStore>).ids!.filter(Number.isFinite)
          : [],
      }),
    }
  )
);

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  purchasedIds: number[];
};

type AuthStore = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "kleber-auth", skipHydration: true }
  )
);

type CouponStore = {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  setCode: (code: string) => void;
  setDiscount: (discount: number, type: "percentage" | "fixed") => void;
  clear: () => void;
};

export const useCouponStore = create<CouponStore>()((set) => ({
  code: "",
  discount: 0,
  type: "percentage",
  setCode: (code) => set({ code }),
  setDiscount: (discount, type) => set({ discount, type }),
  clear: () => set({ code: "", discount: 0, type: "percentage" }),
}));
