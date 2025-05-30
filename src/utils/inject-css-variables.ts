/**
 * Injects custom CSS variables into a target element, overwriting any existing variables with the same names.
 *
 * @param element The target HTMLElement to which CSS variables will be applied.
 * @param variables An object mapping CSS variable names (e.g., '--main-color') to their values.
 * @returns A function that will revert all the injected CSS variables.
 */
export function injectCssVariables(
  element: HTMLElement,
  variables: Record<string, string>
): () => void {
  // Keep track of which properties were injected
  const injectedProps: string[] = [];

  for (const [name, value] of Object.entries(variables)) {
    if (name.startsWith("--")) {
      element.style.setProperty(name, value);
      injectedProps.push(name);
    }
  }

  // Return a revert function
  return function revert(): void {
    // Remove only the properties that were injected
    for (const prop of injectedProps) {
      element.style.removeProperty(prop);
    }
  };
}

// Usage example:
// const revertFunc = injectCssVariables(myElement, { '--color': 'red', '--size': '20px' });
// ... later ...
// revertFunc(); // Removes the injected properties
