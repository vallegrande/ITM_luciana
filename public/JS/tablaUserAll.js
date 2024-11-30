// Obtener los datos desde el servidor
fetch('/api/contactosAll')
    .then(response => response.json())
    .then(data => {
        const tablaContactos = document.getElementById('tabla-contactosAll');
        data.forEach(user => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name_user}</td>
                <td>${user.lastname}</td>
                <td>${user.cellphone}</td>
                <td>${user.email}</td>
                <td>${user.consultation}</td>
                <td>${user.state}</td>
            `;
            tablaContactos.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar los contactos:', error);
    });
