const tipoEleccion = 2;
const tipoRecuento = 1; // Utilizar solo resultados de recuento definitivo
const PeriodosSelect = document.getElementById('anio');
const cargosSeleccionados = document.getElementById('cargo');
const distritos = document.getElementById('distrito');
const seccionSeleccionados = document.getElementById('seccion');
const mapaElemento = document.getElementById('mapaElement');
const nombreElemento = document.getElementById('nombreMapa');
var DatosMenu;

//Constante para establecer los colores por id de agrupacion
const colores= {
    503: {colorPleno: "var(--grafica-amarillo)",colorLiviano:"var(--grafica-amarillo-claro)"},
    505: {colorPleno: "var(--grafica-celeste)",colorLiviano:"var(--grafica-celeste-claro)"},
    504:{colorPleno: "var(--grafica-bordo)",colorLiviano:"var(--grafica-bordo-claro)"},
    501:{colorPleno: "var(--grafica-lila)",colorLiviano:"var(--grafica-lila-claro)"},
    502:{colorPleno: "var(--grafica-verde)",colorLiviano:"var(--grafica-verde-claro)"},
    132:{colorPleno: "var(--grafica-amarillo)",colorLiviano:"var(--grafica-amarillo-claro)"},
    134:{colorPleno: "var(--grafica-celeste)",colorLiviano:"var(--grafica-celeste-claro)"},
    136:{colorPleno: "var(--grafica-bordo)",colorLiviano:"var(--grafica-bordo-claro)"},
    135:{colorPleno: "var(--grafica-lila)",colorLiviano:"var(--grafica-lila-claro)"},
    133:{colorPleno: "var(--grafica-verde)",colorLiviano:"var(--grafica-verde-claro)"},
    defaultColor: { colorPleno: 'var(--grafica-gris)', colorLiviano: 'var(--grafica-gris-claro)' }
}




//carga de Periodos
fetch("https://resultados.mininterior.gob.ar/api/menu/periodos")
    .then(res => res.json())
    .then(data => {
        // Agregar esta línea para depurar los datos recibidos.
        data.forEach(option => {
            const optionElement = document.createElement("option")
            optionElement.value = option
            optionElement.text = option
            PeriodosSelect.appendChild(optionElement)

        })
    })
    .catch(error => {
        console.error('Error al cargar los datos desde la API:', error);
    });




//funcion para mostrar los cargos

function cargoSelect() {

    if (PeriodosSelect.value != "-") {

        fetch("https://resultados.mininterior.gob.ar/api/menu?año=" + PeriodosSelect.value)
            .then(response => response.json())
            .then(datosFiltros => {
                DatosMenu = datosFiltros;
                //console.log(datosFiltros)
                const eleccionesGenerales = DatosMenu.filter(eleccion => eleccion.IdEleccion === tipoEleccion);
                eleccionesGenerales.forEach((eleccion) => {
                    eleccion.Cargos.forEach((cargo) => {
                        const optionElement = document.createElement("option")
                        optionElement.value = cargo.IdCargo // Reemplazar con la propiedad correcta.
                        optionElement.text = cargo.Cargo // Reemplazar con la propiedad correcta.
                        cargosSeleccionados.appendChild(optionElement)

                    })

                })
                //console.log(eleccionesGenerales)
            })
            .catch(error => {
                console.error('Error al cargar los datos desde la API:', error)
            })
    } else {
        alert("Seleccione la opcion anterior..")
    }
}
//funcion para distritos 
 function distritoSelect() {
    if (cargosSeleccionados.value != "-") {
        const eleccionesGenerales = DatosMenu.filter(eleccion => eleccion.IdEleccion === tipoEleccion);
        eleccionesGenerales.forEach((eleccion) => {
            eleccion.Cargos.forEach((cargo) => {
                if (cargosSeleccionados.value == cargo.IdCargo) {
                    cargo.Distritos.forEach((distrito) => {
                        const optionElement2 = document.createElement("option")
                        optionElement2.value = distrito.IdDistrito
                        optionElement2.text = distrito.Distrito
                        distritos.appendChild(optionElement2)
                    })
                }
            })

        })
        //console.log(eleccionesGenerales)

    } else {
        alert("Seleccione la opcion anterior..")
    }
}


   
//funcion para seccion 
 function seccionSelect() {

    if (distritos.value != "-") {
        const eleccionesGenerales = DatosMenu.filter(eleccion => eleccion.IdEleccion === tipoEleccion);
        eleccionesGenerales.forEach((eleccion) => {
            eleccion.Cargos.forEach((cargo) => {
                if (cargosSeleccionados.value == cargo.IdCargo) {
                    cargo.Distritos.forEach((distrito) => {
                        if (distrito.IdDistrito == distritos.value) {
                            hdSeccionProvincial.value = distrito.IdSecccionProvincial;
                            distrito.SeccionesProvinciales.forEach(seccionProv => {
                                seccionProv.Secciones.forEach(seccion => {
                                    const option = document.createElement("option");
                                    option.value = seccion.IdSeccion;
                                    option.text = seccion.Seccion;
                                    seccionSeleccionados.appendChild(option);
                                })
                            })
                        }
                    })
                }
            })

        })
        console.log(eleccionesGenerales)
    } else {
        alert("Seleccione la opcion anterior..")
    }
}
//MENSAJE QUE APARECE ANTES DE FILTRAR 
const mensajeAmarillo = document.getElementById("card-menu");
const mensaje = document.createElement("div");
mensaje.innerText = "Debe seleccionar los valores a filtrar y hacer clic en el botón FILTRAR";
mensaje.style.backgroundColor = "var(--mensaje-usuario-amarillo)";
mensajeAmarillo.appendChild(mensaje);
//VARTIABLES PARA MOSTRAR EL MAPA Y CUADROS
var contenido = document.getElementById('sec-contenido');
var cuadros = document.getElementById('sec-cuadros');
var mapas = document.getElementById('cuadros mapabox');
//FUNCION ASINCRONA AL FILTRAR CONSULTA DESDE LA API Y MUESTRA EN PANTALLA LOS DATOS
async function filtrarYConsultar(){

    const mesas = document.getElementById('card-mesas');
    const electores = document.getElementById('electores');
    const participacion = document.getElementById('participacion-escrutados');
    const titulo = document.getElementById('card-titulo');

    // Obtener el texto de la opción seleccionada en el elemento <select> de cargos
    const seleccionCargo = cargosSeleccionados.options[cargosSeleccionados.selectedIndex].text;

    // Obtener el texto de la opción seleccionada en el elemento <select> de distritos
    const seleccionDistrito =  distritos.options[distritos.selectedIndex].text;

    // Obtener el texto de la opción seleccionada en el elemento <select> de secciones
    const seleccionSeccion = seccionSeleccionados.options[seccionSeleccionados.selectedIndex].text;

    //VALIDACION DE QUE HAYA SELECCIONADO TODOS LOS CAMPOS
    var htmlCard
    if (PeriodosSelect.value == '-' || cargosSeleccionados.value == "-" || distritos.value == "-" || seccionSeleccionados.value == '-') {
        alert("Falta seleccionar uno o más campos. Por favor, complete todos los campos");
        return;
    }else{
        //AL FILTRAR EL MENSAJE AMARILLO DESAPARECE
        mensaje.style.display = "none";
        mensajeAmarillo.style.display = "none";
    }

    // Parámetros por defecto
    const circuitoId = "";
    const mesaId = "";
    const seccionProvin = ''
    
    // Construir la URL para la solicitud
    const url = `https://resultados.mininterior.gob.ar/api/resultados/getResultados?anioEleccion=${PeriodosSelect.value}&tipoRecuento=${tipoRecuento}&tipoEleccion=${tipoEleccion}&categoriaId=${cargosSeleccionados.value}&distritoId=${distritos.value}&seccionProvincialId=${seccionProvin}&seccionId=${seccionSeleccionados.value}&circuitoId=${circuitoId}&mesaId=${mesaId}`;
    console.log(url)
    try {
        // Realizar la solicitud utilizando fetch
        const response = await fetch(url);

        if (response.ok) {
            // Si la respuesta es correcta, obtener y mostrar el JSON
            const data = await response.json();
            console.log(data);
            const mensajeAmarillo = document.getElementById("card-menu");
            mensajeAmarillo.innerHTML = ""; 
            //mostrar el cuadro con el contenido
            contenido.style.display='flex'; 
            cuadros.style.display='flex';
            //Establecer los contenidos de forma que contengan los datos cargados del campo
            htmlCard = ''
                htmlCard = `
                    <h2>Elecciones ${PeriodosSelect.value} | Generales </h2>
                    <p class="subtitle"> ${PeriodosSelect.value} > Generales > Provisorio > ${seleccionCargo} > ${seleccionDistrito} > ${seleccionSeccion}</p>
                    `;
                titulo.innerHTML = htmlCard;

            
            mesas.innerHTML = `
                <p>Mesas escrutadas</P>
                <p>${data.estadoRecuento.mesasTotalizadas}</p>
                `;
            electores.innerHTML = `
                <p>Electores</P>
                <p>${data.estadoRecuento.cantidadElectores}</p>
                `;
            participacion.innerHTML = `
                <p>Participacion sobre escrutado</P>
                <p>${data.estadoRecuento.participacionPorcentaje}%</p>
                `;
               
            //Mostrar Mapa 
               mapaElemento.innerHTML= mapasProvincia[distritos.value];
               nombreElemento.innerHTML = nombresProvincia[distritos.value]

            const valoresTotalizadosPositivos = data.valoresTotalizadosPositivos
            console.log(valoresTotalizadosPositivos)
            const Grafico = document.getElementById("contAgrupacion-Politica");
            Grafico.innerHTML = "";
            const agrupacionPolitica = document.createElement("div");
            agrupacionPolitica.classList.add("agrupacionPolitica");

            // busca en el array de valoresTotalizadosPositivos el idAgrupacion  
            valoresTotalizadosPositivos.forEach((valor) => {
                // en caso de que el id de agrupacion coincida con la paleta de colores se establece un color pleno y uno liviano para la barra de porcentajes
                if (colores[valor.idAgrupacion]) {
                    colorPleno = colores[valor.idAgrupacion].colorPleno;
                    colorLiviano = colores[valor.idAgrupacion].colorLiviano;
                } else {
                    colorPleno = colores.defaultColor.colorPleno;
                    colorLiviano = colores.defaultColor.colorLiviano;
                }
                //Se carga en el html parte por parte, siguiendo la dinamica del DOM de la primera parte
                const nombreAgrupacion = valor.nombreAgrupacion;
                const PorcentajedeVotos = valor.votosPorcentaje;
                
                const nombreAgrupacionSubtitulo = document.createElement("p");
                nombreAgrupacionSubtitulo.classList.add('subTitulo','tituloAgrup');
                nombreAgrupacionSubtitulo.textContent = nombreAgrupacion;

                const partidos = document.createElement("div");
                partidos.classList.add("partidos");
                
                const lista = document.createElement("div");
                lista.classList.add("lista");
                const nombreLista = document.createElement("p");
                nombreLista.classList.add("subTitulo");
                nombreLista.textContent = valor.nombre;
                const PorcentajedeVotosLista = document.createElement("div");
                PorcentajedeVotosLista.classList.add("subTitulo");
                const porcentajeLista = document.createElement("p");
                porcentajeLista.classList.add("peso");
                porcentajeLista.textContent = `${(valor.votos * 100 / valor.votos)}%`;
                const votosLista = document.createElement("p");                
                votosLista.classList.add("peso");
                votosLista.textContent = `${valor.votos} VOTOS`;
                PorcentajedeVotosLista.appendChild(porcentajeLista);
                PorcentajedeVotosLista.appendChild(votosLista);
                lista.appendChild(nombreLista);                   
                lista.appendChild(PorcentajedeVotosLista);
                partidos.appendChild(lista);
                const progress = document.createElement("div");
                progress.classList.add("progress");
                progress.style.background = colorLiviano;
                const progressBar = document.createElement("div");
                progressBar.classList.add("progress-bar");
                progressBar.style.width = `${PorcentajedeVotos}%`;
                progressBar.style.background = colorPleno;
                const progressBarText = document.createElement("span");
                progressBarText.classList.add("progress-bar-text");
                progressBarText.textContent = `${PorcentajedeVotos}%`;
                agrupacionPolitica.appendChild(nombreAgrupacionSubtitulo);
                agrupacionPolitica.appendChild(partidos);
                progressBar.appendChild(progressBarText);
                progress.appendChild(progressBar);
                agrupacionPolitica.appendChild(progress);
                Grafico.appendChild(agrupacionPolitica);
            })
            //Barra de votos
            const contenedorBarras = document.getElementById("barravotos");
            contenedorBarras.innerHTML = "";
            //Recorremos el array valoresTotalizadosPositivos con maximo 7 y validamos si el id de agrupacion coincide con los colores
            valoresTotalizadosPositivos.slice(0,7).forEach((valor) => {
              if (colores[valor.idAgrupacion]){
                colorPleno = colores[valor.idAgrupacion].colorPleno
              } else {
                colorPleno = colores.defaultColor.colorPleno;
             }
                const nombreAgrupacion = valor.nombreAgrupacion;
                const PorcentajedeVotos = valor.votosPorcentaje;
              //se crea un div para establecer las barras con sus datos correspondientes
              const barra = document.createElement("div");
              const PorcentajedeVotosNombre = parseFloat(PorcentajedeVotos);
              const titulo = nombreAgrupacion + " " + PorcentajedeVotosNombre + "%";
              barra.title = titulo;
             // Utiliza setProperty para cambiar el color de fondo 
              barra.classList.add("bar");
              barra.style.setProperty("--bar-value", `${ PorcentajedeVotos }%`);
              barra.style.setProperty("--bar-color", colorPleno);
              barra.dataset.name = nombreAgrupacion;
              
              contenedorBarras.appendChild(barra);
            });
        }
    } catch (error) {
         // Manejar errores de red u otros errores imprevistos
        console.error(`Ocurrió un error inesperado: ${error.message}`);
    }


}
// agregamos un addEvent para que cuando haga click en agregar informe se almacenen los datos
const agregarInforme = document.getElementById("agrInforme");
agregarInforme.addEventListener("click", async () => {
    const anioEleccion = PeriodosSelect.value;
    const categoriaId = cargosSeleccionados.value;
    const distritoId = distritos.value;
    const seccionProvincialId = '';
    const seccionId = seccionSeleccionados.value;
    const circuitoId = "";
    const mesaId = "";
    InformeaGuardar(anioEleccion, tipoRecuento, tipoEleccion, categoriaId, distritoId, seccionProvincialId, seccionId, circuitoId, mesaId);
  
  })






