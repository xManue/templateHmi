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
        <img src="/machine-line.png" alt="Vista completa della linea automatica" />

        <svg
          className="machine-zone-map"
          viewBox="0 0 1926 1088"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Zone interattive della macchina"
        >
          <path
            className="machine-zone-path-shadow"
            d="M120 653 C145 641 153 621 154 590 L158 486 C159 449 177 428 214 410 L348 329 C391 304 437 293 483 278 L512 266 C530 258 547 260 566 271 L625 318 C651 339 675 357 700 357 C716 357 730 351 747 343"
          />
          <path
            className="machine-zone-path"
            d="M120 653 C145 641 153 621 154 590 L158 486 C159 449 177 428 214 410 L348 329 C391 304 437 293 483 278 L512 266 C530 258 547 260 566 271 L625 318 C651 339 675 357 700 357 C716 357 730 351 747 343"
          />

          <path className="machine-callout-line" d="M120 653 L120 760 L335 760" />
          <text className="machine-callout-label" x="128" y="793">
            Unscrambler Lids Conveyor
          </text>

          <g
            className={`machine-hotspot ${unscramblerActive ? "is-active" : ""}`}
            role="button"
            tabIndex="0"
            aria-label="Unscrambler sinistro"
            aria-pressed={unscramblerActive}
            onClick={toggleUnscrambler}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleUnscrambler();
              }
            }}
          >
            <circle className="machine-hotspot-hit" cx="120" cy="653" r="45" />
            <circle className="machine-hotspot-ring" cx="120" cy="653" r="25" />
            <circle className="machine-hotspot-core" cx="120" cy="653" r="16" />
          </g>
        </svg>

        <div className="machine-zone-hint" aria-live="polite">
          <span className={unscramblerActive ? "is-active" : ""} />
          {unscramblerActive ? "Unscrambler Lids Conveyor selected" : "Select a machine zone"}
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
