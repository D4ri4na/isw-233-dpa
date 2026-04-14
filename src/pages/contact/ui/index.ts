export function contactPage(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'contact page-enter';
  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2>Contacto</h2>
        <span class="section-header__line"></span>
        <p class="blog__subtitle">¿Tienes un proyecto en mente? ¡Hablemos!</p>
      </div>
      <div class="contact__grid">
        <div class="contact__info">
          <h3>Información de Contacto</h3>
          <div class="contact__item">
            <span class="contact__item-icon">✉️</span>
            <div><strong>Email</strong><p>dpolaramayo@gmail.com</p></div>
          </div>
          <div class="contact__item">
            <span class="contact__item-icon">📞</span>
            <div><strong>Teléfono</strong><p>+591 78004539</p></div>
          </div>
          <div class="contact__item">
            <span class="contact__item-icon">📍</span>
            <div>
              <p>Universidad Católica Boliviana "San Pablo"</p>
              <p>Santa Cruz, Bolivia</p>
            </div>
          </div>
          <h4>Redes Sociales</h4>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/dariana-pol-aramayo/" target="_blank" class="social-links__link">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="28" alt="LinkedIn">
            </a>
            <a href="https://github.com/D4ri4na" target="_blank" class="social-links__link">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="28" alt="GitHub">
            </a>
          </div>
        </div>
        <div class="contact__form">
          <h3>Envíame un Mensaje</h3>
          <form id="contactForm">
            <label>Nombre<input type="text" name="nombre" placeholder="Tu nombre completo" required></label>
            <label>Email<input type="email" name="email" placeholder="tu@email.com" required></label>
            <label>Asunto<input type="text" name="asunto" placeholder="¿De qué quieres hablar?" required></label>
            <label>Mensaje<textarea name="mensaje" rows="4" placeholder="Cuéntame sobre tu proyecto..." required></textarea></label>
            <button type="submit" class="btn btn--primary" style="width:100%;border-radius:10px;padding:14px">
              ✈ Enviar Mensaje
            </button>
          </form>
          <p id="contact-success" style="display:none;color:#27ae60;text-align:center;margin-top:16px;font-weight:600">
            ✅ ¡Mensaje enviado! Me pondré en contacto pronto.
          </p>
        </div>
      </div>
      <div class="back-home"><a href="/" data-link>← Volver a inicio</a></div>
    </div>
  `;

  section.querySelector<HTMLFormElement>('#contactForm')?.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    (e.target as HTMLFormElement).style.display = 'none';
    const success = section.querySelector<HTMLElement>('#contact-success');
    if (success) success.style.display = 'block';
  });

  return section;
}
