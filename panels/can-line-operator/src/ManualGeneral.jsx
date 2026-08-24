import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Hand, Pause, Play, RotateCcw } from "lucide-react";
import UnscramblerZoneOverlay from "./UnscramblerZoneOverlay";

const machineAreas = [
  "Unscramblers Conveyor",
  "Empty Lids Feeding",
  "Empty Cans Feeding",
  "Lids Buffer",
  "Cans Buffer",
  "Filled Cans Conveyors",
  "Bundler Conveyor",
];

export default function ManualGeneral() {
  const [selectedArea, setSelectedArea] = useState(machineAreas[0]);
  const [mode, setMode] = useState("Manual");
  const [speed, setSpeed] = useState(35);
  const [running, setRunning] = useState(false);
  const [activeZone, setActiveZone] = useState(null);
  const unscramblerActive = activeZone === "unscramblers-conveyor";

  function toggleUnscrambler() {
    setSelectedArea("Unscramblers Conveyor");
    setActiveZone((current) => current === "unscramblers-conveyor" ? null : "unscramblers-conveyor");
  }

  function selectArea(area) {
    setSelectedArea(area);
    setActiveZone(area === "Unscramblers Conveyor" ? "unscramblers-conveyor" : null);
  }

  return (
    <section className="panel-page manual-page" aria-labelledby="manual-title">
      <header className="panel-page-header manual-header">
        <div>
          <span className="eyebrow">MANUALS / MACHINE</span>
          <h1 id="manual-title">Manual General</h1>
        </div>
        <div className={`manual-state ${running ? "is-running" : ""}`}>
          <Hand aria-hidden="true" /> {running ? "MOVEMENT ACTIVE" : "MANUAL READY"}
        </div>
      </header>

      <div className="manual-layout">
        <div className="manual-visual-column">
          <div className={`manual-machine-stage ${unscramblerActive ? "has-active-zone" : ""}`}>
            <img
              src="/machine-line.png"
              alt="Linea automatica per i comandi Manual General"
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
            />
            <UnscramblerZoneOverlay
              active={unscramblerActive}
              onToggle={toggleUnscrambler}
              variant="area"
            />
            <span>{selectedArea}</span>
          </div>

          <div className="area-selector" aria-label="Selezione area macchina">
            {machineAreas.map((area, index) => (
              <button
                type="button"
                className={selectedArea === area ? "is-selected" : ""}
                onClick={() => selectArea(area)}
                key={area}
              >
                <small>{String(index + 1).padStart(2, "0")}</small>
                {area}
              </button>
            ))}
          </div>
        </div>

        <aside className="manual-controls" aria-label="Comandi manuali">
          <div className="control-section">
            <span className="control-label">Selected unit</span>
            <strong>{selectedArea}</strong>
          </div>

          <div className="control-section">
            <span className="control-label">Operating mode</span>
            <div className="segmented-control">
              {["Manual", "Automatic"].map((item) => (
                <button
                  type="button"
                  className={mode === item ? "is-selected" : ""}
                  onClick={() => setMode(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="control-section speed-control">
            <span className="control-label">Manual speed</span>
            <output>{speed}%</output>
            <input
              type="range"
              min="0"
              max="100"
              value={speed}
              aria-label="Manual speed"
              onChange={(event) => setSpeed(Number(event.target.value))}
            />
          </div>

          <div className="jog-controls">
            <button type="button"><ChevronLeft aria-hidden="true" /> JOG −</button>
            <button type="button">JOG + <ChevronRight aria-hidden="true" /></button>
          </div>

          <div className="motion-controls">
            <button type="button" className="reset-control" onClick={() => setSpeed(35)}>
              <RotateCcw aria-hidden="true" /> RESET
            </button>
            <button
              type="button"
              className={running ? "stop-control" : "start-control"}
              onClick={() => setRunning((value) => !value)}
            >
              {running ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
              {running ? "STOP" : "START"}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
