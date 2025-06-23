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
var createScrolledPastObserver = (element, callback, offset = 0) => {
  if (!element) {
    throw new Error("Element is required for createScrolledPastObserver");
  }
  const checkInitialState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const elementRect = element.getBoundingClientRect();
    const elementBottom = elementRect.bottom + scrollTop - elementRect.height + offset;
    callback(scrollTop > elementBottom);
  };
  checkInitialState();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        const elementRect = entry.boundingClientRect;
        const elementBottom = elementRect.bottom + currentScrollTop - elementRect.height + offset;
        const hasScrolledPast = currentScrollTop > elementBottom;
        if (!entry.isIntersecting) {
          callback(hasScrolledPast);
        } else {
          callback(false);
        }
      });
    },
    {
      threshold: 0,
      // Add root margin to detect slightly before the element leaves viewport
      rootMargin: `0px 0px ${-offset}px 0px`
    }
  );
  observer.observe(element);
  const cleanup = () => {
    observer.disconnect();
  };
  return { observer, cleanup };
};

export {
  getHtmlElement,
  getMultipleHtmlElements,
  fallback,
  parseFloatFallback,
  isScrollBelowElement,
  createScrolledPastObserver
};
//# sourceMappingURL=chunk-NUXPWTH6.js.map
