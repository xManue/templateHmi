# Alarm List

Pagina HMI React fedele al riferimento `reference/alarm-list.png` e compatibile
con il catalogo `templateHmi`.

Lo stesso componente gestisce due modalità tramite la prop `mode`:

- `alarms`: titolo `Alarm` e righe degli allarmi attivi;
- `history`: titolo `History` e righe dello storico.

I contenuti presenti in `src/templateData.js` sono variabili e record fittizi di anteprima, pensati per essere sostituiti soltanto durante la creazione del pannello operatore.

## Avvio autonomo

```powershell
pnpm install
pnpm run dev:alarm-list
```

## Utilizzo come componente

```jsx
import AlarmListTemplate from "./templates/alarm-list/src/AlarmListTemplate";

<AlarmListTemplate
  mode="alarms"
  alarms={alarms}
  history={history}
  units={["UN01", "UN02"]}
  onRefresh={(unitId) => loadAlarms(unitId)}
  onUnitChange={(unitId) => setActiveUnit(unitId)}
/>
```

`activeUnit` può essere controllato dall'applicazione esterna oppure gestito
internamente tramite `initialActiveUnit`.
