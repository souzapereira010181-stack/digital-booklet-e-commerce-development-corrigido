import { NextResponse } from "next/server";
import { readStore } from "@/db/local-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function GET() {
  const store = await readStore();
  return NextResponse.json(
    { products: store.products.filter((p) => p.active), categories: store.categories },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } }
  );
}
