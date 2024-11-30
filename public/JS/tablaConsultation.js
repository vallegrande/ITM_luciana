// Obtener los datos desde el servidor
fetch('/api/answer')
    .then(response => response.json())
    .then(data => {
        const tablaContactos = document.getElementById('tabla-answer');
        data.forEach(consultation => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${consultation.id}</td>
                <td>${consultation.user}</td>
                <td>${consultation.agent}</td>
                <td>${consultation.answer}</td>
                <td>${consultation.state}</td>
            `;
            tablaContactos.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al cargar los contactos:', error);
    });
