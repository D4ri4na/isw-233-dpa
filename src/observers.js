export function initIntersectionObserver(root) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    root.querySelectorAll('[data-observe]').forEach(el => observer.observe(el));
    return observer;
}

export function initMutationObserver(gridEl) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach((node, i) => {
                if (node.nodeType !== Node.ELEMENT_NODE) return;
                node.style.animationDelay = `${i * 70}ms`;
                node.classList.add('card-enter');
            });
        });
    });

    observer.observe(gridEl, { childList: true });
    return observer;
}

export function initResizeObserver(skillsGrid) {
    const observer = new ResizeObserver((entries) => {
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