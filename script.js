
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var nombre = form.nombre.value;
            var email = form.email.value;
            var asunto = form.asunto.value;
            var mensaje = form.mensaje.value;
            var mailto = `mailto:dpolaramayo@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent('Nombre: ' + nombre + '\nEmail: ' + email + '\n\n' + mensaje)}`;
            window.location.href = mailto;
        });
    }
});
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("scrolled", window.scrollY > 50);
});

window.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero-content");
    hero.style.opacity = 0;
    hero.style.transform = "translateY(20px)";

    setTimeout(() => {
        hero.style.transition = "all 0.8s ease";
        hero.style.opacity = 1;
        hero.style.transform = "translateY(0)";
    }, 200);
});

const buttons = document.querySelectorAll(".read-more-btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".blog-card");
        card.classList.toggle("active");

        button.textContent = 
            card.classList.contains("active") ? "Leer menos" : "Leer más";
    });
});

const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Gracias por suscribirte ✨");
        newsletterForm.reset();
    });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("¡Gracias por tu mensaje! Te responderé pronto 😊");
        contactForm.reset();
    });
}
