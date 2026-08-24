import React from "react";
import {
  Camera,
  Container,
  Glasses,
  Layers3,
  ScanLine,
} from "lucide-react";
import "./styles.css";

const icons = {
  general: Glasses,
  "lids-cans-conveyor": ScanLine,
  "lids-cans-buffer": Layers3,
  "filled-cans-conveyor": Container,
  "cans-bundler": Camera,
};

export default function ManualsMenuPopupTemplate({
  id = "manuals-menu-popup",
  items = [],
  open = true,
  anchorY,
  onSelect,
}) {
  if (!open) return null;

  return (
    <nav
      id={id}
      className="manuals-menu-popup"
      style={anchorY == null ? undefined : { "--popup-anchor-y": `${anchorY}px` }}
      aria-label="Menu Manuals"
    >
      {items.map((item, index) => {
        const Icon = icons[item.icon] ?? Glasses;
        return (
          <button
            type="button"
            className="manuals-menu-popup-item"
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
