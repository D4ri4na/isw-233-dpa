/**
 * app-header.js
 * Web Component para el header/navegación de la SPA.
 * Patrón: Observer — escucha cambios de ruta para marcar el link activo.
 */
class AppHeader extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setupDarkMode();
        this.highlightActive();
        // Escucha cambios de ruta (Observer pattern)
        window.addEventListener('routechange', () => this.highlightActive());
    }

    render() {
        this.innerHTML = `
            <header class="header" id="main-header">
                <div class="container">
                    <nav class="nav">
                        <ul class="nav__list">
                            <li><a href="#/" data-link class="nav__link">Inicio</a></li>
                            <li><a href="#/about" data-link class="nav__link">Sobre Mí</a></li>
                            <li><a href="#/proyectos" data-link class="nav__link">Proyectos</a></li>
                            <li><a href="#/experiencia" data-link class="nav__link">Experiencia</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <button class="dark-mode-btn" id="darkModeBtn" aria-label="Cambiar modo oscuro">🌙</button>
        `;
    }

    setupDarkMode() {
        const btn = this.querySelector('#darkModeBtn');
        // Restaurar preferencia guardada
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            btn.textContent = '☀️';
        }

        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            btn.textContent = isDark ? '☀️' : '🌙';
        });

        // Header cambia al hacer scroll
        window.addEventListener('scroll', () => {
            const header = this.querySelector('.header');
            if (header) {
                header.classList.toggle('header--scrolled', window.scrollY > 40);
            }
        });
    }

    highlightActive() {
        const path = window.location.hash.slice(1) || '/';
        this.querySelectorAll('.nav__link').forEach(link => {
            link.classList.remove('nav__link--active');
            // href es "#/ruta" → slice(1) → "/ruta"
            const href = link.getAttribute('href').slice(1);
            if (href === path) {
                link.classList.add('nav__link--active');
            }
        });
    }
}

customElements.define('app-header', AppHeader);