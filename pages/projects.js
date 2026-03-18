import { initIntersectionObserver } from '../observers.js';

export function projectsPage() {
    const section = document.createElement('section');
    section.className = 'projects page-enter';
    section.innerHTML = `
        <div class="container">
            <div class="section-header" data-observe>
                <h2>Proyectos Destacados</h2>
                <span class="section-header__line"></span>
            </div>
            <div class="projects__grid">
                <article class="project-card" data-observe>
                    <div class="project-card__img">
                        <img src="img/MARKEA.ico" alt="MARKEA"
                             onerror="this.src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80'">
                    </div>
                    <div class="project-card__body">
                        <h3>E-Commerce Platform — MARKEA</h3>
                        <p>Plataforma completa de comercio electrónico con panel de administración, carrito de compras y sistema de pagos integrado.</p>
                        <div class="project-card__tags"><span>React</span><span>SQL Server</span><span>MongoDB</span></div>
                        <div class="project-card__links">
                            <a href="https://github.com/D4ri4na/MARKEA.git" target="_blank">↗ Ver Código</a>
                        </div>
                    </div>
                </article>
                <article class="project-card" data-observe>
                    <div class="project-card__img">
                        <img src="img/clinica.png" alt="Clínica"
                             onerror="this.src='https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80'">
                    </div>
                    <div class="project-card__body">
                        <h3>Clínica: agenda de citas y atención</h3>
                        <p>Página web para gestionar agendas médicas por especialidad y atender citas.</p>
                        <div class="project-card__tags"><span>React</span><span>Java</span></div>
                        <div class="project-card__links">
                            <a href="https://github.com/Andress-Mallea/Remontada-Epica-De-Diseno.git" target="_blank">↗ Ver Código</a>
                        </div>
                    </div>
                </article>
                <article class="project-card" data-observe>
                    <div class="project-card__img">
                        <img src="img/arq.png" alt="Simulador x86"
                             onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80'">
                    </div>
                    <div class="project-card__body">
                        <h3>Simulador interactivo de arquitectura x86</h3>
                        <p>El simulador permite cargar y ejecutar código en lenguaje ensamblador x86.</p>
                        <div class="project-card__tags"><span>C++</span><span>Ensamblador</span><span>VBA</span></div>
                        <div class="project-card__links">
                            <a href="https://github.com/NicoleLozadaLeon/Simulador-de-Arquitectura-x86.git" target="_blank">↗ Ver Código</a>
                        </div>
                    </div>
                </article>
            </div>
            <div class="back-home" data-observe>
                <a href="/" data-link>← Volver a inicio</a>
            </div>
        </div>
    `;

    initIntersectionObserver(section);
    return section;
}