const STYLES = [
    'blocks/base.css',
    'blocks/header.css',
    'blocks/hero.css',
    'blocks/about.css',
    'blocks/blog.css',
    'blocks/projects.css',
    'blocks/experience.css',
    'blocks/contact.css',
    'blocks/footer.css',
    'blocks/dark-mode.css',
];

const FONTS = [
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap',
];

export function loadStyles() {
    [...FONTS, ...STYLES].forEach(href => {
        if (document.querySelector(`link[href="${href}"]`)) return;
        const link = document.createElement('link');
        link.rel  = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    });
}