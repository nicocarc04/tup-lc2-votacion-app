// Definición de la clave para almacenar informes en el localStorage
const Keyinformes = "INFORMES";

// Función para almacenar un nuevo informe
function InformeaGuardar(anioEleccion, tipoRecuento, tipoEleccion, categoriaId, distritoId, seccionProvincialId, seccionId, circuitoId, mesaId) {

    const nuevoRegistro = `${anioEleccion}|${tipoRecuento}|${tipoEleccion}|${categoriaId}|${distritoId}|${seccionProvincialId}|${seccionId}|${circuitoId}|${mesaId}`;

    // Obtener los informes almacenados actualmente en el localStorage
    const informesGuardados = obtenerInformes();

    const mensajes = {
        exito: document.getElementById("msgexito"),
        incompleto: document.getElementById("msgnocomplet"),
        error: document.getElementById("msgerror")
    };

    // Verificar si el nuevo informe ya está almacenado
    if (informesGuardados.includes(nuevoRegistro)) {
        // Mostrar mensaje de error si el informe ya existe
        mostrarMensaje(mensajes.error);
    } else {
        // Agregar el nuevo informe a la lista
        informesGuardados.push(nuevoRegistro);

        // Actualizar el localStorage con la nueva lista de informes
        localStorage.setItem(Keyinformes, JSON.stringify(informesGuardados));

        mostrarMensaje(mensajes.exito);
    }
}

// Función para obtener informes almacenados en el localStorage
function obtenerInformes() {
    // Obtener la cadena JSON almacenada en localStorage con la clave 'INFORMES'
    const informesString = localStorage.getItem(Keyinformes);
    
    // Devolver un array vacío si no hay informes almacenados o convertir la cadena JSON a un array
    return informesString ? JSON.parse(informesString) : [];
}

// Función para mostrar un mensaje y ocultar los demás
function mostrarMensaje(elementoMensaje) {
    // Obtener todos los elementos con la clase 'mensaje'
    const mensajes = document.querySelectorAll(".mensaje");

    // Ocultar todos los mensajes
    mensajes.forEach(mensaje => mensaje.style.display = "none");

    // Mostrar el mensaje específico
    elementoMensaje.style.display = "block";
}

