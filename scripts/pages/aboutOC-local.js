window.onload = function() {
    const lang = localStorage.getItem('siteLanguage') === 'en' ? 'en' : 'es';
    document.title = lang === 'en' ? "Sulfur's Archives - Keeby" : "Archivos de Sulfur - Keeby";
};
