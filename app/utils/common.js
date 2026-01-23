export const buildQuery = (data) =>
  Object.entries(data)
    .filter(([_, v]) => v !== undefined && v !== null && v !== "" &&  v !== "null" && v !== "undefined")
    .map(([k, v]) => k!=='id'? `${k}='${String(v).replace(/'/g, "\\'")}'` : null)
    .join(", ");

  export const cleanObject = (data) =>
  Object.fromEntries(
    Object.entries(data).filter(([_, v]) => {
      if (v === undefined || v === null) return false;
      if (typeof v === "string") {
        const cleaned = v
          .replace(/&nbsp;/g, "")
          .trim()
          .toLowerCase();
        return cleaned !== "" && cleaned !== "null" && cleaned !== "undefined";
      }
      return true;
    })
  );