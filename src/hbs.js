export function renderTemplate(templateId, data) {
    const scriptEl = document.getElementById(templateId);
    if (!scriptEl) {
        console.warn(`[hbs] Template #${templateId} no encontrado`);
        return '';
    }
    const template = window.Handlebars.compile(scriptEl.innerHTML);
    return template(data);
}