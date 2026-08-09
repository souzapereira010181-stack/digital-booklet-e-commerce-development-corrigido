export default function ContatoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">📞 Fale Conosco</h1>
        <p className="text-gray-500 dark:text-gray-400">Tire suas dúvidas ou envie uma mensagem</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow border border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Enviar Mensagem</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nome</label>
              <input className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Seu nome" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">E-mail</label>
              <input type="email" className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Assunto</label>
              <select className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Dúvida sobre produto</option>
                <option>Problema com download</option>
                <option>Cancelamento</option>
                <option>Sugestão</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mensagem</label>
              <textarea rows={4} className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Sua mensagem..." />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl transition-colors">
              ✉️ Enviar Mensagem
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-4">
          {[
            { icon: "📧", title: "E-mail", info: "contato@kleberstore.com.br", desc: "Respondemos em até 24 horas" },
            { icon: "📱", title: "WhatsApp", info: "(11) 98852-0458", desc: "Seg-Sex, 8h às 18h" },
            { icon: "📍", title: "Localização", info: "São Paulo, SP – Brasil", desc: "100% digital, atendemos todo o Brasil" },
          ].map((item) => (
            <div key={item.title} className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow border border-gray-100 dark:border-gray-800 flex gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">{item.info}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <h3 className="font-black text-lg mb-2">📱 WhatsApp</h3>
            <p className="text-green-100 text-sm mb-4">Fale conosco direto pelo WhatsApp para atendimento rápido!</p>
            <a
              href="https://wa.me/5511988520458"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors"
            >
              💬 Abrir WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
