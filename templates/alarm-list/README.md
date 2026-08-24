# Alarm List

Pagina HMI React fedele al riferimento `reference/alarm-list.png` e compatibile
con il catalogo `templateHmi`.

## Avvio autonomo

```powershell
pnpm install
pnpm run dev:alarm-list
```

## Utilizzo come componente

```jsx
import AlarmListTemplate from "./templates/alarm-list/src/AlarmListTemplate";

<AlarmListTemplate
  alarms={alarms}
  units={["UN01", "UN02"]}
  onRefresh={(unitId) => loadAlarms(unitId)}
  onUnitChange={(unitId) => setActiveUnit(unitId)}
/>
```

`activeUnit` può essere controllato dall'applicazione esterna oppure gestito
internamente tramite `initialActiveUnit`.
