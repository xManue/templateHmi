# HMI Template Catalog

Catalogo dei template React utilizzabili dal generatore AI di pannelli operatore.

Ogni cartella dentro `templates/` contiene:

- `template.json`: contratto leggibile dall'AI;
- `src/OperatorShellTemplate.jsx`: componente riutilizzabile;
- `src/App.jsx`: anteprima autonoma;
- `src/templateData.js`: dati dimostrativi e forma delle future variabili;
- `src/styles.css`: stile del template;
- `reference/`: screenshot di riferimento;
- `package.json` e `vite.config.js`: ambiente di anteprima e build.

## Primo avvio

```powershell
cd C:\Users\m.negrini\Desktop\templateHmi
pnpm install
pnpm run dev:operator-shell
```

## Aggiunta di un template

Creare una nuova cartella in `templates/`, aggiungere il relativo `template.json` e registrarla in `templates/index.json`.
