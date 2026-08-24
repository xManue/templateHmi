import React from "react";
import { Activity, Box, CircleCheck, Gauge, RadioTower } from "lucide-react";

const statusCards = [
  { label: "Machine mode", value: "Automatic", icon: Activity, tone: "green" },
  { label: "Line state", value: "Ready", icon: CircleCheck, tone: "green" },
  { label: "Production speed", value: "0 cans/min", icon: Gauge, tone: "blue" },
  { label: "Current format", value: "Format 01", icon: Box, tone: "gray" },
];

export default function MachineView() {
  return (
    <section className="panel-page machine-view-page" aria-labelledby="machine-view-title">
      <header className="panel-page-header">
        <div>
          <span className="eyebrow">MAIN / OVERVIEW</span>
          <h1 id="machine-view-title">Machine View</h1>
        </div>
        <div className="live-state"><RadioTower aria-hidden="true" /> PLC ONLINE</div>
      </header>

      <div className="machine-stage">
        <img src="/machine-line.png" alt="Vista completa della linea automatica" />
        <span className="machine-image-label">Complete line · General overview</span>
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
