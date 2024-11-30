const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const app = express();
//Conexiones
let conexion = mysql.createConnection({
    host: "", /* hostname de la base de datos de contacto */
    database: "IMT_Contact_DB", /* nombre de la base de datos de contacto */
    user: "admin", /* nombre de usuario */
    password: "" /* contraseña de la base de datos de contacto */
})

let conexionCalendar = mysql.createConnection({
    host: "", /* hostname de la base de datos del calendario */
    database: "IMT_Calendar_DB", /* nombre de la base de datos del calendario */
    user: "admin", /* nombre de usuario */
    password: "" /* contraseña de la base de datos del calendario */
})

//Puerto e IP
const PORT = process.env.PORT || 3000;
const IP = ""; /* IP Pública */

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: "tu_contraseña",
    resave: false,
    saveUninitialized: false
}));


//Comprobar conexiones con las bases de datos
conexion.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos correctamente");
});
conexionCalendar.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos correctamente");
});

//Obtener las respuestas de las consultas y enviarlas a la base de datos
app.post("/regConsulta", function(req, res) {
    const datos = req.body;
    console.log(datos);

    let name = datos.nombres;
    let lastname = datos.apellidos;
    let email = datos.correo;
    let cellphone = datos.celular;
    let consult = datos.consulta;

    let registrar = `INSERT INTO user (name_user, lastname, email, cellphone, consultation) VALUES ("${name}", "${lastname}", "${email}", "${cellphone}", "${consult}")`;

    conexion.query(registrar, (error)=>{
        if(error){
            console.log("Error al registrar los datos");
            throw error;
        } else {
            console.log("Datos almacenados correctamente");
            res.redirect('../Html/Contact.html');
        }
    })
});

//Obtener los datos para el registro de respuestas de las consultas y enviarlos a la base de datos || actualización de estado de la consulta
app.post("/regAnswer", function(req, res) {
    const datos = req.body;
    console.log(datos);

    let user = datos.id_user
    let agent = datos.id_agent;
    let answer = datos.answer;

    let registrar = `INSERT INTO consultation (user, agent, answer) VALUES (${user}, ${agent}, "${answer}")`;
    let actualizar = `UPDATE user SET state = "R" WHERE id = "${user}"`

    conexion.query(registrar, (error)=>{
        if(error){
            console.log("Error al registrar los datos");
            throw error;
        } else {
            console.log("Datos almacenados correctamente");
            res.redirect('../Html/xHDfTNexmbl7XdjCn2LaH+ZBa1yvvm+b9r+ruKlxzuQ.html');
        }
    })

    conexion.query(actualizar, (error)=>{
        if(error){
            console.log("Error al actualizar los datos");
            throw error;
        } else {
            console.log("Datos almacenados correctamente");
        }
    })
});

// Obtener los registros de la base de datos de la tabla usuario y que se encuentre en estado "A"; para luego enviarlos a la tabla User
app.get('/api/contactos', (req, res) => {
    const sqlSelect = 'SELECT * FROM user WHERE state = "A"';
    conexion.query(sqlSelect, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los contactos' });
            return;
        }
        res.json(results);
    });
});

//Obtener las ids de los registros de los usuarios que se encuentre en estado "A", para luego enviarlos a un select
app.get('/api/contactos/ids', (req, res) => {
    const sqlSelectIds = 'SELECT id FROM user WHERE state = "A"';
    conexion.query(sqlSelectIds, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los IDs' });
            return;
        }
        res.json(results);
    });
});

//Obtener los registros de la base de datos de la tabla usuario y que se encuentre en estado "R"; para luego enviarlos a la tabla UserAll
app.get('/api/contactosAll', (req, res) => {
    const sqlSelect = 'SELECT * FROM user WHERE state = "R"';
    conexion.query(sqlSelect, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los contactos' });
            return;
        }
        res.json(results);
    });
});

//Obtener los datos de la interfaz login, verificar que coincida con los datos de un registro de la base de datos de la tabla Agent, para luego ser redirigido a la sección de Gestión de Datos
app.post('/api/loginAgent', (req, res)=>{
    const { campoMAI: email, campoCON: password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const query = "SELECT * FROM agent WHERE email = ?";
    conexion.query(query, [email], async (error, rows) => {
        if (error) {
            console.error("Error al validar el correo:", error);
            return res.redirect('../Html/loginAgent.html');
        }

        if (rows.length === 0) {
            console.log("Correo no encontrado:", email);
            return res.redirect('../Html/loginAgent.html');
        }

        const agent = rows[0];
        const match = await bcrypt.compare(password, agent.password_agent);

        if (!match) {
            console.log("Contraseña incorrecta para:", email);
            return res.redirect('../Html/loginAgent.html');
        }

        req.session.login = true;
        req.session.agent = {
            id: agent.id,
            name: agent.name_agent,
            lastname: agent.lastname,
            email: agent.email,
            cellphone: agent.cellphone,
        };

        console.log("Usuario autenticado:", req.session.agent);
        res.redirect('../Html/xHDfTNexmbl7XdjCn2LaH+ZBa1yvvm+b9r+ruKlxzuQ.html');
    });
})

// Hashear y actualizar contraseñas (mayor seguridad de las contraseñas)
async function actualizarPasswords() {
    const querySelect = "SELECT id, password_agent FROM agent";
    conexion.query(querySelect, async (err, rows) => {
        if (err) {
            console.error("Error al obtener datos:", err);
            return;
        }

        for (const row of rows) {
            const hashedPassword = await bcrypt.hash(row.password_agent, 10); // Genera el hash
            const queryUpdate = "UPDATE agent SET password_agent = ? WHERE id = ?";
            conexion.query(queryUpdate, [hashedPassword, row.id], (error) => {
                if (error) {
                    console.error(`Error al actualizar id ${row.id}:`, error);
                } else {
                    console.log(`Contraseña actualizada para el id ${row.id}`);
                }
            });
        }
    });
}
actualizarPasswords();

// Obtener los registros de la base de datos de la tabla consultation, para luego enviarlos a la tabla Consultation
app.get('/api/answer', (req, res) => {
    const sqlSelect = 'SELECT * FROM consultation';
    conexion.query(sqlSelect, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los contactos' });
            return;
        }
        res.json(results); // Enviar los resultados como JSON
    });
});

//Obtener las ids de los registros de los agentes que se encuentre en estado "A", para luego enviarlos a un select
app.get('/api/contactos/idsAgent', (req, res) => {
    const sqlSelectIds = 'SELECT id,name_agent FROM agent WHERE state = "A"';
    conexion.query(sqlSelectIds, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los IDs' });
            return;
        }
        res.json(results); // Enviar solo los IDs
    });
});

//Obtener los registros de la fechas cívicas relacionadas a nuestra ODS (Educación de Calidad)
app.get('/api/dates/:current', (req, res)=>{
    var request = req.params.current;
    conexionCalendar.query(
        "select name_event, description_event, DATE_FORMAT(date_event, '%d/%m/%Y') AS date_event from calendar where date_event = '"+request+"'",
        function (err, row, fields) {
            if (err) {
                throw err;
            } else if (row[0] != null) {
                res.json(
                    row[0]
                )
            } else {
                res.json(null)
            }
        }
    )
})

app.use(express.static("public"));

app.listen(PORT, ()=>{
    console.log(`http://${IP}:${PORT}`)
})