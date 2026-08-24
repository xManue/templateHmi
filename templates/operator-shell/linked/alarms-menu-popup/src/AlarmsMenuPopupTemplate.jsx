import React from "react";
import { History, TriangleAlert } from "lucide-react";
import "./styles.css";

const icons = {
  alarm: TriangleAlert,
  history: History,
};

export default function AlarmsMenuPopupTemplate({
  id = "alarms-menu-popup",
  items = [],
  open = true,
  anchorY,
  onSelect,
}) {
  if (!open) return null;

  return (
    <nav
      id={id}
      className="alarms-menu-popup"
      style={anchorY == null ? undefined : { "--popup-anchor-y": `${anchorY}px` }}
      aria-label="Menu Alarms"
    >
      {items.map((item, index) => {
        const Icon = icons[item.icon] ?? TriangleAlert;
        return (
          <button
            type="button"
            className="alarms-menu-popup-item"
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
