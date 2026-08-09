(function () {
const redZone = document.getElementById('redZone');
const postsWindow = document.getElementById('postsWindow');
const postModalTitle = document.getElementById('postModalTitle');
const postModalBody = document.getElementById('postModalBody');
const closePostModal = document.getElementById('closePostModal');
const LANG_STORAGE_KEY = "siteLanguage";
let cachedPosts = [];

if (!redZone || !postsWindow || !postModalTitle || !postModalBody || !closePostModal) {
    console.error('Blog UI elements not found; posts renderer skipped.');
    return;
}

redZone.addEventListener('click', (event) => {
    if (event.target === redZone) {
        redZone.style.display = 'none';}
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && redZone.style.display != 'none') {
            redZone.style.display = 'none';
        }
    });

closePostModal.addEventListener('click', () => {
    redZone.style.display = 'none';
});

function getCurrentLanguage() {
    const lang = localStorage.getItem(LANG_STORAGE_KEY);
    return lang === 'en' ? 'en' : 'es';
}

function getPostField(post, lang, field) {
    const esKey = `${field}_es`;
    const enKey = `${field}_en`;
    if (lang === 'en') {
        return post?.[enKey] ?? post?.[field] ?? post?.[esKey] ?? '';
    }
    return post?.[esKey] ?? post?.[field] ?? post?.[enKey] ?? '';
}

function openPostModal(post) {
    const lang = getCurrentLanguage();
    const title = getPostField(post, lang, 'title');
    const body = getPostField(post, lang, 'post');

    postModalTitle.textContent = title || (lang === 'en' ? 'Untitled' : 'Sin título');
    postModalBody.innerHTML = '';

    const postText = document.createElement('p');
    postText.textContent = body || (lang === 'en' ? 'No content.' : 'Sin contenido.');
    postModalBody.appendChild(postText);

    redZone.style.display = 'flex';
}

function renderPosts(posts) {
    const lang = getCurrentLanguage();
    if (!postsWindow) return;
    if (!Array.isArray(posts) || posts.length === 0) {
        postsWindow.innerHTML = lang === 'en'
            ? '<p>No posts yet.</p>'
            : '<p>No hay publicaciones todavía.</p>';
        return;
    }

    const sortedPosts = [...posts].sort((a, b) => Number(b.id) - Number(a.id));
    postsWindow.innerHTML = '';

    for (const post of sortedPosts) {
        const title = getPostField(post, lang, 'title');
        const excerpt = getPostField(post, lang, 'post');
        const button = document.createElement('button');
        button.className = 'postButton';
        button.type = 'button';

        button.innerHTML = `
            <h2>${title || (lang === 'en' ? 'Untitled' : 'Sin título')}</h2>
            <p>${excerpt || ''}</p>
        `;

        button.addEventListener('click', () => openPostModal(post));

        postsWindow.appendChild(button);
    }
}

async function loadPosts() {
    try {
        const response = await fetch('./JSON/posts.json', { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const posts = Array.isArray(data.posts) ? data.posts : [];
        cachedPosts = posts;
        renderPosts(cachedPosts);
    } catch (error) {
        const lang = getCurrentLanguage();
        postsWindow.innerHTML = lang === 'en'
            ? '<p>Could not load posts.</p>'
            : '<p>No se pudieron cargar las publicaciones.</p>';
        console.error('Error loading posts:', error);
    }
}

window.addEventListener('site-language-changed', () => {
    renderPosts(cachedPosts);
});

window.addEventListener('storage', (event) => {
    if (event.key === LANG_STORAGE_KEY) {
        renderPosts(cachedPosts);
    }
});

loadPosts();

})();
