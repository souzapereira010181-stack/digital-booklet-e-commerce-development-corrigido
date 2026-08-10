export default function PoliticaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">🔒 Política de Privacidade</h1>
      <p className="text-gray-400 mb-8">Última atualização: Janeiro de 2025</p>
      <div className="prose dark:prose-invert space-y-6">
        {[
          { t: "1. Dados que coletamos", c: "Coletamos nome, e-mail e informações de pagamento exclusivamente para processar seus pedidos e fornecer acesso aos produtos comprados. Não vendemos nem compartilhamos seus dados com terceiros para fins comerciais." },
          { t: "2. Como usamos seus dados", c: "Seus dados são usados para: criação e gerenciamento da sua conta, processamento de pagamentos, envio dos produtos adquiridos e comunicações relacionadas à sua compra." },
          { t: "3. Segurança", c: "Todos os dados são transmitidos via HTTPS/SSL. Senhas são armazenadas com hash criptográfico. Pagamentos são processados pelo Mercado Pago com certificação PCI-DSS." },
          { t: "4. Cookies", c: "Utilizamos cookies essenciais para manter sua sessão ativa e cookies de análise anônimos para melhorar nossos serviços." },
          { t: "5. Seus direitos (LGPD)", c: "Você tem direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Entre em contato pelo e-mail privacidade@kleberstore.com.br." },
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
