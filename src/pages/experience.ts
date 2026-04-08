import { initIntersectionObserver } from '../observers.ts';

export function experiencePage(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'experience page-enter';
  section.innerHTML = `
    <div class="container">
      <div class="section-header" data-observe>
        <h2>Experiencia</h2>
        <span class="section-header__line"></span>
      </div>

      <div class="exp-block" data-observe>
        <h3 class="exp-block__title">
          <span class="exp-block__icon">💼</span> Experiencia Profesional
        </h3>
        <div class="exp-list">
          <article class="exp-card">
            <div class="exp-card__img">
              <img src="https://images.unsplash.com/photo-1553283169-83dff8d237fe?w=120&q=80" alt="AWS">
            </div>
            <div class="exp-card__info">
              <h4>AWS Cloud Club Captain</h4>
              <span class="exp-card__company">Universidad Católica Boliviana</span>
              <span class="exp-card__period">2024 - Presente</span>
              <p>Liderazgo de iniciativas de aprendizaje en tecnologías cloud. Organización de eventos, talleres y conectar estudiantes con oportunidades tecnológicas en AWS.</p>
            </div>
          </article>
          <article class="exp-card">
            <div class="exp-card__img">
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=120&q=80" alt="Desarrollo">
            </div>
            <div class="exp-card__info">
              <h4>Desarrolladora Full Stack</h4>
              <span class="exp-card__company">Proyectos Académicos</span>
              <span class="exp-card__period">2023 - 2026</span>
              <p>Desarrollo de aplicaciones web escalables utilizando tecnologías modernas. Experiencia en frontend (React) y backend (Java, Node.js).</p>
            </div>
          </article>
        </div>
      </div>

      <div class="exp-block" data-observe>
        <h3 class="exp-block__title">
          <span class="exp-block__icon--code">{ }</span> Habilidades Técnicas
        </h3>
        <div class="skills-grid">
          <article class="skill-card" data-observe>
            <span class="skill-card__category">Frontend</span>
            <div class="skill-card__tags">
              <span>React</span>
              <span>TypeScript</span>
              <span>Vite</span>
              <span>CSS</span>
            </div>
          </article>
          <article class="skill-card" data-observe>
            <span class="skill-card__category">Backend</span>
            <div class="skill-card__tags">
              <span>Java</span>
              <span>Node.js</span>
              <span>SQL</span>
              <span>MongoDB</span>
            </div>
          </article>
          <article class="skill-card" data-observe>
            <span class="skill-card__category">Cloud & DevOps</span>
            <div class="skill-card__tags">
              <span>AWS</span>
              <span>Git</span>
              <span>Docker</span>
            </div>
          </article>
          <article class="skill-card" data-observe>
            <span class="skill-card__category">Otros</span>
            <div class="skill-card__tags">
              <span>Python</span>
              <span>TensorFlow</span>
              <span>Ensamblador</span>
            </div>
          </article>
        </div>
      </div>

      <div class="back-home" data-observe>
        <a href="/" data-link>← Volver a inicio</a>
      </div>
    </div>
  `;

  initIntersectionObserver(section);
  return section;
}