/**
 * blog-card.js
 * Web Component para las tarjetas de artículo del blog.
 * Usa el <template> del HTML base para instanciar cada card.
 * Patrón: Template Method — la estructura base viene del <template>,
 *         cada instancia rellena sus propios datos.
 */
class BlogCard extends HTMLElement {
    static get observedAttributes() {
        return ['article-id', 'date', 'tag', 'title', 'preview', 'body', 'favorited'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        if (this.isConnected) this.render();
    }

    render() {
        const id      = this.getAttribute('article-id');
        const date    = this.getAttribute('date') || '';
        const tag     = this.getAttribute('tag') || '';
        const title   = this.getAttribute('title') || '';
        const preview = this.getAttribute('preview') || '';
        const body    = this.getAttribute('body') || '';
        const isFav   = this.getAttribute('favorited') === 'true';

        // Clonar desde el <template> del DOM
        const tpl = document.getElementById('tpl-blog-card');
        const clone = tpl.content.cloneNode(true);

        clone.querySelector('.blog__date').textContent    = date;
        clone.querySelector('.blog__tag').textContent     = tag;
        clone.querySelector('.blog__title').textContent   = title;
        clone.querySelector('.blog__preview').textContent = preview;
        clone.querySelector('.blog__more p').textContent  = body;

        const favBtn = clone.querySelector('.blog__fav-btn');
        favBtn.textContent = isFav ? '⭐' : '🤍';
        favBtn.setAttribute('data-id', id);

        const readBtn = clone.querySelector('.blog__read-more');
        readBtn.setAttribute('data-id', id);

        this.innerHTML = '';
        this.appendChild(clone);

        // Toggle leer más
        this.querySelector('.blog__read-more').addEventListener('click', () => {
            const card = this.querySelector('.blog__card');
            const isOpen = card.classList.toggle('blog__card--active');
            this.querySelector('.blog__read-more').textContent = isOpen ? 'Leer menos ↑' : 'Leer más →';
        });

        // Toggle favorito — dispara evento para que blog.js lo persista
        this.querySelector('.blog__fav-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('toggle-fav', {
                bubbles: true,
                detail: { id }
            }));
        });

        // Marcar card si es favorita
        if (isFav) {
            this.querySelector('.blog__card').classList.add('blog__card--favorited');
        }
    }
}

customElements.define('blog-card', BlogCard);