const text = `Los Objetivos de Desarrollo Sostenible (ODS) 
                son 17 objetivos que surgen a raíz de la 
                Cumbre de las Naciones Unidas sobre el Desarrollo Sostenible, 
                celebrada del 25 al 27 de septiembre de 2015.

                Con ello igualmente buscar como resultado 
                con el cumplimiento de los 17 objetivos la diversidad y 
                paz entre todas las personas de manera mundial...

                La Asamblea General de las Naciones Unidas aprobó los objetivos en un 
                documento de cuarenta páginas titulado “transformar nuestro mundo: 
                la Agenda 2030 para el Desarrollo Sostenible”, más conocido como Agenda 2030.

                Esta agenda tiene como objetivo principal 
                en mostrar todos los planes que las naciones unidas tienen para la agenda del 2030 
                y que de cumplir podrian convertir en algo bueno y positivo para poder dar diversidad 
                y un mundo pacifico para toda la sociedad. Sin embargo igualmente para lograr dicho objetivo 
                nosotros tenemos que dar un aporte con tener que hacer acciones para poder contribuir con el desarrollo
                 y los objetivos del desarrollo sostenible.`;

const history = document.querySelector('.box-history p');

function textTyping(elemento, texto, i = 0) {
    elemento.textContent += texto[i];

    if (i === texto.length-1) return;
    setTimeout(() => {
        textTyping(history, text, i + 1)
    }, 0);
}

textTyping(history, text);