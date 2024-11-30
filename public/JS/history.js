const homeButton = document.createElement('button');
homeButton.textContent = 'Inicio';

homeButton.addEventListener('mouseover', function() {
    homeButton.style.backgroundColor = '#0056b3';
});
homeButton.addEventListener('mouseout', function() {
    homeButton.style.backgroundColor = '#007BFF';
});

homeButton.addEventListener('click', function() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
});


document.body.appendChild(homeButton);