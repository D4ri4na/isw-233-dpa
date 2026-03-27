# Portafolio Personal — Dariana Pol Aramayo

## 1. Introducción

Este proyecto consiste en el desarrollo de una plataforma web integral diseñada para presentar un portafolio del estudiante, destacando puntos importantes como: proyectos realizados, perfil personal y herramientas que domina.

El portafolio ha sido **migrado a una Single Page Application (SPA)** usando HTML/CSS/JS puro, aplicando la metodología **BEM** para los estilos, **Web Components** para encapsular la interfaz, la **History API** para navegación sin recargas, y **4 patrones de diseño de software** documentados a continuación.

En la rama `sprint/vite-handlebars` el proyecto fue además **refactorizado con Vite como bundler**, integrando **Handlebars** como motor de plantillas parciales, **PostCSS** como preprocesador CSS, y **ESLint + Stylelint** como linters estáticos. La estructura de archivos fue reorganizada siguiendo BEM estricto en el sistema de archivos.

**Sin frameworks de UI. Corre con `npm run dev`.**

---

## 2. Rutas de la SPA

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/` | Home | Hero principal + preview de últimos artículos del blog |
| `/about` | Sobre Mí | Perfil profesional, educación y hobbies |
| `/proyectos` | Proyectos | Galería de proyectos con tags y enlaces a GitHub |
| `/blog` | Blog | Artículos con filtros por categoría y sistema de favoritos |
| `/experiencia` | Experiencia | Historial laboral y habilidades técnicas por categoría |
| `/contacto` | Contacto | Formulario de contacto e información de redes sociales |

---

## 3. Stack de Herramientas (rama sprint/vite-handlebars)

| Herramienta | Rol |
|---|---|
| **Vite** | Bundler y dev server (`npm run dev`, `npm run build`) |
| **Handlebars** | Motor de plantillas para partials reutilizables |
| **PostCSS** | Preprocesador CSS con `postcss-import`, `postcss-nested`, `autoprefixer` |
| **ESLint** | Análisis estático de JavaScript |
| **Stylelint** | Análisis estático de CSS con validación de nomenclatura BEM |

### Scripts disponibles

```bash
npm run dev        # levanta el servidor de desarrollo en localhost:5173
npm run build      # genera la carpeta dist/ para producción
npm run preview    # previsualiza el build de producción
npm run lint:js    # ejecuta ESLint sobre src/**/*.js
npm run lint:css   # ejecuta Stylelint sobre src/**/*.css
npm run lint       # ejecuta ambos linters
```

---

## 4. Partials de Handlebars

Se identificaron y extrajeron 3 partials reutilizables en `src/partials/`:

- **`head.hbs`** — meta tags y fuente de Google Fonts, usado en el `<head>` del HTML.
- **`dark-mode-btn.hbs`** — botón flotante de modo oscuro, evita duplicarlo si se agregan más páginas.
- **`blog-card-template.hbs`** — el `<template>` HTML nativo que define la estructura de cada card del blog (patrón Template Method).

---

## 5. Bloques BEM Identificados

- **header** — Barra de navegación fija con enlaces a las secciones de la SPA.
- **hero** — Sección de presentación principal con nombre, descripción y botones de acción.
- **blog** — Tarjetas de artículos con filtros por categoría, "Leer más" y sistema de favoritos.
- **about** — Perfil personal, información de educación y hobbies.
- **projects** — Galería de proyectos con imagen, descripción, tags tecnológicos y enlaces.
- **experience** — Experiencia laboral y habilidades técnicas organizadas por categoría.
- **contact** — Formulario de contacto e información de redes sociales.
- **footer** — Pie de página con enlaces rápidos y formulario de newsletter.
- **base** — Estilos globales: reset, tipografía, utilidades `.btn` y `.container`.
- **dark-mode** — Todos los overrides del modo oscuro en un archivo independiente.

### Convención BEM aplicada

```
.blog                   → Block
.blog__card             → Element  (Block__Element)
.blog__card--favorited  → Modifier (Block__Element--Modifier)
.btn--primary           → Modifier (Block--Modifier)
.header--scrolled       → Modifier (Block--Modifier)
```

---

## 6. Patrones de Diseño

### Patrón 1 — 🔀 Strategy
**Archivo:** `app.js` — objeto `routes`

**Qué es:** Define una familia de algoritmos (estrategias), los encapsula individualmente y los hace intercambiables. El cliente usa la estrategia sin conocer su implementación interna.

**Por qué aquí:** El router no necesita saber *cómo* se renderiza cada página, solo *cuál* función invocar según la ruta activa. Cada función de página (`homePage`, `aboutPage`, etc.) es una estrategia autónoma e intercambiable. Para agregar la ruta `/certificados` solo se añade una entrada al objeto `routes` — sin modificar la lógica de resolución. Esto implementa el principio **Open/Closed**: el sistema está abierto a extensión pero cerrado a modificación.

---

### Patrón 2 — 👁️ Observer
**Archivos:** `app.js`, `store.js`, `components/header/header.js`, `pages/blog.js`

**Qué es:** Define una dependencia uno-a-muchos entre objetos. Cuando uno cambia estado, todos sus dependientes son notificados y actualizados automáticamente.

**Por qué aquí:** El router no conoce el header; el store de favoritos no conoce las cards del blog. Se comunican a través de `CustomEvent` — desacoplamiento total. Si en el futuro se agrega un componente que necesite saber cuándo cambia la ruta, solo se suscribe al evento `routechange` sin tocar ningún otro archivo.

---

### Patrón 3 — 🏛️ Singleton
**Archivo:** `store.js` — `FavoritesStore`

**Qué es:** Garantiza que una clase tenga una única instancia y proporciona un punto de acceso global a ella.

**Por qué aquí:** Los favoritos son estado compartido entre la vista `/blog` y el preview en `/` (Home). La implementación como **IIFE** garantiza que solo exista una instancia con acceso exclusivo al `localStorage`, sin importar cuántos módulos importen `FavoritesStore`.

---

### Patrón 4 — 📐 Template Method
**Archivos:** `src/partials/blog-card-template.hbs` → `components/blog/blog.js`

**Qué es:** Define el esqueleto de un algoritmo en una clase base, diferiendo algunos pasos a subclases.

**Por qué aquí:** El `<template>` HTML define la estructura visual de una card una sola vez como partial de Handlebars. Cada instancia de `blog-card` ejecuta los pasos concretos (rellenar fecha, tag, título, cuerpo). Si el layout necesita cambiar, se edita **un único partial** y todas las instancias lo reflejan automáticamente.

---

## 7. Observer APIs

### IntersectionObserver
**Archivo:** `observers.js` → `initIntersectionObserver()`, usado en `pages/projects.js`, `pages/blog.js`, `pages/experience.js`, `pages/home.js`

Detecta cuando los elementos con `data-observe` superan el 15% de visibilidad y añade `.is-visible` para activar la transición CSS. Más eficiente que un `scroll` listener porque corre fuera del hilo principal.

### MutationObserver
**Archivo:** `observers.js` → `initMutationObserver()`, usado en `pages/blog.js` y `pages/home.js`

Observa el `div.blog__grid` y aplica animación escalonada a cada card insertada dinámicamente, sin acoplar `blog.js` a la lógica de presentación.

### ResizeObserver
**Archivo:** `observers.js` → `initResizeObserver()`, usado en `pages/experience.js`

Ajusta las columnas del grid de habilidades según el ancho del contenedor (no del viewport), resolviendo el problema que las media queries CSS no pueden solucionar.

---

## 8. Cómo se hizo

- **Diseño UX/UI:** Prototipado inicial y diseño de alta fidelidad realizado en Figma.
- **Desarrollo Frontend:** Implementación de componentes responsivos con estándares modernos de desarrollo web, metodología BEM y arquitectura de módulos ES6.
- **Bundler:** Vite con PostCSS para procesamiento de CSS y Handlebars para partials reutilizables.
- **Gestión de Versiones:** El proyecto sigue un flujo de trabajo de Git riguroso con ramas por sprint (`sprint1/bem`, `sprint/vite-handlebars`).

---

## 9. Enlace al Diseño (Figma)

👉 https://www.figma.com/design/iS2Np4GSlEEDQf7hPDzBt1/Figma?node-id=0-1&t=3AI7tXRMcbBbMtLC-1

---

## 10. IAs utilizadas durante el desarrollo

👉 https://chatgpt.com/share/698eaa44-cc28-8010-8e5d-4e80911bae12

👉 https://claude.ai/share/c64028c2-075a-4b0e-

👉 https://claude.ai/share/a474f14b-1ffc-485e-a0e5-0dfbe76b01f2