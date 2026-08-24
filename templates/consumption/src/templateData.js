export const consumptionVariables = {
  title: "Consumption",
};

// Dati fittizi: verranno sostituiti durante la creazione del pannello.
export const airSection = {
  title: "Air",
  metrics: [
    {
      id: "actual-consumption",
      label: "Actual Consumption:",
      value: "0.00",
      unit: "l/min",
      warning: true,
    },
  ],
};

export const powerSection = {
  title: "Power",
  metrics: [
    { id: "voltage-l1-n", label: "Voltage L1-N:", value: "0.00", unit: "V", warning: true },
    { id: "voltage-l2-n", label: "Voltage L2-N:", value: "0.00", unit: "V", warning: true },
    { id: "voltage-l3-n", label: "Voltage L3-N:", value: "0.00", unit: "V", warning: true },
    { id: "current-l1", label: "Current L1:", value: "0.00", unit: "A", warning: true },
    { id: "current-l2", label: "Current L2:", value: "0.00", unit: "A", warning: true },
    { id: "current-l3", label: "Current L3:", value: "0.00", unit: "A", warning: true },
    {
      id: "apparent-power",
      label: "Total Apparent Power:",
      value: "0.00",
      unit: "VA",
      warning: true,
    },
    {
      id: "active-power",
      label: "Total Active Power:",
      value: "0.00",
      unit: "W",
      warning: true,
    },
    {
      id: "reactive-power",
      label: "Total Reactive Power:",
      value: "0.00",
      unit: "var",
      warning: true,
    },
    {
      id: "operating-hours",
      label: "Operating Hours Counter:",
      value: "0",
      unit: "h",
      warning: true,
    },
  ],
};
