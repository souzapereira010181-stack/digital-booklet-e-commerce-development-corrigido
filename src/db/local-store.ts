import fs from "node:fs";
import path from "node:path";
import { CATEGORIES, PRODUCTS } from "@/lib/data";

export type LocalUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
};

export type LocalCategory = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count?: number;
};

export type LocalProduct = {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  categoryId: number;
  coverImage: string;
  pages: number;
  format: string;
  tags: string[];
  mercadoPagoLink: string;
  pagBankLink: string;
  buyLink?: string;
  featured: boolean;
  active: boolean;
  rating: number;
  reviewCount: number;
  salesCount: number;
  pdfPath?: string | null;
};

export type Store = {
  users: LocalUser[];
  categories: LocalCategory[];
  products: LocalProduct[];
};

const file = path.join(process.cwd(), "data", "store.json");

const SUPABASE_URL = (
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.SUPABASE_URL ??
  ""
).replace(/\/+$/, "");

const SUPABASE_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

const SUPABASE_SERVER_KEY =
  process.env.SUPABASE_SECRET_KEY ??
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  "";

export function isRemoteStore() {
  return Boolean(SUPABASE_URL && (SUPABASE_SERVER_KEY || SUPABASE_PUBLIC_KEY));
}

function apiKey() {
  const key = SUPABASE_SERVER_KEY || SUPABASE_PUBLIC_KEY;
  if (!key) throw new Error("Chave do Supabase não configurada.");
  return key;
}

function seedStore(): Store {
  return {
    users: [],
    categories: CATEGORIES.map(({ id, name, slug, icon, description, count }) => ({
      id, name, slug, icon, description, count,
    })),
    products: PRODUCTS.map((p) => ({
      ...p,
      active: true,
      pdfPath: null,
    })),
  };
}

function ensureFile() {
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(seedStore(), null, 2), "utf8");
  }
}

function normalizeStore(value: Partial<Store> | null | undefined): Store {
  const raw = value ?? {};
  const storedProducts = Array.isArray(raw.products) ? raw.products : [];
  const byId = new Map(storedProducts.map((p) => [p.id, p]));
  const bySlug = new Map(storedProducts.map((p) => [String(p.slug || ""), p]));

  const products: LocalProduct[] = PRODUCTS.map((seed) => {
    const saved = (byId.get(seed.id) ?? bySlug.get(seed.slug)) as Partial<LocalProduct> | undefined;
    return {
      ...seed,
      ...saved,
      id: seed.id,
      slug: seed.slug,
      price: Number(saved?.price ?? seed.price),
      originalPrice: saved?.originalPrice == null ? seed.originalPrice : Number(saved.originalPrice),
      mercadoPagoLink: String(saved?.mercadoPagoLink ?? seed.mercadoPagoLink ?? "").trim(),
      pagBankLink: String(saved?.pagBankLink ?? seed.pagBankLink ?? "").trim(),
      buyLink: String(saved?.buyLink ?? "").trim(),
      active: saved?.active ?? true,
      pdfPath: saved?.pdfPath ?? null,
    };
  });

  for (const saved of storedProducts) {
    if (!products.some((p) => p.id === saved.id || p.slug === saved.slug)) {
      products.push({
        ...saved,
        price: Number(saved.price),
        originalPrice: saved.originalPrice == null ? undefined : Number(saved.originalPrice),
        mercadoPagoLink: String(saved.mercadoPagoLink ?? "").trim(),
        pagBankLink: String(saved.pagBankLink ?? "").trim(),
        buyLink: String(saved.buyLink ?? "").trim(),
        active: saved.active ?? true,
        pdfPath: saved.pdfPath ?? null,
      });
    }
  }

  const storedCategories = Array.isArray(raw.categories) ? raw.categories : [];
  const categories: LocalCategory[] = CATEGORIES.map((seed) => {
    const saved = storedCategories.find((c) => c.id === seed.id);
    return saved
      ? { ...seed, ...saved }
      : { ...seed };
  });

  for (const saved of storedCategories) {
    if (!categories.some((c) => c.id === saved.id)) categories.push(saved);
  }

  return {
    users: Array.isArray(raw.users) ? raw.users : [],
    categories,
    products,
  };
}

async function remoteRead(): Promise<Store> {
  const key = apiKey();
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/store_state?id=eq.1&select=data`,
    {
      method: "GET",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase store_state indisponível (${res.status}): ${body}`);
  }

  const rows = (await res.json()) as Array<{ data: Partial<Store> }>;

  if (!rows.length) {
    if (!SUPABASE_SERVER_KEY) {
      throw new Error(
        "A tabela store_state está vazia. Configure SUPABASE_SECRET_KEY ou SUPABASE_SERVICE_ROLE_KEY para inicializar a loja.",
      );
    }

    const initial = seedStore();
    const createState = await fetch(`${SUPABASE_URL}/rest/v1/store_state`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVER_KEY,
        Authorization: `Bearer ${SUPABASE_SERVER_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        id: 1,
        data: {
          categories: initial.categories,
          products: initial.products,
        },
      }),
    });

    if (!createState.ok) {
      const body = await createState.text();
      throw new Error(`Não foi possível inicializar o catálogo no Supabase (${createState.status}): ${body}`);
    }

    await saveRemoteUsers(initial.users);
    return initial;
  }

  const base = normalizeStore({
    ...rows[0].data,
    users: [],
  });

  if (!SUPABASE_SERVER_KEY) {
    return base;
  }

  const userRes = await fetch(
    `${SUPABASE_URL}/rest/v1/store_users?id=eq.1&select=data`,
    {
      method: "GET",
      headers: {
        apikey: SUPABASE_SERVER_KEY,
        Authorization: `Bearer ${SUPABASE_SERVER_KEY}`,
      },
      cache: "no-store",
    },
  );

  if (!userRes.ok) {
    const body = await userRes.text();
    throw new Error(`Supabase store_users indisponível (${userRes.status}): ${body}`);
  }

  const userRows = (await userRes.json()) as Array<{ data: LocalUser[] }>;
  return normalizeStore({
    ...base,
    users: Array.isArray(userRows[0]?.data) ? userRows[0].data : [],
  });
}

async function saveRemoteUsers(users: LocalUser[]) {
  if (!SUPABASE_SERVER_KEY) {
    throw new Error(
      "Para salvar usuários no Supabase, configure SUPABASE_SECRET_KEY ou SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const payload = { id: 1, data: users };
  const check = await fetch(
    `${SUPABASE_URL}/rest/v1/store_users?id=eq.1&select=id`,
    {
      headers: {
        apikey: SUPABASE_SERVER_KEY,
        Authorization: `Bearer ${SUPABASE_SERVER_KEY}`,
      },
      cache: "no-store",
    },
  );

  if (!check.ok) {
    const body = await check.text();
    throw new Error(`Não foi possível consultar os usuários do Supabase (${check.status}): ${body}`);
  }

  const rows = (await check.json()) as Array<{ id: number }>;
  const method = rows.length ? "PATCH" : "POST";
  const url = rows.length
    ? `${SUPABASE_URL}/rest/v1/store_users?id=eq.1`
    : `${SUPABASE_URL}/rest/v1/store_users`;

  const res = await fetch(url, {
    method,
    headers: {
      apikey: SUPABASE_SERVER_KEY,
      Authorization: `Bearer ${SUPABASE_SERVER_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Não foi possível salvar usuários no Supabase (${res.status}): ${body}`);
  }
}

export async function readStore(): Promise<Store> {
  if (isRemoteStore()) return remoteRead();

  ensureFile();
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as Partial<Store>;
  return normalizeStore(raw);
}

export async function writeStore(store: Store): Promise<void> {
  if (isRemoteStore()) {
    if (!SUPABASE_SERVER_KEY) {
      throw new Error(
        "Para salvar alterações no Supabase, configure SUPABASE_SECRET_KEY ou SUPABASE_SERVICE_ROLE_KEY no servidor.",
      );
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/store_state?id=eq.1`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_SERVER_KEY,
        Authorization: `Bearer ${SUPABASE_SERVER_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        data: {
          categories: store.categories,
          products: store.products,
        },
        updated_at: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Não foi possível salvar o catálogo no Supabase (${res.status}): ${body}`);
    }

    await saveRemoteUsers(store.users);
    return;
  }

  ensureFile();
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(store, null, 2), "utf8");
  fs.renameSync(tmp, file);
}

export function nextId(items: { id: number }[]) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureStorageBucket() {
  if (!SUPABASE_SERVER_KEY) throw new Error("Chave secreta do Supabase não configurada.");
  const res = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVER_KEY,
      Authorization: `Bearer ${SUPABASE_SERVER_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: "apostilas", name: "apostilas", public: true }),
  });

  if (!res.ok && res.status !== 409) {
    const body = await res.text();
    throw new Error(`Não foi possível preparar o armazenamento de PDFs (${res.status}): ${body}`);
  }
}

export async function saveProductPdf(fileData: File, filename: string) {
  if (!isRemoteStore()) {
    const dir = path.join(process.cwd(), "public", "uploads", "apostilas");
    await fs.promises.mkdir(dir, { recursive: true });
    const localName = filename.replace(/[^a-zA-Z0-9._-]/g, "-");
    await fs.promises.writeFile(
      path.join(dir, localName),
      Buffer.from(await fileData.arrayBuffer()),
    );
    return `/uploads/apostilas/${localName}`;
  }

  await ensureStorageBucket();
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "-");
  const upload = await fetch(
    `${SUPABASE_URL}/storage/v1/object/apostilas/${encodeURIComponent(safeName)}`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVER_KEY,
        Authorization: `Bearer ${SUPABASE_SERVER_KEY}`,
        "Content-Type": fileData.type || "application/pdf",
        "x-upsert": "true",
      },
      body: Buffer.from(await fileData.arrayBuffer()),
    },
  );

  if (!upload.ok) {
    const body = await upload.text();
    throw new Error(`Não foi possível enviar o PDF para o Supabase (${upload.status}): ${body}`);
  }

  return `${SUPABASE_URL}/storage/v1/object/public/apostilas/${encodeURIComponent(safeName)}`;
}

export async function removeProductPdf(pdfPath: string | null | undefined) {
  if (!pdfPath) return;

  if (!isRemoteStore()) {
    const filename = pdfPath.replace(/^\/uploads\//, "");
    await fs.promises.rm(path.join(process.cwd(), "public", "uploads", filename), { force: true });
    return;
  }

  const marker = "/storage/v1/object/public/apostilas/";
  const index = pdfPath.indexOf(marker);
  if (index < 0 || !SUPABASE_SERVER_KEY) return;
  const objectName = decodeURIComponent(pdfPath.slice(index + marker.length));
  await fetch(`${SUPABASE_URL}/storage/v1/object/apostilas/${encodeURIComponent(objectName)}`, {
    method: "DELETE",
    headers: {
      apikey: SUPABASE_SERVER_KEY,
      Authorization: `Bearer ${SUPABASE_SERVER_KEY}`,
    },
  });
}
