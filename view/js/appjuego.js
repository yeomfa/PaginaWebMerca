var cantidadTarjetas = 24
var iconos = []
var selecciones = []

generarTablero()

function cargarIconos() {
    iconos = [
            '<i class="fa-brands fa-python"></i>',
            '<i class="fa-solid fa-code"></i>',
            '<i class="fa-brands fa-php"></i>',
            '<i class="fa-brands fa-java"></i>',
            '<i class="fa-brands fa-js"></i>',
            '<i class="fa-brands fa-css3"></i>',
            '<i class="fa-brands fa-html5"></i>',
            '<i class="fa-solid fa-folder-open"></i>',
            '<i class="fa-solid fa-microchip"></i>',
            '<i class="fa-solid fa-bitcoin-sign"></i>',
            '<i class="fas fa-chess"></i>',
            '<i class="fas fa-dice-d20"></i>',
        ]
  }

    function generarTablero() {
        cargarIconos()
        selecciones = []
        let tablero = document.getElementById("tablero")
        let tarjetas = []
        for (let i = 0; i < cantidadTarjetas; i++) {
            tarjetas.push(`
            <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                <div class="tarjeta" id="tarjeta${i}">
                    <div class="cara trasera" id="trasera${i}">
                        ${iconos[0]}
                    </div>
                    <div class="cara superior">
                        <i class="far fa-question-circle"></i>
                    </div>
                </div>
            </div>
            `)
            if (i % 2 == 1) {
                iconos.splice(0, 1)
            }
        }
        tarjetas.sort(() => Math.random() - 0.5)
        tablero.innerHTML = tarjetas.join(" ")
    }

    function seleccionarTarjeta(i) {
        let tarjeta = document.getElementById("tarjeta" + i)
        if (tarjeta.style.transform != "rotateY(180deg)") {
            tarjeta.style.transform = "rotateY(180deg)"
            selecciones.push(i)
        }
        if (selecciones.length == 2) {
            deseleccionar(selecciones)
            selecciones = []
        }
    }

    function deseleccionar(selecciones) {
        setTimeout(() => {
            let trasera1 = document.getElementById("trasera" + selecciones[0])
            let trasera2 = document.getElementById("trasera" + selecciones[1])
            if (trasera1.innerHTML != trasera2.innerHTML) {
                let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
                let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
                tarjeta1.style.transform = "rotateY(0deg)"
                tarjeta2.style.transform = "rotateY(0deg)"
            } else {
                trasera1.style.background = "plum"
                trasera2.style.background = "plum"
            }
            if (verificarFin()) {
                swal.fire({
                    title: `El juego ha finalizado`,
                    text: `Felicitaciones`,
                    icon: `success`
                })
            }
        }, 1000);
    }

    function verificarFin() {
        for (let i = 0; i < cantidadTarjetas; i++) {
            let trasera = document.getElementById("trasera" + i)
            if (trasera.style.background != "plum") {
                return false
            }
        }
        return true
    }
