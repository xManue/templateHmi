import React, { useId } from "react";
import { TriangleAlert } from "lucide-react";
import "./styles.css";

export default function ConsumptionTemplate({
  title = "Consumption",
  air,
  power,
}) {
  const titleId = useId();

  return (
    <section className="consumption-page" aria-labelledby={titleId}>
      <header className="consumption-title">
        <h1 id={titleId}>{title}</h1>
      </header>

      <div className="consumption-grid">
        <ConsumptionPanel section={air} className="consumption-air-panel" />
        <ConsumptionPanel section={power} className="consumption-power-panel" />
      </div>
    </section>
  );
}

function ConsumptionPanel({ section, className }) {
  const headingId = useId();

  return (
    <section className={`consumption-panel ${className}`} aria-labelledby={headingId}>
      <header className="consumption-panel-heading">
        <h2 id={headingId}>{section.title}</h2>
      </header>

      <dl className="consumption-metrics">
        {section.metrics.map((metric) => (
          <div className="consumption-metric-row" key={metric.id}>
            <dt>{metric.label}</dt>
            <dd>
              <output
                className={`consumption-output ${metric.warning ? "has-warning" : ""}`}
                aria-label={`${metric.label} ${metric.value} ${metric.unit}${metric.warning ? ", warning" : ""}`}
              >
                <span className="consumption-output-value">{metric.value}</span>
                <span className="consumption-output-unit">{metric.unit}</span>
                {metric.warning ? <TriangleAlert aria-hidden="true" size={31} strokeWidth={1.8} /> : null}
              </output>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
