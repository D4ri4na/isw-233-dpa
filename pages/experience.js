export function experiencePage() {
    const section = document.createElement('section');
    section.className = 'experience page-enter';
    section.innerHTML = `
        <div class="container">
            <div class="section-header">
                <h2>Experiencia &amp; Habilidades</h2>
                <span class="section-header__line"></span>
            </div>
            <div class="exp-block">
                <h3 class="exp-block__title"><span class="exp-block__icon">💼</span> Experiencia Profesional</h3>
                <div class="exp-list">
                    <div class="exp-card">
                        <div class="exp-card__img">
                            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80" alt="Tech Solutions">
                        </div>
                        <div class="exp-card__info">
                            <h4>Senior Full Stack Developer</h4>
                            <span class="exp-card__company">Tech Solutions Inc.</span>
                            <span class="exp-card__period">2023 - Presente</span>
                            <p>Liderazgo de equipo de desarrollo en proyectos de alto impacto. Implementación de arquitecturas escalables.</p>
                        </div>
                    </div>
                    <div class="exp-card">
                        <div class="exp-card__img">
                            <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300&q=80" alt="Digital Innovations">
                        </div>
                        <div class="exp-card__info">
                            <h4>Full Stack Developer</h4>
                            <span class="exp-card__company">Digital Innovations</span>
                            <span class="exp-card__period">2021 - 2023</span>
                            <p>Desarrollo de aplicaciones web y móviles. Colaboración en proyectos internacionales con metodologías ágiles.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="exp-block">
                <h3 class="exp-block__title"><span class="exp-block__icon--code">&lt;&gt;</span> Habilidades Técnicas</h3>
                <div class="skills-grid">
                    <div class="skill-card">
                        <span class="skill-card__category">Frontend</span>
                        <div class="skill-card__tags"><span>React</span><span>Angular</span><span>TypeScript</span></div>
                    </div>
                    <div class="skill-card">
                        <span class="skill-card__category">Backend</span>
                        <div class="skill-card__tags"><span>Node.js</span><span>Python</span><span>Java</span><span>C#</span></div>
                    </div>
                    <div class="skill-card">
                        <span class="skill-card__category">Herramientas</span>
                        <div class="skill-card__tags"><span>Git</span><span>Docker</span><span>AWS</span><span>CI/CD</span><span>Azure</span></div>
                    </div>
                    <div class="skill-card">
                        <span class="skill-card__category">Bases de Datos</span>
                        <div class="skill-card__tags"><span>MongoDB</span><span>PostgreSQL</span><span>MySQL</span><span>Supabase</span></div>
                    </div>
                </div>
            </div>
            <div class="exp-block">
                <h3 class="exp-block__title"><span class="exp-block__icon--code">🗂️</span> Certificaciones</h3>
            </div>
            <div class="back-home"><a href="/" data-link>← Volver a inicio</a></div>
        </div>
    `;
    return section;
}