import React, { useState } from "react";
import OperatorShellTemplate from "./OperatorShellTemplate";
import { connectionState, machineStates, navigationItems } from "./templateData";
import { mainMenuItems } from "../linked/main-menu-popup/src/templateData";
import { alarmMenuItems } from "../linked/alarms-menu-popup/src/templateData";
import AlarmListTemplate from "../../alarm-list/src/AlarmListTemplate";
import {
  alarmListCopy,
  alarmListVariables,
  alarms,
  history,
  units,
} from "../../alarm-list/src/templateData";

export default function App() {
  const [alarmMode, setAlarmMode] = useState(null);

  function selectSection(sectionId) {
    if (sectionId !== "alarms") setAlarmMode(null);
  }

  return (
    <OperatorShellTemplate
      navigationItems={navigationItems}
      machineStates={machineStates}
      connection={connectionState}
      userName="DefaultUser"
      mainMenuItems={mainMenuItems}
      alarmMenuItems={alarmMenuItems}
      onAlarmMenuItemSelect={setAlarmMode}
      onSectionChange={selectSection}
    >
      {alarmMode && (
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
      )}
    </OperatorShellTemplate>
  );
}
