import React, { useRef, useState } from "react";
import { Activity, Box, CircleCheck, Gauge } from "lucide-react";
import UnscramblerZoneOverlay from "./UnscramblerZoneOverlay";
import MachineViewControlsPopupTemplate from "../linked/machine-view-controls-popup/src/MachineViewControlsPopupTemplate";
import {
  machinePartActions,
  machinePartControlVariables,
  machineParts,
} from "../linked/machine-view-controls-popup/src/templateData";

const statusCards = [
  { label: "Machine mode", value: "Automatic", icon: Activity, tone: "green" },
  { label: "Line state", value: "Ready", icon: CircleCheck, tone: "green" },
  { label: "Production speed", value: "0 cans/min", icon: Gauge, tone: "blue" },
  { label: "Current format", value: "Format 01", icon: Box, tone: "gray" },
];

export default function MachineView() {
  const zoneButtonRef = useRef(null);
  const [activeZone, setActiveZone] = useState(null);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [selectedPartId, setSelectedPartId] = useState(machinePartControlVariables.initialPartId);
  const [machineMode, setMachineMode] = useState(machinePartControlVariables.initialMode);
  const [lastCommand, setLastCommand] = useState(null);
  const unscramblerActive = activeZone === "unscrambler-lids";

  function toggleUnscrambler() {
    if (unscramblerActive && controlsOpen) {
      setControlsOpen(false);
      setActiveZone(null);
      return;
    }

    setActiveZone("unscrambler-lids");
    setSelectedPartId("unscramblers-conveyor");
    setControlsOpen(true);
  }

  function closeControls() {
    setControlsOpen(false);
    setActiveZone(null);
    window.requestAnimationFrame(() => zoneButtonRef.current?.focus());
  }

  return (
    <section className="panel-page machine-view-page" aria-labelledby="machine-view-title">
      <h1 id="machine-view-title" className="visually-hidden">Machine View</h1>

      <div className={`machine-stage ${unscramblerActive ? "has-active-zone" : ""}`}>
        <img
          src="/machine-line.png"
          alt="Vista completa della linea automatica"
          draggable={false}
          onDragStart={(event) => event.preventDefault()}
        />

        <UnscramblerZoneOverlay
          buttonRef={zoneButtonRef}
          active={unscramblerActive}
          onToggle={toggleUnscrambler}
          variant="conveyor"
        />

        <div className="machine-zone-hint" aria-live="polite">
          <span className={unscramblerActive ? "is-active" : ""} />
          {unscramblerActive ? "Unscramblers Conveyor selected" : "Select a machine zone"}
        </div>

        <MachineViewControlsPopupTemplate
          open={controlsOpen}
          parts={machineParts}
          selectedPartId={selectedPartId}
          actions={machinePartActions}
          mode={machineMode}
          onPartChange={setSelectedPartId}
          onAction={(actionId, partId) => setLastCommand({ actionId, partId })}
          onModeChange={setMachineMode}
          onClose={closeControls}
        />

        <span className="visually-hidden" aria-live="polite">
          {lastCommand ? `${lastCommand.actionId} selected for ${lastCommand.partId}` : ""}
        </span>
      </div>

      <div className="status-card-grid">
        {statusCards.map(({ label, value, icon: Icon, tone }) => (
          <article className={`status-card status-${tone}`} key={label}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
