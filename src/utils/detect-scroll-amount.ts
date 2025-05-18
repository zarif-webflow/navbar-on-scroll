/**
 * Detects if the page has been scrolled past a certain vertical length using Intersection Observer.
 * Does NOT use the window 'scroll' event.
 *
 * @param scrollYThreshold - The number of pixels from the top to detect if the user has scrolled past.
 * @param callback - Function called with `true` if scrolled past threshold, `false` otherwise.
 * @returns cleanup function to disconnect observer and remove marker
 */
export function detectScrollAmount(
  scrollYThreshold: number,
  callback: (beforeTargetScroll: boolean) => void
): () => void {
  // Create or get a marker element at the threshold position
  let marker = document.createElement('div');
  marker.style.position = 'absolute';
  marker.style.top = `${scrollYThreshold}px`;
  marker.style.left = '0';
  marker.style.width = '1px';
  marker.style.height = '1px';
  marker.style.pointerEvents = 'none';
  marker.style.zIndex = '-1';
  marker.setAttribute('data-scroll-threshold-marker', 'true');

  // Avoid duplicating marker if already present
  if (!document.body.querySelector('[data-scroll-threshold-marker]')) {
    document.body.appendChild(marker);
  } else {
    marker = document.body.querySelector('[data-scroll-threshold-marker]') as HTMLDivElement;
  }

  // Helper to detect immediately on page load
  function isPastThreshold(): boolean {
    const rect = marker.getBoundingClientRect();
    return rect.top < 0;
  }

  // Initial check
  callback(isPastThreshold());

  // Set up Intersection Observer
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return;
      // If the marker is not intersecting, it means we've scrolled past it
      callback(entry.isIntersecting);
    },
    {
      root: null,
      threshold: 0,
    }
  );

  observer.observe(marker);

  // Cleanup function
  return () => {
    observer.disconnect();
    if (marker.parentNode) marker.parentNode.removeChild(marker);
  };
}
