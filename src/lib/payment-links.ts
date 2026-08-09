export type PaymentProvider = "mercadoPago" | "pagBank";

export function normalizePaymentUrl(value: string) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

export function isValidPaymentUrl(value: string, provider: PaymentProvider) {
  const url = normalizePaymentUrl(value);
  if (!url) return true; // pagamento pode ser configurado depois no Admin
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");

    if (provider === "mercadoPago") {
      return (
        host === "mpago.la" ||
        host === "mercadopago.com" ||
        host === "mercadopago.com.br" ||
        host === "link.mercadopago.com.br" ||
        host.endsWith(".mercadopago.com") ||
        host.endsWith(".mercadopago.com.br")
      );
    }

    return (
      host === "pag.ae" ||
      host === "pagbank.com.br" ||
      host.endsWith(".pagbank.com.br") ||
      host === "pagseguro.uol.com.br" ||
      host.endsWith(".pagseguro.uol.com.br")
    );
  } catch {
    return false;
  }
}

export function getPaymentLinks(product: {
  mercadoPagoLink?: string | null;
  pagBankLink?: string | null;
  buyLink?: string | null;
}) {
  const generic = normalizePaymentUrl(product.buyLink ?? "");
  const genericHost = generic ? (() => { try { return new URL(generic).hostname.toLowerCase().replace(/^www\./, ""); } catch { return ""; } })() : "";
  const genericIsMp = ["mpago.la", "mercadopago.com", "mercadopago.com.br", "link.mercadopago.com.br"].some(h => genericHost === h || genericHost.endsWith(`.${h}`));
  const genericIsPb = ["pag.ae", "pagbank.com.br", "pagseguro.uol.com.br"].some(h => genericHost === h || genericHost.endsWith(`.${h}`));
  return {
    mercadoPago: isValidPaymentUrl(product.mercadoPagoLink ?? "", "mercadoPago")
      ? normalizePaymentUrl(product.mercadoPagoLink ?? "")
      : (genericIsMp ? generic : ""),
    pagBank: isValidPaymentUrl(product.pagBankLink ?? "", "pagBank")
      ? normalizePaymentUrl(product.pagBankLink ?? "")
      : (genericIsPb ? generic : ""),
  };
}
