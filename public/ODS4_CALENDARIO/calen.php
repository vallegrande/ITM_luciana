<?php
$host = 'localhost'; // Servidor de la base de datos.
$user = 'root'; // Usuario de la base de datos.
$password = '23032007lu'; // Contraseña del usuario.
$database = 'calendario'; // Nombre de la base de datos.

// Crear conexión
$conn = new mysqli($host, $user, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener eventos
    $sql = "SELECT titulo, fecha FROM eventos";
    $result = $conn->query($sql);

    $eventos = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $eventos[] = $row;
        }
    }
    echo json_encode($eventos);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Agregar evento
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $fecha = $_POST['fecha'];

    if (!empty($titulo) && !empty($fecha)) {
        $stmt = $conn->prepare("INSERT INTO eventos (titulo, descripcion, fecha) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $titulo, $descripcion, $fecha);

        if ($stmt->execute()) {
            echo "Evento agregado exitosamente.";
        } else {
            echo "Error al agregar evento: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Título y fecha son obligatorios.";
    }
}

$conn->close();
?>