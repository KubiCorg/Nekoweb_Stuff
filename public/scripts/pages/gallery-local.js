document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".galleryWindow a.pictureHolder[href]").forEach(function (cardLink) {
        const card = document.createElement("div");
        card.className = cardLink.className;

        const image = cardLink.querySelector("img");
        const imageLink = document.createElement("a");
        imageLink.href = cardLink.href;

        if (image) {
            imageLink.appendChild(image);
        }
        card.appendChild(imageLink);

        Array.from(cardLink.childNodes).forEach(function (node) {
            if (node !== image) {
                card.appendChild(node);
            }
        });

        cardLink.replaceWith(card);
    });

    document.querySelectorAll(".galleryWindow a[href]").forEach(function (link) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });
});

(function setupDynamicSegmentedGallery() {
    const galleryContainers = document.querySelectorAll('.classicWindow');

    galleryContainers.forEach(container => {
        const content = container.querySelector('.thingyP');
        const viewport = container.querySelector('.galleryMarquee');
        const btnLeft = container.querySelector('.scrollLeftBtn');
        const btnRight = container.querySelector('.scrollRightBtn');

        if (!content || !viewport || !btnLeft || !btnRight) return;

        const items = content.querySelectorAll('.pictureHolder');
        if (items.length === 0) return;

        let stepSize = items[0].offsetWidth;
        
        if (items.length > 1) {
            const style = window.getComputedStyle(content);
            const gap = parseFloat(style.gap) || 0;
            stepSize += gap;
        }

        let currentX = 0;

        btnRight.addEventListener('click', () => {
            const maxScroll = viewport.offsetWidth - content.offsetWidth;
            currentX -= stepSize;
            
            if (currentX < maxScroll) {
                currentX = maxScroll;
            }
            
            content.style.transform = `translateX(${currentX}px)`;
        });

        btnLeft.addEventListener('click', () => {
            currentX += stepSize;
            
            if (currentX > 0) {
                currentX = 0;
            }
            
            content.style.transform = `translateX(${currentX}px)`;
        });
    });
})();
