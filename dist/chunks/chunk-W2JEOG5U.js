// bin/live-reload.js
new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

// src/utils/util.ts
var fallback = (value, replacementValue, condition) => {
  if (value !== void 0 && condition && !condition(value)) return replacementValue;
  if (value === void 0 || Number.isNaN(value)) return replacementValue;
  if (value === 0) return value;
  return value;
};
var parseFloatFallback = (inputStr, fallbackValue) => {
  if (inputStr === void 0) return fallbackValue;
  const parsedValue = Number.parseFloat(inputStr);
  return Number.isNaN(parsedValue) ? fallbackValue : parsedValue;
};

export {
  fallback,
  parseFloatFallback
};
//# sourceMappingURL=chunk-W2JEOG5U.js.map
