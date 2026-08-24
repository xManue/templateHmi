export const units = Array.from(
  { length: 12 },
  (_, index) => `UN${String(index + 1).padStart(2, "0")}`,
);

// La preview resta vuota come il riferimento. Ogni elemento può avere:
// { id, category, text, time, unitName }
export const alarms = [];
