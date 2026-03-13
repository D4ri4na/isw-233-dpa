/**
 * pages/about.js
 * Vista "Sobre Mí".
 */
function aboutPage() {
    const section = document.createElement('section');
    section.className = 'about page-enter';
    section.id = 'about';
    section.innerHTML = `
        <div class="container">
            <div class="section-header">
                <h2>Sobre Mí</h2>
                <span class="section-header__line"></span>
            </div>

            <div class="about__card">
                <div class="about__avatar">
                    <img src="img/profile.png" alt="Foto de perfil"
                         onerror="this.style.display='none'; this.parentElement.innerHTML='👩‍💻'">
                </div>
                <div>
                    <div class="about__name">Dariana Pol Aramayo</div>
                    <div class="about__content">
                        <h3>Perfil Profesional</h3>
                        <p>
                            Estudiante de quinto semestre de Ingeniería de Software en la Universidad Católica
                            Boliviana con una beca por excelencia académica. Como AWS Cloud Club Captain, me
                            apasiona liderar comunidades tecnológicas y construir puentes entre la academia y
                            la industria cloud.
                        </p>
                        <p>
                            Mi enfoque combina el desarrollo Full Stack con la arquitectura de hardware e
                            inteligencia artificial, buscando siempre crear soluciones técnicas que impacten
                            positivamente en el entorno social y profesional.
                        </p>
                    </div>
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
                <a href="#/" data-link>← Volver a inicio</a>
            </div>
        </div>
    `;
    return section;
}