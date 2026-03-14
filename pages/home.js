import { BLOG_ARTICLES, FavoritesStore } from '../store.js';

export function homePage() {
    const section = document.createElement('div');
    section.className = 'page-enter';
    section.innerHTML = `
        <section class="hero" id="home">
            <div class="container hero__content">
                <h1 class="hero__title">Hola, Soy <span class="highlight">Dariana</span></h1>
                <p class="hero__description">
                    Estudiante de Ingeniería de Software y AWS Cloud Club Captain.
                    Me especializo en construir soluciones escalables y eficientes, combinando
                    el desarrollo Full Stack con la potencia de la nube para transformar ideas
                    en realidades digitales.
                </p>
                <div class="hero__buttons">
                    <a href="/contacto" data-link class="btn btn--primary">Contáctame</a>
                    <a href="/proyectos" data-link class="btn btn--outline">Ver Proyectos</a>
                    <div class="hero__arrow">&#x25BC;</div>
                </div>
            </div>
        </section>

        <section class="blog" id="blog">
            <div class="container">
                <h2 class="blog__title">Blog</h2>
                <span class="blog__title-line"></span>
                <p class="blog__subtitle">Comparto mis conocimientos y experiencias en desarrollo de software</p>
                <div class="blog__grid" id="home-blog-grid"></div>
                <div class="back-home" style="margin-top:40px">
                    <a href="/blog" data-link>Ver todos los artículos →</a>
                </div>
            </div>
        </section>
    `;

    const grid = section.querySelector('#home-blog-grid');
    BLOG_ARTICLES.slice(0, 2).forEach(article => {
        const card = document.createElement('blog-card');
        card.setAttribute('article-id', article.id);
        card.setAttribute('date',       article.date);
        card.setAttribute('tag',        article.tag);
        card.setAttribute('title',      article.title);
        card.setAttribute('preview',    article.preview);
        card.setAttribute('body',       article.body);
        card.setAttribute('favorited',  FavoritesStore.has(article.id) ? 'true' : 'false');
        grid.appendChild(card);
    });

    section.addEventListener('toggle-fav', (e) => {
        FavoritesStore.toggle(e.detail.id);
        const card = section.querySelector(`blog-card[article-id="${e.detail.id}"]`);
        if (card) card.setAttribute('favorited', FavoritesStore.has(e.detail.id) ? 'true' : 'false');
    });

    return section;
}