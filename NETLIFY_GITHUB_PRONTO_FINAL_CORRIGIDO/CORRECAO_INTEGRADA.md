# CORREÇÃO INTEGRADA — KLEBER STORE

Esta versão corrige os problemas juntos, preservando o fluxo de compra.

## 1. Hydration do carrinho
- Zustand agora usa `skipHydration`.
- Carrinho, favoritos e autenticação são reidratados somente após o primeiro render do cliente.
- O contador do Header não participa do HTML inicial do servidor.
- Isso evita o `Hydration failed` causado pelo estado salvo no navegador.

## 2. Produto indefinido no carrinho
- Itens antigos/corrompidos do localStorage são filtrados automaticamente.
- `addItem`, `removeItem`, `updateQuantity`, `total` e `count` não acessam mais `product.id` de um item inválido.
- O carrinho não precisa mais apagar tudo só porque encontrou um item antigo inválido.

## 3. Administração / 401
- O cookie `kleber_admin` continua sendo a autorização do painel.
- O usuário demo `admin@kleberstore.com` é reparado automaticamente quando necessário.
- Senha demo atual: `123456`.
- O login demo do botão também usa `123456`.
- A sessão administrativa continua sendo enviada nas requisições PUT/POST/DELETE.

## 4. Checkout
Fluxo mantido e reforçado:

Produto → Carrinho → **Finalizar compra** → Checkout → Mercado Pago/PagBank.

- O botão Finalizar compra do carrinho agora abre a página `/checkout`.
- No checkout, os botões levam diretamente ao link real do Mercado Pago/PagBank.
- Na página do produto, o botão Finalizar compra continua levando diretamente ao checkout externo configurado.
- Os links de pagamento abrem na mesma aba para evitar bloqueio de nova janela.
- Nenhum link de pagamento real é inventado.

## 5. Categorias e contato
- O Admin carrega as categorias da mesma base usada pela loja.
- O formulário mostra também todas as apostilas existentes para facilitar a seleção da categoria correspondente.
- WhatsApp atualizado para (11) 98852-0458 / `5511988520458`.

## Importante
Cada apostila precisa ter pelo menos um link real de checkout configurado no Admin:
- Mercado Pago: link real do Mercado Pago
- PagBank: link real do PagBank

A aplicação não cria uma cobrança bancária automaticamente apenas com o preço.
