// ─────────────────────────────────────────────
//  Shared TypeScript interfaces for the portfolio
// ─────────────────────────────────────────────

/** Represents a single blog article stored in the app. */
export interface Article {
  id: string;
  date: string;
  tag: string;
  title: string;
  preview: string;
  body: string;
}

/** Public API of the FavoritesStore singleton. */
export interface FavoritesStoreType {
  getAll(): string[];
  toggle(id: string): void;
  has(id: string): boolean;
}

/** Route map used by the SPA router. */
export type RouteHandler = () => HTMLElement;
export type Routes = Record<string, RouteHandler>;

/** Detail payload of the custom 'toggle-fav' event. */
export interface ToggleFavDetail {
  id: string;
}

/** Detail payload of the custom 'routechange' event. */
export interface RouteChangeDetail {
  path: string;
}