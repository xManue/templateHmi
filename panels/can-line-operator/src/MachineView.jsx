import React, { useState } from "react";
import { Activity, Box, CircleCheck, Gauge } from "lucide-react";

const statusCards = [
  { label: "Machine mode", value: "Automatic", icon: Activity, tone: "green" },
  { label: "Line state", value: "Ready", icon: CircleCheck, tone: "green" },
  { label: "Production speed", value: "0 cans/min", icon: Gauge, tone: "blue" },
  { label: "Current format", value: "Format 01", icon: Box, tone: "gray" },
];

export default function MachineView() {
  const [activeZone, setActiveZone] = useState(null);
  const unscramblerActive = activeZone === "unscrambler-lids";

  function toggleUnscrambler() {
    setActiveZone((current) => current === "unscrambler-lids" ? null : "unscrambler-lids");
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

        <svg
          className="machine-zone-map"
          viewBox="0 0 1926 1088"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Zone interattive della macchina"
        >
          <g className="machine-zone-title" aria-hidden="true">
            <text x="165" y="215">Unscramblers Conveyor</text>
            <line x1="160" y1="226" x2="400" y2="226" />
          </g>

          <g className="machine-zone-geometry" aria-hidden="true">
            <path
              className="machine-zone-area"
              vectorEffect="non-scaling-stroke"
              d="M88 408
                 L510 232
                 L688 344
                 L748 316
                 L748 382
                 L684 405
                 L512 300
                 L372 349
                 L374 454
                 L445 494
                 L530 619
                 L530 680
                 L302 758
                 L84 638
                 Z"
            />
          </g>

          <g
            className={`machine-hotspot ${unscramblerActive ? "is-active" : ""}`}
            role="button"
            tabIndex="0"
            aria-label="Zona Unscramblers Conveyor"
            aria-pressed={unscramblerActive}
            onClick={toggleUnscrambler}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleUnscrambler();
              }
            }}
          >
            <circle className="machine-hotspot-hit" cx="220" cy="565" r="45" />
            <circle className="machine-hotspot-ring" cx="220" cy="565" r="25" />
            <circle className="machine-hotspot-core" cx="220" cy="565" r="16" />
          </g>
        </svg>

        <div className="machine-zone-hint" aria-live="polite">
          <span className={unscramblerActive ? "is-active" : ""} />
          {unscramblerActive ? "Unscramblers Conveyor selected" : "Select a machine zone"}
        </div>
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
