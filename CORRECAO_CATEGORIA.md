# Correção do painel administrativo

Esta versão corrige o fluxo local do painel Admin.

## O que foi corrigido

- Categorias são carregadas pelo painel e aparecem no seletor.
- É possível criar novas categorias.
- É possível cadastrar uma apostila.
- O cadastro salva título, preço, descrição, categoria e links Mercado Pago/PagBank.
- É possível selecionar e enviar um PDF de até 50 MB.
- É possível editar preço, categoria, links, destaque e título.
- É possível excluir produtos pelo painel.
- O painel mostra se o produto possui PDF.
- A autenticação Admin usa cookie HTTP-only para proteger as APIs administrativas.
- Quando `DATABASE_URL` começa com `file:`, o projeto usa um armazenamento local JSON (`data/store.json`) para não tentar conectar o PostgreSQL inexistente no ZIP.
- O banco `dev.db` não é apagado nem resetado.

## Primeiro acesso local

O login demo existente continua funcionando:

- Admin: `admin@kleberstore.com`
- Senha: `admin123`

Depois de entrar, abra `/admin`.

## Executar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Observação sobre produção

O armazenamento JSON local é adequado para desenvolvimento/local. Para publicação em Netlify/Vercel, o cadastro de PDFs e produtos deve ser migrado para um banco e storage persistentes (por exemplo, PostgreSQL + storage de objetos). Esta versão não finge que o filesystem do servidor de produção é persistente.
