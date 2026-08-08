# Correção integrada

## Corrigido
- Hydration do Zustand do carrinho/favoritos/autenticação só ocorre após o primeiro render do cliente.
- Itens inválidos/antigos do carrinho são sanitizados antes de acessar `product.id`.
- Página Admin aguarda a hidratação da autenticação antes de redirecionar, evitando o falso `401`/retorno para login.
- API Admin mantém proteção por cookie e repara a conta demo `admin@kleberstore.com`.
- Fluxo Produto → Carrinho → Checkout → Mercado Pago/PagBank foi preservado.
- Compatibilidade com o antigo campo `buyLink` foi adicionada para não perder links de pagamento já existentes.
- Botões de compra usam os links reais configurados; nenhum link de pagamento fictício foi criado.
- Aviso de `scroll-behavior` do Next foi corrigido com `data-scroll-behavior="smooth"`.
- Tailwind/PostCSS foi ajustado para Tailwind 3 + PostCSS compatível, removendo a dependência problemática `@tailwindcss/postcss` 4.1.17.

## Credenciais demo Admin
- E-mail: `admin@kleberstore.com`
- Senha: `123456`

## Instalação
No Windows, dentro da pasta do projeto:

```powershell
npm install
npm run dev
```

O checkout externo depende dos links reais do Mercado Pago/PagBank cadastrados no Admin. O projeto não inventa nem cria uma cobrança falsa.
