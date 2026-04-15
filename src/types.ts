
export interface Article {
  id: string;
  date: string;
  tag: string;
  title: string;
  preview: string;
  body: string;
}

export interface FavoritesStoreType {
  getAll(): string[];
  toggle(id: string): void;
  has(id: string): boolean;
}

export type RouteHandler = () => HTMLElement;
export type Routes = Record<string, RouteHandler>;

export interface ToggleFavDetail {
  id: string;
}

export interface RouteChangeDetail {
  path: string;
}