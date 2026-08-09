(function () {
const MES_ANIVERSARIO = 5;
const DIA_ANIVERSARIO = 18;
const LANG_STORAGE_KEY = "siteLanguage";
const SUPPORTED_LANGS = ["es", "en"];

function mostrarDiasFaltantes() {
    const ahora = new Date();
    const añoActual = ahora.getFullYear();
    
    let fechaObjetivo = new Date(añoActual, MES_ANIVERSARIO, DIA_ANIVERSARIO);
    
    const hoy = new Date(añoActual, ahora.getMonth(), ahora.getDate());

    const countdownEs = document.getElementById("countdown_es");
    const countdownEn = document.getElementById("countdown_en");
    const countdownLabelEs = document.getElementById("countdown_label_es");
    const countdownLabelEn = document.getElementById("countdown_label_en");
    if (!countdownEs || !countdownEn || !countdownLabelEs || !countdownLabelEn) return;

    if (hoy.getTime() === fechaObjetivo.getTime()) {
        countdownLabelEs.textContent = "¡Hoy es el día!";
        countdownLabelEn.textContent = "Today is the day!";
        return;
    }

    if (hoy > fechaObjetivo) {
        fechaObjetivo.setFullYear(añoActual + 1);
    }
    const diferenciaMs = fechaObjetivo - hoy;
    
    const diasFaltantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
    
    countdownEs.innerText = `${diasFaltantes}`;
    countdownEn.innerText = `${diasFaltantes}`;
}

mostrarDiasFaltantes();

function getCurrentLanguage() {
    const storedLang = localStorage.getItem(LANG_STORAGE_KEY);
    return SUPPORTED_LANGS.includes(storedLang) ? storedLang : "es";
}

function toggleChangelogLanguage(lang) {
    const esList = document.getElementById("changelogListEs");
    const enList = document.getElementById("changelogListEn");
    if (!esList || !enList) return;

    const showEnglish = lang === "en";
    esList.hidden = showEnglish;
    enList.hidden = !showEnglish;
}

function toggleStatsLanguage(lang) {
    const esLabels = document.querySelectorAll('[data-stats-lang="es"]');
    const enLabels = document.querySelectorAll('[data-stats-lang="en"]');
    const showEnglish = lang === "en";
    esLabels.forEach((el) => { el.hidden = showEnglish; });
    enLabels.forEach((el) => { el.hidden = !showEnglish; });
}

function toggleBirthdayLanguage(lang) {
    const esLabel = document.getElementById("countdown_label_es");
    const enLabel = document.getElementById("countdown_label_en");
    if (!esLabel || !enLabel) return;
    const showEnglish = lang === "en";
    esLabel.hidden = showEnglish;
    enLabel.hidden = !showEnglish;
}

function applySidebarLanguage(lang) {
    toggleChangelogLanguage(lang);
    toggleStatsLanguage(lang);
    toggleBirthdayLanguage(lang);
}

async function loadChangelog() {
    const changelogListEs = document.getElementById("changelogListEs");
    const changelogListEn = document.getElementById("changelogListEn");
    if (!changelogListEs || !changelogListEn) return;

    try {
        const response = await fetch("./JSON/changelog.json", { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const entries = Array.isArray(data.changelog) ? data.changelog : [];

        if (entries.length === 0) {
            changelogListEs.innerHTML = "<li>Sin cambios todavía.</li>";
            changelogListEn.innerHTML = "<li>No changes yet.</li>";
            return;
        }

        const latestEntry = entries.reduce((latest, current) => {
            const latestDate = Number(latest?.date ?? 0);
            const currentDate = Number(current?.date ?? 0);
            return currentDate > latestDate ? current : latest;
        }, entries[0]);

        const cambiosEs = Array.isArray(latestEntry?.cambios) ? latestEntry.cambios : [];
        const changesEn = Array.isArray(latestEntry?.changes) ? latestEntry.changes : [];

        if (cambiosEs.length === 0) {
            changelogListEs.innerHTML = "<li>Sin cambios todavía.</li>";
        } else {
            changelogListEs.innerHTML = cambiosEs
                .map((item) => `<li>${item?.cambio ?? ""}</li>`)
                .join("");
        }

        if (changesEn.length === 0) {
            changelogListEn.innerHTML = "<li>No changes yet.</li>";
        } else {
            changelogListEn.innerHTML = changesEn
                .map((item) => `<li>${item?.change ?? ""}</li>`)
                .join("");
        }
    } catch (error) {
        changelogListEs.innerHTML = "<li>No se pudo cargar el changelog.</li>";
        changelogListEn.innerHTML = "<li>Could not load changelog.</li>";
        console.error("Error loading changelog:", error);
    } finally {
        applySidebarLanguage(getCurrentLanguage());
    }
}

window.addEventListener("site-language-changed", (event) => {
    const newLang = event?.detail?.lang;
    applySidebarLanguage(newLang);
});

window.addEventListener("storage", (event) => {
    if (event.key === LANG_STORAGE_KEY) {
        applySidebarLanguage(getCurrentLanguage());
    }
});

applySidebarLanguage(getCurrentLanguage());
loadChangelog();

})();
