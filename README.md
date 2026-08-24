# HMI Template Catalog

Catalogo dei template React utilizzabili dal generatore AI di pannelli operatore.

I nuovi template devono riprendere il linguaggio visivo del catalogo: fondo nero,
superfici grigio antracite, testi ad alto contrasto, controlli grandi e geometrie
industriali. Lo screenshot incluso in ogni cartella rimane la fonte visiva primaria.

Ogni cartella dentro `templates/` contiene:

- `template.json`: contratto leggibile dall'AI;
- `src/OperatorShellTemplate.jsx`: componente riutilizzabile;
- `src/App.jsx`: anteprima autonoma;
- `src/templateData.js`: dati dimostrativi e forma delle future variabili;
- `src/styles.css`: stile del template;
- `reference/`: screenshot di riferimento;
- `package.json` e `vite.config.js`: ambiente di anteprima e build.

## Organizzazione dei template

- `templates/<template-id>/`: template base o utilizzabili senza dipendere da un altro template;
- `templates/<template-id>/linked/<linked-template-id>/`: template collegati direttamente al template padre.

La relazione viene dichiarata anche in `templates/index.json` tramite `relationship.mode`, `parentTemplateId` e `trigger`. In questo modo il generatore può distinguere i template indipendenti da quelli che completano un flusso esistente.

## Primo avvio

```powershell
cd C:\Users\m.negrini\Desktop\templateHmi
pnpm install
pnpm run dev:operator-shell
pnpm run dev:alarm-list
```

## Aggiunta di un template

Creare una nuova cartella in `templates/`, aggiungere il relativo `template.json` e registrarla in `templates/index.json`.

## Template disponibili

- `operator-shell`: guscio principale con header e navigazione;
- `alarm-list`: pagina allarmi con selezione unità e callback di aggiornamento.
