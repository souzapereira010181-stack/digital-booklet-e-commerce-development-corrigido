# CORREÇÃO — PAGAMENTO E BOTÃO COMPRAR

Correções aplicadas nesta versão:

1. O catálogo da loja passa a ler o mesmo `store.json` usado pelo Admin.
   - Links de Mercado Pago/PagBank salvos no Admin agora aparecem também na Home e nas categorias.
   - Antes, a Home/categorias usavam `PRODUCTS` estático com links vazios, fazendo aparecer "Pagamento ainda não configurado".

2. Validação dos links de pagamento corrigida.
   - Mercado Pago aceita `mpago.la`, `mercadopago.com.br` e `link.mercadopago.com.br`.
   - PagBank aceita `pag.ae` e domínios oficiais do PagBank/PagSeguro.
   - `https://` é acrescentado quando necessário.

3. Botão `Comprar` corrigido.
   - Um único link: abre diretamente o checkout externo.
   - Dois links: abre as opções Mercado Pago/PagBank.
   - Nenhum link: informa claramente que o pagamento precisa ser configurado.

4. Carrinho corrigido para usar exatamente a mesma validação dos links.

5. O erro de hidratação do contador do carrinho no Header foi corrigido para evitar leitura do estado persistido durante a renderização do servidor.

6. O formulário Admin preserva a descrição ao editar e valida preço.

7. O login agora respeita `?next=/admin`, facilitando voltar ao painel depois de uma sessão administrativa expirada.

IMPORTANTE:
O projeto não inventa nem cria um checkout bancário sozinho. Para o pagamento funcionar de verdade, cada apostila precisa ter um link real criado no Mercado Pago ou PagBank e salvo no Admin. Não coloque links de exemplo.
