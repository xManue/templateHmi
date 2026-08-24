import React from "react";

const zonePaths = {
  conveyor: `M154 592
    L158 486
    C159 449 177 428 214 410
    L348 329
    C391 304 437 293 483 278
    L512 266
    C530 258 547 260 566 271
    L625 318
    C651 339 675 357 700 357
    C716 357 730 351 747 343`,
  area: `M88 408
    L510 232
    L688 344
    L748 316
    L748 382
    L684 405
    L512 300
    L372 349
    L374 454
    L445 494
    L530 619
    L530 680
    L302 758
    L84 638
    Z`,
};

const hotspotPositions = {
  conveyor: { x: 120, y: 653 },
  area: { x: 220, y: 565 },
};

export default function UnscramblerZoneOverlay({ active, onToggle, variant = "conveyor" }) {
  const hotspot = hotspotPositions[variant];

  return (
    <svg
      className="machine-zone-map"
      viewBox="0 0 1926 1088"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Zone interattive della macchina"
    >
      <g className="machine-zone-title" aria-hidden="true">
        <text x="165" y="215">Unscramblers Conveyor</text>
        <line x1="160" y1="226" x2="400" y2="226" />
      </g>

      <g className="machine-zone-geometry" aria-hidden="true">
        <path
          className={`machine-zone-${variant}`}
          vectorEffect="non-scaling-stroke"
          d={zonePaths[variant]}
        />
      </g>

      <g
        className={`machine-hotspot ${active ? "is-active" : ""}`}
        role="button"
        tabIndex="0"
        aria-label="Zona Unscramblers Conveyor"
        aria-pressed={active}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
          }
        }}
      >
        <circle className="machine-hotspot-hit" cx={hotspot.x} cy={hotspot.y} r="45" />
        <circle className="machine-hotspot-ring" cx={hotspot.x} cy={hotspot.y} r="25" />
        <circle className="machine-hotspot-core" cx={hotspot.x} cy={hotspot.y} r="16" />
      </g>
    </svg>
  );
}
