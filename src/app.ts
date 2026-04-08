import { loadStyles } from './styles.ts';
import './components/index.ts';
import {
  homePage,
  aboutPage,
  projectsPage,
  blogPage,
  experiencePage,
  contactPage,
} from './pages/index.ts';
import type { Routes, RouteChangeDetail } from './types.ts';

loadStyles();

const routes: Routes = {
  '/':            homePage,
  '/about':       aboutPage,
  '/proyectos':   projectsPage,
  '/blog':        blogPage,
  '/experiencia': experiencePage,
  '/contacto':    contactPage,
};

function renderPage(pageNode: HTMLElement): void {
  const root = document.getElementById('app-root');
  if (!root) return;
  root.innerHTML = '';
  root.appendChild(pageNode);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigate(path: string): void {
  window.history.pushState({}, '', path);
  resolve();
}

function resolve(): void {
  const path = window.location.pathname;
  const handler = routes[path] ?? routes['/'];
  renderPage(handler());
  const detail: RouteChangeDetail = { path };
  window.dispatchEvent(new CustomEvent<RouteChangeDetail>('routechange', { detail }));
}

function restoreRoute(): void {
  const saved = sessionStorage.getItem('spa:route');
  if (saved) {
    sessionStorage.removeItem('spa:route');
    window.history.replaceState({}, '', saved);
  }
}

window.addEventListener('popstate', resolve);

document.addEventListener('click', (e: MouseEvent) => {
  const link = (e.target as Element).closest<HTMLAnchorElement>('[data-link]');
  if (!link) return;
  e.preventDefault();
  navigate(link.getAttribute('href') ?? '/');
});

restoreRoute();
resolve();