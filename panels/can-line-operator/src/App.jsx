import React, { useState } from "react";
import OperatorShellTemplate from "../../../templates/operator-shell/src/OperatorShellTemplate";
import { connectionState, machineStates, navigationItems } from "../../../templates/operator-shell/src/templateData";
import { mainMenuItems } from "../../../templates/operator-shell/linked/main-menu-popup/src/templateData";
import { alarmMenuItems } from "../../../templates/operator-shell/linked/alarms-menu-popup/src/templateData";
import { manualsMenuItems } from "../../../templates/operator-shell/linked/manuals-menu-popup/src/templateData";
import AlarmListTemplate from "../../../templates/alarm-list/src/AlarmListTemplate";
import {
  alarmListCopy,
  alarmListVariables,
  alarms,
  history,
  units,
} from "../../../templates/alarm-list/src/templateData";
import MachineView from "./MachineView";
import ManualGeneral from "./ManualGeneral";
import PlaceholderPage from "./PlaceholderPage";
import MachineCountersTemplate from "../../../templates/machine-counters/src/MachineCountersTemplate";
import {
  counters,
  diagnostics,
  machineCounterVariables,
  rejectionReasons,
} from "../../../templates/machine-counters/src/templateData";

const directPages = {
  settings: ["Settings", "Parametri macchina e configurazione ricette"],
  statistics: ["Statistics", "Produzione, efficienza e indicatori OEE"],
  diagnostic: ["Diagnostic", "Diagnostica dispositivi e comunicazioni"],
  formats: ["Formats", "Gestione formati e cambio produzione"],
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("machine-view");

  function selectSection(sectionId) {
    if (directPages[sectionId]) setCurrentPage(sectionId);
  }

  function selectAlarmMode(mode) {
    setCurrentPage(mode === "history" ? "history" : "alarms");
  }

  return (
    <OperatorShellTemplate
      navigationItems={navigationItems}
      machineStates={machineStates}
      connection={connectionState}
      userName="DefaultUser"
      mainMenuItems={mainMenuItems}
      alarmMenuItems={alarmMenuItems}
      manualsMenuItems={manualsMenuItems}
      onMainMenuItemSelect={setCurrentPage}
      onAlarmMenuItemSelect={selectAlarmMode}
      onManualsMenuItemSelect={(itemId) => setCurrentPage(`manual-${itemId}`)}
      onSectionChange={selectSection}
    >
      <PanelPage page={currentPage} />
    </OperatorShellTemplate>
  );
}

function PanelPage({ page }) {
  if (page === "machine-view") return <MachineView />;
  if (page === "counter-machine") {
    return (
      <MachineCountersTemplate
        title={machineCounterVariables.title}
        counters={counters}
        diagnostics={diagnostics}
        rejectionReasons={rejectionReasons}
        initialLastRejectedBundles={machineCounterVariables.initialLastRejectedBundles}
      />
    );
  }
  if (page === "manual-general") return <ManualGeneral />;

  if (page === "alarms" || page === "history") {
    return (
      <AlarmListTemplate
        mode={page}
        title={alarmListCopy[page].title}
        refreshLabel={alarmListCopy[page].refreshLabel}
        alarms={alarms}
        history={history}
        units={units}
        initialActiveUnit={alarmListVariables.initialActiveUnit}
        visibleRows={alarmListVariables.visibleRows}
      />
    );
  }

  if (directPages[page]) {
    return <PlaceholderPage title={directPages[page][0]} description={directPages[page][1]} />;
  }

  if (page.startsWith("manual-")) {
    const manualId = page.replace("manual-", "");
    const manualItem = manualsMenuItems.find((item) => item.id === manualId);
    return (
      <PlaceholderPage
        title={`Manual ${manualItem?.label ?? manualId}`}
        description="Pagina manuale predisposta per i comandi e i tag PLC della sezione selezionata."
      />
    );
  }

  const mainItem = mainMenuItems.find((item) => item.id === page);
  return (
    <PlaceholderPage
      title={mainItem?.label ?? "Operator Panel"}
      description="Pagina predisposta per il collegamento delle variabili PLC."
    />
  );
}
