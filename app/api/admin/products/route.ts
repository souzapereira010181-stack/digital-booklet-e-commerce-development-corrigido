import { NextRequest, NextResponse } from "next/server";
import { requireLocalAdmin } from "../auth";
import { readStore, writeStore, nextId, slugify, saveProductPdf } from "@/db/local-store";
import { isValidPaymentUrl, normalizePaymentUrl } from "@/lib/payment-links";

const MAX_PDF = 50 * 1024 * 1024;

export async function GET() {
  const store = await readStore();
  return NextResponse.json({ products: store.products, categories: store.categories });
}

export async function POST(req: NextRequest) {
  if (!(await requireLocalAdmin())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const form = await req.formData();
    const title = String(form.get("title") ?? "").trim();
    const price = Number(form.get("price") ?? 0);
    const categoryId = Number(form.get("categoryId") ?? 0);
    const description = String(form.get("description") ?? "").trim();
    const mercadoPagoLink = String(form.get("mercadoPagoLink") ?? "").trim();
    const pagBankLink = String(form.get("pagBankLink") ?? "").trim();
    const buyLink = String(form.get("buyLink") ?? "").trim();
    const featured = String(form.get("featured") ?? "false") === "true";

    if (!isValidPaymentUrl(mercadoPagoLink, "mercadoPago")) {
      return NextResponse.json({ error: "Link do Mercado Pago inválido" }, { status: 400 });
    }
    if (!isValidPaymentUrl(pagBankLink, "pagBank")) {
      return NextResponse.json({ error: "Link do PagBank inválido" }, { status: 400 });
    }
    if (buyLink) {
      try {
        const host = new URL(normalizePaymentUrl(buyLink)).hostname.toLowerCase().replace(/^www\./, "");
        const supported = ["mpago.la", "mercadopago.com", "mercadopago.com.br", "link.mercadopago.com.br", "pag.ae", "pagbank.com.br", "pagseguro.uol.com.br"].some(h => host === h || host.endsWith(`.${h}`));
        if (!supported) throw new Error("unsupported");
      } catch {
        return NextResponse.json({ error: "Link de pagamento inválido" }, { status: 400 });
      }
    }

    if (!title) return NextResponse.json({ error: "Nome da apostila é obrigatório" }, { status: 400 });
    if (!Number.isFinite(price) || price < 0) return NextResponse.json({ error: "Preço inválido" }, { status: 400 });

    const store = await readStore();
    if (!store.categories.some((c) => c.id === categoryId)) {
      return NextResponse.json({ error: "Selecione uma categoria válida" }, { status: 400 });
    }

    const slugBase = slugify(title) || `apostila-${Date.now()}`;
    let slug = slugBase;
    let n = 2;
    while (store.products.some((p) => p.slug === slug)) slug = `${slugBase}-${n++}`;

    let pdfPath: string | null = null;
    const pdf = form.get("pdf");
    if (pdf instanceof File && pdf.size > 0) {
      if (pdf.type !== "application/pdf" && !pdf.name.toLowerCase().endsWith(".pdf")) {
        return NextResponse.json({ error: "Envie somente arquivo PDF" }, { status: 400 });
      }
      if (pdf.size > MAX_PDF) return NextResponse.json({ error: "PDF muito grande. Limite: 50 MB" }, { status: 400 });
      const filename = `${Date.now()}-${slug}.pdf`;
      pdfPath = await saveProductPdf(pdf, filename);
    }

    const product = {
      id: nextId(store.products),
      title,
      slug,
      description,
      shortDescription: description.slice(0, 160),
      price,
      categoryId,
      coverImage: "/images/apostilas/pack.svg",
      pages: 0,
      format: "PDF",
      tags: [],
      mercadoPagoLink: normalizePaymentUrl(mercadoPagoLink),
      pagBankLink: normalizePaymentUrl(pagBankLink),
      buyLink: normalizePaymentUrl(buyLink),
      featured,
      active: true,
      rating: 5,
      reviewCount: 0,
      salesCount: 0,
      pdfPath,
    };

    store.products.push(product);
    await writeStore(store);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json({ error: "Não foi possível salvar a apostila" }, { status: 500 });
  }
}
