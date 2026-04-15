import type { Article, FavoritesStoreType } from '../../../types.js';

export const BLOG_ARTICLES: Article[] = [
  {
    id: '1',
    date: '22 de febrero de 2026',
    tag: 'Cloud / AWS',
    title: 'Mi camino como AWS Cloud Club Captain',
    preview: 'Una mirada interna a cómo estamos impulsando la cultura de la nube en la UCB.',
    body: 'Ser parte del liderazgo del AWS Cloud Club me ha permitido organizar eventos, conectar estudiantes con oportunidades tecnológicas y fomentar el aprendizaje colaborativo en tecnologías cloud.',
  },
  {
    id: '2',
    date: '5 de febrero de 2026',
    tag: 'Arquitectura',
    title: 'Aplicando SOLID en sistemas reales',
    preview: 'Cómo implementamos patrones como State y Strategy en un sistema de citas médicas en Java.',
    body: 'No se trata solo de escribir código que funcione, sino de estructurarlo con patrones SOLID para que sistemas complejos, como el de una clínica médica, puedan evolucionar de forma escalable y mantenible.',
  },
  {
    id: '3',
    date: '28 de enero de 2026',
    tag: 'IA',
    title: 'Reconocimiento de gestos con TensorFlow',
    preview: 'Explorando el potencial de Keras y Computer Vision para detectar movimientos de manos en tiempo real.',
    body: 'La visión por computadora permite que las máquinas "entiendan" nuestro mundo físico; aquí exploro cómo entrenar modelos con Keras y TensorFlow para transformar gestos de manos en comandos digitales precisos.',
  },
  {
    id: '4',
    date: '15 de enero de 2026',
    tag: 'Hardware',
    title: 'Simulando la arquitectura de una CPU',
    preview: 'El reto de construir desde cero un simulador que incluya ALU, Pipeline y gestión de memoria.',
    body: 'Para dominar el software, hay que entender el corazón de la máquina; este proyecto detalla cómo simulamos la lógica de una ALU, la gestión de memoria y el flujo de un pipeline en una arquitectura de hardware funcional.',
  },
];

export const FavoritesStore: FavoritesStoreType = (() => {
  const KEY = 'blog-favs';

  function getAll(): string[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[];
    } catch {
      return [];
    }
  }

  function toggle(id: string): void {
    const favs = getAll();
    const idx = favs.indexOf(id);
    idx === -1 ? favs.push(id) : favs.splice(idx, 1);
    localStorage.setItem(KEY, JSON.stringify(favs));
    window.dispatchEvent(new CustomEvent('favs-changed', { detail: { favs } }));
  }

  function has(id: string): boolean {
    return getAll().includes(id);
  }

  return { getAll, toggle, has };
})();