// discord.js
// Este script tiene como función el mostrar el estado actual de tu cuenta de Discord.
async function discordChecker() {
    	const statusColors = {
        	online: "#5dff8a",
        	idle: "#cb9654",
        	dnd: "#d83a43",
	    	offline: "#5d5d5d",
    	};
    	const statusNames = {
        	online: "Online",
        	idle: "AFK",
        	dnd: "Do not Disturb",
        	offline: "Offline",
    	};
    try {
      const response = await fetch('https://api.lanyard.rest/v1/users/324531951526608896');
      const splingus = await response.json();
      document.getElementById("discord_status").innerHTML = `${statusNames[splingus.data.discord_status]}`;
      document.getElementById("discord_status").style.color = statusColors[splingus.data.discord_status];
    } catch (error) {
    	document.getElementById("discord_status").innerHTML = `${statusNames[offline]}`;
    	document.getElementById("discord_status").style.color = statusColors[offline];
    	console.error("failed to fetch!!", error);
    }
}

function ensureChangelogLink() {
    const linksList = document.querySelector('#link_folder .windowInside ul');
    if (!linksList) return;

    const existing = linksList.querySelector('a[href*="changelog.html"]');
    if (existing) return;

    const li = document.createElement('li');
    li.innerHTML = `
        <a href="../../../../../../../changelog.html">
            <img src="../../../../../../../media/icons/notes.png">
            <span data-i18n-key="nav.changelog">Historial de cambios</span>
        </a>
    `;

    linksList.appendChild(li);
}

ensureChangelogLink();
discordChecker();
setInterval(discordChecker, 1500);