import { NextRequest, NextResponse } from "next/server";
import { requireLocalAdmin } from "../../auth";
import { readStore, writeStore, slugify, removeProductPdf } from "@/db/local-store";
import { isValidPaymentUrl, normalizePaymentUrl } from "@/lib/payment-links";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireLocalAdmin())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const id = Number((await params).id);
  const body = await req.json();
  const store = await readStore();
  const product = store.products.find((p) => p.id === id);
  if (!product) return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });

  if (body.title !== undefined) {
    product.title = String(body.title).trim();
    product.slug = slugify(product.title) || product.slug;
  }
  if (body.price !== undefined) {
    const price = Number(body.price);
    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json({ error: "Preço inválido" }, { status: 400 });
    }
    product.price = price;
  }
  if (body.originalPrice !== undefined) {
    const originalPrice = Number(body.originalPrice);
    if (!Number.isFinite(originalPrice) || originalPrice < 0) {
      return NextResponse.json({ error: "Preço original inválido" }, { status: 400 });
    }
    product.originalPrice = originalPrice;
  }
  if (body.categoryId !== undefined) {
    const categoryId = Number(body.categoryId);
    if (!store.categories.some((c) => c.id === categoryId)) return NextResponse.json({ error: "Categoria inválida" }, { status: 400 });
    product.categoryId = categoryId;
  }
  if (body.description !== undefined) {
    product.description = String(body.description).trim();
    product.shortDescription = product.description.slice(0, 160);
  }
  if (body.mercadoPagoLink !== undefined) {
    const link = String(body.mercadoPagoLink).trim();
    if (!isValidPaymentUrl(link, "mercadoPago")) return NextResponse.json({ error: "Link do Mercado Pago inválido" }, { status: 400 });
    product.mercadoPagoLink = normalizePaymentUrl(link);
  }
  if (body.pagBankLink !== undefined) {
    const link = String(body.pagBankLink).trim();
    if (!isValidPaymentUrl(link, "pagBank")) return NextResponse.json({ error: "Link do PagBank inválido" }, { status: 400 });
    product.pagBankLink = normalizePaymentUrl(link);
  }
  if (body.buyLink !== undefined) {
    const link = String(body.buyLink).trim();
    if (link) {
      try {
        const host = new URL(normalizePaymentUrl(link)).hostname.toLowerCase().replace(/^www\./, "");
        const supported = ["mpago.la", "mercadopago.com", "mercadopago.com.br", "link.mercadopago.com.br", "pag.ae", "pagbank.com.br", "pagseguro.uol.com.br"].some(h => host === h || host.endsWith(`.${h}`));
        if (!supported) throw new Error("unsupported");
      } catch {
        return NextResponse.json({ error: "Link de pagamento inválido" }, { status: 400 });
      }
    }
    product.buyLink = normalizePaymentUrl(link);
  }
  if (body.active !== undefined) product.active = Boolean(body.active);
  if (body.featured !== undefined) product.featured = Boolean(body.featured);

  await writeStore(store);
  return NextResponse.json({ product });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireLocalAdmin())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  const id = Number((await params).id);
  const store = await readStore();
  const index = store.products.findIndex((p) => p.id === id);
  if (index < 0) return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
  const [product] = store.products.splice(index, 1);
  if (product.pdfPath) {
    await removeProductPdf(product.pdfPath);
  }
  await writeStore(store);
  return NextResponse.json({ success: true });
}
