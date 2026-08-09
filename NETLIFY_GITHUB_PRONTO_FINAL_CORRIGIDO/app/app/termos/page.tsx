export default function TermosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">📄 Termos de Uso</h1>
      <p className="text-gray-400 mb-8">Última atualização: Janeiro de 2025</p>
      <div className="space-y-6">
        {[
          { t: "1. Aceitação dos Termos", c: "Ao adquirir qualquer produto da Kleber Store, você concorda com estes Termos de Uso. Caso não concorde, não realize a compra." },
          { t: "2. Produtos Digitais", c: "As apostilas são produtos digitais em formato PDF. Após a compra, você terá acesso vitalício ao download. Não há entrega física." },
          { t: "3. Uso Autorizado", c: "Os produtos adquiridos são de uso pessoal e intransferível. É proibida a reprodução, redistribuição, venda ou compartilhamento dos materiais sem autorização prévia." },
          { t: "4. Garantia", c: "Oferecemos garantia de satisfação de 7 dias corridos. Caso não esteja satisfeito, entre em contato para reembolso integral." },
          { t: "5. Limitação de Responsabilidade", c: "O conteúdo das apostilas é informativo. A Kleber Store não se responsabiliza por decisões profissionais tomadas com base exclusivamente no material." },
          { t: "6. Alterações", c: "Estes termos podem ser alterados a qualquer momento. Continuando a usar nossos serviços após as alterações, você as aceita." },
        ].map((s) => (
          <div key={s.t} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{s.t}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{s.c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
