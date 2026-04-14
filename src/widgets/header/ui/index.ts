import type { RouteChangeDetail } from '../../../types.ts';

export class AppHeader extends HTMLElement {
  connectedCallback(): void {
    this.render();
    this.setupDarkMode();
    this.highlightActive();
    window.addEventListener('routechange', () => this.highlightActive());
  }

  private render(): void {
    this.innerHTML = `
      <header class="header" id="main-header">
        <div class="container">
          <nav class="nav">
            <ul class="nav__list">
              <li><a href="/about"       data-link class="nav__link">Sobre Mí</a></li>
              <li><a href="/proyectos"   data-link class="nav__link">Proyectos</a></li>
              <li><a href="/experiencia" data-link class="nav__link">Experiencia</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <button class="dark-mode-btn" id="darkModeBtn" aria-label="Cambiar modo oscuro">🌙</button>
    `;
  }

  private setupDarkMode(): void {
    const btn = this.querySelector<HTMLButtonElement>('#darkModeBtn');
    if (!btn) return;

    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      btn.textContent = '☀️';
    }

    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', String(isDark));
      btn.textContent = isDark ? '☀️' : '🌙';
    });

    window.addEventListener('scroll', () => {
      const header = this.querySelector<HTMLElement>('.header');
      if (header) header.classList.toggle('header--scrolled', window.scrollY > 40);
    });
  }

  private highlightActive(): void {
    const path = window.location.pathname;
    this.querySelectorAll<HTMLAnchorElement>('.nav__link').forEach((link) => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === path) {
        link.classList.add('nav__link--active');
      }
    });
  }
}

customElements.define('app-header', AppHeader);

declare global {
  interface WindowEventMap {
    routechange: CustomEvent<RouteChangeDetail>;
  }
}
