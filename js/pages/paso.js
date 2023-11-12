const tipoEleccion = 1;
const tipoRecuento = 1; // Utilizar solo resultados de recuento definitivo
const PeriodosSelect = document.getElementById('anio');
const cargosSeleccionados = document.getElementById('cargo');
const distritos = document.getElementById('distrito');
const seccionSeleccionados = document.getElementById('seccion');
const mapaElemento = document.getElementById('mapaElement');
const nombreElemento = document.getElementById('nombreMapa');
var selectedDistrito
var DatosMenu;

const colores= {
    36: {colorPleno: "var(--grafica-amarillo)",colorLiviano:"var(--grafica-amarillo-claro)"},
    87: {colorPleno: "var(--grafica-celeste)",colorLiviano:"var(--grafica-celeste-claro)"},
    13:{colorPleno: "var(--grafica-bordo)",colorLiviano:"var(--grafica-bordo-claro)"},
    135:{colorPleno: "var(--grafica-lila)",colorLiviano:"var(--grafica-lila-claro)"},
    57:{colorPleno: "var(--grafica-verde)",colorLiviano:"var(--grafica-verde-claro)"},
    132:{colorPleno: "var(--grafica-amarillo)",colorLiviano:"var(--grafica-amarillo-claro)"},
    134:{colorPleno: "var(--grafica-celeste)",colorLiviano:"var(--grafica-celeste-claro)"},
    136:{colorPleno: "var(--grafica-bordo)",colorLiviano:"var(--grafica-bordo-claro)"},
    135:{colorPleno: "var(--grafica-lila)",colorLiviano:"var(--grafica-lila-claro)"},
    133:{colorPleno: "var(--grafica-verde)",colorLiviano:"var(--grafica-verde-claro)"},
    defaultColor: { colorPleno: 'var(--grafica-gris)', colorLiviano: 'var(--grafica-gris-claro)' }
}





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






function cargoSelect() {

    if (PeriodosSelect.value != "-") {

        fetch("https://resultados.mininterior.gob.ar/api/menu?año=" + PeriodosSelect.value)
            .then(response => response.json())
            .then(datosFiltros => {
                DatosMenu = datosFiltros;
                //console.log(datosFiltros)
                const eleccionesPaso = DatosMenu.filter(eleccion => eleccion.IdEleccion === tipoEleccion);
                eleccionesPaso.forEach((eleccion) => {
                    eleccion.Cargos.forEach((cargo) => {
                        const optionElement = document.createElement("option")
                        optionElement.value = cargo.IdCargo // Reemplazar con la propiedad correcta.
                        optionElement.text = cargo.Cargo // Reemplazar con la propiedad correcta.
                        cargosSeleccionados.appendChild(optionElement)

                    })

                })
            })
            .catch(error => {
                console.error('Error al cargar los datos desde la API:', error)
            })
    } else {
        alert("Seleccione la opcion anterior..")
    }
}

 function distritoSelect() {
    if (cargosSeleccionados.value != "-") {
        const eleccionesPaso = DatosMenu.filter(eleccion => eleccion.IdEleccion === tipoEleccion);
        eleccionesPaso.forEach((eleccion) => {
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

    } else {
        alert("Seleccione la opcion anterior..")
    }
}


   






 function seccionSelect() {

    if (distritos.value != "-") {
        const eleccionesPaso = DatosMenu.filter(eleccion => eleccion.IdEleccion === tipoEleccion);
        eleccionesPaso.forEach((eleccion) => {
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
        console.log(eleccionesPaso)
    } else {
        alert("Seleccione la opcion anterior..")
    }
}

const mensajeAmarillo = document.getElementById("card-menu");
const mensaje = document.createElement("div");
mensaje.innerText = "Debe seleccionar los valores a filtrar y hacer clic en el botón FILTRAR";
mensaje.style.backgroundColor = "var(--mensaje-usuario-amarillo)";
mensajeAmarillo.appendChild(mensaje);

var contenido = document.getElementById('sec-contenido');
var cuadros = document.getElementById('sec-cuadros');
var mapas = document.getElementById('cuadros mapabox');
async function filtrarYConsultar(){

    const mesas = document.getElementById('card-mesas');
    const electores = document.getElementById('electores');
    const participacion = document.getElementById('participacion-escrutados');
    const titulo = document.getElementById('card-titulo');

    mensaje.style.display = "none";
    mensajeAmarillo.style.display = "none";

    
    const seleccionCargo = cargosSeleccionados.options[cargosSeleccionados.selectedIndex].text;
    const seleccionDistrito =  distritos.options[distritos.selectedIndex].text;
    const seleccionSeccion = seccionSeleccionados.options[seccionSeleccionados.selectedIndex].text;


    var htmlCard
    if (PeriodosSelect.value == '-' || cargosSeleccionados.value == "-" || distritos.value == "-" || seccionSeleccionados.value == '-') {
        alert("Falta seleccionar uno o más campos. Por favor, complete todos los campos");
        
        return;
    }

    // Parámetros por defecto
    //const categoriaId = 2;
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
            mensajeAmarillo.innerHTML = ""; // Limpia cualquier mensaje anterior
            
            contenido.style.display='flex'; 
            cuadros.style.display='flex';
            //mapas.style.display='flex'
            
            htmlCard = ''
                htmlCard = `
                    <h2>Elecciones ${PeriodosSelect.value} | Paso </h2>
                    <p class="subtitle"> ${PeriodosSelect.value} > Paso > Provisorio > ${seleccionCargo} > ${seleccionDistrito} > ${seleccionSeccion}</p>
                    `;
                titulo.innerHTML = htmlCard;

            //cambiar 
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
                
               mapaElemento.innerHTML= mapasProvincia[distritos.value];
               nombreElemento.innerHTML = nombresProvincia[distritos.value]

            const valoresTotalizadosPositivos = data.valoresTotalizadosPositivos
            console.log(valoresTotalizadosPositivos)
            const contenedorGrafico = document.getElementById("graficoAgrupacionPolitica");
            contenedorGrafico.innerHTML = "";
            const agrupacionPolitica = document.createElement("div");
            agrupacionPolitica.classList.add("agrupacionPolitica");


            valoresTotalizadosPositivos.forEach((valor) => {
                const idAgrupacion = valor.idAgrupacion;
                let colorPleno, colorLiviano;
                
                
                if (colores[idAgrupacion]) {
                    colorPleno = colores[idAgrupacion].colorPleno;
                    colorLiviano = colores[idAgrupacion].colorLiviano;
                } else {
                    colorPleno = colores.defaultColor.colorPleno;
                    colorLiviano = colores.defaultColor.colorLiviano;
                }
              
                const nombreAgrupacion = valor.nombreAgrupacion;
                const votosPorcentaje = valor.votosPorcentaje;
              
                const nombreAgrupacionElement = document.createElement("p");
                nombreAgrupacionElement.classList.add('subTitulo', 'tituloAgrup');
                nombreAgrupacionElement.textContent = nombreAgrupacion;

                const partidos = document.createElement("div");
                partidos.classList.add("partidos");
                valor.listas.forEach((lista) => {
                    const listaElement = document.createElement("div");
                    listaElement.classList.add("lista");
                    const nombreListaElement = document.createElement("p");
                    nombreListaElement.classList.add("subTitulo");
                    nombreListaElement.textContent = valor.nombre;
                    const votosPorcentajeListaElement = document.createElement("div");
                    votosPorcentajeListaElement.classList.add("subTitulo");
                    const porcentajeListaElement = document.createElement("p");
                    porcentajeListaElement.classList.add("peso");
                    porcentajeListaElement.textContent = `${(lista.votos * 100 / lista.votos)}%`;
                    const votosListaElement = document.createElement("p");
                    votosListaElement.classList.add("peso");
                    votosListaElement.textContent = `${lista.votos} VOTOS`;
                    votosPorcentajeListaElement.appendChild(porcentajeListaElement);
                    votosPorcentajeListaElement.appendChild(votosListaElement);
                    listaElement.appendChild(nombreListaElement);
                    listaElement.appendChild(votosPorcentajeListaElement);
                    partidos.appendChild(listaElement);
                })
                const progress = document.createElement("div");
                progress.classList.add("progress");
                progress.style.background = colorLiviano;
                const progressBar = document.createElement("div");
                progressBar.classList.add("progress-bar");
                progressBar.style.width = `${votosPorcentaje}%`;
                progressBar.style.background = colorPleno;
                const progressBarText = document.createElement("span");
                progressBarText.classList.add("progress-bar-text");
                progressBarText.textContent = `${votosPorcentaje}%`;
                agrupacionPolitica.appendChild(nombreAgrupacionElement);
                agrupacionPolitica.appendChild(partidos);
                progressBar.appendChild(progressBarText);
                progress.appendChild(progressBar);
                agrupacionPolitica.appendChild(progress);
                contenedorGrafico.appendChild(agrupacionPolitica);
            })
            const contenedorBarras = document.getElementById("barravotos");
            contenedorBarras.innerHTML = "";
            const max = 7;
    
            valoresTotalizadosPositivos.slice(0, max).forEach((valor) => {
              // ... (código existente para obtener datos de la agrupación política)
              if (colores[valor.idAgrupacion]){
                colorPleno = colores[valor.idAgrupacion].colorPleno
              } else {
                colorPleno = colores.defaultColor.colorPleno;
             }
              const nombreAgrupacion = valor.nombreAgrupacion;
              const votosPorcentaje = valor.votosPorcentaje;
              
              const barra = document.createElement("div");
              const votosPorcentajeNombre = parseFloat(votosPorcentaje);
              const tituloBarra = nombreAgrupacion + " " + votosPorcentajeNombre + "%";
              barra.title = tituloBarra;
    
              barra.classList.add("bar");
              barra.style.setProperty("--bar-value", `${ votosPorcentaje }%`);
              barra.style.setProperty("--bar-color", colorPleno);
              barra.dataset.name = nombreAgrupacion;
              
              contenedorBarras.appendChild(barra);
            });
        }
    } catch (error) {
        //  // Manejar errores de red u otros errores imprevistos
        console.error(`Ocurrió un error inesperado: ${error.message}`);
    }


}
const agregarInforme = document.getElementById("agrInforme");
agregarInforme.addEventListener("click", async () => {
    const anioEleccion = PeriodosSelect.value;
    const categoriaId = cargosSeleccionados.value;
    const distritoId = distritos.value;
    const seccionProvincialId = '';
    const seccionId = seccionSeleccionados.value;
    const circuitoId = "";
    const mesaId = "";
    almacenarInforme(anioEleccion, tipoRecuento, tipoEleccion, categoriaId, distritoId, seccionProvincialId, seccionId, circuitoId, mesaId);
  
})


