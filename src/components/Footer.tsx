import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <BookOpen size={22} className="text-white" />
            </div>
            <div>
              <div className="font-black text-lg">KLEBER STORE</div>
              <div className="text-xs text-gray-400">Segurança • APH • Resgate</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Apostilas profissionais em PDF para quem trabalha com segurança do trabalho, APH e resgate.
          </p>
          <div className="flex gap-3 mt-4">
            {["📘 Facebook", "📸 Instagram", "▶️ YouTube"].map((s) => (
              <button key={s} className="text-xs text-gray-500 hover:text-white transition-colors">{s}</button>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-gray-300 uppercase tracking-wide">Apostilas</h4>
          <ul className="space-y-2">
            {["Normas Regulamentadoras", "Primeiros Socorros", "Resgate e Salvamento", "Prevenção de Incêndios", "Equipamentos de Proteção"].map((l) => (
              <li key={l}>
                <Link href="/apostilas" className="text-sm text-gray-400 hover:text-white transition-colors">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-gray-300 uppercase tracking-wide">Informações</h4>
          <ul className="space-y-2">
            {[
              { href: "/sobre", label: "Sobre Nós" },
              { href: "/contato", label: "Contato" },
              { href: "/politica-privacidade", label: "Política de Privacidade" },
              { href: "/termos", label: "Termos de Uso" },
              { href: "/faq", label: "Perguntas Frequentes" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-gray-300 uppercase tracking-wide">Pagamentos</h4>
          <div className="flex flex-wrap gap-2">
            {["💳 Cartão", "📱 PIX", "🏦 Boleto", "💰 Parcelado"].map((p) => (
              <span key={p} className="bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-lg">{p}</span>
            ))}
          </div>
          <div className="mt-4">
            <div className="text-xs text-gray-400 mb-2">🔒 Compra 100% Segura</div>
            <div className="text-xs text-gray-500">Processado pelo Mercado Pago</div>
          </div>
          <div className="mt-4">
            <h5 className="text-sm font-semibold text-gray-300 mb-2">Newsletter</h5>
            <div className="flex">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 bg-gray-800 text-white text-xs px-3 py-2 rounded-l-lg border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-r-lg transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Kleber Store. Todos os direitos reservados.
        </p>
        <p className="text-xs text-gray-600">
          Desenvolvido com ❤️ | Next.js + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
