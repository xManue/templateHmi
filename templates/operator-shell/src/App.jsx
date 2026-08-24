import React from "react";
import OperatorShellTemplate from "./OperatorShellTemplate";
import { connectionState, machineStates, navigationItems } from "./templateData";
import { mainMenuItems } from "../linked/main-menu-popup/src/templateData";

export default function App() {
  return (
    <OperatorShellTemplate
      navigationItems={navigationItems}
      machineStates={machineStates}
      connection={connectionState}
      userName="DefaultUser"
      mainMenuItems={mainMenuItems}
    />
  );
}
