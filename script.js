// ========================
// DARK MODE - aplica inmediatamente para evitar parpadeo
// ========================
(function() {
    if (localStorage.getItem('darkMode') === 'on') {
        document.body.classList.add('dark-mode');
    }
})();

document.addEventListener('DOMContentLoaded', function() {

    // ========================
    // FORMULARIO DE CONTACTO
    // ========================
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var nombre = form.nombre.value;
            var email = form.email.value;
            var asunto = form.asunto.value;
            var mensaje = form.mensaje.value;
            var mailto = 'mailto:dpolaramayo@gmail.com?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent('Nombre: ' + nombre + '\nEmail: ' + email + '\n\n' + mensaje);
            window.location.href = mailto;
        });
    }

    // ========================
    // SCROLL HEADER
    // ========================
    window.addEventListener("scroll", function () {
        const header = document.querySelector(".header");
        if (header) header.classList.toggle("scrolled", window.scrollY > 50);
    });

    // ========================
    // ANIMACION HERO
    // ========================
    const hero = document.querySelector(".hero-content");
    if (hero) {
        hero.style.opacity = 0;
        hero.style.transform = "translateY(20px)";
        setTimeout(() => {
            hero.style.transition = "all 0.8s ease";
            hero.style.opacity = 1;
            hero.style.transform = "translateY(0)";
        }, 200);
    }

    // ========================
    // BLOG: LEER MAS
    // ========================
    const buttons = document.querySelectorAll(".read-more-btn");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".blog-card");
            card.classList.toggle("active");
            button.textContent = card.classList.contains("active") ? "Leer menos" : "Leer mas";
        });
    });

    // ========================
    // NEWSLETTER
    // ========================
    const newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Gracias por suscribirte!");
            newsletterForm.reset();
        });
    }

    // ========================
    // DARK MODE TOGGLE
    // ========================
    function setDarkMode(enabled) {
        document.body.classList.toggle('dark-mode', enabled);
        localStorage.setItem('darkMode', enabled ? 'on' : 'off');
        const btn = document.querySelector('.dark-mode-btn');
        if (btn) btn.textContent = enabled ? '☀️' : '🌙';
    }

    // Aplicar preferencia guardada o del sistema
    var savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'on') {
        setDarkMode(true);
    } else if (savedMode === 'off') {
        setDarkMode(false);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
    }

    // Crear boton si no existe en el HTML
    if (!document.querySelector('.dark-mode-btn')) {
        var btn = document.createElement('button');
        btn.className = 'dark-mode-btn';
        btn.setAttribute('aria-label', 'Cambiar modo oscuro');
        btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        document.body.appendChild(btn);
    }

    // Evento de click
    document.querySelector('.dark-mode-btn').addEventListener('click', function() {
        setDarkMode(!document.body.classList.contains('dark-mode'));
    });

});