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
import AlarmsMenuPopupTemplate from "../linked/alarms-menu-popup/src/AlarmsMenuPopupTemplate";
import ManualsMenuPopupTemplate from "../linked/manuals-menu-popup/src/ManualsMenuPopupTemplate";
import DiagnosticMenuPopupTemplate from "../linked/diagnostic-menu-popup/src/DiagnosticMenuPopupTemplate";

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
  alarmMenuItems = [],
  onAlarmMenuItemSelect,
  manualsMenuItems = [],
  onManualsMenuItemSelect,
  diagnosticMenuItems = [],
  onDiagnosticMenuItemSelect,
  children,
}) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [openMenu, setOpenMenu] = useState(null);
  const [popupAnchorY, setPopupAnchorY] = useState(null);
  const [now, setNow] = useState(new Date());
  const shellRef = useRef(null);
  const mainMenuButtonRef = useRef(null);
  const alarmsMenuButtonRef = useRef(null);
  const manualsMenuButtonRef = useRef(null);
  const diagnosticMenuButtonRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!openMenu) return undefined;

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        const trigger = openMenu === "main"
          ? mainMenuButtonRef
          : openMenu === "alarms"
            ? alarmsMenuButtonRef
            : openMenu === "manuals"
              ? manualsMenuButtonRef
              : diagnosticMenuButtonRef;
        setOpenMenu(null);
        window.requestAnimationFrame(() => trigger.current?.focus());
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [openMenu]);

  const statusColumns = useMemo(() => {
    const midpoint = Math.ceil(machineStates.length / 2);
    return [machineStates.slice(0, midpoint), machineStates.slice(midpoint)];
  }, [machineStates]);

  function selectSection(item, triggerElement) {
    const linkedItems = item.id === "main"
      ? mainMenuItems
      : item.id === "alarms"
        ? alarmMenuItems
        : item.id === "manuals"
          ? manualsMenuItems
          : item.id === "diagnostic"
            ? diagnosticMenuItems
          : [];

    if (linkedItems.length > 0) {
      const shellBox = shellRef.current?.getBoundingClientRect();
      const triggerBox = triggerElement.getBoundingClientRect();
      setActiveSection(item.id);
      setPopupAnchorY(triggerBox.top - (shellBox?.top ?? 0) + triggerBox.height / 2);
      setOpenMenu((current) => current === item.id ? null : item.id);
      onSectionChange?.(item.id);
      return;
    }

    setActiveSection(item.id);
    setOpenMenu(null);
    onSectionChange?.(item.id);
  }

  function selectMainMenuItem(item) {
    setOpenMenu(null);
    window.requestAnimationFrame(() => mainMenuButtonRef.current?.focus());
    onMainMenuItemSelect?.(item.id);
  }

  function selectAlarmMenuItem(item) {
    setOpenMenu(null);
    window.requestAnimationFrame(() => alarmsMenuButtonRef.current?.focus());
    onAlarmMenuItemSelect?.(item.id);
  }

  function selectManualsMenuItem(item) {
    setOpenMenu(null);
    window.requestAnimationFrame(() => manualsMenuButtonRef.current?.focus());
    onManualsMenuItemSelect?.(item.id);
  }

  function selectDiagnosticMenuItem(item) {
    setOpenMenu(null);
    window.requestAnimationFrame(() => diagnosticMenuButtonRef.current?.focus());
    onDiagnosticMenuItemSelect?.(item.id);
  }

  return (
    <div className="operator-shell" ref={shellRef}>
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
              ref={item.id === "main"
                ? mainMenuButtonRef
                : item.id === "alarms"
                  ? alarmsMenuButtonRef
                  : item.id === "manuals"
                    ? manualsMenuButtonRef
                    : item.id === "diagnostic"
                      ? diagnosticMenuButtonRef
                    : undefined}
              className={`side-link ${active ? "active" : ""}`}
              style={{ "--item-color": item.color }}
              aria-current={active ? "page" : undefined}
              aria-expanded={item.id === "main" && mainMenuItems.length > 0
                ? openMenu === "main"
                : item.id === "alarms" && alarmMenuItems.length > 0
                  ? openMenu === "alarms"
                  : item.id === "manuals" && manualsMenuItems.length > 0
                    ? openMenu === "manuals"
                    : item.id === "diagnostic" && diagnosticMenuItems.length > 0
                      ? openMenu === "diagnostic"
                    : undefined}
              aria-controls={item.id === "main" && mainMenuItems.length > 0
                ? "operator-shell-main-menu"
                : item.id === "alarms" && alarmMenuItems.length > 0
                  ? "operator-shell-alarms-menu"
                  : item.id === "manuals" && manualsMenuItems.length > 0
                    ? "operator-shell-manuals-menu"
                    : item.id === "diagnostic" && diagnosticMenuItems.length > 0
                      ? "operator-shell-diagnostic-menu"
                    : undefined}
              onClick={(event) => selectSection(item, event.currentTarget)}
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
        open={openMenu === "main"}
        anchorY={popupAnchorY}
        onSelect={selectMainMenuItem}
      />

      <AlarmsMenuPopupTemplate
        id="operator-shell-alarms-menu"
        items={alarmMenuItems}
        open={openMenu === "alarms"}
        anchorY={popupAnchorY}
        onSelect={selectAlarmMenuItem}
      />

      <ManualsMenuPopupTemplate
        id="operator-shell-manuals-menu"
        items={manualsMenuItems}
        open={openMenu === "manuals"}
        anchorY={popupAnchorY}
        onSelect={selectManualsMenuItem}
      />

      <DiagnosticMenuPopupTemplate
        id="operator-shell-diagnostic-menu"
        items={diagnosticMenuItems}
        open={openMenu === "diagnostic"}
        anchorY={popupAnchorY}
        onSelect={selectDiagnosticMenuItem}
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
