# Can Line Operator Panel

Pannello React generato componendo i template del catalogo:

- `operator-shell` per header, stati macchina, sidebar e popup Main, Alarms, Manuals e Diagnostic;
- `alarm-list` per Alarm e History;
- `machine-counters` e `consumption` per le pagine aperte dal popup Main;
- viste dedicate `Machine View` e `Manual General` con l'immagine macchina.
- selezione interattiva dell'Unscrambler sinistro con percorso evidenziato in verde.
- popup comandi collegato alla Machine View, con selezione della parte macchina e callback fittizie.

## Avvio

```powershell
pnpm install
pnpm run dev:can-line
```

## Build

```powershell
pnpm run build:can-line
```

I dati dimostrativi sono separati nei template originali. I punti di integrazione
possono essere sostituiti con tag PLC, REST API o WebSocket mantenendo invariata
la struttura grafica.
