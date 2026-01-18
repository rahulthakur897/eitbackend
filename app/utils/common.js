export const buildQuery = (data) =>
  Object.entries(data)
    .filter(([_, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}='${String(v).replace(/'/g, "\\'")}'`)
    .join(", ");