import { fallback, parseFloatFallback } from "@/utils/util";

/**
 * Initializes navbar behavior that toggles a class based on scroll direction.
 * The navbar can be hidden when scrolling down and shown when scrolling up.
 */
const init = () => {
  // Select the navbar element that has the data-navbar attribute
  const navbar = document.querySelector<HTMLDivElement>("[data-navbar]");

  if (!navbar) {
    console.debug("[data-navbar] not found!");
    return;
  }

  // Get configuration from data attributes with fallback values
  // initialOffset: how far the user needs to scroll before the behavior activates
  const initialOffset = parseFloatFallback(navbar.dataset.scrollDirectionInitialOffset, 160);
  // targetTriggerClass: the CSS class to add/remove when scrolling
  const targetTriggerClass = fallback(navbar.dataset.scrollDirectionTriggerClass, "scrolled-down");
  // Reset threshold: position at which we reset the initialOffset check (defaults to 10px)
  const resetThreshold = 10;

  // Track the last scroll position to determine scroll direction
  let lastScrollTop: number = window.scrollY || document.documentElement.scrollTop;
  // Flag to track if we've scrolled past the initial offset
  let hasPassedInitialOffset = false;
  // Flag to avoid repeatedly adding/removing the class
  let hasClassAdded = false;

  window.addEventListener(
    "scroll",
    () => {
      // Get current scroll position
      const scrollPosition: number = window.scrollY || document.documentElement.scrollTop;

      // Reset the initialOffset check when close to the top of the page
      if (scrollPosition <= resetThreshold) {
        hasPassedInitialOffset = false;
        // Also remove the class if it's added
        if (hasClassAdded) {
          navbar.classList.remove(targetTriggerClass);
          hasClassAdded = false;
        }
      }

      // Only activate behavior after scrolling past initialOffset
      if (!hasPassedInitialOffset) {
        if (scrollPosition >= initialOffset) {
          hasPassedInitialOffset = true;
          lastScrollTop = scrollPosition;
        }
        return;
      }

      // Determine scroll direction (down or up)
      const scrollDirection = scrollPosition > lastScrollTop ? "down" : "up";

      // When scrolling down, add the class to hide the navbar
      if (scrollDirection === "down" && !hasClassAdded) {
        navbar.classList.add(targetTriggerClass);
        hasClassAdded = true;
      }
      // When scrolling up, remove the class to show the navbar
      else if (scrollDirection === "up" && hasClassAdded) {
        navbar.classList.remove(targetTriggerClass);
        hasClassAdded = false;
      }

      // Update the last scroll position, ensuring it never goes below 0
      lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
    },
    { passive: true } // Optimize scroll performance
  );
};

// Run the initialization function
init();
