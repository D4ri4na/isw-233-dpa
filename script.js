fetch('footer.html')
    .then(res => res.text())
    .then(html => {
        const placeholder = document.getElementById('footer-placeholder');
        if (placeholder) placeholder.outerHTML = html;
    });

(function() {
    if (localStorage.getItem('darkMode') === 'on') {
        document.body.classList.add('dark-mode');
    }
})();

document.addEventListener('DOMContentLoaded', function() {
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

    window.addEventListener("scroll", function () {
        const header = document.querySelector(".header");
        if (header) header.classList.toggle("header--scrolled", window.scrollY > 50);
    });

    const hero = document.querySelector(".hero__content");
    if (hero) {
        hero.style.opacity = 0;
        hero.style.transform = "translateY(20px)";
        setTimeout(() => {
            hero.style.transition = "all 0.8s ease";
            hero.style.opacity = 1;
            hero.style.transform = "translateY(0)";
        }, 200);
    }

    const buttons = document.querySelectorAll(".blog__read-more");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".blog__card");
            card.classList.toggle("blog__card--active");
            const isActive = card.classList.contains("blog__card--active");
            button.innerHTML = isActive ? "Leer menos →" : "Leer más →";
        });
    });

    document.body.addEventListener("submit", (e) => {
        if (e.target.matches(".footer__newsletter")) {
            e.preventDefault();
            alert("¡Gracias por suscribirte!");
            e.target.reset();
        }
    });


    function setDarkMode(enabled) {
        document.body.classList.toggle('dark-mode', enabled);
        localStorage.setItem('darkMode', enabled ? 'on' : 'off');
        const btn = document.querySelector('.dark-mode-btn');
        if (btn) btn.textContent = enabled ? '☀️' : '🌙';
    }

    var savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'on') {
        setDarkMode(true);
    } else if (savedMode === 'off') {
        setDarkMode(false);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
    }

    if (!document.querySelector('.dark-mode-btn')) {
        var btn = document.createElement('button');
        btn.className = 'dark-mode-btn';
        btn.setAttribute('aria-label', 'Cambiar modo oscuro');
        btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        document.body.appendChild(btn);
    }

    document.querySelector('.dark-mode-btn').addEventListener('click', function() {
        setDarkMode(!document.body.classList.contains('dark-mode'));
    });

});