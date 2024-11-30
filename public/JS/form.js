const formulario = document.getElementById('form');
const inputs = document.querySelectorAll('#form input, #form textarea');
const expresiones = {
	usuario: /^[a-zA-ZÀ-ÿ\s]{3,54}$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{10,54}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	celular: /^\d{9}$/,
    consulta: /^\d{0}$/
}

const campos = {
    nombres: false,
    apellidos: false,
    celular: false,
    correo: false,
    consulta: false
}
const warnings = document.getElementById('warnings');

let textWarnings = "";

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombres":
            validarCampo(expresiones.usuario, e.target, "nombres")
        break;
        case "apellidos":
            validarCampo(expresiones.apellido, e.target, "apellidos")
        break;
        case "celular":
            validarCampo(expresiones.celular, e.target, "celular")
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo")
        break;
        case "consulta":
            if (!expresiones.consulta.test(e.target.value)) {
                document.getElementById('input__error__consulta').classList.remove('input__error__show')
                campos['consulta'] = true;
            } else {
                document.getElementById('input__error__consulta').classList.add('input__error__show')
                campos['consulta'] = false;
            }
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`input__error__${campo}`).classList.remove('input__error__show')
        campos[campo] = true;
    } else {
        document.getElementById(`input__error__${campo}`).classList.add('input__error__show')
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (campos.nombres && campos.apellidos && campos.celular && campos.correo && campos.consulta) {
        formulario.submit();
        formulario.reset();
        document.getElementById('confirmacion').classList.add('confirmacion__show');
        setTimeout(() => {
            document.getElementById("confirmacion").classList.remove('confirmacion__show')
        }, 1000)
    }
})