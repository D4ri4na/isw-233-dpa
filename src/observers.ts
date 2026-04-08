/**
 * observers.ts
 * Typed wrappers around the three observer APIs used in the portfolio.
 */

export function initIntersectionObserver(root: Element): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );

  root.querySelectorAll<HTMLElement>('[data-observe]').forEach((el) =>
    observer.observe(el)
  );
  return observer;
}

export function initMutationObserver(gridEl: Element): MutationObserver {
  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node, i) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const el = node as HTMLElement;
        el.style.animationDelay = `${i * 70}ms`;
        el.classList.add('card-enter');
      });
    });
  });

  observer.observe(gridEl, { childList: true });
  return observer;
}

export function initResizeObserver(skillsGrid: HTMLElement): ResizeObserver {
  const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      if (width < 340) {
        skillsGrid.style.gridTemplateColumns = '1fr';
      } else if (width < 580) {
        skillsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
      } else {
        skillsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
      }
    }
  });

  observer.observe(skillsGrid);
  return observer;
}