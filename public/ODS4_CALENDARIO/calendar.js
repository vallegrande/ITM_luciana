document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: function(fetchInfo, successCallback, failureCallback) {
            fetch('calendario.php')
                .then(response => response.json())
                .then(data => {
                    let eventos = data.map(evento => ({
                        title: evento.titulo,
                        start: evento.fecha
                    }));
                    successCallback(eventos);
                });
        }
    });

    calendar.render();

    document.getElementById('eventoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        agregarEvento(calendar);
    });
});

function agregarEvento(calendar) {
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha = document.getElementById('fecha').value;

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('fecha', fecha);

    fetch('calendario.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        calendar.refetchEvents(); // Refrescar el calendario para mostrar el nuevo evento
    });
}