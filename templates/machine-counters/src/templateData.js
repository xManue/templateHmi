export const machineCounterVariables = {
  title: "Machine Counters",
  initialLastRejectedBundles: 1,
};

// Dati fittizi: verranno sostituiti durante la creazione del pannello.
export const counters = {
  metalDetector: {
    title: "Metal Detector Cans",
    label: "Rejected Cans:",
    value: 125,
    resetLabel: "Metal Detector Reject Reset",
  },
  hermosCamera: {
    title: "Hermos Camera Bundles",
    rejectedLabel: "Rejected Bundles:",
    rejectedValue: 0,
  },
  inspectionCamera: {
    title: "Inspection Camera Bundles",
    goodLabel: "Good Bundles:",
    goodValue: 0,
    rejectedLabel: "Rejected Bundles:",
    rejectedValue: 0,
  },
};

export const diagnostics = {
  title: "Diagnostic's Inspection Camera - Select Last Bundles Rejected",
  centeringLabel: "Centering:",
  centering: "97.943mm",
  flavorLabel: "Flavor:",
  flavor: "GeneralWhite",
  checks: [
    { id: "code-01", label: "(01)", active: true },
    { id: "code-21", label: "(21)", active: true },
    { id: "code-240", label: "(240)", active: true },
    { id: "code-10", label: "(10)", active: true },
    { id: "net-weight", label: "NT", active: true },
    { id: "production-date", label: "PD", active: true },
    { id: "best-before", label: "BF", active: true },
    { id: "quality-release", label: "QR", active: true },
    { id: "barcode", label: "BC", active: true },
  ],
};

export const rejectionReasons = [
  { id: "label-tolerance", label: "Label not in tollerance:", value: 10 },
  { id: "barcode", label: "Barcode not readable", value: 0 },
  { id: "flavor", label: "Flavor mismatch:", value: 0 },
  { id: "code-01", label: "CODE 01 not readable:", value: 0 },
  { id: "code-21", label: "CODE 21 not readable:", value: 0 },
  { id: "code-240", label: "CODE 240 not readable:", value: 0 },
  { id: "code-10", label: "CODE 10 not readable:", value: 0 },
  { id: "code-s6", label: "CODE S6 not readable:", value: 0 },
  { id: "net-weight", label: "Net Weight not readable:", value: 0 },
  { id: "code-2d", label: "CODE 2D not readable:", value: 2 },
  { id: "production-date", label: "Production date not readable", value: 0 },
  { id: "best-before", label: "Best Before Date not readable", value: 0 },
];
