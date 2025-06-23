type NonUndefined<T> = T extends undefined ? never : T;

export const fallback = <T>(
  value: T,
  replacementValue: NonUndefined<T>,
  condition?: (value: T) => boolean
) => {
  if (value !== undefined && condition && !condition(value)) return replacementValue;
  if (value === undefined || Number.isNaN(value)) return replacementValue;
  if (value === 0) return value;

  return value;
};

export const parseFloatFallback = (inputStr: string | undefined, fallbackValue: number) => {
  if (inputStr === undefined) return fallbackValue;

  const parsedValue = Number.parseFloat(inputStr);

  return Number.isNaN(parsedValue) ? fallbackValue : parsedValue;
};

/**
 * Checks if the current scroll position is below a given HTML element
 * @param element - The HTML element to check against
 * @param offset - Optional offset to add to the element's bottom position (default: 0)
 * @returns true if scroll position is below the element, false otherwise
 */
export const isScrollBelowElement = (element: HTMLElement, offset: number = 0): boolean => {
  if (!element) return false;

  // Get the element's position relative to the viewport
  const elementRect = element.getBoundingClientRect();

  // Get current scroll position
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  // Calculate the element's bottom position relative to the document
  const elementBottom = elementRect.bottom + scrollTop - elementRect.height + offset;

  // Check if current scroll position is below the element's bottom
  return scrollTop > elementBottom;
};

/**
 * Creates an observer that detects when an element is out of view after scrolling down past it
 * @param element - The HTML element to observe
 * @param callback - Function called when element visibility changes (true = scrolled past, false = still visible/above)
 * @param offset - Optional offset to add to the element's bottom position (default: 0)
 * @returns The Intersection Observer instance and cleanup function
 */
export const createScrolledPastObserver = (
  element: HTMLElement,
  callback: (hasScrolledPast: boolean) => void,
  offset: number = 0
): { observer: IntersectionObserver; cleanup: () => void } => {
  if (!element) {
    throw new Error("Element is required for createScrolledPastObserver");
  }

  // Check initial state on page load
  const checkInitialState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const elementRect = element.getBoundingClientRect();
    const elementBottom = elementRect.bottom + scrollTop - elementRect.height + offset;

    // Call callback with initial state
    callback(scrollTop > elementBottom);
  };

  // Check initial state immediately
  checkInitialState();

  // Create intersection observer for ongoing scroll detection
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        const elementRect = entry.boundingClientRect;

        // Calculate if we've scrolled past the element's bottom
        const elementBottom = elementRect.bottom + currentScrollTop - elementRect.height + offset;
        const hasScrolledPast = currentScrollTop > elementBottom;

        // Only trigger callback if the element is not intersecting (out of view)
        // and we've scrolled past its bottom position
        if (!entry.isIntersecting) {
          callback(hasScrolledPast);
        } else {
          // Element is visible, so we haven't scrolled past it
          callback(false);
        }
      });
    },
    {
      threshold: 0,
      // Add root margin to detect slightly before the element leaves viewport
      rootMargin: `0px 0px ${-offset}px 0px`,
    }
  );

  observer.observe(element);

  const cleanup = () => {
    observer.disconnect();
  };

  return { observer, cleanup };
};
