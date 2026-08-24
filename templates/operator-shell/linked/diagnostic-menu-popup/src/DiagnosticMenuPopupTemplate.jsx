import React from "react";
import { ScanSearch, Search } from "lucide-react";
import "./styles.css";

const icons = {
  "diagnostic-zone": ScanSearch,
  "diagnostic-device": Search,
};

export default function DiagnosticMenuPopupTemplate({
  id = "diagnostic-menu-popup",
  items = [],
  open = true,
  anchorY,
  onSelect,
}) {
  if (!open) return null;

  return (
    <nav
      id={id}
      className="diagnostic-menu-popup"
      style={anchorY == null ? undefined : { "--popup-anchor-y": `${anchorY}px` }}
      aria-label="Menu Diagnostic"
    >
      {items.map((item, index) => {
        const Icon = icons[item.icon] ?? Search;
        return (
          <button
            type="button"
            className="diagnostic-menu-popup-item"
            onClick={() => onSelect?.(item)}
            autoFocus={index === 0}
            key={item.id}
          >
            <Icon aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
