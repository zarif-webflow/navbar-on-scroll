// bin/live-reload.js
new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

// src/utils/get-html-element.ts
var getHtmlElement = ({
  selector,
  parent,
  log = "debug"
}) => {
  const targetElement = (parent || document).querySelector(selector);
  if (targetElement === null) {
    if (log === false) return null;
    const consoleMethod = log === "debug" ? console.debug : console.error;
    consoleMethod(
      `${log.toUpperCase()}: Element with selector "${selector}" not found in ${parent !== void 0 ? "the specified parent element:" : "the document."}`,
      parent
    );
    return null;
  }
  return targetElement;
};
var getMultipleHtmlElements = ({
  selector,
  parent,
  log = "debug"
}) => {
  const targetElements = Array.from((parent || document).querySelectorAll(selector));
  if (targetElements.length === 0) {
    if (log === false) return null;
    const consoleMethod = log === "debug" ? console.debug : console.error;
    consoleMethod(
      `${log.toUpperCase()}: No elements found with selector "${selector}" in ${parent !== void 0 ? "the specified parent element:" : "the document."}`,
      parent
    );
    return null;
  }
  return targetElements;
};

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
var isScrollBelowElement = (element, offset = 0) => {
  if (!element) return false;
  const elementRect = element.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const elementBottom = elementRect.bottom + scrollTop - elementRect.height + offset;
  return scrollTop > elementBottom;
};

export {
  getHtmlElement,
  getMultipleHtmlElements,
  fallback,
  parseFloatFallback,
  isScrollBelowElement
};
//# sourceMappingURL=chunk-2GPASJGW.js.map
