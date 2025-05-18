import { detectScrollAmount } from '@/utils/detect-scroll-amount';
import { fallback, parseFloatFallback } from '@/utils/util';

const init = () => {
  const toggleAfterTargetScrollElements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-toggle-after-target-scroll-element]')
  );

  for (const targetElement of toggleAfterTargetScrollElements) {
    const initialOffset = parseFloatFallback(targetElement.dataset.afterScrollInitialOffset, 100);
    const targetTriggerClass = fallback(
      targetElement.dataset.afterScrollTriggerClass,
      'scrolled-below'
    );

    detectScrollAmount(initialOffset, (beforeTargetScroll) => {
      if (beforeTargetScroll) {
        targetElement.classList.remove(targetTriggerClass);
      } else {
        targetElement.classList.add(targetTriggerClass);
      }
    });
  }
};

init();
