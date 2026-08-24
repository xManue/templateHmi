# Consumption

Template React HMI per visualizzare il consumo d'aria e le misure elettriche.
Il componente e i dati dimostrativi sono separati: durante la generazione del
pannello i valori fittizi in `src/templateData.js` possono essere sostituiti con
tag PLC, API o dati WebSocket.

## Avvio

```powershell
pnpm install
pnpm run dev:consumption
```

## Collegamento

Il template è collegato alla voce `Consumption` del popup `Main` di
`operator-shell`.
