# Publicação da Kleber Store com Supabase

O projeto foi preparado para deixar catálogo, preços, usuários, links de pagamento e alterações do Admin persistentes no Supabase.

## 1. Criar a tabela

No Supabase, abra **SQL Editor**, cole o conteúdo de `supabase/schema.sql` e execute uma vez.

## 2. Variáveis do servidor

No serviço de hospedagem, cadastre:

```env
NEXT_PUBLIC_SUPABASE_URL=https://kwgkvxudh...supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=...
```

A `SUPABASE_SECRET_KEY` é secreta e fica somente no servidor. Não use `NEXT_PUBLIC_` nela.

## 3. Como a loja funciona depois da publicação

- A página pública lê o catálogo persistido no Supabase.
- O Admin salva alterações de preço no Supabase.
- O preço do Pack da página inicial vem do mesmo registro usado no Admin.
- O login do administrador é persistido no mesmo armazenamento.
- O carrinho continua no navegador e é hidratado somente no cliente.
- Os links de Mercado Pago/PagBank continuam sendo os links configurados no Admin.
- PDFs enviados pelo Admin são colocados no Storage do Supabase; o bucket `apostilas` é preparado automaticamente no primeiro upload.

## 4. Conta administrativa

O projeto preserva a conta de demonstração:

- e-mail: `admin@kleberstore.com`
- senha: `123456`

Também é aceita a senha antiga `admin123` para reparar instalações antigas.

Depois de entrar, altere a senha por uma implementação de autenticação definitiva antes de divulgar a loja.

## 5. Hospedagem gratuita

O projeto pode ser publicado em um serviço de hospedagem compatível com Next.js. Configure as três variáveis acima no ambiente de produção e faça o deploy.

O endereço público será algo como:

`https://sua-loja.seu-dominio...`

`http://localhost:3000` continuará servindo apenas para testes no computador onde o projeto está rodando.

## 6. Pagamento

O código não inventa um checkout de pagamento. Para cada produto, configure no Admin o link real do Mercado Pago ou PagBank. O botão **Finalizar compra** usa esse link real.

Assim o fluxo permanece:

**produto → carrinho → finalizar compra → checkout do provedor → pagamento**
