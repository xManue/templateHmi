import React, { useState } from "react";
import AlarmListTemplate from "./AlarmListTemplate";
import { alarmListCopy, alarmListVariables, alarms, history, units } from "./templateData";

export default function App() {
  const [activeUnit, setActiveUnit] = useState(units[0]);

  function refreshAlarms(unitId) {
    // Collegare qui REST API, WebSocket o gateway PLC.
    console.info("Refresh alarms requested for", unitId);
  }

  return (
    <AlarmListTemplate
      mode="alarms"
      title={alarmListCopy.alarms.title}
      refreshLabel={alarmListCopy.alarms.refreshLabel}
      alarms={alarms}
      history={history}
      units={units}
      activeUnit={activeUnit}
      visibleRows={alarmListVariables.visibleRows}
      onUnitChange={setActiveUnit}
      onRefresh={refreshAlarms}
    />
  );
}
