let currentIndex = 0; // Variable que almacena el índice actual del carrusel.
const carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length; 
 
function moveCarousel(direction) {
    currentIndex = (currentIndex + direction + totalItems) % totalItems; 
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-wrapper').style.transform = `translateX(${offset}%)`;
}

function startAutoPlay() {
    return setInterval(() => moveCarousel(1), 1000);// segundos     
}

let autoPlay = startAutoPlay();


document.querySelector('.carousel').addEventListener('mouseover', () => {
    clearInterval(autoPlay); 
});

document.querySelector('.carousel').addEventListener('mouseout', () => {
    autoPlay = startAutoPlay();
});