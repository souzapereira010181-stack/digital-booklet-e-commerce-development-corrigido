# Correção definitiva do preço do Pack

O problema era a existência possível de dois registros para o mesmo Pack: um registro inicial do catálogo e outro salvo pelo Admin com ID diferente. O `readStore()` agora faz a mesclagem por **ID ou slug**, preservando o valor salvo pelo Admin e eliminando duplicidade por slug.

A página inicial é `force-dynamic` e agora usa diretamente o valor atual do store no bloco de promoção. A API `/api/products` também envia `Cache-Control: no-store`.

Resultado: o preço alterado no Admin passa a ser o mesmo preço exibido na promoção da página inicial e no produto.
