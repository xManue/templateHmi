import React from "react";
import OperatorShellTemplate from "./OperatorShellTemplate";
import { connectionState, machineStates, navigationItems } from "./templateData";

export default function App() {
  return (
    <OperatorShellTemplate
      navigationItems={navigationItems}
      machineStates={machineStates}
      connection={connectionState}
      userName="DefaultUser"
    />
  );
}
