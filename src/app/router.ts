import { ROUTES } from '../shared/config/routes';

export type PageRenderer = () => HTMLElement | Promise<string | HTMLElement>;

export class Router {
  private routes: Record<string, PageRenderer> = {};
  private root: HTMLElement;

  constructor(rootId: string) {
    this.root = document.getElementById(rootId) || document.body;
    window.addEventListener('popstate', () => this.resolve());
    
    document.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('[data-link]');
      if (target) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href) this.navigate(href);
      }
    });
  }

  addRoute(path: string, renderer: PageRenderer) {
    this.routes[path] = renderer;
    return this;
  }

  async navigate(path: string) {
    window.history.pushState({}, '', path);
    await this.resolve();
  }

  async resolve() {
    const path = window.location.pathname;
    const renderer = this.routes[path] || this.routes[ROUTES.HOME];
    
    this.root.innerHTML = 'Animate loading...'; 
    const content = await Promise.resolve(renderer());
    
    if (typeof content === 'string') {
      this.root.innerHTML = content;
    } else {
      this.root.innerHTML = '';
      this.root.appendChild(content);
    }
    
    window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent('routechange', { detail: { path } }));
  }
}