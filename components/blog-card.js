import { FavoritesStore } from '../store.js';

export class BlogCard extends HTMLElement {
    static get observedAttributes() {
        return ['article-id', 'date', 'tag', 'title', 'preview', 'body', 'favorited'];
    }

    connectedCallback() {
        this.render();
        // Observa cambios en el modo oscuro
        if (!this._darkModeObserver) {
            this._darkModeObserver = new MutationObserver(() => this.updateFavIcon());
            this._darkModeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        }
    }
    attributeChangedCallback()     { if (this.isConnected) this.render(); }

    render() {
        const id      = this.getAttribute('article-id');
        const date    = this.getAttribute('date')     || '';
        const tag     = this.getAttribute('tag')      || '';
        const title   = this.getAttribute('title')    || '';
        const preview = this.getAttribute('preview')  || '';
        const body    = this.getAttribute('body')     || '';
        const isFav   = this.getAttribute('favorited') === 'true';

        const tpl   = document.getElementById('tpl-blog-card');
        const clone = tpl.content.cloneNode(true);

        clone.querySelector('.blog__date').textContent    = date;
        clone.querySelector('.blog__tag').textContent     = tag;
        clone.querySelector('.blog__title').textContent   = title;
        clone.querySelector('.blog__preview').textContent = preview;
        clone.querySelector('.blog__more p').textContent  = body;

        const favBtn = clone.querySelector('.blog__fav-btn');
        this._favBtn = favBtn;
        this.updateFavIcon();

        if (isFav) clone.querySelector('.blog__card').classList.add('blog__card--favorited');

        this.innerHTML = '';
        this.appendChild(clone);

        this.querySelector('.blog__read-more').addEventListener('click', () => {
            const card   = this.querySelector('.blog__card');
            const isOpen = card.classList.toggle('blog__card--active');
            this.querySelector('.blog__read-more').textContent = isOpen ? 'Leer menos ↑' : 'Leer más →';
        });

        this.querySelector('.blog__fav-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('toggle-fav', { bubbles: true, detail: { id } }));
        });
    }

    updateFavIcon() {
        if (!this._favBtn) return;
        const isFav = this.getAttribute('favorited') === 'true';
        const isDark = document.body.classList.contains('dark-mode');
        if (isFav) {
            this._favBtn.textContent = '❤️';
        } else {
            this._favBtn.textContent = isDark ? '🤍' : '🖤';
        }
    }
}

customElements.define('blog-card', BlogCard);