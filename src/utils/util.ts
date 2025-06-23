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
