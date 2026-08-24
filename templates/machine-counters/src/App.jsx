import React, { useState } from "react";
import MachineCountersTemplate from "./MachineCountersTemplate";
import {
  counters,
  diagnostics,
  machineCounterVariables,
  rejectionReasons,
} from "./templateData";

export default function App() {
  const [lastRejectedBundles, setLastRejectedBundles] = useState(
    machineCounterVariables.initialLastRejectedBundles,
  );

  return (
    <MachineCountersTemplate
      title={machineCounterVariables.title}
      counters={counters}
      diagnostics={diagnostics}
      rejectionReasons={rejectionReasons}
      lastRejectedBundles={lastRejectedBundles}
      onLastRejectedBundlesChange={setLastRejectedBundles}
    />
  );
}
