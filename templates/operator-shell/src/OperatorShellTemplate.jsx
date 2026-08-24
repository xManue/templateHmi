import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  BarChart3,
  ChevronDown,
  EthernetPort,
  Home,
  ListChecks,
  Settings,
  SlidersHorizontal,
  TriangleAlert,
  UserRound,
  Wrench,
} from "lucide-react";
import MainMenuPopupTemplate from "../linked/main-menu-popup/src/MainMenuPopupTemplate";

const icons = {
  home: Home,
  settings: Settings,
  alarm: TriangleAlert,
  statistics: BarChart3,
  manuals: Wrench,
  diagnostic: Activity,
  formats: ListChecks,
};

export default function OperatorShellTemplate({
  navigationItems,
  machineStates,
  connection,
  userName,
  initialSection = "main",
  onSectionChange,
  mainMenuItems = [],
  onMainMenuItemSelect,
  children,
}) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const mainMenuButtonRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!mainMenuOpen) return undefined;

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setMainMenuOpen(false);
        window.requestAnimationFrame(() => mainMenuButtonRef.current?.focus());
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mainMenuOpen]);

  const statusColumns = useMemo(() => {
    const midpoint = Math.ceil(machineStates.length / 2);
    return [machineStates.slice(0, midpoint), machineStates.slice(midpoint)];
  }, [machineStates]);

  function selectSection(item) {
    if (item.id === "main" && mainMenuItems.length > 0) {
      setActiveSection(item.id);
      setMainMenuOpen((open) => !open);
      onSectionChange?.(item.id);
      return;
    }

    setActiveSection(item.id);
    setMainMenuOpen(false);
    onSectionChange?.(item.id);
  }

  function selectMainMenuItem(item) {
    setMainMenuOpen(false);
    window.requestAnimationFrame(() => mainMenuButtonRef.current?.focus());
    onMainMenuItemSelect?.(item.id);
  }

  return (
    <div className="operator-shell">
      <header className="top-bar">
        <IdentityPanel now={now} connection={connection} userName={userName} />

        <section className="machine-strip" aria-label="Stati macchina">
          <div className="machine-state-columns">
            {statusColumns.map((column, index) => (
              <div className="machine-state-column" key={index}>
                {column.map((machine) => <MachineState key={machine.id} machine={machine} />)}
              </div>
            ))}
          </div>
          <HeaderActions />
        </section>
      </header>

      <nav className="side-bar" aria-label="Navigazione principale">
        {navigationItems.map((item) => {
          const Icon = icons[item.icon] ?? Home;
          const active = activeSection === item.id;
          return (
            <button
              type="button"
              ref={item.id === "main" ? mainMenuButtonRef : undefined}
              className={`side-link ${active ? "active" : ""}`}
              style={{ "--item-color": item.color }}
              aria-current={active ? "page" : undefined}
              aria-expanded={item.id === "main" ? mainMenuOpen : undefined}
              aria-controls={item.id === "main" && mainMenuItems.length > 0 ? "operator-shell-main-menu" : undefined}
              onClick={() => selectSection(item)}
              key={item.id}
            >
              <span className="side-link-icon"><Icon aria-hidden="true" /></span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <MainMenuPopupTemplate
        id="operator-shell-main-menu"
        items={mainMenuItems}
        open={mainMenuOpen}
        onSelect={selectMainMenuItem}
      />

      <main className="page-slot" aria-label="Area contenuti pagina">
        {children}
      </main>
    </div>
  );
}

function IdentityPanel({ now, connection, userName }) {
  const time = new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
  const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(now);
  const date = [now.getDate(), now.getMonth() + 1, now.getFullYear()]
    .map((part, index) => index < 2 ? String(part).padStart(2, "0") : part)
    .join(".");

  return (
    <section className="identity-panel" aria-label="Informazioni HMI">
      <div className="identity-heading">
        <div className="wordmark" aria-label="Clevertech">
          <strong>CLEVERTECH</strong>
          <small>HANDLING YOUR SUCCESS</small>
        </div>
        <div className="date-time">
          <time className="clock" dateTime={now.toISOString()}>{time}</time>
          <span>{weekday}</span>
          <time dateTime={now.toISOString().slice(0, 10)}>{date}</time>
        </div>
      </div>

      <div className="connection-label">PLC Connection</div>
      <div
        className="connection-track"
        role="progressbar"
        aria-label="Connessione PLC"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={connection.level}
      >
        <span className={connection.connected ? "connected" : ""} style={{ width: `${connection.level}%` }} />
      </div>

      <div className="user-card">
        <UserRound aria-hidden="true" />
        <span>User :</span>
        <strong>{userName}</strong>
      </div>
    </section>
  );
}

function MachineState({ machine }) {
  return (
    <div className="machine-state-row">
      <span className="machine-label">
        {machine.label}
        {machine.warning && <TriangleAlert className="machine-warning" aria-label="Attenzione" />}
      </span>
      <span className="machine-number">{machine.id}</span>
      <strong className="machine-safety">{machine.safety}</strong>
      <span>{machine.mode}</span>
      <span>{machine.state}</span>
    </div>
  );
}

function HeaderActions() {
  return (
    <div className="header-actions">
      <button type="button" className="tuning-button" aria-label="Regolazioni rapide">
        <SlidersHorizontal aria-hidden="true" />
      </button>
      <div className="header-action-row">
        <button type="button" className="square-action" aria-label="Apri menu">
          <ChevronDown aria-hidden="true" />
        </button>
        <button type="button" className="network-action" aria-label="Stato rete">
          <EthernetPort aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
