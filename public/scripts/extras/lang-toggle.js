// Simple manual language toggle (ES / EN) using data-i18n-key attributes.
// - Use data-i18n-html="true" when the translation contains HTML (<br>, <a>, etc).
(function () {

const LANG_STORAGE_KEY = 'siteLanguage';
const SUPPORTED_LANGS = ['es', 'en'];

const TRANSLATIONS = {
    es: {
        'sidebar.bio': 'Bio',
        'sidebar.links': 'Links',
        'sidebar.follow-title': 'Aditional Options',
        'sidebar.lang-button.to-en': 'Cambiar a inglés',
        'sidebar.lang-button.to-es': 'Cambiar a español',
        'nav.home': 'Inicio',
        'nav.about-me': 'Sobre mi',
        'nav.story': 'Historia',
        'nav.blog': 'Publicaciones',
        'nav.socials': 'Sociales',
        'nav.projects': 'Proyectos',
        'nav.gallery': 'Galeria',
        'nav.changelog': 'Historial de cambios',
        'right.stats': 'Estadísticas',
        'right.guestbook': 'Guestbook',
        'right.birthday': 'Cumpleaños',
        'right.changes': 'Cambios',
        'changelog.page.window': 'Historial de cambios',
        'changelog.page.loading': 'Cargando historial...',
        'changelog.page.empty': 'No hay cambios todavía.',
        'changelog.page.error': 'No se pudo cargar el historial.',
        'changelog.modal.title': 'Cambio',

        // index.html (warning)
        'index.warning.title': 'ADVERTENCIA!!',
        'index.warning.body': 'Esta página está actualmente en construcción, además de poseer NSFW (dibujos de desnudos, fetiches (leves o medios), lenguaje soez).<br><br>Si eres menor de 18 <a href="https://nekoweb.org/explore">es mejor que regreses.</a><br><br>En todo caso de que desees entrar, <a href="landing.html">dale click aqui.</a>',

        // landing.html
        'landing.welcome.window': 'Bienvenid@ a la madriguera!',
        'landing.welcome.h2': 'Hola mi nombre es Lux o Simplemente Fizzy',
        'landing.welcome.p1': 'Este blog fue creado para poder decir algo destacable sobre mi o como un coso para poder mostrar como me siento por medio de los posts',
        'landing.welcome.p2': 'Igualmente gracias por visitar mi pagina toda silly y curiosona por aqui jajaj',
        'landing.buttons.window': 'Botones',
        'landing.buttons.h2': 'Aquí algunos botones para que te diviertas!',
        'landing.goal.window': 'Objetivo',
        'landing.goal.h2': 'Cual es el objetivo de la pagina?',
        'landing.goal.p': 'El objetivo de la pagina es como una especie de escape con mi vida personal y un poco mi vida virtual tecnicamente... \n            algo mas para expresarme como soy yo realmente mis delirios, \n            tristesa y desahogos ademas de poder practicar un poco mas \n            sobre html y otras herramientas para mejorar como programador.',
        'landing.tools.window': 'Mis herramientas',
        'landing.tools.h2': '¿Que es lo que uso?',
        'landing.tools.p': 'Yo suelo usar los siguientes recursos para crear la pagina:',
        'landing.paint.window': 'JSPaint',

        // projects.html
        'projects.window.1': 'project1',
        'projects.h2.1': 'Proyecto - Pagina de un restaurante',
        'projects.p1.1': 'Mi proyecto se trata de una pagina web para un restaurante maritimo ubicado en una playa<br><br>\n            \n            Funcionas y herramientas utilizadas:',
        'projects.li1.1': 'El proyecto esta hecho con angular, spring boot swagger y usando sql server como base de datos/li',
        'projects.li2.1': 'El proyecto esta en desarrollo y se espera que para finales de 2026 este terminado con un aplicativo web y movil',
        'projects.p2.1': 'mas o menos la pagina podria valer alrededor de 800 o 1000 soles si se logra perfeccionar con exito',
        'projects.window.2': 'project2',
        'projects.h2.2': 'Proyecto - Servidor de discord',
        'projects.p.2': 'Este proyecto ya es de una manera algo mas silly porque mas que todo trato de hacer una comunidad con ello porque suena divertido no?<br><br>\n\nMejor tener un hobby mientras no tengo mejor que hacer ahora mismo y solo disfruto de la vida jajaja',
        'projects.window.3': 'project3',
        'projects.h2.3': 'Proyecto - ???',
        'projects.p.3': 'Aun no hay nada por aqui, vuelve mas tarde :3',

        // blog.html
        'blog.window.posts': 'Publicaciones',
        'blog.loading': 'Cargando posts...',
        'blog.modal.title': 'Post',

        // gallery.html
        'gallery.window.keeby.sfw': 'Galeria SFW de Keeby',
        'gallery.window.keeby.nsfw': 'Galeria NSFW de Keeby',
        'gallery.window.luma.sfw': 'Galeria SFW de Luma',
        'gallery.window.luma.nsfw': 'Galeria NSFW de Luma',
        'gallery.window.birthday.sfw': 'Coleccion de Cumpleaños',

        // aboutOC.html
        'aboutoc.window.data': 'Datos previos',
        'aboutoc.h2.data': 'Datos previos - Keeby',
        'aboutoc.p.data': 'Unos datos previos antes de comenzar con su historia:',
        'aboutoc.li.name': 'Nombre: Kebby Sunlight',
        'aboutoc.li.job': 'Profesión: Informática - Mantenimiento de electrónicos',
        'aboutoc.li.age': 'Edad: 19 años',
        'aboutoc.li.gender': 'Género: Masculino',
        'aboutoc.li.sex': 'Sexualidad: Bisexual',
        'aboutoc.li.personality': 'Personalidad: Alegre, amable, bromista, optimista',
        'aboutoc.h2.obs': 'Observación:',
        'aboutoc.p.obs': 'El sujeto en específico es interesante debido a que, a pesar de todo, \n            sigue en pie y se mantiene alegre, y más aún por la guitarra que tiene en mano. \n            Además, se sabe que tiene más versiones en el multiverso, algunas que no deberían existir, \n            y logros que probablemente representan la forma perfecta de balance, \n            así que es un sujeto muy interesante...',
        'aboutoc.h2.conclusion': 'Conclusion:',
        'aboutoc.p.conclusion': 'Ver al sujeto \"Keeby\" para ver su progreso.<br><br>\n            \n            Prioridad: Media',
        'aboutoc.window.likes': 'Gustos/Hobbys',
        'aboutoc.window.dislikes': 'Disgustos',
        'aboutoc.window.prologue': 'Prólogo',
        'aboutoc.h2.prologue': 'Prólogo:',
        'aboutoc.window.story': 'Historia',
        'aboutoc.h2.story': 'Su historia',
        'aboutoc.window.guitar': 'La Guitarra...',
        'aboutoc.h2.guitar': '¿Qué es la guitarra y qué propiedades tiene?',
        'aboutoc.window.trivia': 'Curiosidades',
        'aboutoc.h2.trivia': 'Datos curiosos de él',

        // webmaster.html
        'webmaster.window.about': 'Información sobre mi',
        'webmaster.h2.about': 'Sobre mi:',
        'webmaster.p.about': 'Bueno un gusto como mencione me llamo lux o me pueden llamar Notux<br><br>Soy un chico que tiene 19 años actualmente<br><br>Suelo ser alguien que no le gusta tanto crear amistades y prefiere estar algo solitario a veces, aunque mayormente me gusta entrar a chats de voz para ser algo payaso y igualmente hablar con amigos de manera frecuente, hablo ingles pero no de manera tan fluida aun estoy aprendiendo ese idioma al momento de escribir todo esto jeje<br><br>Tengo algunos problemas con hacer amigos y a veces suelo sentirme desanimado por pensamientos o estresado por cosas de la vida',
        'webmaster.h2.friends': 'Mejores amigos:',
        'webmaster.window.likes': 'Gustos',
        'webmaster.h2.what-i-like': 'Que me gusta',
        'webmaster.li.likes.games': 'Los videojuegos',
        'webmaster.li.likes.music': 'La música',
        'webmaster.li.likes.memes': 'Los memes',
        'webmaster.li.likes.anime': 'Ver anime',
        'webmaster.window.dislikes': 'Disgustos',
        'webmaster.h2.what-i-dislike': 'Que NO me gusta',
        'webmaster.li.dislikes.cats': 'Los gatos (Joke)',
        'webmaster.li.dislikes.heights': 'Los sitios altos',
        'webmaster.li.dislikes.people': 'Personas problematicas',
        'webmaster.li.dislikes.mental': 'La depresion y la ansiedad',
        'webmaster.li.dislikes.overthink': 'Sobrepensar en las cosas',
        'webmaster.li.dislikes.time': 'Perder mi tiempo',
        'webmaster.window.activities': 'Qué hago?',
        'webmaster.li.act.games': 'Juego videojuegos',
        'webmaster.li.act.code': 'Aprendo Programacion',
        'webmaster.li.act.youtube': 'Suelo ver youtube frecuentemente',
        'webmaster.li.act.study': 'Estudio una carrera tecnica',
        'webmaster.window.important': 'Información Importante',
        'webmaster.h1.important': 'Importante!',
        'webmaster.p.important': 'Hablo principalmente español y puedo escribir inglés, pero cuando hablo por teléfono o por voz, tiendo a hacerlo de forma pésima o deficiente.<br><br>Primero te preguntaré tu edad, así que tenlo en cuenta. Asimismo, prefiero evitar interactuar con menores por razones obvias y para evitar problemas que me involucren directa o indirectamente.<br><br>En resumen, si eres menor de edad, piénsalo dos veces antes de contactarme o buscar mi amistad.'
    },
    en: {
        'sidebar.bio': 'Bio',
        'sidebar.links': 'Links',
        'sidebar.follow-title': 'Aditional Options',
        'sidebar.lang-button.to-en': 'Switch to English',
        'sidebar.lang-button.to-es': 'Switch to Spanish',
        'nav.home': 'Home',
        'nav.about-me': 'About me',
        'nav.story': 'Story',
        'nav.blog': 'Posts',
        'nav.socials': 'Socials',
        'nav.projects': 'Projects',
        'nav.gallery': 'Gallery',
        'nav.changelog': 'Changelog history',
        'right.stats': 'Stats',
        'right.guestbook': 'Guestbook',
        'right.birthday': 'Birthday',
        'right.changes': 'Changelog',
        'changelog.page.window': 'Changelog history',
        'changelog.page.loading': 'Loading changelog...',
        'changelog.page.empty': 'No changes yet.',
        'changelog.page.error': 'Could not load changelog.',
        'changelog.modal.title': 'Change',

        // index.html (warning)
        'index.warning.title': 'WARNING!!',
        'index.warning.body': 'This page is currently under construction, and it also contains NSFW (drawings of nudes, fetishes (mild or medium), strong language).<br><br>If you are under 18, <a href="https://nekoweb.org/explore">it’s better to go back.</a><br><br>If you still want to enter, <a href="landing.html">click here.</a>',

        // landing.html
        'landing.welcome.window': 'Welcome to the burrow!',
        'landing.welcome.h2': 'Hi, my name is Lux, or simply Fizzy',
        'landing.welcome.p1': 'This blog was created so I can say something notable about myself, or as a place to show how I feel through posts.',
        'landing.welcome.p2': 'Anyway, thanks for visiting my silly, curious page haha.',
        'landing.buttons.window': 'Buttons',
        'landing.buttons.h2': 'Here are some buttons for you to enjoy!',
        'landing.goal.window': 'Goal',
        'landing.goal.h2': 'What is the goal of the page?',
        'landing.goal.p': 'The goal of the page is like a kind of escape from my personal life and a bit of my virtual life, technically...\n            something more to express who I really am: my random thoughts,\n            sadness and venting, and also to practice more\n            HTML and other tools to improve as a programmer.',
        'landing.tools.window': 'My tools',
        'landing.tools.h2': 'What do I use?',
        'landing.tools.p': 'I usually use these resources to build the site:',
        'landing.paint.window': 'JSPaint',

        // projects.html
        'projects.window.1': 'project1',
        'projects.h2.1': 'Project - Restaurant website',
        'projects.p1.1': 'My project is a website for a seaside restaurant located on a beach.<br><br>\n            \n            Features and tools used:',
        'projects.li1.1': 'The project is made with Angular, Spring Boot, Swagger, and SQL Server as the database.',
        'projects.li2.1': 'The project is in development and is expected to be finished by the end of 2026 with a web and mobile app.',
        'projects.p2.1': 'Roughly, the site could cost around 800 to 1000 soles if it’s perfected successfully.',
        'projects.window.2': 'project2',
        'projects.h2.2': 'Project - Discord server',
        'projects.p.2': 'This project is a bit more silly, because I mostly try to build a community with it—sounds fun, right?<br><br>\n\nBetter to have a hobby while I don’t have anything better to do; I’m just enjoying life haha.',
        'projects.window.3': 'project3',
        'projects.h2.3': 'Project - ???',
        'projects.p.3': 'There’s nothing here yet, come back later :3',

        // blog.html
        'blog.window.posts': 'Posts',
        'blog.loading': 'Loading posts...',
        'blog.modal.title': 'Post',

        // gallery.html
        'gallery.window.keeby.sfw': 'Keeby SFW Gallery',
        'gallery.window.keeby.nsfw': 'Keeby NSFW Gallery',
        'gallery.window.luma.sfw': 'Luma SFW Gallery',
        'gallery.window.luma.nsfw': 'Luma NSFW Gallery',
        'gallery.window.birthday.sfw': 'Birthday Bash Collection',

        // aboutOC.html (partial UI)
        'aboutoc.window.data': 'Background info',
        'aboutoc.h2.data': 'Background info - Keeby',
        'aboutoc.p.data': 'Some background info before starting the story:',
        'aboutoc.li.name': 'Name: Kebby Sunlight',
        'aboutoc.li.job': 'Job: IT - Electronics maintenance',
        'aboutoc.li.age': 'Age: 19',
        'aboutoc.li.gender': 'Gender: Male',
        'aboutoc.li.sex': 'Sexuality: Bisexual',
        'aboutoc.li.personality': 'Personality: Cheerful, kind, playful, optimistic',
        'aboutoc.h2.obs': 'Observation:',
        'aboutoc.p.obs': 'The subject is interesting because, despite everything,\n            he is still standing and stays cheerful—especially because of the guitar in his hand.\n            Also, it is known he has more versions across the multiverse, some that should not exist,\n            and achievements that probably represent perfect balance,\n            so he is a very interesting subject...',
        'aboutoc.h2.conclusion': 'Conclusion:',
        'aboutoc.p.conclusion': 'See subject \"Keeby\" to monitor progress.<br><br>\n            \n            Priority: Medium',
        'aboutoc.window.likes': 'Likes/Hobbies',
        'aboutoc.window.dislikes': 'Dislikes',
        'aboutoc.window.prologue': 'Prologue',
        'aboutoc.h2.prologue': 'Prologue:',
        'aboutoc.window.story': 'Story',
        'aboutoc.h2.story': 'His story',
        'aboutoc.window.guitar': 'The Guitar...',
        'aboutoc.h2.guitar': 'What is the guitar and what properties does it have?',
        'aboutoc.window.trivia': 'Trivia',
        'aboutoc.h2.trivia': 'Fun facts about him',

        // webmaster.html
        'webmaster.window.about': 'Information about me',
        'webmaster.h2.about': 'About me:',
        'webmaster.p.about': 'Well, nice to meet you—as I mentioned, my name is Lux, or you can call me Notux.<br><br>I\'m a guy who is currently 19 years old.<br><br>I tend to be someone who doesn\'t enjoy making friends that much and prefers being a bit lonely sometimes, although mostly I like joining voice chats to be a bit of a clown and also talk with friends often. I speak English but not very fluently—I\'m still learning the language as I write all of this hehe.<br><br>I have some trouble making friends and sometimes I feel discouraged by my thoughts or stressed by life stuff.',
        'webmaster.h2.friends': 'Best friends:',
        'webmaster.window.likes': 'Likes',
        'webmaster.h2.what-i-like': 'What I like',
        'webmaster.li.likes.games': 'Video games',
        'webmaster.li.likes.music': 'Music',
        'webmaster.li.likes.memes': 'Memes',
        'webmaster.li.likes.anime': 'Watching anime',
        'webmaster.window.dislikes': 'Dislikes',
        'webmaster.h2.what-i-dislike': 'What I DON\'T like',
        'webmaster.li.dislikes.cats': 'Cats (joke)',
        'webmaster.li.dislikes.heights': 'High places',
        'webmaster.li.dislikes.people': 'Problematic people',
        'webmaster.li.dislikes.mental': 'Depression and anxiety',
        'webmaster.li.dislikes.overthink': 'Overthinking things',
        'webmaster.li.dislikes.time': 'Wasting my time',
        'webmaster.window.activities': 'What do I do?',
        'webmaster.li.act.games': 'I play video games',
        'webmaster.li.act.code': 'I learn programming',
        'webmaster.li.act.youtube': 'I watch YouTube often',
        'webmaster.li.act.study': 'I\'m studying a technical degree',
        'webmaster.window.important': 'Important information',
        'webmaster.h1.important': 'Important!',
        'webmaster.p.important': 'I mainly speak Spanish and I can write in English, but when I talk on the phone or by voice I tend to do it terribly or poorly.<br><br>I\'ll ask your age first, so keep that in mind. I also prefer to avoid interacting with minors for obvious reasons and to avoid problems that involve me directly or indirectly.<br><br>In short, if you\'re a minor, think twice before contacting me or seeking my friendship.'
    }
};

function getCurrentLanguage() {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (SUPPORTED_LANGS.includes(stored)) {
        return stored;
    }
    return 'es';
}

function saveCurrentLanguage(lang) {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
}

function applyLanguage(lang) {
    const dict = TRANSLATIONS[lang] || {};

    document.querySelectorAll('[data-i18n-key]').forEach((el) => {
        const key = (el.getAttribute('data-i18n-key') || '').trim();
        const value = dict[key];
        if (typeof value !== 'string') return;
        const isHtml = el.getAttribute('data-i18n-html') === 'true';
        try {
            if (isHtml) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        } catch (err) {
            console.warn(`[i18n] Skipped key "${key}":`, err);
        }
    });

    updateLanguageToggleButton(lang);
    applyTranslatedTitle(lang);
    document.documentElement.setAttribute('lang', lang);
    window.dispatchEvent(new CustomEvent('site-language-changed', { detail: { lang } }));
}

function applyTranslatedTitle(lang) {
    const filename = (location.pathname.split('/').pop() || '').toLowerCase();
    const baseSuffix = " - Sezeik's Hideout";
    const titles = {
        'landing.html': { es: 'Inicio', en: 'Home' },
        'blog.html': { es: 'Blog', en: 'Blog' },
        'gallery.html': { es: 'Galeria', en: 'Gallery' },
        'changelog.html': { es: 'Historial de cambios', en: 'Changelog history' },
        'projects.html': { es: 'Proyectos', en: 'Projects' },
        'linktree.html': { es: 'Mis redes', en: 'My socials' },
        'aboutoc.html': { es: 'Historia', en: 'Story' },
        'webmaster.html': { es: 'Sobre mi', en: 'About me' },
        'index.html': { es: "SeZeiK's Hideout", en: "SeZeiK's Hideout" }
    };

    const entry = titles[filename];
    if (!entry) return;

    if (filename === 'index.html') {
        document.title = entry[lang] || document.title;
        return;
    }

    const translated = entry[lang];
    if (translated) {
        document.title = `${translated}${baseSuffix}`;
    }
}

function updateLanguageToggleButton(lang) {
    const btn = document.getElementById('languageToggleButton');
    if (!btn) return;

    const dict = TRANSLATIONS[lang] || {};
    if (lang === 'es') {
        btn.textContent = dict['sidebar.lang-button.to-en'] || 'Cambiar a inglés';
    } else {
        btn.textContent = dict['sidebar.lang-button.to-es'] || 'Switch to Spanish';
    }
}

function bindLanguageToggleButton() {
    const btn = document.getElementById('languageToggleButton');
    if (!btn) return false;
    if (btn.dataset.langToggleBound === 'true') return true;

    btn.dataset.langToggleBound = 'true';
    updateLanguageToggleButton(getCurrentLanguage());
    return true;
}

function bindGlobalLanguageToggleClick() {
    if (document.documentElement.dataset.langToggleGlobalBound === 'true') return;

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const clickedButton = target.id === 'languageToggleButton'
            ? target
            : target.closest('#languageToggleButton');

        if (!clickedButton) return;

        const newLang = getCurrentLanguage() === 'es' ? 'en' : 'es';
        saveCurrentLanguage(newLang);
        applyLanguage(newLang);
    });

    document.documentElement.dataset.langToggleGlobalBound = 'true';
}

function setupLanguageToggle() {
    const current = getCurrentLanguage();
    applyLanguage(current);
    bindLanguageToggleButton();
}

function initLanguageToggle() {
    try {
        bindGlobalLanguageToggleClick();
        setupLanguageToggle();
    } catch (err) {
        console.error('Language toggle init error:', err);
    }
}

document.addEventListener('DOMContentLoaded', initLanguageToggle);
window.addEventListener('load', () => {
    try {
        applyLanguage(getCurrentLanguage());
        bindLanguageToggleButton();
    } catch (err) {
        console.error('Language toggle load-pass error:', err);
    }
});

const lateBindInterval = setInterval(() => {
    if (bindLanguageToggleButton()) {
        clearInterval(lateBindInterval);
    }
}, 500);

})();

