/**
 * app.js — Router principal de la SPA
 * Patrones: Strategy (routes), Observer (routechange), Singleton (FavoritesStore), Template Method (blog-card)
 */

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

// path siempre llega como "/ruta" (sin #)
function navigate(path) {
    // Asignar solo la parte después del #
    window.location.hash = path;
}

function resolve() {
    // hash es "#/ruta" → slice(1) da "/ruta"
    // Si no hay hash, usar "/"
    const raw  = window.location.hash;
    const path = raw ? raw.slice(1) : '/';
    const handler = routes[path] ?? routes['/'];
    renderPage(handler());
    window.dispatchEvent(new CustomEvent('routechange', { detail: { path } }));
}

// Botón atrás/adelante
window.addEventListener('hashchange', resolve);

// Interceptar clicks en [data-link]
// Los href son "#/ruta" — extraemos solo "/ruta" para navigate()
document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (!link) return;
    e.preventDefault();
    const href = link.getAttribute('href'); // "#/ruta"
    const path = href.startsWith('#') ? href.slice(1) : href; // "/ruta"
    navigate(path);
});

// Arranque
resolve();