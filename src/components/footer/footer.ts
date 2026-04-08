export class AppFooter extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <footer class="footer">
        <div class="container footer__grid">
          <div class="footer__column">
            <h3 class="footer__title">Dariana Pol Aramayo</h3>
            <p>Desarrolladora Full Stack apasionada por crear soluciones tecnológicas que marquen la diferencia.</p>
          </div>
          <div class="footer__column">
            <h3 class="footer__title">Enlaces Rápidos</h3>
            <ul class="footer__links">
              <li><a href="/"           data-link>Inicio</a></li>
              <li><a href="/proyectos"  data-link>Proyectos</a></li>
              <li><a href="/about"      data-link>Sobre Mí</a></li>
              <li><a href="/contacto"   data-link>Contacto</a></li>
            </ul>
          </div>
          <div class="footer__column">
            <h3 class="footer__title">Newsletter</h3>
            <p>Suscríbete para recibir actualizaciones sobre nuevos proyectos y artículos.</p>
            <form class="footer__newsletter" id="newsletter-form">
              <input type="email" placeholder="Tu email" required>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
        <div class="footer__bottom">
          <p>© 2026 Dariana Pol Aramayo. Hecho con ❤️ y mucho café</p>
          <div class="footer__legal">
            <a href="#">Política de Privacidad</a>
            <a href="#">Términos de Uso</a>
          </div>
        </div>
      </footer>
    `;

    const form = this.querySelector<HTMLFormElement>('#newsletter-form');
    form?.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();
      const input = (e.target as HTMLFormElement).querySelector<HTMLInputElement>('input');
      if (input) {
        alert(`¡Gracias por suscribirte con ${input.value}!`);
        input.value = '';
      }
    });
  }
}

customElements.define('app-footer', AppFooter);