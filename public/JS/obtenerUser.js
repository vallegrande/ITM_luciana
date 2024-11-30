fetch('/api/contactos/ids')
    .then(response => response.json())
    .then(ids => {
        const selectId = document.getElementById('id_user');
        ids.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id; 
            option.textContent = `${item.id}`; 
            selectId.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al cargar los IDs:', error);
    });
