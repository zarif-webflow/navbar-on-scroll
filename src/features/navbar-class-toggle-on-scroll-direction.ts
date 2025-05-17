import { ScrollDirectionManager } from '@/utils/scroll-direction-manager';
import { fallback, parseFloatFallback } from '@/utils/util';

const init = () => {
  const navbar = document.querySelector<HTMLDivElement>('[data-navbar]');

  if (!navbar) {
    console.debug('Navbar not found');
    return;
  }

  const initialOffset = parseFloatFallback(navbar.dataset.initialOffset, 120);
  const targetTriggerClass = fallback(navbar.dataset.triggerClass, 'hide-navbar');

  new ScrollDirectionManager({
    initialOffset,
    onDirectionChange: (direction) => {
      if (direction === 'up' || direction === 'initial') {
        navbar.classList.remove(targetTriggerClass);
        return;
      }
      navbar.classList.add(targetTriggerClass);
    },
  });
};

init();
