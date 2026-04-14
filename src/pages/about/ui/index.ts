export function aboutPage() {
    const section = document.createElement('section');
    section.className = 'about page-enter';
    section.innerHTML = `
        <div class="container">
            <div class="section-header">
                <h2>Sobre Mí</h2>
                <span class="section-header__line"></span>
            </div>

            <div class="about__card">

                <div class="about__profile">
                    <div class="about__avatar">
                        <img src="img/profile.png" alt="Foto de perfil"
                             onerror="this.style.display='none'; this.parentElement.innerHTML='👩‍💻'">
                    </div>
                    <div class="about__identity">
                        <div class="about__name">Dariana Pol Aramayo</div>
                        <div class="about__social">

                            <a href="https://www.linkedin.com/in/dariana-pol-aramayo/"
                               target="_blank" class="about__social-link" title="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>

                        </div>
                    </div>
                </div>

                <div class="about__content">
                    <h3>Perfil Profesional</h3>
                    <p>Estudiante de quinto semestre de Ingeniería de Software en la Universidad Católica
                    Boliviana con una beca por excelencia académica. Como AWS Cloud Club Captain, me
                    apasiona liderar comunidades tecnológicas y construir puentes entre la academia y
                    la industria cloud.</p>
                    <p>Mi enfoque combina el desarrollo Full Stack con la arquitectura de hardware e
                    inteligencia artificial, buscando siempre crear soluciones técnicas que impacten
                    positivamente en el entorno social y profesional.</p>
                </div>

            </div>

            <div class="about__section">
                <h4>Educación</h4>
                <div class="education-grid">
                    <div class="education-card">
                        <h5>Bachillerato en humanidades</h5>
                        <span>Colegio "Cristo Rey"</span>
                        <p>Graduada con honores</p>
                    </div>
                    <div class="education-card">
                        <h5>Ingeniería de Software</h5>
                        <span>Universidad Católica Boliviana "San Pablo"</span>
                        <p>Estudiante de 5to semestre con Beca STEM (Santa Cruz).</p>
                    </div>
                    <div class="education-card">
                        <h5>AWS Cloud Club Captain</h5>
                        <span>Amazon Web Services (AWS)</span>
                        <p>Liderazgo de comunidad estudiantil, organización de eventos técnicos y gestión de equipos core.</p>
                    </div>
                </div>
            </div>

            <div class="about__section">
                <h4>Hobbies e Intereses</h4>
                <div class="hobbies-grid">
                    <span>🏐 Voleybol</span>
                    <span>📚 Lectura</span>
                    <span>🎮 Gaming</span>
                    <span>🎵 Música</span>
                    <span>🍳 Cocina</span>
                </div>
            </div>

            <div class="back-home">
                <a href="/" data-link>← Volver a inicio</a>
            </div>
        </div>
    `;
    return section;
}
