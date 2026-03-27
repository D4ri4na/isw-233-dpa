import { loadStyles }  from './styles.js';
import './components/index.js';
import {
    homePage,
    aboutPage,
    projectsPage,
    blogPage,
    experiencePage,
    contactPage,
} from './pages/index.js';

loadStyles();

// Strategy
const routes = {
    '/'           : homePage,
    '/about'      : aboutPage,
    '/proyectos'  : projectsPage,
    '/blog'       : blogPage,
    '/experiencia': experiencePage,
    '/contacto'   : contactPage,
};

function renderPage(pageNode) {
    const root = document.getElementById('app-root');
    root.innerHTML = '';
    root.appendChild(pageNode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigate(path) {
    window.history.pushState({}, '', path);
    resolve();
}

function resolve() {
    const path    = window.location.pathname;
    const handler = routes[path] ?? routes['/'];
    renderPage(handler());
    window.dispatchEvent(new CustomEvent('routechange', { detail: { path } }));
}

function restoreRoute() {
    const saved = sessionStorage.getItem('spa:route');
    if (saved) {
        sessionStorage.removeItem('spa:route');
        window.history.replaceState({}, '', saved);
    }
}

window.addEventListener('popstate', resolve);

document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (!link) return;
    e.preventDefault();
    navigate(link.getAttribute('href'));
});

restoreRoute();
resolve();    