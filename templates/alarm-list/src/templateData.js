export const units = Array.from(
  { length: 12 },
  (_, index) => `UN${String(index + 1).padStart(2, "0")}`,
);

export const alarmListVariables = {
  initialActiveUnit: "UN01",
  visibleRows: 21,
};

export const alarmListCopy = {
  alarms: {
    title: "Alarm",
    refreshLabel: "Refresh Alarms",
  },
  history: {
    title: "History",
    refreshLabel: "Refresh History",
  },
};

// Dati fittizi: verranno sostituiti durante la creazione del pannello.
export const alarms = [
  { id: "A-001", category: "Warning", text: "Example active alarm", time: "10:24:12", unitName: "UN01 - Example unit" },
  { id: "A-002", category: "Safety", text: "Example safety condition", time: "10:26:48", unitName: "UN03 - Example unit" },
];

export const history = [
  { id: "H-001", category: "Warning", text: "Example cleared alarm", time: "08:12:31", unitName: "UN01 - Example unit" },
  { id: "H-002", category: "Info", text: "Example reset event", time: "09:45:06", unitName: "UN07 - Example unit" },
];
