export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count?: number;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  categoryId: number;
  coverImage: string;
  pages: number;
  format: string;
  tags: string[];
  /** Link de pagamento direto no Mercado Pago (ex: https://mpago.la/…) */
  mercadoPagoLink: string;
  /** Link de pagamento direto no PagBank (ex: https://pag.ae/…) */
  pagBankLink: string;
  /** Compatibilidade com versões antigas que usavam um único link de compra. */
  buyLink?: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  salesCount: number;
};

export const CATEGORIES: Category[] = [
  { id: 1, name: "Normas Regulamentadoras", slug: "normas-regulamentadoras", icon: "📋", description: "Apostilas completas sobre NRs", count: 18 },
  { id: 2, name: "Primeiros Socorros",       slug: "primeiros-socorros",       icon: "🏥", description: "APH e emergências médicas",    count: 12 },
  { id: 3, name: "Resgate e Salvamento",     slug: "resgate-salvamento",       icon: "🚒", description: "Técnicas avançadas de resgate", count: 10 },
  { id: 4, name: "Prevenção de Incêndios",   slug: "prevencao-incendios",      icon: "🔥", description: "Combate e prevenção",           count: 6  },
  { id: 5, name: "Equipamentos de Proteção", slug: "equipamentos-protecao",    icon: "🦺", description: "EPI e EPC",                     count: 4  },
];

// ---------------------------------------------------------------------------
// Links de pagamento padrão (substitua pelos links reais de cada apostila)
// Mercado Pago: crie seu link em https://www.mercadopago.com.br/cobrar
// PagBank:      crie seu link em https://pagseguro.uol.com.br/cobrar
// ---------------------------------------------------------------------------
const MP  = "";   // configure no painel Admin o link real do Mercado Pago
const PB  = "";     // configure no painel Admin o link real do PagBank

export const PRODUCTS: Product[] = [
  {
    id: 1, title: "NR-1 – Disposições Gerais e Gerenciamento de Riscos", slug: "nr-1-disposicoes-gerais",
    description: "Apostila completa sobre a NR-1, abordando disposições gerais, campo de aplicação, gerenciamento de riscos ocupacionais (GRO) e Programa de Gerenciamento de Riscos (PGR). Inclui exemplos práticos, fluxogramas e questões de fixação.",
    shortDescription: "NR-1 completa com GRO e PGR atualizados",
    price: 39.90, originalPrice: 59.90, categoryId: 1, coverImage: "/images/apostilas/nr1.svg",
    pages: 85, format: "PDF", tags: ["NR-1","GRO","PGR","segurança"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: true, rating: 4.9, reviewCount: 127, salesCount: 843,
  },
  {
    id: 2, title: "NR-5 – CIPA – Comissão Interna de Prevenção de Acidentes", slug: "nr-5-cipa",
    description: "Tudo sobre a CIPA: constituição, funcionamento, eleições, atribuições e obrigações legais. Material didático com casos práticos e formulários prontos.",
    shortDescription: "Guia completo da CIPA com formulários",
    price: 34.90, originalPrice: 49.90, categoryId: 1, coverImage: "/images/apostilas/nr5.svg",
    pages: 72, format: "PDF", tags: ["NR-5","CIPA","prevenção"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 89, salesCount: 412,
  },
  {
    id: 3, title: "NR-6 – Equipamentos de Proteção Individual (EPI)", slug: "nr-6-epi",
    description: "Apostila detalhada sobre EPI: seleção, fornecimento, higienização, guarda e descarte. Inclui tabela completa com todos os EPIs por função e CA.",
    shortDescription: "EPI completo: seleção, uso e descarte",
    price: 34.90, originalPrice: 49.90, categoryId: 5, coverImage: "/images/apostilas/nr6.svg",
    pages: 68, format: "PDF", tags: ["NR-6","EPI","proteção individual"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 95, salesCount: 528,
  },
  {
    id: 4, title: "NR-10 – Segurança em Instalações e Serviços em Eletricidade", slug: "nr-10-eletricidade",
    description: "Material completo sobre NR-10: medidas de controle, prontuário, habilitação, capacitação e reciclagem. Inclui esquemas elétricos e estudos de caso.",
    shortDescription: "NR-10 completa com esquemas elétricos",
    price: 44.90, originalPrice: 64.90, categoryId: 1, coverImage: "/images/apostilas/nr10.svg",
    pages: 96, format: "PDF", tags: ["NR-10","eletricidade","instalações"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: true, rating: 4.9, reviewCount: 203, salesCount: 1204,
  },
  {
    id: 5, title: "NR-11 – Transporte, Movimentação, Armazenagem e Manuseio de Materiais", slug: "nr-11-transporte-materiais",
    description: "Apostila sobre operação de empilhadeiras, equipamentos de transporte e armazenagem segura de materiais. Com checklist e inspeção.",
    shortDescription: "Empilhadeiras e transporte de materiais",
    price: 39.90, categoryId: 1, coverImage: "/images/apostilas/nr11.svg",
    pages: 78, format: "PDF", tags: ["NR-11","empilhadeira","armazenagem"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.6, reviewCount: 67, salesCount: 298,
  },
  {
    id: 6, title: "NR-12 – Segurança no Trabalho em Máquinas e Equipamentos", slug: "nr-12-maquinas-equipamentos",
    description: "NR-12 completa: proteções de máquinas, distâncias de segurança, dispositivos de partida e parada, manutenção e inspeção. Inclui anexos técnicos.",
    shortDescription: "NR-12 com proteções e distâncias de segurança",
    price: 49.90, originalPrice: 74.90, categoryId: 1, coverImage: "/images/apostilas/nr12.svg",
    pages: 112, format: "PDF", tags: ["NR-12","máquinas","equipamentos"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: true, rating: 4.9, reviewCount: 178, salesCount: 967,
  },
  {
    id: 7, title: "NR-17 – Ergonomia", slug: "nr-17-ergonomia",
    description: "Ergonomia aplicada ao trabalho: mobiliário, equipamentos, condições ambientais, organização do trabalho e AET. Inclui fichas de avaliação.",
    shortDescription: "Ergonomia completa com AET e fichas",
    price: 39.90, categoryId: 1, coverImage: "/images/apostilas/nr17.svg",
    pages: 82, format: "PDF", tags: ["NR-17","ergonomia","AET"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 112, salesCount: 634,
  },
  {
    id: 8, title: "NR-18 – Condições e Meio Ambiente de Trabalho na Indústria da Construção", slug: "nr-18-construcao-civil",
    description: "NR-18 atualizada para construção civil: PCMAT, estruturas, escadas, proteções coletivas e individuais. Material completo com ilustrações técnicas.",
    shortDescription: "NR-18 construção civil com PCMAT",
    price: 49.90, originalPrice: 69.90, categoryId: 1, coverImage: "/images/apostilas/nr18.svg",
    pages: 128, format: "PDF", tags: ["NR-18","construção civil","PCMAT"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 145, salesCount: 789,
  },
  {
    id: 9, title: "NR-23 – Proteção Contra Incêndios", slug: "nr-23-incendios",
    description: "Proteção contra incêndios: saídas de emergência, sinalização, extintores e sistemas fixos. Inclui plano de emergência modelo.",
    shortDescription: "Proteção contra incêndios e plano de emergência",
    price: 39.90, categoryId: 4, coverImage: "/images/apostilas/nr23.svg",
    pages: 75, format: "PDF", tags: ["NR-23","incêndio","emergência"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 88, salesCount: 445,
  },
  {
    id: 10, title: "NR-33 – Segurança e Saúde nos Trabalhos em Espaços Confinados", slug: "nr-33-espacos-confinados",
    description: "Espaços confinados: identificação, avaliação atmosférica, EPI específico, resgate e procedimentos de emergência. Inclui PTE modelo.",
    shortDescription: "Espaços confinados completo com PTE",
    price: 49.90, originalPrice: 69.90, categoryId: 1, coverImage: "/images/apostilas/nr33.svg",
    pages: 95, format: "PDF", tags: ["NR-33","espaço confinado","PTE"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: true, rating: 4.9, reviewCount: 167, salesCount: 892,
  },
  {
    id: 11, title: "NR-35 – Trabalho em Altura", slug: "nr-35-trabalho-em-altura",
    description: "Trabalho em altura: análise de risco, ART, sistemas de proteção coletiva e individual, escadas e andaimes. PT modelo inclusa.",
    shortDescription: "NR-35 com ART e PT modelo",
    price: 44.90, originalPrice: 64.90, categoryId: 1, coverImage: "/images/apostilas/nr35.svg",
    pages: 88, format: "PDF", tags: ["NR-35","trabalho em altura","ART"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: true, rating: 4.9, reviewCount: 231, salesCount: 1456,
  },
  {
    id: 12, title: "Primeiros Socorros – APH Básico", slug: "primeiros-socorros-aph-basico",
    description: "Curso completo de APH Básico: avaliação da cena, cinemática do trauma, avaliação da vítima, suporte básico de vida e transporte de emergência.",
    shortDescription: "APH Básico completo com avaliação e transporte",
    price: 49.90, originalPrice: 74.90, categoryId: 2, coverImage: "/images/apostilas/aph.svg",
    pages: 145, format: "PDF", tags: ["APH","primeiros socorros","trauma"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: true, rating: 4.9, reviewCount: 312, salesCount: 2103,
  },
  {
    id: 13, title: "RCP – Ressuscitação Cardiopulmonar Atualizada", slug: "rcp-ressuscitacao-cardiopulmonar",
    description: "RCP conforme diretrizes AHA 2020-2025: reconhecimento de PCR, acionamento do SAMU, compressões torácicas, ventilação e uso do DEA.",
    shortDescription: "RCP atualizado AHA 2025 com DEA",
    price: 39.90, categoryId: 2, coverImage: "/images/apostilas/rcp.svg",
    pages: 68, format: "PDF", tags: ["RCP","PCR","DEA","AHA"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: true, rating: 4.9, reviewCount: 287, salesCount: 1876,
  },
  {
    id: 14, title: "Trauma e Imobilização – Técnicas Avançadas", slug: "trauma-imobilizacao",
    description: "Técnicas de imobilização: coluna cervical, membros, pelve e tórax. Inclui uso de prancha longa, maca caixão e KED. Com fotos ilustrativas.",
    shortDescription: "Imobilização completa com técnicas avançadas",
    price: 44.90, originalPrice: 59.90, categoryId: 2, coverImage: "/images/apostilas/trauma.svg",
    pages: 98, format: "PDF", tags: ["trauma","imobilização","coluna"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 156, salesCount: 934,
  },
  {
    id: 15, title: "Queimaduras – Avaliação e Tratamento Pré-Hospitalar", slug: "queimaduras-aph",
    description: "Classificação de queimaduras, cálculo da área queimada (regra dos 9), reposição volêmica e cuidados pré-hospitalares especializados.",
    shortDescription: "Queimaduras: classificação e tratamento",
    price: 34.90, categoryId: 2, coverImage: "/images/apostilas/queimaduras.svg",
    pages: 55, format: "PDF", tags: ["queimaduras","APH","regra dos 9"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 78, salesCount: 421,
  },
  {
    id: 16, title: "Afogamento – Resgate e Suporte de Vida", slug: "afogamento-resgate",
    description: "Protocolo de resgate em afogamento: classificação de Szpilman, ressuscitação de afogados, hipotermia e cuidados especiais.",
    shortDescription: "Afogamento: protocolo e resgate aquático",
    price: 39.90, categoryId: 2, coverImage: "/images/apostilas/afogamento.svg",
    pages: 72, format: "PDF", tags: ["afogamento","resgate aquático","Szpilman"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 94, salesCount: 567,
  },
  {
    id: 17, title: "Busca e Resgate em Estruturas Colapsadas (BREC)", slug: "brec-estruturas-colapsadas",
    description: "Técnicas de busca e resgate em estruturas colapsadas: avaliação estrutural, técnicas de busca, escoramentos e extração de vítimas.",
    shortDescription: "BREC completo com escoramentos e extração",
    price: 59.90, originalPrice: 84.90, categoryId: 3, coverImage: "/images/apostilas/brec.svg",
    pages: 168, format: "PDF", tags: ["BREC","resgate","estruturas"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: true, rating: 4.9, reviewCount: 134, salesCount: 678,
  },
  {
    id: 18, title: "Técnicas de Rapel e Descidas em Ambientes Verticais", slug: "rapel-ambientes-verticais",
    description: "Técnicas de rapel para resgatistas: equipamentos, ancoragens, sistemas de freio, autoasseguração e resgate em altura.",
    shortDescription: "Rapel e descidas verticais para resgatistas",
    price: 49.90, categoryId: 3, coverImage: "/images/apostilas/rapel.svg",
    pages: 112, format: "PDF", tags: ["rapel","resgate vertical","ancoragem"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 167, salesCount: 823,
  },
  {
    id: 19, title: "Resgate Veicular – Técnicas de Desencarceramento", slug: "resgate-veicular",
    description: "Desencarceramento de vítimas em acidentes veiculares: análise estrutural de veículos, uso de ferramentas hidráulicas e procedimentos de segurança.",
    shortDescription: "Desencarceramento e resgate veicular",
    price: 54.90, originalPrice: 74.90, categoryId: 3, coverImage: "/images/apostilas/veicular.svg",
    pages: 134, format: "PDF", tags: ["resgate veicular","desencarceramento","hidráulico"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 112, salesCount: 534,
  },
  {
    id: 20, title: "Salvamento Aquático – Técnicas e Protocolos", slug: "salvamento-aquatico",
    description: "Salvamento aquático: técnicas de aproximação, reboques, extração e cuidados pós-resgate. Inclui operações noturnas e em correntezas.",
    shortDescription: "Salvamento aquático completo",
    price: 49.90, categoryId: 3, coverImage: "/images/apostilas/aquatico.svg",
    pages: 125, format: "PDF", tags: ["salvamento aquático","correnteza","extração"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 88, salesCount: 412,
  },
  {
    id: 21, title: "Combate a Incêndio – Técnicas e Equipamentos", slug: "combate-incendio",
    description: "Técnicas de combate a incêndio: tipos de fogo, extintores, hidrantes, mangueiras e procedimentos de segurança para brigadistas.",
    shortDescription: "Combate a incêndio para brigadistas",
    price: 44.90, originalPrice: 59.90, categoryId: 4, coverImage: "/images/apostilas/incendio.svg",
    pages: 98, format: "PDF", tags: ["incêndio","brigadista","extintor"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 143, salesCount: 756,
  },
  {
    id: 22, title: "Brigada de Emergência – Formação e Treinamento", slug: "brigada-emergencia",
    description: "Formação de brigada de emergência: organização, treinamentos, simulados, plano de abandono e comunicação em emergências.",
    shortDescription: "Brigada de emergência completo",
    price: 39.90, categoryId: 4, coverImage: "/images/apostilas/brigada.svg",
    pages: 86, format: "PDF", tags: ["brigada","emergência","simulado"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.6, reviewCount: 97, salesCount: 478,
  },
  {
    id: 23, title: "PPRA e PCMSO – Elaboração e Implementação", slug: "ppra-pcmso",
    description: "Guia prático para elaboração do PPRA e PCMSO: reconhecimento de riscos, avaliação, controle e documentação completa.",
    shortDescription: "PPRA e PCMSO: guia prático completo",
    price: 49.90, originalPrice: 69.90, categoryId: 1, coverImage: "/images/apostilas/ppra.svg",
    pages: 118, format: "PDF", tags: ["PPRA","PCMSO","riscos"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 189, salesCount: 1023,
  },
  {
    id: 24, title: "LTCAT – Laudo Técnico das Condições Ambientais", slug: "ltcat",
    description: "Elaboração do LTCAT: agentes físicos, químicos e biológicos, metodologia de avaliação e modelos de laudos técnicos.",
    shortDescription: "LTCAT: elaboração e modelos",
    price: 44.90, categoryId: 1, coverImage: "/images/apostilas/ltcat.svg",
    pages: 95, format: "PDF", tags: ["LTCAT","aposentadoria especial","agentes"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 134, salesCount: 678,
  },
  {
    id: 25, title: "EPC – Equipamentos de Proteção Coletiva", slug: "epc-equipamentos-coletivos",
    description: "EPC: tipos, aplicações, instalação e manutenção. Guarda-corpo, redes de proteção, sinalização e dispositivos de segurança.",
    shortDescription: "EPC completo: tipos e instalação",
    price: 39.90, categoryId: 5, coverImage: "/images/apostilas/epc.svg",
    pages: 78, format: "PDF", tags: ["EPC","proteção coletiva","guarda-corpo"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.6, reviewCount: 76, salesCount: 354,
  },
  {
    id: 26, title: "Análise de Acidente de Trabalho – Métodos e Técnicas", slug: "analise-acidente-trabalho",
    description: "Metodologias de análise de acidentes: Árvore de Causas, FMEA, 5 Porquês e relatórios técnicos. Com modelos prontos.",
    shortDescription: "Análise de acidentes com métodos e modelos",
    price: 44.90, originalPrice: 64.90, categoryId: 1, coverImage: "/images/apostilas/acidente.svg",
    pages: 102, format: "PDF", tags: ["acidente","análise","árvore de causas"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 156, salesCount: 812,
  },
  {
    id: 27, title: "Higiene Ocupacional – Ruído, Calor e Produtos Químicos", slug: "higiene-ocupacional",
    description: "Avaliação de agentes físicos e químicos: dosimetria de ruído, medição de calor (IBUTG), avaliação de químicos e limites de tolerância.",
    shortDescription: "Higiene ocupacional: medição e avaliação",
    price: 49.90, categoryId: 1, coverImage: "/images/apostilas/higiene.svg",
    pages: 114, format: "PDF", tags: ["higiene","ruído","IBUTG","químicos"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 123, salesCount: 634,
  },
  {
    id: 28, title: "NR-7 – Programa de Controle Médico de Saúde Ocupacional", slug: "nr-7-pcmso",
    description: "NR-7 completa: PCMSO, ASO, exames obrigatórios, SESMT e responsabilidades. Modelos de documentos inclusos.",
    shortDescription: "NR-7 e PCMSO com modelos",
    price: 39.90, categoryId: 1, coverImage: "/images/apostilas/nr7.svg",
    pages: 82, format: "PDF", tags: ["NR-7","PCMSO","ASO"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 98, salesCount: 512,
  },
  {
    id: 29, title: "NR-9 – Avaliação e Controle das Exposições Ocupacionais", slug: "nr-9-exposicoes",
    description: "NR-9 atualizada: PGR, identificação de perigos, avaliação quantitativa e qualitativa e hierarquia de controles.",
    shortDescription: "NR-9 com PGR atualizado",
    price: 39.90, categoryId: 1, coverImage: "/images/apostilas/nr9.svg",
    pages: 88, format: "PDF", tags: ["NR-9","PGR","exposição"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.6, reviewCount: 87, salesCount: 423,
  },
  {
    id: 30, title: "NR-15 – Atividades e Operações Insalubres", slug: "nr-15-insalubridade",
    description: "NR-15 completa: agentes insalubres, graus de insalubridade, metodologia de avaliação e laudos de insalubridade. Todos os anexos.",
    shortDescription: "NR-15 insalubridade completa com anexos",
    price: 44.90, originalPrice: 59.90, categoryId: 1, coverImage: "/images/apostilas/nr15.svg",
    pages: 108, format: "PDF", tags: ["NR-15","insalubridade","agentes"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 167, salesCount: 867,
  },
  {
    id: 31, title: "NR-16 – Atividades e Operações Perigosas", slug: "nr-16-periculosidade",
    description: "NR-16 completa: atividades perigosas, adicional de periculosidade, explosivos, inflamáveis, eletricidade e segurança pessoal.",
    shortDescription: "NR-16 periculosidade completa",
    price: 39.90, categoryId: 1, coverImage: "/images/apostilas/nr16.svg",
    pages: 78, format: "PDF", tags: ["NR-16","periculosidade","adicional"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.6, reviewCount: 89, salesCount: 445,
  },
  {
    id: 32, title: "NR-20 – Segurança e Saúde no Trabalho com Inflamáveis e Combustíveis", slug: "nr-20-inflamaveis",
    description: "NR-20: classificação de inflamáveis, instalações, procedimentos operacionais, treinamentos e emergências com produtos inflamáveis.",
    shortDescription: "NR-20 inflamáveis e combustíveis",
    price: 44.90, categoryId: 1, coverImage: "/images/apostilas/nr20.svg",
    pages: 92, format: "PDF", tags: ["NR-20","inflamável","combustível"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 104, salesCount: 523,
  },
  {
    id: 33, title: "NR-25 – Resíduos Industriais", slug: "nr-25-residuos",
    description: "Gestão de resíduos industriais: classificação, armazenamento, tratamento e destinação final conforme NR-25 e legislação ambiental.",
    shortDescription: "Resíduos industriais: gestão completa",
    price: 34.90, categoryId: 1, coverImage: "/images/apostilas/nr25.svg",
    pages: 65, format: "PDF", tags: ["NR-25","resíduos","ambiental"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.5, reviewCount: 56, salesCount: 267,
  },
  {
    id: 34, title: "NR-26 – Sinalização de Segurança", slug: "nr-26-sinalizacao",
    description: "Sinalização de segurança: cores, símbolos, pictogramas, GHS e aplicações práticas. Inclui galeria de sinalizações.",
    shortDescription: "Sinalização de segurança e GHS",
    price: 34.90, categoryId: 1, coverImage: "/images/apostilas/nr26.svg",
    pages: 68, format: "PDF", tags: ["NR-26","sinalização","GHS"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.6, reviewCount: 72, salesCount: 345,
  },
  {
    id: 35, title: "Incidente Crítico e Gestão do Estresse em Emergências", slug: "estresse-emergencias",
    description: "Gestão do estresse em situações de emergência: reconhecimento, prevenção e intervenção em incidentes críticos para socorristas.",
    shortDescription: "Estresse e incidentes críticos para socorristas",
    price: 34.90, categoryId: 2, coverImage: "/images/apostilas/estresse.svg",
    pages: 58, format: "PDF", tags: ["estresse","incidente crítico","socorrista"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 82, salesCount: 389,
  },
  {
    id: 36, title: "Parto de Emergência e Obstetrícia Pré-Hospitalar", slug: "parto-emergencia",
    description: "Atendimento obstétrico pré-hospitalar: parto normal, complicações, cuidados com o recém-nascido e transferência segura.",
    shortDescription: "Obstetrícia pré-hospitalar e parto de emergência",
    price: 39.90, categoryId: 2, coverImage: "/images/apostilas/parto.svg",
    pages: 74, format: "PDF", tags: ["parto","obstetrícia","APH"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 93, salesCount: 467,
  },
  {
    id: 37, title: "Atendimento Pediátrico e Neonatal em Emergências", slug: "pediatria-emergencia",
    description: "Emergências pediátricas e neonatais: RCP pediátrica, avaliação, acesso venoso e transporte seguro de crianças.",
    shortDescription: "Pediatria de emergência e RCP pediátrica",
    price: 39.90, categoryId: 2, coverImage: "/images/apostilas/pediatria.svg",
    pages: 79, format: "PDF", tags: ["pediatria","neonato","RCP"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 108, salesCount: 534,
  },
  {
    id: 38, title: "Resgate em Ambiente Aquático – Correntezas e Inundações", slug: "resgate-correnteza",
    description: "Técnicas de resgate em correntezas e inundações: lançamento de cordas, técnicas de nado, ancoragens e operações em rios.",
    shortDescription: "Resgate em correntezas e inundações",
    price: 54.90, originalPrice: 74.90, categoryId: 3, coverImage: "/images/apostilas/correnteza.svg",
    pages: 138, format: "PDF", tags: ["correnteza","inundação","resgate aquático"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 121, salesCount: 601,
  },
  {
    id: 39, title: "Trabalho em Espaços Confinados – Treinamento Prático", slug: "espaco-confinado-pratico",
    description: "Prática em espaços confinados: monitoramento atmosférico, sistemas de ventilação, equipamentos de resgate e comunicação.",
    shortDescription: "Espaços confinados: treinamento prático",
    price: 49.90, categoryId: 3, coverImage: "/images/apostilas/confinado2.svg",
    pages: 105, format: "PDF", tags: ["espaço confinado","prático","monitoramento"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 98, salesCount: 489,
  },
  {
    id: 40, title: "Produtos Perigosos – Transporte e Emergências (ABNT)", slug: "produtos-perigosos-transporte",
    description: "Transporte de produtos perigosos: classificação ONU, painéis de risco, FISPQ, procedimentos de emergência e PMERPP.",
    shortDescription: "Produtos perigosos: transporte e emergências",
    price: 49.90, categoryId: 3, coverImage: "/images/apostilas/perigosos.svg",
    pages: 118, format: "PDF", tags: ["produtos perigosos","ONU","FISPQ"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 143, salesCount: 712,
  },
  {
    id: 41, title: "Plano de Resposta a Emergências – Elaboração Completa", slug: "plano-resposta-emergencias",
    description: "Elaboração de PAE e PRE: análise de riscos, acionamento, fluxogramas, responsabilidades e simulados. Com modelos editáveis.",
    shortDescription: "PAE e PRE: elaboração e modelos",
    price: 54.90, originalPrice: 74.90, categoryId: 4, coverImage: "/images/apostilas/pae.svg",
    pages: 142, format: "PDF", tags: ["PAE","PRE","emergência"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 134, salesCount: 678,
  },
  {
    id: 42, title: "FISPQ – Ficha de Informações de Segurança de Produtos Químicos", slug: "fispq-produtos-quimicos",
    description: "Interpretação e elaboração de FISPQ: 16 seções, GHS, pictogramas e aplicação prática na empresa. Casos práticos resolvidos.",
    shortDescription: "FISPQ: interpretação e elaboração",
    price: 39.90, categoryId: 1, coverImage: "/images/apostilas/fispq.svg",
    pages: 82, format: "PDF", tags: ["FISPQ","GHS","químico"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.6, reviewCount: 87, salesCount: 423,
  },
  {
    id: 43, title: "Segurança em Laboratórios – Boas Práticas e NBR", slug: "seguranca-laboratorio",
    description: "Segurança em laboratórios: EPIs específicos, manuseio de produtos químicos, biossegurança, descarte e emergências.",
    shortDescription: "Segurança em laboratórios: boas práticas",
    price: 39.90, categoryId: 5, coverImage: "/images/apostilas/laboratorio.svg",
    pages: 88, format: "PDF", tags: ["laboratório","biossegurança","EPI"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 76, salesCount: 367,
  },
  {
    id: 44, title: "Proteção Respiratória – Seleção e Uso de Respiradores", slug: "protecao-respiratoria",
    description: "Programa de proteção respiratória: seleção, inspeção, limpeza, guarda e descarte de respiradores. Teste de vedação e treinamento.",
    shortDescription: "Proteção respiratória: programa completo",
    price: 39.90, categoryId: 5, coverImage: "/images/apostilas/respirador.svg",
    pages: 76, format: "PDF", tags: ["respirador","proteção respiratória","EPI"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 89, salesCount: 445,
  },
  {
    id: 45, title: "Medicina do Trabalho – Doenças Ocupacionais", slug: "doencas-ocupacionais",
    description: "Principais doenças ocupacionais: LER/DORT, pneumoconioses, PAIR, intoxicações e transtornos mentais relacionados ao trabalho.",
    shortDescription: "Doenças ocupacionais: prevenção e diagnóstico",
    price: 44.90, categoryId: 1, coverImage: "/images/apostilas/medicina.svg",
    pages: 112, format: "PDF", tags: ["doenças ocupacionais","LER","PAIR"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 112, salesCount: 567,
  },
  {
    id: 46, title: "Comunicação em Emergências – Rádio e Sistemas", slug: "comunicacao-emergencias",
    description: "Comunicação em emergências: rádio VHF/UHF, alfabeto fonético, procedimentos operacionais e comunicação interagências.",
    shortDescription: "Rádio e comunicação em emergências",
    price: 34.90, categoryId: 3, coverImage: "/images/apostilas/radio.svg",
    pages: 65, format: "PDF", tags: ["comunicação","rádio","emergência"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.6, reviewCount: 67, salesCount: 312,
  },
  {
    id: 47, title: "Acidente Ampliado – Gestão de Múltiplas Vítimas", slug: "multiplas-vitimas",
    description: "START e SALT triage, postos médicos avançados, comando de incidentes (ICS/COGS) e gestão de múltiplas vítimas.",
    shortDescription: "Múltiplas vítimas: triagem e gestão",
    price: 49.90, originalPrice: 69.90, categoryId: 2, coverImage: "/images/apostilas/multiplas.svg",
    pages: 128, format: "PDF", tags: ["múltiplas vítimas","START","triagem"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.8, reviewCount: 134, salesCount: 678,
  },
  {
    id: 48, title: "NR-4 – SESMT – Serviços Especializados em Segurança", slug: "nr-4-sesmt",
    description: "NR-4 completa: dimensionamento do SESMT, atividades, registros e integração com CIPA e terceiros.",
    shortDescription: "NR-4 e SESMT: dimensionamento e atividades",
    price: 34.90, categoryId: 1, coverImage: "/images/apostilas/nr4.svg",
    pages: 62, format: "PDF", tags: ["NR-4","SESMT","dimensionamento"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.5, reviewCount: 54, salesCount: 256,
  },
  {
    id: 49, title: "Psicologia das Emergências – Suporte e Intervenção", slug: "psicologia-emergencias",
    description: "Suporte psicológico em emergências: primeiros auxilios psicológicos, debriefing, suporte a vítimas e familiares.",
    shortDescription: "Psicologia em emergências: suporte e debriefing",
    price: 39.90, categoryId: 2, coverImage: "/images/apostilas/psicologia.svg",
    pages: 78, format: "PDF", tags: ["psicologia","suporte","debriefing"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: false, rating: 4.7, reviewCount: 88, salesCount: 423,
  },
  {
    id: 50, title: "Pack Completo – 50 Apostilas Kleber Store", slug: "pack-completo-50-apostilas",
    description: "Pacote completo com todas as 50 apostilas da Kleber Store em PDF. Segurança do Trabalho, APH, Resgate e muito mais. Acesso vitalício e atualizações gratuitas.",
    shortDescription: "Todas as 50 apostilas por um preço especial!",
    price: 297.00, originalPrice: 599.00, categoryId: 1, coverImage: "/images/apostilas/pack.svg",
    pages: 4500, format: "PDF", tags: ["pack","completo","50 apostilas"],
    mercadoPagoLink: MP, pagBankLink: PB, featured: true, rating: 5.0, reviewCount: 421, salesCount: 3456,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: number): Product[] {
  return PRODUCTS.filter((p) => p.categoryId === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
