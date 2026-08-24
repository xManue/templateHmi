import React from "react";
import {
  Cable,
  ChartLine,
  ChartNoAxesCombined,
  Monitor,
  Network,
  ScanSearch,
  Star,
} from "lucide-react";
import "./styles.css";

const icons = {
  "machine-view": Monitor,
  "counter-machine": ScanSearch,
  "special-function": Star,
  interlocks: Cable,
  omac: ChartNoAxesCombined,
  consumption: ChartLine,
  "connection-status": Network,
};

export default function MainMenuPopupTemplate({
  id = "main-menu-popup",
  items = [],
  open = true,
  onSelect,
}) {
  if (!open) return null;

  return (
    <nav id={id} className="main-menu-popup" aria-label="Menu Main">
      {items.map((item, index) => {
        const Icon = icons[item.icon] ?? Monitor;
        return (
          <button
            type="button"
            className="main-menu-popup-item"
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
