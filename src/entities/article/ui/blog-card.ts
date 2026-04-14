import type { ToggleFavDetail } from '../../../types.ts';

export class BlogCard extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['article-id', 'date', 'tag', 'title', 'preview', 'body', 'favorited'];
  }

  private _darkModeObserver: MutationObserver | null = null;

  connectedCallback(): void {
    this.render();
    if (!this._darkModeObserver) {
      this._darkModeObserver = new MutationObserver(() => this.updateFavIcon());
      this._darkModeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }
  }

  attributeChangedCallback(): void {
    if (this.isConnected) this.render();
  }

  disconnectedCallback(): void {
    if (this._darkModeObserver) {
      this._darkModeObserver.disconnect();
      this._darkModeObserver = null;
    }
  }

  private render(): void {
    const id      = this.getAttribute('article-id') ?? '';
    const date    = this.getAttribute('date')        ?? '';
    const tag     = this.getAttribute('tag')         ?? '';
    const title   = this.getAttribute('title')       ?? '';
    const preview = this.getAttribute('preview')     ?? '';
    const body    = this.getAttribute('body')        ?? '';
    const isFav   = this.getAttribute('favorited') === 'true';

    const tpl = document.getElementById('tpl-blog-card') as HTMLTemplateElement | null;
    if (!tpl) return;
    const clone = tpl.content.cloneNode(true) as DocumentFragment;

    (clone.querySelector('.blog__date')    as HTMLElement).textContent = date;
    (clone.querySelector('.blog__tag')     as HTMLElement).textContent = tag;
    (clone.querySelector('.blog__title')   as HTMLElement).textContent = title;
    (clone.querySelector('.blog__preview') as HTMLElement).textContent = preview;
    (clone.querySelector('.blog__more p')  as HTMLElement).textContent = body;

    if (isFav) {
      (clone.querySelector('.blog__card') as HTMLElement).classList.add('blog__card--favorited');
    }

    this.innerHTML = '';
    this.appendChild(clone);
    
    this.updateFavIcon();

    const readMoreBtn = this.querySelector<HTMLButtonElement>('.blog__read-more');
    if (readMoreBtn) {
      readMoreBtn.addEventListener('click', () => {
        const card   = this.querySelector<HTMLElement>('.blog__card');
        const isOpen = card?.classList.toggle('blog__card--active') ?? false;
        const btn    = this.querySelector<HTMLButtonElement>('.blog__read-more');
        if (btn) btn.textContent = isOpen ? 'Leer menos ↑' : 'Leer más →';
      });
    }

    const favBtn = this.querySelector<HTMLButtonElement>('.blog__fav-btn');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        const detail: ToggleFavDetail = { id };
        this.dispatchEvent(new CustomEvent<ToggleFavDetail>('toggle-fav', { bubbles: true, detail }));
      });
    }
  }

  private updateFavIcon(): void {
    const btn = this.querySelector<HTMLButtonElement>('.blog__fav-btn');
    if (!btn) return;
    const isFav  = this.getAttribute('favorited') === 'true';
    const isDark = document.body.classList.contains('dark-mode');
    btn.textContent = isFav ? '❤️' : isDark ? '🤍' : '🖤';
  }
}

customElements.define('blog-card', BlogCard);

declare global {
  interface HTMLElementEventMap {
    'toggle-fav': CustomEvent<ToggleFavDetail>;
  }
}
