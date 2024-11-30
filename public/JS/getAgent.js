fetch('/api/contactos/idsAgent')
    .then(response => response.json())
    .then(ids => {
        const selectId = document.getElementById('id_agent');
        ids.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id; // Establece el valor de la opción
            option.textContent = `${item.name_agent}`; // Texto mostrado en la opción
            selectId.appendChild(option); // Agrega la opción al <select>
        });
    })
    .catch(error => {
        console.error('Error al cargar los IDs:', error);
    });
