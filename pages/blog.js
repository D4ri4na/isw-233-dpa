const BLOG_ARTICLES = [
    {
        id: '1',
        date: '22 de febrero de 2026',
        tag: 'Cloud / AWS',
        title: 'Mi camino como AWS Cloud Club Captain',
        preview: 'Una mirada interna a cómo estamos impulsando la cultura de la nube en la UCB.',
        body: 'Ser parte del liderazgo del AWS Cloud Club me ha permitido organizar eventos, conectar estudiantes con oportunidades tecnológicas y fomentar el aprendizaje colaborativo en tecnologías cloud.'
    },
    {
        id: '2',
        date: '5 de febrero de 2026',
        tag: 'Arquitectura',
        title: 'Aplicando SOLID en sistemas reales',
        preview: 'Cómo implementamos patrones como State y Strategy en un sistema de citas médicas desarrollado en Java.',
        body: 'No se trata solo de escribir código que funcione, sino de estructurarlo con patrones SOLID para que sistemas complejos, como el de una clínica médica, puedan evolucionar de forma escalable y mantenible.'
    },
    {
        id: '3',
        date: '28 de enero de 2026',
        tag: 'IA',
        title: 'Reconocimiento de gestos con TensorFlow',
        preview: 'Explorando el potencial de Keras y Computer Vision para detectar movimientos de manos en tiempo real.',
        body: 'La visión por computadora permite que las máquinas "entiendan" nuestro mundo físico; aquí exploro cómo entrenar modelos con Keras y TensorFlow para transformar gestos de manos en comandos digitales precisos.'
    },
    {
        id: '4',
        date: '15 de enero de 2026',
        tag: 'Hardware',
        title: 'Simulando la arquitectura de una CPU',
        preview: 'El reto de construir desde cero un simulador que incluya ALU, Pipeline y gestión de memoria.',
        body: 'Para dominar el software, hay que entender el corazón de la máquina; este proyecto detalla cómo simulamos la lógica de una ALU, la gestión de memoria y el flujo de un pipeline en una arquitectura de hardware funcional.'
    }
];

const FavoritesStore = (() => {
    const KEY = 'blog-favs';

    function getAll() {
        try {
            return JSON.parse(localStorage.getItem(KEY) || '[]');
        } catch {
            return [];
        }
    }

    function toggle(id) {
        const favs = getAll();
        const idx  = favs.indexOf(id);
        if (idx === -1) {
            favs.push(id);
        } else {
            favs.splice(idx, 1);
        }
        localStorage.setItem(KEY, JSON.stringify(favs));
        // Notificar a todos los listeners (Observer)
        window.dispatchEvent(new CustomEvent('favs-changed', { detail: { favs } }));
    }

    function has(id) {
        return getAll().includes(id);
    }

    return { getAll, toggle, has };
})();

function blogPage() {
    const wrapper = document.createElement('section');
    wrapper.className = 'blog page-enter';
    wrapper.id = 'blog';

    wrapper.innerHTML = `
        <div class="container">
            <h2 class="blog__title">Blog</h2>
            <span class="blog__title-line"></span>
            <p class="blog__subtitle">Comparto mis conocimientos y experiencias en desarrollo de software</p>

            <!-- Filtros de categoría -->
            <div class="blog__filters" id="blog-filters">
                <button class="blog__filter-btn blog__filter-btn--active" data-filter="all">Todos</button>
                <button class="blog__filter-btn" data-filter="Cloud / AWS">☁️ Cloud / AWS</button>
                <button class="blog__filter-btn" data-filter="Arquitectura">🏗️ Arquitectura</button>
                <button class="blog__filter-btn" data-filter="IA">🤖 IA</button>
                <button class="blog__filter-btn" data-filter="Hardware">🔧 Hardware</button>
                <button class="blog__filter-btn" data-filter="favs">⭐ Favoritos</button>
            </div>

            <!-- Grid de cards -->
            <div class="blog__grid" id="blog-grid"></div>
        </div>
    `;

    const grid    = wrapper.querySelector('#blog-grid');
    const filters = wrapper.querySelector('#blog-filters');
    let currentFilter = 'all';

    function renderCards(filter) {
        grid.innerHTML = '';
        const favs = FavoritesStore.getAll();

        let articles = BLOG_ARTICLES;
        if (filter === 'favs') {
            articles = BLOG_ARTICLES.filter(a => favs.includes(a.id));
        } else if (filter !== 'all') {
            articles = BLOG_ARTICLES.filter(a => a.tag === filter);
        }

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
            card.setAttribute('favorited',  favs.includes(article.id) ? 'true' : 'false');
            grid.appendChild(card);
        });
    }

    filters.addEventListener('click', (e) => {
        const btn = e.target.closest('.blog__filter-btn');
        if (!btn) return;
        filters.querySelectorAll('.blog__filter-btn').forEach(b => b.classList.remove('blog__filter-btn--active'));
        btn.classList.add('blog__filter-btn--active');
        currentFilter = btn.dataset.filter;
        renderCards(currentFilter);
    });

    wrapper.addEventListener('toggle-fav', (e) => {
        FavoritesStore.toggle(e.detail.id);
        renderCards(currentFilter);
    });

    renderCards('all');

    return wrapper;
}