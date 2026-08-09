import Link from "next/link";

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">📚</div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3">Sobre a Kleber Store</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Apostilas profissionais para quem trabalha com Segurança do Trabalho, APH e Resgate
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nossa História</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            A Kleber Store nasceu da necessidade de profissionais de segurança do trabalho, socorristas e resgatistas
            por material didático de qualidade, atualizado e acessível. Fundada por Kleber, profissional com mais de
            10 anos de experiência na área, a loja oferece apostilas cuidadosamente elaboradas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "🎯", title: "Missão", text: "Democratizar o acesso ao conhecimento em segurança do trabalho, APH e resgate através de apostilas profissionais e acessíveis." },
            { icon: "👁️", title: "Visão", text: "Ser a principal referência em material didático digital para profissionais de segurança e saúde no trabalho no Brasil." },
            { icon: "💪", title: "Valores", text: "Qualidade, atualização constante, acessibilidade e compromisso com a segurança e saúde dos trabalhadores brasileiros." },
          ].map((v) => (
            <div key={v.title} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-800 text-center">
              <div className="text-4xl mb-3">{v.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black mb-3">Pronto para começar?</h2>
          <p className="text-blue-200 mb-6">Explore nossas 50 apostilas e escolha a que você precisa</p>
          <Link href="/apostilas" className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-black px-8 py-3 rounded-2xl transition-colors">
            Ver Apostilas →
          </Link>
        </div>
      </div>
    </div>
  );
}
