# Portafolio Personal — Dariana Pol Aramayo

## 1. Introducción

Este proyecto consiste en el desarrollo de una plataforma web integral diseñada para presentar un portafolio del estudiante, destacando puntos importantes como: proyectos realizados, perfil personal y herramientas que domina.

El portafolio ha sido **migrado a una Single Page Application (SPA)** usando HTML/CSS/JS puro, aplicando la metodología **BEM** para los estilos, **Web Components** para encapsular la interfaz, la **History API** para navegación sin recargas, y **4 patrones de diseño de software** documentados a continuación.

**Sin frameworks. Sin instalaciones. Corre directo en el navegador.**

---

## 2. Estructura del Proyecto

```
ISW-233-DPA/
│
├── index.html                  ← Shell único de la SPA
├── 404.html                    ← Redirección para Live Server / GitHub Pages
├── app.js                      ← Router principal + punto de entrada (ES Module)
├── store.js                    ← BLOG_ARTICLES + FavoritesStore (Singleton)
├── styles.js                   ← Centraliza todos los imports CSS dinámicamente
├── README.md
│
├── components/
│   ├── index.js                ← Barrel: registra todos los Web Components
│   ├── app-header.js           ← Web Component: navegación + dark mode
│   ├── app-footer.js           ← Web Component: footer + newsletter
│   └── blog-card.js            ← Web Component: tarjeta de artículo del blog
│
├── pages/
│   ├── index.js                ← Barrel: exporta todas las funciones de vista
│   ├── home.js                 ← Vista /  (Hero + preview Blog)
│   ├── about.js                ← Vista /about
│   ├── projects.js             ← Vista /proyectos
│   ├── blog.js                 ← Vista /blog (filtros + favoritos)
│   ├── experience.js           ← Vista /experiencia
│   └── contact.js              ← Vista /contacto
│
├── blocks/                     ← CSS en nomenclatura BEM (un archivo por bloque)
│   ├── base.css                ← Reset, tipografía base y utilidades globales
│   ├── header.css              ← Bloque Header / Navbar
│   ├── hero.css                ← Bloque Hero (portada)
│   ├── about.css               ← Bloque Sobre Mí
│   ├── blog.css                ← Bloque Blog + filtros + favoritos
│   ├── projects.css            ← Bloque Proyectos
│   ├── experience.css          ← Bloque Experiencia y Skills
│   ├── contact.css             ← Bloque Contacto
│   ├── footer.css              ← Bloque Footer
│   └── dark-mode.css           ← Modo oscuro (todos los overrides)
│
├── vendor/
│   └── normalize.css           ← Librería externa (no modificar)
│
└── img/                        ← Imágenes del proyecto
```

---

## 3. Rutas de la SPA

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/` | Home | Hero principal + preview de últimos artículos del blog |
| `/about` | Sobre Mí | Perfil profesional, educación y hobbies |
| `/proyectos` | Proyectos | Galería de proyectos con tags y enlaces a GitHub |
| `/blog` | Blog | Artículos con filtros por categoría y sistema de favoritos |
| `/experiencia` | Experiencia | Historial laboral y habilidades técnicas por categoría |
| `/contacto` | Contacto | Formulario de contacto e información de redes sociales |

---

## 4. Bloques BEM Identificados

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

## 5. Patrones de Diseño

### Patrón 1 — 🔀 Strategy
**Archivo:** `app.js` — objeto `routes`

**Qué es:** Define una familia de algoritmos (estrategias), los encapsula individualmente y los hace intercambiables. El cliente usa la estrategia sin conocer su implementación interna.

**Por qué aquí:** El router no necesita saber *cómo* se renderiza cada página, solo *cuál* función invocar según la ruta activa. Cada función de página (`homePage`, `aboutPage`, etc.) es una estrategia autónoma e intercambiable. Para agregar la ruta `/certificados` solo se añade una entrada al objeto `routes` — sin modificar la lógica de resolución. Esto implementa el principio **Open/Closed**: el sistema está abierto a extensión pero cerrado a modificación.

---

### Patrón 2 — 👁️ Observer
**Archivos:** `app.js`, `store.js`, `components/app-header.js`, `pages/blog.js`

**Qué es:** Define una dependencia uno-a-muchos entre objetos. Cuando uno cambia estado, todos sus dependientes son notificados y actualizados automáticamente.

**Por qué aquí:** El router no conoce el header; el store de favoritos no conoce las cards del blog. Se comunican a través de `CustomEvent` — desacoplamiento total. Si en el futuro se agrega un componente que necesite saber cuándo cambia la ruta (un breadcrumb, por ejemplo), solo se suscribe al evento `routechange` sin tocar ningún otro archivo. Los módulos son independientes y extensibles.

---

### Patrón 3 — 🏛️ Singleton
**Archivo:** `store.js` — `FavoritesStore`

**Qué es:** Garantiza que una clase tenga una única instancia y proporciona un punto de acceso global a ella.

**Por qué aquí:** Los favoritos son estado compartido entre la vista `/blog` y el preview en `/` (Home). Si existieran dos instancias del store, podrían tener datos distintos y generar inconsistencias visuales. La implementación como **IIFE** (Immediately Invoked Function Expression) garantiza que solo exista una instancia con acceso exclusivo al `localStorage`, sin importar cuántos módulos importen `FavoritesStore`. Es el único punto de escritura y lectura para ese dato.

---

### Patrón 4 — 📐 Template Method
**Archivos:** `index.html` → `<template id="tpl-blog-card">`, `components/blog-card.js`

**Qué es:** Define el esqueleto de un algoritmo en una clase base, diferiendo algunos pasos a subclases. Las subclases redefinen ciertos pasos sin cambiar la estructura general.

**Por qué aquí:** El `<template>` HTML es la implementación nativa del patrón. Define el "algoritmo" — la estructura visual de una card — una sola vez. Cada instancia de `blog-card` ejecuta los pasos concretos (rellenar fecha, tag, título, cuerpo). Si el layout de todas las cards necesita cambiar (agregar un campo de tiempo de lectura, por ejemplo), se edita **un único `<template>`** y todas las instancias lo reflejan automáticamente, sin tocar cada card individualmente.

---

## 10. Cómo se hizo

- **Diseño UX/UI:** Prototipado inicial y diseño de alta fidelidad realizado en Figma.
- **Desarrollo Frontend:** Implementación de componentes responsivos con estándares modernos de desarrollo web, metodología BEM y arquitectura de módulos ES6.
- **Gestión de Versiones:** El proyecto sigue un flujo de trabajo de Git riguroso, con rama dedicada a la migración SPA.

---

## 11. Enlace al Diseño (Figma)

Se puede visualizar el prototipo interactivo y la guía de estilos:
👉 https://www.figma.com/design/iS2Np4GSlEEDQf7hPDzBt1/Figma?node-id=0-1&t=3AI7tXRMcbBbMtLC-1

---

## 12. IAs utilizadas durante el desarrollo

👉 https://chatgpt.com/share/698eaa44-cc28-8010-8e5d-4e80911bae12
👉 https://claude.ai/share/c64028c2-075a-4b0e-
👉 https://claude.ai/share/a474f14b-1ffc-485e-a0e5-0dfbe76b01f2
