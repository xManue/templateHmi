// Dati fittizi: nomi, stato e callback verranno collegati ai tag PLC in fase di creazione.
export const machinePartControlVariables = {
  initialPartId: "empty-cans-feeding",
  initialMode: "auto",
};

export const machineParts = [
  { id: "unscramblers-conveyor", label: "Unscramblers Conveyor" },
  { id: "empty-lids-feeding", label: "Empty Lids Feeding" },
  { id: "empty-cans-feeding", label: "Empty Cans Feeding" },
  { id: "lids-buffer", label: "Lids Buffer" },
  { id: "cans-buffer", label: "Cans Buffer" },
  { id: "cans-filled-conveyor-1", label: "Cans Filled Conveyor #1" },
  { id: "cans-filled-conveyor-2", label: "Cans Filled Conveyor #2" },
  { id: "cans-filled-conveyor-3", label: "Cans Filled Conveyor #3" },
  { id: "cans-filled-buffer", label: "Cans Filled Buffer" },
  { id: "metal-detector-conveyor", label: "Metal Detector Conveyor" },
  { id: "bypass-tax-stamper", label: "Bypass Tax Stamper Conveyor" },
  { id: "tax-stamper-conveyor", label: "Tax Stamper Conveyor" },
  { id: "bundler-conveyor", label: "Bundler Conveyor" },
];

export const machinePartActions = [
  { id: "start", label: "Start", icon: "start", tone: "start" },
  { id: "stop", label: "Stop", icon: "stop", tone: "stop" },
  { id: "reset", label: "Reset", icon: "reset", tone: "reset" },
  { id: "lower", label: "Lower", icon: "lower", tone: "secondary", hideLabel: true },
  { id: "advance", label: "Advance", icon: "advance", tone: "secondary", hideLabel: true },
];
