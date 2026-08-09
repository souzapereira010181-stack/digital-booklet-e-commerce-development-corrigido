import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore, nextId, slugify } from "@/db/local-store";
import { requireLocalAdmin } from "../auth";

export async function GET() {
  const store = await readStore();
  return NextResponse.json({ categories: store.categories });
}

export async function POST(req: NextRequest) {
  if (!(await requireLocalAdmin())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const body = await req.json();
  const name = String(body.name ?? "").trim();
  if (!name) return NextResponse.json({ error: "Nome da categoria é obrigatório" }, { status: 400 });
  const store = await readStore();
  const slug = slugify(name);
  if (store.categories.some((c) => c.slug === slug)) return NextResponse.json({ error: "Categoria já existe" }, { status: 409 });
  const category = { id: nextId(store.categories), name, slug, icon: String(body.icon ?? "📚"), description: String(body.description ?? "") };
  store.categories.push(category);
  await writeStore(store);
  return NextResponse.json({ category }, { status: 201 });
}
