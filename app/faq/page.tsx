"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "Como recebo o PDF após a compra?", a: "Após a confirmação do pagamento, você receberá um e-mail com o link para download do PDF. O acesso também fica disponível na sua conta em 'Meus Produtos'." },
  { q: "Posso acessar o PDF em qualquer dispositivo?", a: "Sim! Os PDFs podem ser abertos em computadores, tablets e celulares. Qualquer leitor de PDF funciona (Adobe Reader, aplicativo nativo do celular, etc.)." },
  { q: "As apostilas são atualizadas?", a: "Sim! Quando uma apostila é atualizada, você recebe a nova versão gratuitamente. Basta acessar sua conta e baixar novamente." },
  { q: "Quais são as formas de pagamento?", a: "Aceitamos PIX (aprovação imediata), cartão de crédito (parcelado em até 3x sem juros) e boleto bancário (aprovação em até 3 dias úteis)." },
  { q: "Posso pedir reembolso?", a: "Sim! Oferecemos garantia de 7 dias. Se não ficar satisfeito, entre em contato e reembolsamos 100%." },
  { q: "Os cupons de desconto são cumulativos?", a: "Não. Apenas um cupom pode ser utilizado por pedido." },
  { q: "Posso imprimir as apostilas?", a: "Sim! As apostilas estão em formato PDF de alta qualidade e podem ser impressas normalmente." },
  { q: "Como funciona o Pack Completo?", a: "O Pack Completo inclui todas as 50 apostilas por um preço especial, com acesso vitalício e todas as atualizações futuras inclusas gratuitamente." },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">❓ Perguntas Frequentes</h1>
        <p className="text-gray-500 dark:text-gray-400">Respostas para as dúvidas mais comuns</p>
      </div>
      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-100 dark:border-gray-800 overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-semibold text-gray-900 dark:text-white text-sm pr-4">{faq.q}</span>
              <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
