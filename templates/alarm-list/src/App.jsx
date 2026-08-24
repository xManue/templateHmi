import React, { useState } from "react";
import AlarmListTemplate from "./AlarmListTemplate";
import { alarms, units } from "./templateData";

export default function App() {
  const [activeUnit, setActiveUnit] = useState(units[0]);

  function refreshAlarms(unitId) {
    // Collegare qui REST API, WebSocket o gateway PLC.
    console.info("Refresh alarms requested for", unitId);
  }

  return (
    <AlarmListTemplate
      alarms={alarms}
      units={units}
      activeUnit={activeUnit}
      onUnitChange={setActiveUnit}
      onRefresh={refreshAlarms}
    />
  );
}
