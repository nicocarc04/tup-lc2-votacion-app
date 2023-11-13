const informesGuardados = obtenerInformes();
    if (informesGuardados) {
        const registroArray = informesGuardados.map(cadena => cadena.split('|'));
        registroArray.forEach(function (resultados) {
            const anio = resultados[0];
            const tipoRecuento = resultados[1];
            const tipoEleccion = resultados[2];
            const categoriaId = resultados[3];
            const distritoId = resultados[4];
            const seccionProvinciaId = resultados[5];
            const seccionId = resultados[6];
            const circuitoId = resultados[7];
            const mesaId = resultados[8];
            const url = `https://resultados.mininterior.gob.ar/api/resultados/getResultados?anioEleccion=${anio}&tipoRecuento=${tipoRecuento}&tipoEleccion=${tipoEleccion}&categoriaId=${categoriaId}&distritoId=${distritoId}&seccionProvincialId=${seccionProvinciaId}&seccionId=${seccionId}&circuitoId=${circuitoId}&mesaId=${mesaId}`;
            console.log(url);
            mostrarInformes(url, anio, tipoRecuento, tipoEleccion, categoriaId, distritoId, seccionProvinciaId, seccionId, circuitoId, mesaId);
        });


};

async function mostrarInformes(url, anio, tipoRecuento, tipoEleccion, categoriaId, distritoId, seccionProvinciaId, seccionId, circuitoId, mesaId) {

    try {
        const response2 = await fetch(url);
        console.log(response2);
        if (response2.ok) {
            const data = await response2.json();
            console.log(data);

            if (tipoEleccion == 1) {
                tipoEleccion = "PASO";
            } else {
                tipoEleccion = "GENERALES";
            }
                
            const GrillaElecciones = document.createElement("div");
                
            const titulo = document.createElement("p");
            titulo.classList.add("texto-elecciones-chico");
            titulo.innerHTML = `Elecciones ${anio} | ${tipoEleccion}`;
            const subtitulo = document.createElement("p");
            subtitulo.classList.add("texto-path-chico");
            subtitulo.innerHTML = `${anio} > <br> ${tipoEleccion} > <br> ${categoriaId} > <br> ${distritoId} > <br> ${seccionId}`;
                
            GrillaElecciones.appendChild(titulo);
            GrillaElecciones.appendChild(subtitulo);
        
            const CuadrosGenerales = document.createElement("div");
            CuadrosGenerales.classList.add("cajcuadros");
            CuadrosGenerales.innerHTML = `
                    <div class="cuadrosInformativos mesas-escrutadas">
                            <div>
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="841.889px"
                                    height="595.281px" viewBox="0 0 841.889 595.281" enable-background="new 0 0 841.889 595.281"
                                    xml:space="preserve" class="v-icon__component theme--light"
                                    style="font-size: 50px; height: 50px; width: 50px;">
                                    <g>
                                        <path fill="#FFFFFF"
                                            d="M671.434,227.503l-43.614-14.145c-2.358-1.179-4.716-1.179-8.252,1.179
                                                                                c-2.357,1.179-4.715,3.536-4.715,5.894l-1.179,3.536c-9.431-8.251-22.396-20.039-34.185-35.363V31.827
                                                                                c0-7.072-5.894-11.788-11.788-11.788H198.746c-7.073,0-11.788,5.895-11.788,11.788v530.448c0,7.072,4.715,11.787,11.788,11.787
                                                                                h368.955c7.073,0,11.788-4.715,11.788-11.787V348.917c1.179,2.357,3.536,3.536,4.715,4.716l44.794,14.145c1.179,0,2.357,0,3.536,0
                                                                                c4.715,0,8.251-2.357,9.43-7.072s-1.179-10.609-5.894-12.967l0,0l-34.185-11.787l30.648-102.554l34.185,10.608l0,0
                                                                                c4.715,1.179,10.608-1.179,12.966-7.072C679.685,234.576,676.149,228.682,671.434,227.503z M555.914,550.487H210.533V43.615
                                                                                h345.381v113.162c-29.47-25.934-77.799-21.218-83.693-20.039l-3.536-34.185h35.363c5.894,0,10.609-4.715,10.609-10.609
                                                                                c0-5.894-4.716-10.608-10.609-10.608H262.4c-4.715,2.357-9.43,7.072-9.43,12.966c0,5.895,4.715,10.609,10.608,10.609h35.363
                                                                                l-11.787,132.022c0,2.357,1.179,5.894,2.357,8.251c2.357,2.358,4.715,3.537,7.072,3.537h103.731
                                                                                c5.895,9.43,15.324,12.966,16.503,14.145c0,0,29.47,15.324,51.866,24.755c12.967,5.894,15.324,9.43,20.039,14.145
                                                                                c2.357,3.537,5.894,7.073,10.609,10.609c14.146,12.967,34.185,14.146,40.078,15.324l17.682,4.715L555.914,550.487z
                                                                                M456.897,203.927l-8.251-3.536c-1.179-1.179-17.682-8.251-31.827-3.536c-8.251,2.357-14.145,8.251-18.86,17.682
                                                                                c-2.357,4.715-3.536,8.251-3.536,12.967h-87.229l10.608-122.593h130.844L456.897,203.927z M585.383,319.448l-42.436-11.788
                                                                                c-1.179,0-2.357,0-3.536,0c0,0-17.682,0-28.291-9.431c-3.536-3.536-5.894-7.072-8.251-9.43
                                                                                c-5.894-7.073-11.788-12.967-27.112-20.039c-22.396-9.431-50.687-24.755-51.865-24.755c0,0-7.073-3.536-9.431-9.43
                                                                                c-1.179-3.536-1.179-7.072,1.179-10.609c2.357-4.715,4.716-5.894,7.073-7.072c5.894-2.357,14.145,1.179,17.682,2.357l62.475,25.933
                                                                                c4.715,1.18,15.324,4.716,22.396-2.357c4.715-4.715,3.536-11.787-2.357-21.218c-10.609-16.503-29.469-20.039-37.721-20.039
                                                                                c-1.179,0-2.357,0-2.357,0c-1.179,0-2.357,0-3.536,0l0,0l-4.716-36.542l-1.179-8.251c0,0,0,0,1.179,0
                                                                                c0,0,56.581-8.252,76.621,24.754c15.323,25.933,38.899,50.688,56.58,62.475L585.383,319.448z">
                                        </path>
                                        <path fill="#FFFFFF"
                                            d="M368.49,179.174c2.357,1.179,3.536,2.357,5.894,2.357l0,0l0,0c3.536,0,5.895-1.179,8.252-3.536
                                                                                l29.469-35.363c3.536-4.715,2.357-10.609-1.179-14.146c-2.357-1.179-4.715-2.357-7.072-2.357c-2.358,0-4.716,1.179-7.073,3.536
                                                                                l-12.966,15.324l-9.431,11.788l-5.894-4.716l-4.715-3.536c-4.716-3.536-10.609-2.357-14.146,2.357
                                                                                c-3.536,4.716-2.357,10.609,2.357,14.146L368.49,179.174z">
                                        </path>
                                        <path fill="#FFFFFF"
                                            d="M427.428,359.526c0-2.357,0-3.536,0-5.894c0,0,0,0,0-1.18l0,0l0,0c0-28.29-20.039-50.688-44.793-50.688
                                                                                c-24.755,0-44.794,22.397-44.794,50.688l0,0l0,0c0,2.358,0,4.716,0,7.073c-14.145,16.503-23.575,40.078-23.575,67.189l0,0l0,0
                                                                                c0,48.33,30.648,88.408,68.369,88.408c37.72,0,68.368-40.078,68.368-88.408l0,0l0,0
                                                                                C451.003,399.604,441.573,376.029,427.428,359.526z M382.635,495.085c-23.576,0-43.615-25.933-47.151-57.76h94.302
                                                                                C427.428,469.152,407.389,495.085,382.635,495.085z M406.21,344.202c-7.073-3.536-15.324-5.894-23.575-5.894
                                                                                c-8.252,0-16.503,2.357-23.576,5.894c3.537-12.967,12.967-21.218,23.576-21.218C394.422,321.805,403.853,331.235,406.21,344.202z
                                                                                M382.635,358.347c23.575,0,43.614,24.754,47.15,57.76h-94.302C339.02,383.101,359.059,358.347,382.635,358.347z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                            <div>
                                <p>Mesas computadas</p>
                                <p>${data.estadoRecuento.mesasTotalizadas}</p>
                            </div>
                        </div>
                        <div class="cuadrosInformativos electores">
                            <div>
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="841.889px"
                                    height="595.281px" viewBox="0 0 841.889 595.281" enable-background="new 0 0 841.889 595.281"
                                    xml:space="preserve" class="v-icon__component theme--light"
                                    style="font-size: 50px; height: 50px; width: 50px;">
                                    <title>comunidad</title>
                                    <path fill="#FFFFFF"
                                        d="M462.824,342.115h-0.59c-3.125-1.252-6.67-0.854-9.438,1.062c-10.771,7.341-23.424,11.436-36.453,11.797
                                                                                c-13.2-0.436-26.022-4.519-37.043-11.797c-2.89-1.642-6.43-1.642-9.319,0c-54.148,26.779-76.682,98.859-71.845,112.897
                                                                                c0.632,1.725,1.735,3.237,3.186,4.365c34.136,22.816,73.983,35.608,115.021,36.925c41.28-0.521,81.446-13.472,115.257-37.161
                                                                                c1.454-1.173,2.557-2.724,3.186-4.482C539.387,440.739,516.973,368.659,462.824,342.115z M458.813,359.693
                                                                                c5.067,2.88,9.848,6.237,14.275,10.027l-21.707,27.016l-21.353-26.426c10.135-1.979,19.866-5.647,28.784-10.854V359.693z
                                                                                M434.039,395.084l-17.342,20.999c0,0,0,0.59,0,0.826c0,0.235,0,0,0-0.826l-17.224-20.999l17.578-21.471L434.039,395.084z
                                                                                M373.992,359.693c8.952,5.199,18.728,8.83,28.902,10.735l-21.588,26.308l-22.061-27.252c4.616-3.762,9.55-7.117,14.746-10.027
                                                                                V359.693z M315.007,447.464c5.307-26.169,17.715-50.372,35.863-69.957l25.6,32.088c1.272,1.329,3,2.13,4.837,2.241
                                                                                c1.824-0.022,3.548-0.841,4.719-2.241l4.837-5.898l12.977,15.69l-31.853,52.497c-20.349-4.863-39.705-13.204-57.216-24.656
                                                                                L315.007,447.464z M416.579,478.725c-10.703-0.196-21.366-1.381-31.852-3.539l31.852-52.143l32.088,52.496
                                                                                c-10.662,1.965-21.481,2.952-32.323,2.95L416.579,478.725z M461.29,472.709l-32.441-52.851l12.977-15.69l4.955,5.898
                                                                                c1.138,1.441,2.883,2.27,4.719,2.242l0,0c1.824-0.023,3.548-0.842,4.719-2.242l25.718-32.56
                                                                                c18.07,19.442,30.544,43.411,36.099,69.367c-17.312,11.868-36.609,20.539-56.979,25.6L461.29,472.709z">
                                    </path>
                                    <path fill="#FFFFFF"
                                        d="M416.462,340.935c45.3,0,81.753-54.856,81.753-100.157c1.717-45.184-33.521-83.204-78.705-84.92
                                                                                s-83.204,33.521-84.92,78.706c-0.078,2.07-0.078,4.144,0,6.214C334.59,286.079,371.043,340.935,416.462,340.935z M480.756,240.778
                                                                                c0,1.298,0,2.596,0,3.894c-18.168-6.606-25.364-40.229-27.842-56.98C470.381,199.714,480.797,219.574,480.756,240.778z
                                                                                M352.05,240.778c0.387-35.316,29.094-63.76,64.412-63.822c7.58,0.036,15.093,1.435,22.178,4.129
                                                                                c-5.771,25.088-21.943,46.535-44.475,58.985c-12.627,7.394-27.523,9.911-41.88,7.079C352.168,244.553,352.05,242.666,352.05,240.778
                                                                                z M362.549,260.244c13.056-0.269,25.851-3.71,37.278-10.028c19.154-10.271,34.437-26.506,43.531-46.244
                                                                                c4.719,20.645,14.864,47.188,35.392,53.087c-6.96,32.56-33.268,66.418-62.406,66.418s-54.03-32.089-61.816-63.94
                                                                                C357.182,259.952,359.863,260.188,362.549,260.244z"></path>
                                    <path fill="#FFFFFF"
                                        d="M542.454,249.036l0.944,3.186c0.522,1.727,0.839,3.508,0.943,5.309l0,0c-0.551,1.18-1.966,3.657-4.247,7.433
                                                                                l-1.062,1.77c-1.563,2.695-1.181,6.096,0.943,8.376c6.438,6.525,14.637,11.034,23.595,12.977c0.584,0.114,1.185,0.114,1.77,0
                                                                                c3.892,0.367,7.345-2.489,7.713-6.381c0.352-3.722-2.251-7.075-5.943-7.658c-4.577-1.021-8.934-2.859-12.859-5.427
                                                                                c1.602-2.582,2.87-5.356,3.775-8.258c0.116-1.177,0.116-2.362,0-3.539c-0.062-3.077-0.537-6.133-1.416-9.083l-0.943-3.422
                                                                                c0-1.298-0.826-2.595-1.18-3.893v-1.18c-3.318-7.425-5.047-15.462-5.073-23.595c0.729-30.418,25.977-54.486,56.395-53.759
                                                                                s54.486,25.977,53.759,56.395c-0.187,7.795-2.025,15.461-5.395,22.492l-2.124,7.433c-0.941,3.021-1.457,6.157-1.533,9.319
                                                                                c-0.116,1.177-0.116,2.362,0,3.539c-0.056,0.352-0.056,0.71,0,1.062c0.976,2.515,2.201,4.926,3.657,7.196
                                                                                c-2.936,1.979-6.159,3.49-9.556,4.483c-3.891,0.815-6.383,4.629-5.567,8.52c0.815,3.89,4.63,6.382,8.52,5.566
                                                                                c0.443-0.093,0.877-0.228,1.294-0.401c7.512-2.082,14.32-6.159,19.701-11.797c2.093-2.286,2.518-5.642,1.062-8.376l-1.062-1.77
                                                                                c-0.943-1.534-3.421-5.663-4.246-7.314v-0.59c0.017-1.81,0.336-3.604,0.943-5.309c0.59-2.478,1.298-4.837,1.77-6.371
                                                                                c15.945-34.834,0.633-75.999-34.201-91.944s-75.999-0.633-91.944,34.201c-8.279,18.087-8.396,38.857-0.319,57.036L542.454,249.036z">
                                    </path>
                                    <path fill="#FFFFFF"
                                        d="M642.375,297.64c-2.532-1.03-5.412-0.72-7.668,0.825c-8.872,5.963-19.276,9.24-29.965,9.438
                                                                                c-10.801-0.386-21.289-3.732-30.318-9.674c-2.138-1.544-4.956-1.771-7.313-0.59l0,0c-23.636,13.269-41.938,34.323-51.789,59.575
                                                                                c3.657,4.247,7.078,8.612,10.263,12.977c5.804-16.099,14.791-30.863,26.426-43.413l24.42,27.134
                                                                                c0.923,1.054,2.257,1.656,3.657,1.651l0,0c1.508-0.124,2.886-0.899,3.775-2.124l20.526-29.729l20.881,30.201
                                                                                c0.928,1.18,2.285,1.943,3.775,2.123l0,0c1.43-0.02,2.79-0.615,3.774-1.651l24.893-27.134c15.105,16.03,25.513,35.905,30.082,57.452
                                                                                c-24.783,16.33-53.728,25.214-83.405,25.6c-22.516-0.792-44.649-6.045-65.12-15.454c3.217,5.863,6.131,11.888,8.73,18.05
                                                                                c18.353,6.987,37.713,10.971,57.334,11.797c33.779-0.463,66.647-11.022,94.376-30.318c1.199-0.993,2.098-2.301,2.596-3.775
                                                                                C705.608,378.923,687.204,319.819,642.375,297.64z M579.615,342.705l-20.881-22.65c3.726-2.86,7.67-5.425,11.797-7.668
                                                                                c7.562,4.349,15.827,7.343,24.42,8.848L579.615,342.705z M629.989,342.705l-14.864-21.353c8.595-1.564,16.855-4.598,24.42-8.966
                                                                                c4.164,2.182,8.113,4.749,11.797,7.668L629.989,342.705z"></path>
                                    <path fill="#FFFFFF"
                                        d="M628.337,190.877c-1.385-2.284-4.359-3.014-6.644-1.628c-1.115,0.676-1.91,1.773-2.204,3.044
                                                                                c-6.253,27.959-24.774,29.492-39.639,30.79c-8.729,0.708-18.639,1.651-18.639,11.207c0,24.185,19.465,53.323,43.53,53.323
                                                                                c24.066,0,43.649-29.139,43.649-53.323C643.531,219.045,636.794,204.462,628.337,190.877z M604.743,278.057
                                                                                c-17.932,0-33.976-24.42-34.094-43.649c3.214-1.169,6.607-1.768,10.027-1.77c13.213-1.18,34.447-2.949,44.711-27.251
                                                                                c5.456,9.175,9.925,18.903,13.331,29.021C638.719,253.637,622.792,278.057,604.743,278.057z">
                                    </path>
                                    <path fill="#FFFFFF"
                                        d="M313.709,362.996c3.304-4.011,6.843-7.903,10.5-11.797c-10.078-22.699-27.316-41.47-49.076-53.44l0,0
                                                                                c-2.572-1.03-5.487-0.721-7.786,0.825c-8.815,5.99-19.19,9.271-29.847,9.438c-10.771-0.347-21.232-3.697-30.2-9.674
                                                                                c-2.422-1.345-5.365-1.345-7.786,0c-44.476,22.061-62.879,81.046-58.985,92.606c0.544,1.449,1.483,2.717,2.713,3.657
                                                                                c28.015,18.697,60.712,29.161,94.377,30.201c16.017-0.268,31.911-2.851,47.188-7.669c1.908-5.903,4.153-11.693,6.724-17.341
                                                                                c-14.479,5.61-29.701,9.067-45.183,10.263l25.01-51.553c1.152-2.354,0.273-5.196-2.005-6.488l-10.146-5.898l21.234-27.605
                                                                                C295.008,330.396,306.432,345.669,313.709,362.996z M153.741,384.349c5.684-25.848,19.895-49.032,40.346-65.828l21.234,27.487
                                                                                l-10.146,5.898c-2.234,1.332-3.06,4.165-1.887,6.488l24.892,51.554C201.697,407.4,176.191,398.629,153.741,384.349z
                                                                                M232.192,396.146l-18.285-37.751l10.971-6.488c1.257-0.7,2.157-1.9,2.478-3.304c0.226-1.408-0.114-2.85-0.943-4.011l-24.303-32.088
                                                                                l0,0c9.059,5.185,19.108,8.401,29.493,9.438c0.472,22.65,0.708,55.564,0.59,73.731V396.146z M247.764,344.593
                                                                                c-1.677,2.163-1.283,5.275,0.879,6.952c0.171,0.132,0.35,0.253,0.536,0.362l10.972,6.488l-17.932,38.341c0-12.505,0-35.392,0-74.204
                                                                                c10.56-1.072,20.771-4.369,29.965-9.673l0,0L247.764,344.593z">
                                    </path>
                                    <path fill="#FFFFFF"
                                        d="M180.521,255.171c5.19,10.382,23.594,41.525,56.743,41.525c33.15,0,51.554-31.144,56.744-41.525
                                                                                c7.55-3.822,12.906-10.921,14.511-19.229c4.03-10.152,3.024-21.612-2.714-30.908c-1.321-1.697-2.869-3.205-4.601-4.482
                                                                                c-9.042-35.281-44.972-56.552-80.253-47.51c-23.321,5.977-41.532,24.188-47.509,47.51c-1.962,1.255-3.68,2.854-5.073,4.719
                                                                                c-5.66,9.234-6.664,20.588-2.713,30.672C167.249,244.36,172.775,251.508,180.521,255.171z M180.521,214.235
                                                                                c1.003-1.31,2.491-2.16,4.129-2.359l0,0c0.77,0.139,1.506-0.372,1.645-1.142c0.003-0.013,0.005-0.025,0.007-0.038
                                                                                c3.3-27.756,28.475-47.581,56.23-44.281c23.217,2.76,41.521,21.064,44.28,44.281c0.178,0.805,0.959,1.325,1.77,1.18
                                                                                c1.693,0.124,3.247,0.987,4.247,2.359c1.651,2.241,3.067,7.078,0,17.342c-1.415,4.954-4.247,10.735-8.848,9.438
                                                                                c-0.716-0.241-1.494,0.122-1.77,0.825c-7.668,19.584-24.892,39.284-45.772,39.284s-38.223-19.818-45.891-39.52
                                                                                c-0.238-0.571-0.797-0.944-1.416-0.944l0,0c-4.601,1.534-7.55-4.364-8.966-9.319c-2.595-10.027-1.18-14.864,0.473-17.105H180.521z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <p>Electores</p>
                                <p>${data.estadoRecuento.cantidadElectores}</p>
                            </div>
                        </div>
                        <div class="cuadrosInformativos escrutado">
                            <div>
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="841.889px"
                                    height="595.281px" viewBox="0 0 841.889 595.281" enable-background="new 0 0 841.889 595.281"
                                    xml:space="preserve" class="v-icon__component theme--light"
                                    style="font-size: 50px; height: 50px; width: 50px;">
                                    <title>participacion</title>
                                    <path fill="#FFFFFF"
                                        d="M508.832,212.347c-2.05-2.229-4.488-4.068-7.195-5.427c-2.793-1.033-5.824-1.238-8.73-0.59
                                    c-1.705,0.26-3.37,0.735-4.955,1.416c-10.957,5.935-20.277,14.485-27.133,24.892c-4.26,6.344-10.35,11.24-17.46,14.038V116.909
                                    c1.236-5.799-2.462-11.501-8.261-12.737s-11.502,2.462-12.737,8.261c-0.315,1.476-0.315,3.001,0,4.477v70.782
                                    c0,2.802-2.271,5.073-5.073,5.073s-5.072-2.271-5.072-5.073V97.326c0.751-6.472-3.886-12.327-10.357-13.079
                                    c-0.048-0.006-0.095-0.011-0.143-0.016c-6.479,0.673-11.188,6.473-10.515,12.953c0.005,0.047,0.011,0.095,0.016,0.142v90.247
                                    c0,2.802-2.271,5.073-5.072,5.073c-2.802,0-5.073-2.271-5.073-5.073v-80.81c0.771-6.364-3.682-12.18-10.027-13.095
                                    c-6.48,0.673-11.188,6.473-10.515,12.953c0.005,0.047,0.01,0.095,0.016,0.142v90.365c0,2.802-2.271,5.073-5.073,5.073
                                    s-5.072-2.271-5.072-5.073v-61.816c0.751-6.472-3.886-12.327-10.357-13.079c-0.048-0.005-0.095-0.011-0.143-0.016
                                    c-6.48,0.674-11.188,6.473-10.515,12.953c0.005,0.047,0.01,0.095,0.016,0.142v128.234c-1.572,18.48,6.725,36.419,21.824,47.188
                                    h81.636c11.325-6.8,20.806-16.28,27.605-27.605c2.595-4.837,4.837-9.319,7.078-13.566c6.687-16.377,16.459-31.315,28.785-44.003
                                    c3.446-2.846,7.115-5.409,10.971-7.668c1.093-0.64,1.863-1.711,2.123-2.949C509.631,214.033,509.414,213.078,508.832,212.347z">
                                    </path>
                                    <path fill="#FFFFFF" d="M328.573,348.25h127.645c4.495,0,8.14,3.645,8.14,8.14l0,0v154.66l0,0H320.552l0,0V356.272
                                    C320.615,351.868,324.17,348.313,328.573,348.25z"></path>
                                    <rect x="339.073" y="317.695" fill="#FFFFFF" width="108.061" height="22.533"></rect>
                                    <path fill="#FFFFFF" d="M657.24,282.422c-1.578-1.706-3.458-3.105-5.544-4.129c-2.162-0.592-4.444-0.592-6.606,0
                                    c-1.346,0.213-2.655,0.61-3.894,1.18c-8.328,4.552-15.416,11.073-20.645,18.993c-3.306,4.799-7.938,8.529-13.331,10.736v-99.804
                                    c1.083-4.431-1.632-8.899-6.062-9.982c-4.431-1.082-8.899,1.632-9.982,6.062c-0.314,1.288-0.314,2.632,0,3.92V263.9
                                    c0.207,2.307-1.473,4.354-3.774,4.602c-2.343-0.122-4.143-2.12-4.021-4.462c0.002-0.047,0.005-0.093,0.009-0.14v-69.484
                                    c1.083-4.431-1.632-8.899-6.062-9.981c-4.431-1.083-8.899,1.631-9.982,6.062c-0.314,1.288-0.314,2.632,0,3.92v69.013
                                    c0.373,2.117-1.041,4.137-3.159,4.51c-2.117,0.372-4.136-1.042-4.509-3.159c-0.078-0.447-0.078-0.904,0-1.351v-61.816
                                    c0.939-4.463-1.918-8.843-6.381-9.781c-4.463-0.939-8.842,1.917-9.781,6.381c-0.235,1.121-0.235,2.279,0,3.4v69.721
                                    c0.737,2.02-0.303,4.255-2.322,4.992c-2.02,0.736-4.254-0.303-4.991-2.322c-0.315-0.862-0.315-1.808,0-2.67v-47.188
                                    c0.938-4.463-1.918-8.842-6.381-9.781s-8.843,1.918-9.781,6.381c-0.236,1.121-0.236,2.279,0,3.4v98.152
                                    c-1.186,13.88,4.937,27.377,16.162,35.627h62.524c8.877-5.241,16.299-12.623,21.588-21.471l5.309-10.382
                                    c5.146-12.51,12.633-23.922,22.061-33.622c2.67-2.135,5.467-4.104,8.376-5.898c0.834-0.489,1.431-1.3,1.652-2.241
                                    C657.869,283.641,657.694,282.938,657.24,282.422z"></path>
                                    <path fill="#FFFFFF" d="M519.332,386.472h97.68c3.453,0,6.252,2.799,6.252,6.252v117.971l0,0H512.608l0,0V392.724
                                    c-0.01-3.453,2.781-6.26,6.234-6.27C519.006,386.454,519.169,386.46,519.332,386.472z">
                                    </path>
                                    <rect x="527.354" y="363.114" fill="#FFFFFF" width="82.698" height="17.224"></rect>
                                    <path fill="#FFFFFF" d="M304.508,320.173c-1.309-1.415-2.869-2.575-4.602-3.421c-1.851-0.524-3.812-0.524-5.662,0l-3.186,0.943
                                    c-6.955,3.823-12.869,9.291-17.224,15.927c-2.748,4.048-6.654,7.173-11.207,8.966v-83.76c0.419-4.117-2.505-7.824-6.606-8.376
                                    c-4.149,0.493-7.14,4.218-6.725,8.376v45.536c0.135,1.95-1.337,3.641-3.287,3.774c-0.005,0.001-0.011,0.001-0.016,0.001
                                    c-1.909-0.187-3.322-1.861-3.186-3.775v-57.688c0.352-4.139-2.607-7.824-6.725-8.376c-4.116,0.552-7.075,4.237-6.724,8.376v57.688
                                    c0.343,1.792-0.831,3.523-2.623,3.866c-1.792,0.344-3.522-0.831-3.865-2.623c-0.079-0.41-0.079-0.832,0-1.243v-51.671
                                    c0.412-4.134-2.593-7.824-6.725-8.258c-4.1,0.493-7.071,4.144-6.725,8.258v57.688c0.001,1.759-1.425,3.186-3.184,3.187
                                    s-3.186-1.425-3.187-3.184c0-0.001,0-0.002,0-0.003v-39.049c0.352-4.139-2.607-7.824-6.725-8.376
                                    c-4.149,0.493-7.139,4.218-6.725,8.376v82.58c-1.079,11.861,4.222,23.405,13.921,30.318h52.144
                                    c7.469-4.531,13.645-10.91,17.931-18.521l4.483-8.612c4.286-10.447,10.533-19.979,18.403-28.077c2.212-1.854,4.58-3.511,7.078-4.954
                                    c0.715-0.38,1.199-1.085,1.298-1.888C305.219,321.508,305.073,320.68,304.508,320.173z">
                                    </path>
                                    <path fill="#FFFFFF" d="M189.368,406.999h81.518c2.867,0,5.19,2.324,5.19,5.191v98.859l0,0h-91.898l0,0V412.19
                                    C184.178,409.323,186.501,406.999,189.368,406.999z"></path>
                                    <rect x="195.975" y="387.534" fill="#FFFFFF" width="69.013" height="14.393"></rect>
                                </svg>
                            </div>
                            <div>
                                <p>Participacion sobre escrutado</p>
                                <p>${data.estadoRecuento.participacionPorcentaje}</p>
                            </div>
                        </div>
                    `
                    const CuadroAgrupacion = document.createElement("td");
                    CuadroAgrupacion.colSpan = 2
                    const CuadroAgrupacion2 = document.createElement("td")
                    data.valoresTotalizadosPositivos.forEach((partido) => {
                        const parrafosPartidos = document.createElement("p");
                        
                        parrafosPartidos.classList.add("partidos");

                        const nombrePartido = document.createElement("p");
                        nombrePartido.classList.add("partidos");
                        nombrePartido.textContent = partido.nombreAgrupacion;

                        const porcentajePartidos = document.createElement("p");
                        porcentajePartidos.classList.add("votos");
                        porcentajePartidos.textContent = `${partido.votosPorcentaje}%`;

                        const votospartidos = document.createElement("p");
                        votospartidos.classList.add("votos");
                        votospartidos.textContent = `${partido.votos} Votos`;

        

                        CuadroAgrupacion.appendChild(parrafosPartidos);
                        CuadroAgrupacion.appendChild(nombrePartido)
                        CuadroAgrupacion2.appendChild(porcentajePartidos );
                        CuadroAgrupacion2.appendChild(votospartidos);
                    }) 
            
                const trPrincipal = document.createElement("tr");
                const tbody = document.getElementById("table-tbody");
            
                const provinciaCell = document.createElement("td");
                provinciaCell.innerHTML = mapasProvincia[distritoId]; 
                trPrincipal.appendChild(provinciaCell);
            
                
                const eleccionCell = document.createElement("td");
                eleccionCell.appendChild(GrillaElecciones);
                trPrincipal.appendChild(eleccionCell);
                
            
                
                const datosGeneralesCell = document.createElement("td");
                datosGeneralesCell.appendChild(CuadrosGenerales);
                trPrincipal.appendChild(datosGeneralesCell);
                
            
                
                trPrincipal.appendChild(CuadroAgrupacion);
                trPrincipal.appendChild(CuadroAgrupacion2)
            
            
                tbody.appendChild(trPrincipal);
                tbody.classList.add("table-tbody")

        }
    } catch (error2) {
        console.error(error2);
    }          
};


  

 
