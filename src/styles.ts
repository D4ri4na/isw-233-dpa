const STYLES: string[] = [
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

const FONTS: string[] = [
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap',
];

export function loadStyles(): void {
  [...FONTS, ...STYLES].forEach((href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
}