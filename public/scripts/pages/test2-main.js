const sonido = new Audio('../../../../../../../comm/media/ding.mp3');

function insertContent(socialMedia){
    const redZone = document.getElementById('redZone');
    
    let row1 = {label: "unset value", text: "unset value", isLink: false}
    let row2 = {label: "unset value", text: "unset value", isLink: false}
    let isDoubleLink = false;
    
    switch(socialMedia){
        case "Discord":
            isDoubleLink = true;
            row1.label = "Mi Usuario:";
            row1.text = "sezeik";
            row1.isLink = false;
            
            row2.label = "Mi Servidor:";
            row2.text = "https://discord.gg/J6b3cvxY9S";
            row2.isLink = true;
            
            break;
            
        case "Roblox":
            isDoubleLink = true;
            row1.label = "Mi Usuario:";
            row1.text = "https://www.roblox.com/users/156899318/profile";
            row1.isLink = true;
            
            row2.label = "Mi Comunidad:";
            row2.text = "https://www.roblox.com/communities/33088746";
            row2.isLink = true;
            
            break;
            
        case "Twitter":
            isDoubleLink = false;
            row1.label = "Mi Twitter:";
            row1.text = "https://twitter.com/@FarKopz";
            row1.isLink = true;
            
            break;
            
        case "Bluesky":
            isDoubleLink = false;
            row1.label = "Mi Bluesky:";
            row1.text = "https://bsky.app/profile/rored62.bsky.social";
            row1.isLink = true;
            
            break;
            
        case "Steam":
            isDoubleLink = false;
            row1.label = "Mi Perfil de Steam:";
            row1.text = "https://steamcommunity.com/id/ReReddot";
            row1.isLink = true;
            
            break;
            
        case "Xbox":
            isDoubleLink = false;
            row1.label = "Mi Perfil de Xbox:";
            row1.text = "https://www.xbox.com/es-PE/play/user/Shorkp";
            row1.isLink = true;
            
            break;
            
        case "YouTube":
            isDoubleLink = false;
            row1.label = "Mi Canal de YouTube:";
            row1.text = "https://www.youtube.com/@RoRed62";
            row1.isLink = true;
            
            break;
            
        case "PayPal":
            isDoubleLink = false;
            row1.label = "Mi PayPal:";
            row1.text = "https://paypal.me/Tecnest";
            row1.isLink = true;
            
            break;
            
        case "Github":
            isDoubleLink = false;
            row1.label = "Mi Github:";
            row1.text = "https://github.com/Fyph64";
            row1.isLink = true;
            
            break;
            
        default:
            isDoubleLink = false;
            row1.label = "FENG: DEFAULT STRING ERROR";
            row1.text = "FENG: DEFAULT STRING ERROR";
            row1.isLink = false;
            
            return;
    }
    
    // Ando podrida de tanto programar y tener que HACER MIERDAS con mi PAIS DE MIERDA.
    // 9-11 del programador, me vale MIERDA si se puede refactorizar o no.
    redZone.innerHTML = "";
    
    if (isDoubleLink === true){
        if (row1.isLink === false && row2.isLink === true){
            redZone.insertAdjacentHTML('beforeend', `<div class="classicWindow" style="position: fixed; width: 400px; right: 35%; top: 35%;">
    <div class="howeverThatBarNames">
        <label>
            <img src="../../../../../../../comm/media/icons/98/${socialMedia}.png" width="16px" height="16px" style="position: relative; top: 2px;">
            <span style="position: relative; bottom: 2px;">${socialMedia}</span>
        </label>
        <div class="upperButtons">
            <button>_ </button>
            <button>□</button>
            <button onclick="closeWindow()">×</button>
        </div>
    </div>
    <div class="windowInside" style="display:flex; flex-flow: row wrap; gap: 10px; justify-content:space-around;">
        <div style="display:flex; flex-flow: column wrap; gap: 10px; text-align: center; width: 70%">
            <label id="social_media_name1">${row1.label}</label>
            <input type="text" readonly class="image_frame" id="social_link1" value="${row1.text}"> 
        </div>
        <div style="display:flex; flex-flow: column wrap; gap: 10px;">
            <button onclick="copyContent(1)" style="display: flex; flex-flow: row wrap; gap: 5px;">Copy</button>
            <button onclick="openTab(1)" style="display: flex; flex-flow: row wrap; gap: 5px;" disabled>Open</button>
        </div>
        
        <div style="display:flex; flex-flow: column wrap; gap: 10px; text-align: center; width: 70%">
            <label id="social_media_name2">${row2.label}</label>
            <input type="text" readonly class="image_frame" id="social_link2" value="${row2.text}"> 
        </div>
        <div style="display:flex; flex-flow: column wrap; gap: 10px;">
            <button onclick="copyContent(2)" style="display: flex; flex-flow: row wrap; gap: 5px;">Copy</button>
            <button onclick="openTab(2)" style="display: flex; flex-flow: row wrap; gap: 5px;">Open</button>
        </div>
    </div>
    
    </div>`);
        }
        else {
            redZone.insertAdjacentHTML('beforeend', `<div class="classicWindow" style="position: fixed; width: 400px; right: 35%; top: 35%;">
    <div class="howeverThatBarNames">
        <label>
            <img src="../../../../../../../comm/media/icons/98/${socialMedia}.png" width="16px" height="16px" style="position: relative; top: 2px;">
            <span style="position: relative; bottom: 2px;">${socialMedia}</span>
        </label>
        <div class="upperButtons">
            <button>_ </button>
            <button>□</button>
            <button onclick="closeWindow()">×</button>
        </div>
    </div>
    <div class="windowInside" style="display:flex; flex-flow: row wrap; gap: 10px; justify-content:space-around;">
        <div style="display:flex; flex-flow: column wrap; gap: 10px; text-align: center; width: 70%">
            <label id="social_media_name1">${row1.label}</label>
            <input type="text" readonly class="image_frame" id="social_link1" value="${row1.text}"> 
        </div>
        <div style="display:flex; flex-flow: column wrap; gap: 10px;">
            <button onclick="copyContent(1)" style="display: flex; flex-flow: row wrap; gap: 5px;">Copy</button>
            <button onclick="openTab(1)" style="display: flex; flex-flow: row wrap; gap: 5px;">Open</button>
        </div>
        
        <div style="display:flex; flex-flow: column wrap; gap: 10px; text-align: center; width: 70%">
            <label id="social_media_name2">${row2.label}</label>
            <input type="text" readonly class="image_frame" id="social_link2" value="${row2.text}"> 
        </div>
        <div style="display:flex; flex-flow: column wrap; gap: 10px;">
            <button onclick="copyContent(2)" style="display: flex; flex-flow: row wrap; gap: 5px;">Copy</button>
            <button onclick="openTab(2)" style="display: flex; flex-flow: row wrap; gap: 5px;">Open</button>
        </div>
    </div>
    
    </div>`);
        }
    } else if (isDoubleLink === false){
        redZone.insertAdjacentHTML('beforeend', `<div class="classicWindow" style="position: fixed; width: 400px; right: 35%; top: 35%;">
    <div class="howeverThatBarNames">
        <label>
            <img src="../../../../../../../comm/media/icons/98/${socialMedia}.png" width="16px" height="16px" style="position: relative; top: 2px;">
            <span style="position: relative; bottom: 2px;">${socialMedia}</span>
        </label>
        <div class="upperButtons">
            <button>_ </button>
            <button>□</button>
            <button onclick="closeWindow()">×</button>
        </div>
    </div>
    <div class="windowInside" style="display:flex; flex-flow: row wrap; gap: 10px; justify-content:space-around;">
        <div style="display:flex; flex-flow: column wrap; gap: 10px; text-align: center; width: 70%">
            <label id="social_media_name1">${row1.label}</label>
            <input type="text" readonly class="image_frame" id="social_link1" value="${row1.text}"> 
        </div>
        <div style="display:flex; flex-flow: column wrap; gap: 10px;">
            <button onclick="copyContent(1)" style="display: flex; flex-flow: row wrap; gap: 5px;">Copy</button>
            <button onclick="openTab(1)" style="display: flex; flex-flow: row wrap; gap: 5px;">Open</button>
        </div>
    </div>
    
    </div>`);
    }
    else {
        redZone.insertAdjacentHTML('beforeend', `<div class="classicWindow" style="position: fixed; width: 400px; right: 35%; top: 35%;">
    <div class="howeverThatBarNames">
        <label>
            <img src="../../../../../../../comm/media/icons/98/Discord.png" width="16px" height="16px" style="position: relative; top: 2px;">
            <span style="position: relative; bottom: 2px;">Something is wrong.........</span>
        </label>
        <div class="upperButtons">
            <button>_ </button>
            <button>□</button>
            <button onclick="closeWindow()">×</button>
        </div>
    </div>
    <div class="windowInside" style="display:flex; flex-flow: row wrap; gap: 10px; justify-content:space-around;">
        <div>
            <p>Something is wrong... Social could not be displayed.</p>
        </div>
    </div>
    
    </div>`);
    }
    
    redZone.style.display = 'block';
}

function openWindow(social){
    sonido.volume = 0.15;
    sonido.currentTime = 0;
    sonido.play();
    
    insertContent(social);
}

function checkForLabel(labelNumber){
    let genericValue = null
    
    switch (labelNumber){
        case 1:
            genericValue = document.getElementById('social_link1').value;
            break;
        
        case 2:
            genericValue = document.getElementById('social_link2').value;
            break;
            
        default:
            console.log("ERROR: INVALID LABEL");
            return -1;
    }
    
    return genericValue;
}

function copyContent(labelNumber){
    const value = checkForLabel(labelNumber)
    if (value != -1){
        navigator.clipboard.writeText(genericValue)
            .then(() => {
                console.log("LOG: 200");
            })
            .catch(err => {
                console.log("LOG: 400\n", err);
            });
    }
    else {
        console.log("ERROR: INVALID LABEL");
        return;
    }
}

function openTab(labelNumber){
    const value = checkForLabel(labelNumber)
    if (value != -1){
        window.open(value, '_blank');
    }
    else {
        console.log("ERROR: INVALID LABEL");
        return;
    }
    
}

function closeWindow(){
    const redZone = document.getElementById('redZone');
    if (redZone.style.display != 'none') {
        redZone.style.display = 'none';
    }
    else{
        console.log("???");}
}
