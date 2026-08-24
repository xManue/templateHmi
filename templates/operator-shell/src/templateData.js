export const navigationItems = [
  { id: "main", label: "Main", icon: "home", color: "#35a36f" },
  { id: "settings", label: "Settings", icon: "settings", color: "#873500" },
  { id: "alarms", label: "Alarms", icon: "alarm", color: "#9d0505" },
  { id: "statistics", label: "Statistics", icon: "statistics", color: "#006b6d" },
  { id: "manuals", label: "Manuals", icon: "manuals", color: "#aa8500" },
  { id: "diagnostic", label: "Diagnostic", icon: "diagnostic", color: "#26394d" },
  { id: "formats", label: "Formats", icon: "formats", color: "#451426" },
];

export const machineStates = [
  { id: "01", label: "Empty Lids Feeding", warning: true, safety: "SAFETY", mode: "Automatic", state: "Aborted" },
  { id: "02", label: "Empty Cans Feeding", warning: true, safety: "SAFETY", mode: "Automatic", state: "Aborted" },
  { id: "03", label: "Lids Buffer", warning: true, safety: "SAFETY", mode: "Manual", state: "Aborted" },
  { id: "04", label: "Cans Buffer", warning: true, safety: "SAFETY", mode: "Manual", state: "Aborted" },
  { id: "05", label: "Cans Filled Conveyor #1", warning: true, safety: "SAFETY", mode: "Automatic", state: "Aborted" },
  { id: "06", label: "Cans Filled Conveyor #2", warning: true, safety: "SAFETY", mode: "Automatic", state: "Aborted" },
  { id: "07", label: "Cans Filled Conveyor #3", warning: true, safety: "SAFETY", mode: "Automatic", state: "Aborted" },
  { id: "08", label: "Cans Filled Buffer", warning: true, safety: "SAFETY", mode: "Automatic", state: "Aborted" },
  { id: "09", label: "Metal Detector Conveyor", warning: true, safety: "SAFETY", mode: "Automatic", state: "Aborted" },
  { id: "10", label: "Bypass Tax Stamper Conv", warning: true, safety: "SAFETY", mode: "Automatic", state: "Aborted" },
  { id: "11", label: "Tax Stamper Conveyor", warning: true, safety: "SAFETY", mode: "Automatic", state: "Aborted" },
  { id: "12", label: "Bundler Conveyor", warning: true, safety: "SAFETY", mode: "Automatic", state: "Aborted" },
];

export const connectionState = {
  connected: true,
  level: 6,
};
