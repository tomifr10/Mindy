getAPI()
async function getAPI() {
    await fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(res => res.json())
        .then(data => {

            const productos = data.response;

            let farmacia = productos.filter(producto => producto.tipo == 'Medicamento');
            let contenedorFarmacia = document.getElementById("contenedor-farmacia");
            let buscador = document.querySelector(".buscar-texto");

            let texto = "";
            buscador.addEventListener("keyup", (e) => {
                texto = e.target.value;
                mostarFiltro();
            })

            function mostarFiltro() {
                let filtro = [];
                // let ultimoElem = filtroCategoria.length - 1;
                if (texto != "") {
                    filtro.push(...farmacia.filter(producto => producto.nombre.toLowerCase().includes((texto.toLowerCase().trim()))));
                } else filtro.push(...farmacia);

                // console.log(filtro)
                // console.log(texto)
                printCard(filtro, contenedorFarmacia);
            }
            mostarFiltro()
        })
}