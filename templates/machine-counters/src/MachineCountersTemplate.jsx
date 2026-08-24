import React, { useId, useState } from "react";
import "./styles.css";

export default function MachineCountersTemplate({
  title = "Machine Counters",
  counters,
  diagnostics,
  rejectionReasons = [],
  lastRejectedBundles,
  initialLastRejectedBundles = 1,
  onLastRejectedBundlesChange,
  onResetMetalDetector,
  onResetGoodTotal,
  onResetRejectedTotal,
}) {
  const inputId = useId();
  const [internalLastRejectedBundles, setInternalLastRejectedBundles] = useState(
    initialLastRejectedBundles,
  );
  const selectedLastRejectedBundles = lastRejectedBundles ?? internalLastRejectedBundles;

  function changeLastRejectedBundles(event) {
    const value = Number(event.target.value);
    if (lastRejectedBundles === undefined) setInternalLastRejectedBundles(value);
    onLastRejectedBundlesChange?.(value);
  }

  return (
    <section className="machine-counters-page" aria-labelledby={`${inputId}-title`}>
      <header className="machine-counters-title">
        <h1 id={`${inputId}-title`}>{title}</h1>
      </header>

      <div className="machine-counters-grid">
        <div className="machine-counters-left-column">
          <CounterCard title={counters.metalDetector.title} className="metal-detector-card">
            <div className="metal-detector-row">
              <Metric label={counters.metalDetector.label} value={counters.metalDetector.value} />
              <ActionButton onClick={onResetMetalDetector}>
                {counters.metalDetector.resetLabel}
              </ActionButton>
            </div>
          </CounterCard>

          <CounterCard title={counters.hermosCamera.title}>
            <div className="single-metric-row">
              <Metric
                label={counters.hermosCamera.rejectedLabel}
                value={counters.hermosCamera.rejectedValue}
              />
            </div>
          </CounterCard>

          <CounterCard title={counters.inspectionCamera.title}>
            <div className="inspection-metrics">
              <Metric
                label={counters.inspectionCamera.goodLabel}
                value={counters.inspectionCamera.goodValue}
              />
              <Metric
                label={counters.inspectionCamera.rejectedLabel}
                value={counters.inspectionCamera.rejectedValue}
              />
            </div>
          </CounterCard>

          <section className="counter-card diagnostics-card" aria-labelledby={`${inputId}-diagnostics-title`}>
            <header className="counter-card-heading diagnostics-heading">
              <h2 id={`${inputId}-diagnostics-title`}>{diagnostics.title}</h2>
              <label className="last-rejected-field" htmlFor={`${inputId}-last-rejected`}>
                <span className="sr-only">Last bundles rejected</span>
                <input
                  id={`${inputId}-last-rejected`}
                  type="number"
                  min="1"
                  value={selectedLastRejectedBundles}
                  onChange={changeLastRejectedBundles}
                />
              </label>
            </header>

            <div className="diagnostics-body">
              <div className="diagnostic-values">
                <DiagnosticValue
                  label={diagnostics.centeringLabel}
                  value={diagnostics.centering}
                  tone="danger"
                />
                <DiagnosticValue
                  label={diagnostics.flavorLabel}
                  value={diagnostics.flavor}
                  tone="success"
                />
              </div>

              <ul className="diagnostic-checks" aria-label="Inspection checks">
                {diagnostics.checks.map((check) => (
                  <li key={check.id}>
                    <span>{check.label}</span>
                    <span
                      className={`check-status ${check.active ? "is-active" : ""}`}
                      aria-label={`${check.label}: ${check.active ? "ok" : "not ok"}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <section className="counter-card rejected-details-card" aria-labelledby={`${inputId}-rejected-title`}>
          <header className="counter-card-heading">
            <h2 id={`${inputId}-rejected-title`}>Details of Rejected Inspection Camera Bundles</h2>
          </header>

          <dl className="rejection-reasons">
            {rejectionReasons.map((reason) => (
              <div className="rejection-reason-row" key={reason.id}>
                <dt>{reason.label}</dt>
                <dd>{reason.value}</dd>
              </div>
            ))}
          </dl>

          <footer className="rejected-details-actions">
            <ActionButton onClick={onResetGoodTotal}>Reset Good Material Total</ActionButton>
            <ActionButton onClick={onResetRejectedTotal}>Reset Rejected Material Total</ActionButton>
          </footer>
        </section>
      </div>
    </section>
  );
}

function CounterCard({ title, className = "", children }) {
  return (
    <section className={`counter-card ${className}`.trim()}>
      <header className="counter-card-heading"><h2>{title}</h2></header>
      {children}
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="counter-metric">
      <span>{label}</span>
      <output>{value}</output>
    </div>
  );
}

function DiagnosticValue({ label, value, tone }) {
  return (
    <div className="diagnostic-value">
      <span>{label}</span>
      <output className={`diagnostic-output ${tone}`}>{value}</output>
    </div>
  );
}

function ActionButton({ onClick, children }) {
  return (
    <button type="button" className="machine-counter-action" onClick={onClick}>
      {children}
    </button>
  );
}
