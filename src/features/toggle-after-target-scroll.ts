import { detectScrollAmount } from "@/utils/detect-scroll-amount";
import { getMultipleHtmlElements } from "@/utils/get-html-element";
import { fallback, parseFloatFallback } from "@/utils/util";

/**
 * Initializes scroll-based class and CSS variable toggling functionality
 * This feature allows elements to change appearance when the user scrolls
 * past a certain point on the page.
 */
const init = () => {
  // Find all elements that should respond to scroll position
  const toggleAfterTargetScrollElements = getMultipleHtmlElements({
    selector: "[data-toggle-after-target-scroll-element]",
  });

  if (!toggleAfterTargetScrollElements) return;

  // Set up scroll detection for each target element
  for (const targetElement of toggleAfterTargetScrollElements) {
    // Get configuration from data attributes
    // The scroll offset at which the toggle should occur (defaults to 100px)
    const initialOffset = parseFloatFallback(targetElement.dataset.afterScrollInitialOffset, 100);

    // The class to add when scrolled beyond the offset (defaults to 'scrolled-below')
    const targetTriggerClass = fallback(
      targetElement.dataset.afterScrollTriggerClass,
      "scrolled-below"
    );

    detectScrollAmount(initialOffset, (beforeTargetScroll) => {
      if (beforeTargetScroll) {
        // User is above the scroll threshold
        targetElement.classList.remove(targetTriggerClass);
      } else {
        // User has scrolled beyond the threshold
        targetElement.classList.add(targetTriggerClass);
      }
    });
  }
};

// Start the feature when the file loads
init();
