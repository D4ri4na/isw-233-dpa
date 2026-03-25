import { initIntersectionObserver } from '../observers.js';
import { renderTemplate }           from '../hbs.js';

const PROJECTS = [
    {
        title      : 'E-Commerce Platform — MARKEA',
        description: 'Plataforma completa de comercio electrónico con panel de administración, carrito de compras y sistema de pagos integrado.',
        img        : 'img/MARKEA.ico',
        fallback   : 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
        tags       : ['React', 'SQL Server', 'MongoDB'],
        repo       : 'https://github.com/D4ri4na/MARKEA.git',
    },
    {
        title      : 'Clínica: agenda de citas y atención',
        description: 'Página web para gestionar agendas médicas por especialidad y atender citas.',
        img        : 'img/clinica.png',
        fallback   : 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
        tags       : ['React', 'Java'],
        repo       : 'https://github.com/Andress-Mallea/Remontada-Epica-De-Diseno.git',
    },
    {
        title      : 'Simulador interactivo de arquitectura x86',
        description: 'El simulador permite cargar y ejecutar código en lenguaje ensamblador x86.',
        img        : 'img/arq.png',
        fallback   : 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
        tags       : ['C++', 'Ensamblador', 'VBA'],
        repo       : 'https://github.com/NicoleLozadaLeon/Simulador-de-Arquitectura-x86.git',
    },
];

export function projectsPage() {
    const section = document.createElement('section');
    section.className = 'projects page-enter';

    const cardsHTML = renderTemplate('tpl-project-card', { projects: PROJECTS });

    section.innerHTML = `
        <div class="container">
            <div class="section-header" data-observe>
                <h2>Proyectos Destacados</h2>
                <span class="section-header__line"></span>
            </div>
            <div class="projects__grid">
                ${cardsHTML}
            </div>
            <div class="back-home" data-observe>
                <a href="/" data-link>← Volver a inicio</a>
            </div>
        </div>
    `;

    initIntersectionObserver(section);
    return section;
}