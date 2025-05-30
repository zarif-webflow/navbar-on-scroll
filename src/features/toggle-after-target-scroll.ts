import { detectScrollAmount } from "@/utils/detect-scroll-amount";
import { injectCssVariables } from "@/utils/inject-css-variables";
import { fallback, parseFloatFallback } from "@/utils/util";

/**
 * Initializes scroll-based class and CSS variable toggling functionality
 * This feature allows elements to change appearance when the user scrolls
 * past a certain point on the page.
 */
const init = () => {
  // Find all elements that should respond to scroll position
  const toggleAfterTargetScrollElements = Array.from(
    document.querySelectorAll<HTMLElement>("[data-toggle-after-target-scroll-element]")
  );

  // Will be populated when wfVarModes is ready

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

    // Optional: variable mode to apply when scrolled beyond the offset
    const targetTriggerVarMode = targetElement.dataset.afterScrollTriggerVarMode;

    // Will hold the function that can revert injected CSS variables
    let variableRemover: (() => void) | undefined = undefined;

    if (targetTriggerVarMode !== undefined) {
      let varModes = window.wfVarModes?.data;
      let targetVarMode =
        targetTriggerVarMode && varModes ? varModes[targetTriggerVarMode] : undefined;

      window.addEventListener("wfVarModesReady", (event) => {
        varModes = event.detail.data;
        targetVarMode = targetTriggerVarMode ? varModes[targetTriggerVarMode] : undefined;
      });

      detectScrollAmount(initialOffset, (beforeTargetScroll) => {
        if (beforeTargetScroll) {
          // User is above the scroll threshold
          targetElement.classList.remove(targetTriggerClass);

          // Remove any applied CSS variables with smooth transition
          if (targetTriggerVarMode && variableRemover !== undefined) {
            variableRemover();
            variableRemover = undefined;
          }
        } else {
          // User has scrolled beyond the threshold
          targetElement.classList.add(targetTriggerClass);

          // Apply CSS variables from the specified variable mode
          if (targetTriggerVarMode && targetVarMode) {
            // Inject variables and store the remover function for later use
            variableRemover = injectCssVariables(targetElement, targetVarMode);
          }
        }
      });

      return;
    }

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
