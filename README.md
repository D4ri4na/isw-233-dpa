# Portafolio Personal

## 1. Introducción
Este proyecto consiste en el desarrollo de una plataforma web integral diseñada para presentar un portafolio del estudiante, destacando puntos importantes como: proyectos realizados, perfil personal y herramientas que domina.

Este portafolio ha sido **refactorizado aplicando la metodología BEM (Block, Element, Modifier)**, separando los estilos en archivos independientes por bloque para mejorar la legibilidad, el mantenimiento y la escalabilidad del proyecto.

---

## 2. Estructura del Proyecto

```
ISW-233-DPA/
├── blocks/
│   ├── about.css         # Estilos del bloque "Sobre Mí"
│   ├── base.css          # Reset, tipografía base y utilidades globales
│   ├── blog.css          # Estilos del bloque Blog
│   ├── contact.css       # Estilos del bloque Contacto
│   ├── dark-mode.css     # Estilos del modo oscuro
│   ├── experience.css    # Estilos del bloque Experiencia y Skills
│   ├── footer.css        # Estilos del bloque Footer
│   ├── header.css        # Estilos del bloque Header / Navbar
│   ├── hero.css          # Estilos del bloque Hero (portada)
│   └── projects.css      # Estilos del bloque Proyectos
├── vendor/
│   └── normalize.css     # Librería externa de normalización (no modificar)
├── img/                  # Imágenes del proyecto
├── index.css             # Solo importaciones (@import) de los bloques
├── index.html            # Página principal
├── about.html            # Página "Sobre Mí"
├── contact.html          # Página de Contacto
├── experience.html       # Página de Experiencias y Skills
├── projects.html         # Página de Proyectos
├── footer.html           # Componente footer reutilizable
├── script.js             # Lógica e interacciones del sitio
└── README.md             # Documentación del proyecto
```

---

## 3. Bloques BEM Identificados

- **header** — Barra de navegación fija con los enlaces a las distintas páginas del portafolio.
- **hero** — Sección de presentación principal con el nombre, descripción y botones de acción.
- **blog** — Tarjetas de artículos con funcionalidad de "Leer más" para expandir el contenido.
- **about** — Perfil personal, información de educación y hobbies.
- **projects** — Galería de proyectos con imagen, descripción, tags tecnológicos y enlaces.
- **experience** — Experiencia laboral y habilidades técnicas organizadas por categoría.
- **contact** — Formulario de contacto e información de redes sociales.
- **footer** — Pie de página con enlaces rápidos y formulario de newsletter.
- **base** — No es una sección visual, sino los estilos globales: reset, tipografía, utilidades como `.btn` y `.container`.
- **dark-mode** — Agrupa todos los estilos del modo oscuro en un solo archivo independiente.

---

## 4. Metodología BEM

La refactorización sigue la convención de nomenclatura BEM:

- **Block** — componente independiente: `.hero`, `.blog`, `.footer`
- **Element** — parte interna del bloque con `__`: `.hero__title`, `.blog__card`, `.footer__links`
- **Modifier** — variante con `--`: `.btn--primary`, `.btn--outline`, `.header--scrolled`

---

## 5. Cómo se hizo

- **Diseño UX/UI:** Prototipado inicial y diseño de alta fidelidad realizado en Figma.
- **Desarrollo Frontend:** Implementación de componentes responsivos utilizando estándares modernos de desarrollo web con metodología BEM.
- **Gestión de Versiones:** El proyecto sigue un flujo de trabajo de Git riguroso, con sta rama dedicada a la refactorización.

---

## 6. Enlace al Diseño (Figma)

Se puede visualizar el prototipo interactivo y la guía de estilos en el siguiente enlace:  
👉 https://www.figma.com/design/iS2Np4GSlEEDQf7hPDzBt1/Figma?node-id=0-1&t=3AI7tXRMcbBbMtLC-1

---

## 7. Enlaces de IA utilizadas

Se pueden visualizar las conversaciones con IA utilizadas durante el desarrollo:  
👉 https://chatgpt.com/share/698eaa44-cc28-8010-8e5d-4e80911bae12  
👉 https://claude.ai/share/c64028c2-075a-4b0e-