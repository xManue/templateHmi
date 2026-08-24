import React, { useState } from "react";
import OperatorShellTemplate from "./OperatorShellTemplate";
import { connectionState, machineStates, navigationItems } from "./templateData";
import { mainMenuItems } from "../linked/main-menu-popup/src/templateData";
import { alarmMenuItems } from "../linked/alarms-menu-popup/src/templateData";
import { manualsMenuItems } from "../linked/manuals-menu-popup/src/templateData";
import AlarmListTemplate from "../../alarm-list/src/AlarmListTemplate";
import {
  alarmListCopy,
  alarmListVariables,
  alarms,
  history,
  units,
} from "../../alarm-list/src/templateData";
import MachineCountersTemplate from "../../machine-counters/src/MachineCountersTemplate";
import {
  counters,
  diagnostics,
  machineCounterVariables,
  rejectionReasons,
} from "../../machine-counters/src/templateData";
import ConsumptionTemplate from "../../consumption/src/ConsumptionTemplate";
import {
  airSection,
  consumptionVariables,
  powerSection,
} from "../../consumption/src/templateData";

export default function App() {
  const [alarmMode, setAlarmMode] = useState(null);
  const [mainPage, setMainPage] = useState(null);

  function selectSection(sectionId) {
    if (sectionId !== "alarms") setAlarmMode(null);
    if (sectionId !== "main") setMainPage(null);
  }

  return (
    <OperatorShellTemplate
      navigationItems={navigationItems}
      machineStates={machineStates}
      connection={connectionState}
      userName="DefaultUser"
      mainMenuItems={mainMenuItems}
      onMainMenuItemSelect={setMainPage}
      alarmMenuItems={alarmMenuItems}
      manualsMenuItems={manualsMenuItems}
      onAlarmMenuItemSelect={setAlarmMode}
      onSectionChange={selectSection}
    >
      {mainPage === "counter-machine" ? (
        <MachineCountersTemplate
          title={machineCounterVariables.title}
          counters={counters}
          diagnostics={diagnostics}
          rejectionReasons={rejectionReasons}
          initialLastRejectedBundles={machineCounterVariables.initialLastRejectedBundles}
        />
      ) : mainPage === "consumption" ? (
        <ConsumptionTemplate
          title={consumptionVariables.title}
          air={airSection}
          power={powerSection}
        />
      ) : alarmMode ? (
        <AlarmListTemplate
          mode={alarmMode}
          title={alarmListCopy[alarmMode].title}
          refreshLabel={alarmListCopy[alarmMode].refreshLabel}
          alarms={alarms}
          history={history}
          units={units}
          initialActiveUnit={alarmListVariables.initialActiveUnit}
          visibleRows={alarmListVariables.visibleRows}
        />
      ) : null}
    </OperatorShellTemplate>
  );
}
