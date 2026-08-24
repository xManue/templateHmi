import React from "react";
import ConsumptionTemplate from "./ConsumptionTemplate";
import { airSection, consumptionVariables, powerSection } from "./templateData";

export default function App() {
  return (
    <ConsumptionTemplate
      title={consumptionVariables.title}
      air={airSection}
      power={powerSection}
    />
  );
}
