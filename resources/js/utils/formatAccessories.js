function normalizeKey(value) {
  return String(value ?? "")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase();
}

function isUnselected(value) {
  if (
    value === null ||
    value === undefined ||
    value === false ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return true;
  }

  if (
    (typeof value === "number" || typeof value === "string") &&
    String(value).trim() !== "" &&
    Number(value) === 0
  ) {
    return true;
  }

  return (
    typeof value === "string" &&
    ["none", "without", "false", "null"].includes(
      normalizeKey(value)
    )
  );
}

function normalizeObject(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeObject);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        normalizeKey(key),
        normalizeObject(item),
      ])
    );
  }

  return value;
}

export function formatAccessories(
  accessories = {},
  { t, te } = {}
) {
  if (typeof t !== "function" || typeof te !== "function") {
    throw new Error(
      "formatAccessories requires the Vue i18n t and te functions."
    );
  }

  const data = normalizeObject(accessories);
  const lines = [];

  const translateLabel = (key) => {
    for (const path of [
      `summary.labels.${key}`,
      `summary.groups.${key}`,
    ]) {
      if (te(path)) {
        return t(path);
      }
    }

    // Keep unknown technical references visible.
    return key;
  };

  const translateValue = (field, value) => {
    const lookup =
      typeof value === "boolean"
        ? String(value)
        : normalizeKey(value);

    const path = `summary.values.${field}.${lookup}`;

    if (te(path)) {
      return t(path);
    }

    if (typeof value === "boolean") {
      return t(`summary.values.boolean.${String(value)}`);
    }

    // Preserve RAL codes, quantities, and unknown option codes.
    return String(value);
  };

  const ignoredFields = new Set([
    "value",
    "price",
    "unit",
    "insulated",
  ]);

  function walk(node, parents = [], valueField = null) {
    if (!node || typeof node !== "object") {
      return;
    }

    for (const [key, value] of Object.entries(node)) {
      if (ignoredFields.has(key) || isUnselected(value)) {
        continue;
      }

      // Remove the entire glazing group when unselected.
      if (
        ["windows", "stripe"].includes(key) &&
        value &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        const amountKey =
          key === "windows" ? "quantity" : "length";

        if (
          isUnselected(value.type) ||
          !(Number(value[amountKey]) > 0)
        ) {
          continue;
        }
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          if (isUnselected(item)) {
            continue;
          }

          if (typeof item === "object") {
            walk(item, [...parents, key], key);
          } else {
            const label = [...parents, key]
              .map(translateLabel)
              .join(" / ");

            lines.push(
              `${label}: ${translateValue(key, item)}`
            );
          }
        }

        continue;
      }

      if (typeof value === "object") {
        walk(value, [...parents, key], key);
        continue;
      }

      // Glazing types are translated under windows or stripe.
      const field =
        key === "type" ? valueField ?? key : key;

      // The parent already identifies the glazing type.
      const labelKeys =
        key === "type" && parents.length
          ? parents
          : [...parents, key];

      const label = labelKeys
        .map(translateLabel)
        .join(" / ");

      lines.push(
        `${label}: ${translateValue(field, value)}`
      );
    }
  }

  walk(data);

  return lines;
}