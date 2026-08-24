import React, { useEffect, useId } from "react";
import {
  ArrowDownToLine,
  CornerDownRight,
  Play,
  RotateCw,
  Square,
} from "lucide-react";
import "./styles.css";

const icons = {
  start: Play,
  stop: Square,
  reset: RotateCw,
  lower: ArrowDownToLine,
  advance: CornerDownRight,
};

export default function MachineViewControlsPopupTemplate({
  open = true,
  parts = [],
  selectedPartId,
  actions = [],
  mode = "auto",
  onPartChange,
  onAction,
  onModeChange,
  onClose,
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;

    function closeOnEscape(event) {
      if (event.key === "Escape") onClose?.();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="machine-controls-layer">
      <button
        type="button"
        className="machine-controls-backdrop"
        aria-label="Close machine controls"
        onClick={onClose}
      />

      <section
        className="machine-controls-popup"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
      >
        <h2 id={titleId} className="machine-controls-visually-hidden">Machine part controls</h2>

        <label className="machine-part-select">
          <span className="machine-controls-visually-hidden">Machine part</span>
          <select
            value={selectedPartId}
            onChange={(event) => onPartChange?.(event.target.value)}
            autoFocus
          >
            {parts.map((part) => (
              <option value={part.id} key={part.id}>{part.label}</option>
            ))}
          </select>
          <span className="machine-part-select-arrow" aria-hidden="true" />
        </label>

        <div className="machine-control-row">
          <div className="machine-control-actions" aria-label="Machine commands">
            {actions.map((action) => {
              const Icon = icons[action.icon] ?? RotateCw;
              return (
                <div className="machine-command" key={action.id}>
                  <span className={action.hideLabel ? "machine-controls-visually-hidden" : ""}>
                    {action.label}
                  </span>
                  <button
                    type="button"
                    className={`machine-command-button is-${action.tone}`}
                    aria-label={action.label}
                    onClick={() => onAction?.(action.id, selectedPartId)}
                  >
                    <Icon aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="machine-mode-control">
            <span>MAN</span>
            <button
              type="button"
              className={`machine-mode-switch ${mode === "auto" ? "is-auto" : "is-manual"}`}
              role="switch"
              aria-checked={mode === "auto"}
              aria-label={`Machine mode: ${mode === "auto" ? "Automatic" : "Manual"}`}
              onClick={() => onModeChange?.(mode === "auto" ? "manual" : "auto")}
            />
            <span>AUTO</span>
          </div>
        </div>
      </section>
    </div>
  );
}
