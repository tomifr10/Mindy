// let data;
// // const contenedorJuguetes = document.querySelector('#contenedor-juguetes');
// // const contenedorFarmacia = document.querySelector('#contenedor-farmacia');

// async function getAPI() {
//     await fetch('https://apipetshop.herokuapp.com/api/articulos')
//         .then(response => response.json())
//         .then(json => data = json)
//         .catch(error => console.error(error));

//     let tablaCarrito = document.getElementById('lista-carrito');
//     // console.log(data);
//     // console.log(tablaCarrito)
//     function cantidadesParaCarrito(productosCarrito) {
//         let cantidad = [];
//         productosCarrito.forEach(producto => {
//             if (!cantidad[producto.nombre]) {
//                 cantidad[producto.nombre] = {
//                     cantidad: 1,
//                     nombre: producto.nombre,
//                     precio: producto.precio,
//                     id: producto._id
//                 };
//             } else {
//                 cantidad[producto.nombre].cantidad = cantidad[producto.nombre].cantidad + 1;
//             }
//         })
//         return cantidad;
//     }

//     let cantidad = cantidadesParaCarrito(data.response);
//     // console.log(cantidad);

//     // function mostrarCarrito(carritodecompras, tablaCarrito) {
//     //     tablaCarrito.innerHTML = "";
//     //     carritodecompras.forEach(producto => {
//     //         tablaCarrito.innerHTML +=
//     //             `<div class="card col-4" style="width: 18rem;">              
//     //                         <a href="detalles.html?id=${producto._id}">
//     //                             <img class="img-card"  
//     //                                 src="${producto.imagen}"> </a>           
//     //                         <div class="card-body d-flex flex-column">
//     //                             <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
//     //                             <p class="card-text contenedor-parrafo" style="margin-top: auto;">${producto.descripcion}</p>        
//     //                             <div class="text-center" style="margin-top: auto;">
//     //                                 <p class="card-text mb-1 fs-5 precio">$${producto.precio}</p>
//     //                                 <a href="#" class="btn btn-naranja mt-3" onclick="agregarProducto('${producto._id}')">Agregar al carrito</a>
//     //                             </div>
//     //                         </div>
//     //                     </div>`;
//     //     })
//     // }
    

//     let arrayCarrito = JSON.parse(localStorage.getItem('carrito'));

//     // printCard(carritodecompras, tablaCarrito);
//     printCard(arrayCarrito, tablaCarrito);

//     // console.log(cantidad, tablaCarrito);
//     // mostrarCarrito(cantidad, tablaCarrito)
//     printCard(cantidad, tablaCarrito);

//     function mostrarTotales(carritodecompras) {
//         let total = 0;
//         let html = "";
//         carritodecompras.forEach(producto => {
//             let totalPorProducto = producto.cantidad * producto.precio;
//             total += totalPorProducto;
//             html += ` <p> ${total}</p>`;
//         })

//         document.getElementById('total').innerHTML = html;
//     }

//     mostrarTotales(cantidad)
// }
// getAPI();

let tablaCarrito = document.getElementById('lista-carrito');

async function getAPI() {
    

    await fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(res => res.json())
        .then(data => {

            const productos = data.response;
            let carrito = [];


            // VEREIFICAR SI YA TIENE CONTENIDO MI LOCAL STORAGE

            
                if (contenedorFarmacia) {

                    let farmacia = productos.filter(producto => producto.tipo == 'Medicamento');

                    printCard(farmacia, contenedorFarmacia);

                    farmacia.forEach(producto => {

                        let boton = document.querySelector(`#btn${producto._id}`); // BOTON DE MI PRODUCTO

                        boton.addEventListener('click', (e) => { // CADA VEZ QUE HAGO CLICK EN AGREGAR CARRITO

                            if (localStorage.getItem('carrito')) {

                                // GUARDAR ESOS ELEMENTOS EN UNA VARIABLE Y A ESA PUSHEARLE LOS NUEVOS

                                carrito = JSON.parse(localStorage.getItem('carrito'));

                            }

                            let id = e.target.id.split('btn').join(''); // GUARDO MI ID CLICKEADO

                            let productoClickeado = productos.find(elemento => elemento._id == id); // GUARDO EL OBJETO DE MI PRODUCTO CLICKEADO
                            console.log(productoClickeado);
                            carrito = [...carrito, productoClickeado];


                            localStorage.setItem('carrito', JSON.stringify(carrito)) // CREO UNA KEY DEL ARRAY DE JUGUETES
                            console.log(carrito);


                        })
                    })

                }

                if (contenedorJuguetes) {

                    let juguetes = productos.filter(producto => producto.tipo == 'Juguete');

                    printCard(juguetes, contenedorJuguetes);

                    juguetes.forEach(producto => {

                        let boton = document.querySelector(`#btn${producto._id}`); // BOTON DE MI PRODUCTO

                        boton.addEventListener('click', (e) => { // CADA VEZ QUE HAGO CLICK EN AGREGAR CARRITO

                            if (localStorage.getItem('carrito')) {

                                // GUARDAR ESOS ELEMENTOS EN UNA VARIABLE Y A ESA PUSHEARLE LOS NUEVOS

                                carrito = JSON.parse(localStorage.getItem('carrito'));

                            }


                            let id = e.target.id.split('btn').join(''); // GUARDO MI ID CLICKEADO

                            let productoClickeado = productos.find(elemento => elemento._id == id); // GUARDO EL OBJETO DE MI PRODUCTO CLICKEADO
                            console.log(productoClickeado);

                            carrito = [...carrito, productoClickeado];

                            localStorage.setItem('carrito', JSON.stringify(carrito)) // CREO UNA KEY DEL ARRAY DE JUGUETES

                            console.log(carrito);
                        })
                    })


                }
                // --------------------------


                let arrayLocalStorage = JSON.parse(localStorage.getItem('carrito'));


                printCardCarrito(arrayLocalStorage, tablaCarrito);

                // ==============
                arrayLocalStorage.forEach(producto => {

                    let botonDelete = document.querySelector(`#delete${producto._id}`);

                    botonDelete.addEventListener('click', (e) => {

                        console.log(`eliminando ${producto.nombre}..`);

                        let contenedorPadre = e.target.parentNode.parentNode.parentNode;
                        contenedorPadre.classList.add('card-delete');

                    })

                    
                })
        })


        
}
getAPI();


function printCardCarrito(array, node) {

    node.innerHTML = '';

    array

    array.forEach(producto => {


        node.innerHTML += `
                        <div class="card col-4" style="width: 18rem;">              
                            <a href="detalles.html?id=${producto._id}">
                                <img class="img-card"  
                                    src="${producto.imagen}">
                            </a>
                
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
                                <p class="card-text contenedor-parrafo" style="margin-top: auto;">${producto.descripcion}</p>
                
                                <div class="text-center" style="margin-top: auto;">
                                    <p class="card-text mb-1 fs-5 precio">$${producto.precio}</p>
                                    <button class="btn btn-danger mt-3" id="delete${producto._id}">Eliminar</button>
                                </div>
                            </div>
                        </div>`

    })

}

function cantidadesParaCarrito(productosCarrito) {
    let cantidad = [];
    productosCarrito.forEach(producto => {
        if (!cantidad[producto.nombre]) {
            cantidad[producto.nombre] = {
                cantidad: 1,
                nombre: producto.nombre,
                precio: producto.precio,
                id: producto._id
            };
        } else {
            cantidad[producto.nombre].cantidad = cantidad[producto.nombre].cantidad + 1;
        }
    })
    return cantidad;
}

function mostrarTotales(carritodecompras) {
    let total = 0;
    let html = "";
    carritodecompras.forEach(producto => {
        let totalPorProducto = producto.cantidad * producto.precio;
        total += totalPorProducto;
        html += ` <p> ${total}</p>`;
    })

    document.getElementById('total').innerHTML = html;
}

function vaciarCarrito() {

    localStorage.clear();
    location.reload();
}

// function eliminarProducto(e) {

//     let id = e.target.id.split('delete').join('');
//     // console.log(e.target.id.split('delete').join(''));

//     arrayLocalStorage = arrayLocalStorage.filter(producto => producto._id != id);
// }



// function eliminarCarrito(id) {
//     // console.log(id);
//     // console.log(`intentando borrar ${id}`);

//     let arrayLocalStorage = JSON.parse(localStorage.getItem('carrito'));

//     arrayLocalStorage = arrayLocalStorage.filter(producto => producto._id != id)

//     printCardCarrito(arrayLocalStorage, tablaCarrito);



// }