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
          <g className="machine-zone-geometry" aria-hidden="true">
            <path
              className="machine-zone-outline"
              vectorEffect="non-scaling-stroke"
              d="M95 554
                 C125 540 143 520 145 495
                 L148 470
                 C149 430 160 405 195 380
                 L338 300
                 C383 274 430 263 475 248
                 L505 236
                 C528 226 550 228 575 243
                 L635 290
                 C660 310 683 328 706 328
                 C728 328 747 320 768 313
                 L825 300
                 L810 342
                 C782 350 756 360 730 370
                 C708 377 686 376 664 365
                 L606 320
                 C585 304 566 289 546 284
                 C529 279 516 281 498 288
                 L460 302
                 C417 316 379 331 345 350
                 L225 425
                 C193 445 179 465 178 495
                 L174 560
                 C172 590 158 615 134 634
                 L120 644
                 Z"
            />
          </g>

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
