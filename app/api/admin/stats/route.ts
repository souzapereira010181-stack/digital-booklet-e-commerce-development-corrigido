import { NextResponse } from "next/server";
import { readStore } from "@/db/local-store";
export async function GET() {
  const store = await readStore();
  return NextResponse.json({
    users: store.users.length,
    orders: 0,
    revenue: 0,
    products: store.products.length,
  });
}
