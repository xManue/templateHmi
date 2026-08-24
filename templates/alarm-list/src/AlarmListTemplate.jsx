import React, { useState } from "react";
import "./styles.css";

const fallbackUnits = Array.from(
  { length: 12 },
  (_, index) => `UN${String(index + 1).padStart(2, "0")}`,
);

export default function AlarmListTemplate({
  mode = "alarms",
  title,
  refreshLabel,
  alarms = [],
  history = [],
  units = fallbackUnits,
  activeUnit,
  initialActiveUnit = units[0],
  visibleRows = 21,
  onRefresh,
  onUnitChange,
}) {
  const [internalUnit, setInternalUnit] = useState(initialActiveUnit);
  const selectedUnit = activeUnit ?? internalUnit;
  const historyMode = mode === "history";
  const resolvedTitle = title ?? (historyMode ? "History" : "Alarm");
  const resolvedRefreshLabel = refreshLabel ?? (historyMode ? "Refresh History" : "Refresh Alarms");
  const records = historyMode ? history : alarms;
  const rowNumbers = Array.from({ length: visibleRows }, (_, index) => index + 1);

  function selectUnit(unit) {
    if (activeUnit === undefined) setInternalUnit(unit);
    onUnitChange?.(unit);
  }

  return (
    <div className="hmi-alarm-page">
      <section className="alarm-panel" aria-label={resolvedTitle}>
        <header className="alarm-toolbar">
          <h1>{resolvedTitle}</h1>
          <button type="button" className="refresh-button" onClick={() => onRefresh?.(selectedUnit, mode)}>
            {resolvedRefreshLabel}
          </button>
        </header>

        <div className="alarm-table" role="table" aria-label="Alarm list">
          <div className="alarm-table-header" role="row">
            <span className="cell row-heading" role="columnheader" aria-label="Row" />
            <span className="cell id-heading" role="columnheader">ID</span>
            <span className="cell category-heading" role="columnheader">Cat</span>
            <span className="cell text-heading" role="columnheader">Alarm text</span>
            <span className="cell time-heading" role="columnheader">Time</span>
            <span className="cell unit-heading" role="columnheader">UN - Name</span>
          </div>

          <div className="alarm-table-body">
            <div
              className="row-numbers"
              style={{ "--visible-rows": visibleRows }}
              aria-hidden="true"
            >
              {rowNumbers.map((number) => <span key={number}>{number}</span>)}
            </div>
            <div className="alarm-data">
              {records.slice(0, visibleRows).map((alarm) => (
                <div className="alarm-data-row" role="row" key={alarm.id}>
                  <span role="cell">{alarm.id}</span>
                  <span role="cell">{alarm.category}</span>
                  <span role="cell">{alarm.text}</span>
                  <span role="cell">{alarm.time}</span>
                  <span role="cell">{alarm.unitName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <nav className="unit-navigation" aria-label="Unit navigation">
        {units.map((unit) => (
          <button
            type="button"
            className={`unit-button ${unit === selectedUnit ? "is-active" : ""}`}
            aria-pressed={unit === selectedUnit}
            onClick={() => selectUnit(unit)}
            key={unit}
          >
            {unit}
          </button>
        ))}
      </nav>
    </div>
  );
}
