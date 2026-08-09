(function () {
const LANG_STORAGE_KEY = "siteLanguage";
const changelogWindow = document.getElementById("changelogWindow");
const redZone = document.getElementById("changelogRedZone");
const modalTitle = document.getElementById("changelogModalTitle");
const modalBody = document.getElementById("changelogModalBody");
const closeModal = document.getElementById("closeChangelogModal");
let changelogCache = [];

if (!changelogWindow || !redZone || !modalTitle || !modalBody || !closeModal) {
    console.error("Changelog UI elements not found; changelog renderer skipped.");
    return;
}

function getCurrentLanguage() {
    const lang = localStorage.getItem(LANG_STORAGE_KEY);
    return lang === "en" ? "en" : "es";
}

function formatDate(timestamp, lang) {
    const date = new Date(Number(timestamp) || Date.now());
    return date.toLocaleDateString(lang === "en" ? "en-US" : "es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

function getEntryChanges(entry, lang) {
    if (lang === "en") {
        return Array.isArray(entry?.changes) ? entry.changes : [];
    }
    return Array.isArray(entry?.cambios) ? entry.cambios : [];
}

function openChangelogModal(entry) {
    const lang = getCurrentLanguage();
    const dateText = formatDate(entry?.date, lang);
    const changes = getEntryChanges(entry, lang);
    const keyName = lang === "en" ? "change" : "cambio";

    modalTitle.textContent = `#${entry?.id ?? "?"} - ${dateText}`;
    modalBody.innerHTML = "";

    if (!changes.length) {
        const fallback = document.createElement("p");
        fallback.textContent = lang === "en" ? "No details." : "Sin detalles.";
        modalBody.appendChild(fallback);
        return;
    }

    const list = document.createElement("ul");
    changes.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = item?.[keyName] ?? "";
        list.appendChild(li);
    });
    modalBody.appendChild(list);
    redZone.style.display = "flex";
}

function renderHistory() {
    const lang = getCurrentLanguage();
    const isEnglish = lang === "en";

    if (!Array.isArray(changelogCache) || changelogCache.length === 0) {
        changelogWindow.innerHTML = isEnglish ? "<p>No changes yet.</p>" : "<p>No hay cambios todavía.</p>";
        return;
    }

    const sorted = [...changelogCache].sort((a, b) => Number(b?.date ?? 0) - Number(a?.date ?? 0));
    changelogWindow.innerHTML = "";

    sorted.forEach((entry) => {
        const dateText = formatDate(entry?.date, lang);
        const changes = getEntryChanges(entry, lang);
        const keyName = isEnglish ? "change" : "cambio";
        const preview = (changes[0]?.[keyName] ?? "").replace(/<[^>]*>/g, "");

        const button = document.createElement("button");
        button.className = "postButton";
        button.type = "button";
        button.innerHTML = `
            <h2>#${entry?.id ?? "?"} - ${dateText}</h2>
            <p>${preview || "..."}</p>
        `;
        button.addEventListener("click", () => openChangelogModal(entry));
        changelogWindow.appendChild(button);
    });
}

async function loadChangelogHistory() {
    try {
        const response = await fetch("./JSON/changelog.json", { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        changelogCache = Array.isArray(data?.changelog) ? data.changelog : [];
        renderHistory();
    } catch (error) {
        changelogWindow.innerHTML = getCurrentLanguage() === "en"
            ? "<p>Could not load changelog.</p>"
            : "<p>No se pudo cargar el historial.</p>";
        console.error("Error loading changelog history:", error);
    }
}

redZone.addEventListener("click", (event) => {
    if (event.target === redZone) {
        redZone.style.display = "none";
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && redZone.style.display !== "none") {
        redZone.style.display = "none";
    }
});

closeModal.addEventListener("click", () => {
    redZone.style.display = "none";
});

window.addEventListener("site-language-changed", () => {
    renderHistory();
});

window.addEventListener("storage", (event) => {
    if (event.key === LANG_STORAGE_KEY) {
        renderHistory();
    }
});

loadChangelogHistory();
})();
