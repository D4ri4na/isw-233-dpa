import { BLOG_ARTICLES, FavoritesStore } from '../store.js';
import { initIntersectionObserver, initMutationObserver } from '../observers.js';

export function blogPage() {
    const wrapper = document.createElement('section');
    wrapper.className = 'blog page-enter';
    wrapper.innerHTML = `
        <div class="container">
            <h2 class="blog__title" data-observe>Blog</h2>
            <span class="blog__title-line"></span>
            <p class="blog__subtitle" data-observe>Comparto mis conocimientos y experiencias en desarrollo de software</p>
            <div class="blog__filters" id="blog-filters" data-observe>
                <button class="blog__filter-btn blog__filter-btn--active" data-filter="all">Todos</button>
                <button class="blog__filter-btn" data-filter="Cloud / AWS">☁️ Cloud / AWS</button>
                <button class="blog__filter-btn" data-filter="Arquitectura">🏗️ Arquitectura</button>
                <button class="blog__filter-btn" data-filter="IA">🤖 IA</button>
                <button class="blog__filter-btn" data-filter="Hardware">🔧 Hardware</button>
                <button class="blog__filter-btn" data-filter="favs">⭐ Favoritos</button>
            </div>
            <div class="blog__grid" id="blog-grid"></div>
        </div>
    `;

    const grid    = wrapper.querySelector('#blog-grid');
    const filters = wrapper.querySelector('#blog-filters');
    let currentFilter = 'all';

    const mutObs = initMutationObserver(grid);

    function renderCards(filter) {
        mutObs.disconnect();
        grid.innerHTML = '';
        mutObs.observe(grid, { childList: true });

        const favs = FavoritesStore.getAll();
        let articles = BLOG_ARTICLES;
        if (filter === 'favs')     articles = BLOG_ARTICLES.filter(a => favs.includes(a.id));
        else if (filter !== 'all') articles = BLOG_ARTICLES.filter(a => a.tag === filter);

        if (articles.length === 0) {
            grid.innerHTML = `<p style="color:#aaa;text-align:center;grid-column:1/-1;padding:40px 0">
                No hay artículos en esta categoría todavía.</p>`;
            return;
        }
        articles.forEach(article => {
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
    }

    filters.addEventListener('click', (e) => {
        const btn = e.target.closest('.blog__filter-btn');
        if (!btn) return;
        filters.querySelectorAll('.blog__filter-btn')
               .forEach(b => b.classList.remove('blog__filter-btn--active'));
        btn.classList.add('blog__filter-btn--active');
        currentFilter = btn.dataset.filter;
        renderCards(currentFilter);
    });

    wrapper.addEventListener('toggle-fav', (e) => {
        FavoritesStore.toggle(e.detail.id);
        renderCards(currentFilter);
    });

    renderCards('all');
    initIntersectionObserver(wrapper);

    return wrapper;
}