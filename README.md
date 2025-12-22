# Site — Cases

> CI: GitHub Actions — Check inline styles

> Replace OWNER and REPO in the badge URL below with your GitHub account and repository name.

![Check inline styles](https://github.com/GabrielePedro/REPO/actions/workflows/check-inline-styles.yml/badge.svg)

Arquivos iniciais do site com 4 páginas: Home, Case Yampi, Case Atlas, Case Mercado Pago.

Estrutura principal:

- `index.html` — home
- `case-yampi.html`, `case-atlas.html`, `case-mercadopago.html` — pages de case
- `styles/_tokens.css` — variáveis CSS geradas a partir dos tokens
- `styles/style.css` — estilos principais
- `tokens.json` — tokens em JSON para integração

Como trabalhar com tokens do Figma:

1. Exporte os tokens do Figma (Color/Spacing) como JSON.
2. Atualize `tokens.json` e `styles/_tokens.css` com os valores exportados.

Visualizar localmente (servidor estático simples):

```bash
# macOS / zsh
python3 -m http.server 8000
# então abra http://localhost:8000
```
