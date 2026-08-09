const redZone = document.getElementById('redZone');

redZone.addEventListener('click', () => {
    if(event.target === redZone){
        redZone.style.display = 'none';}
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && redZone.style.display != 'none') {
            redZone.style.display = 'none';
        }
    });
