import { detectScrollAmount } from '@/utils/detect-scroll-amount';
import { injectCssVariables } from '@/utils/inject-css-variables';
import { fallback, parseFloatFallback } from '@/utils/util';

const init = () => {
  const toggleAfterTargetScrollElements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-toggle-after-target-scroll-element]')
  );
  let varModes: VariableModes | undefined = undefined;

  for (const targetElement of toggleAfterTargetScrollElements) {
    const initialOffset = parseFloatFallback(targetElement.dataset.afterScrollInitialOffset, 100);
    const targetTriggerClass = fallback(
      targetElement.dataset.afterScrollTriggerClass,
      'scrolled-below'
    );
    const targetTriggerVarMode = targetElement.dataset.afterScrollTriggerVarMode;
    let variableRemover: (() => void) | undefined = undefined;

    detectScrollAmount(initialOffset, (beforeTargetScroll) => {
      if (beforeTargetScroll) {
        targetElement.classList.remove(targetTriggerClass);

        if (targetTriggerVarMode && variableRemover !== undefined) {
          variableRemover();
          variableRemover = undefined;
        }
      } else {
        targetElement.classList.add(targetTriggerClass);

        if (targetTriggerVarMode && varModes) {
          const targetVarMode = varModes[targetTriggerVarMode];

          if (!targetVarMode) return;

          variableRemover = injectCssVariables(targetElement, targetVarMode);
        }
      }
    });
  }

  window.wfVarModes.onReady((data) => {
    varModes = data;
  });
};

init();
