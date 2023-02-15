
fetch("./servicios.json")
  .then(resp => resp.json())
  .then(servicios => ecommerceServicios(servicios))
  .catch(error => console.log(error))



function ecommerceServicios(servicios) {


let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem("carrito")) : []


console.log("Carrito: " + carrito)


  function botonesAgregarServicio() {

    servicios.forEach(servicio => {
      let servicioDivs = document.querySelectorAll(`.${servicio.categoria}${servicio.tipo}`)

      servicioDivs.forEach(servicioDiv => {
        let boton = document.createElement("div")
        boton.innerHTML = `<button class="botonCarrito" id=ServicioN${servicio.id}> Agendar servicio </button>`
        servicioDiv.appendChild(boton)
      });

    });
  }


  botonesAgregarServicio()


  function eventosBotones() {

    servicios.forEach(servicio => {
      let botonCarrito = document.querySelector(`#ServicioN${servicio.id}`)
      botonCarrito.addEventListener("click", () => agregadoAlCarrito(servicio.id)

      )

    });
  }

  eventosBotones()




  function agregadoAlCarrito(idServicio) {
    let servicioBuscado = servicios.find(servicio => servicio.id === idServicio);
    let indiceEnCarrito = carrito.findIndex(servCarrito => servCarrito.id === servicioBuscado.id);
    if (indiceEnCarrito !== -1) {
      if (carrito[indiceEnCarrito].cantidad < 5) {
        carrito[indiceEnCarrito].cantidad++;
        toast();
      } else {
        servicioAgotadoAlert();
      }
    } else if (carrito.length < 9) {
      servicioBuscado.cantidad = 1;
      carrito.push(servicioBuscado);
      toast();
    } else {
      servicioAgotadoAlert();
    }
    
    carritoPantalla();
  }




  let numeroServicios = document.querySelector("#numeroServicios");
  let contenedorCarrito = document.querySelector("#Carrito");
  let contenedorCarritoAll = document.querySelector("#ContainerCarrito")
  let vaciarServicio = document.createElement("div")
  let cerrarVentana = document.createElement("div")

  //Vaciar Carrito
  vaciarServicio.innerHTML =
    `<button class ="Vaciar">Vaciar carrito</button>` +
    `<a class="CancelarServicio"><button class="PagarServicio" ><i class="fa-solid fa-credit-card"></i>Pagar servicio</button></a>` +
    `<a href="#" class="CerrarVentana"><i class="fa-solid fa-xmark"></i></a>`;



  contenedorCarritoAll.appendChild(vaciarServicio)
  let vaciarServicios = document.querySelector(".Vaciar")
  vaciarServicios.addEventListener("click", vaciarCarrito)
  contenedorCarritoAll.appendChild(cerrarVentana);
  let cerrar = document.querySelector(".CerrarVentana")



  //Abrir Ventana
  numeroServicios.addEventListener("click", () => contenedorCarritoAll.setAttribute("style", "display: flex"))

  //Cerrar Ventana
  cerrar.addEventListener("click", () => contenedorCarritoAll.setAttribute("style", "display: none"))

  function carritoPantalla() {

    let totalServicioCarrito = 0;
    contenedorCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach(servicio => {
      total += servicio.cantidad * servicio.precio;
      totalServicioCarrito += servicio.cantidad;

      let servicioP = document.createElement("div")
      servicioP.classList.add("resultadoCarrito")
      numeroServicios.innerHTML = `<a href="#"><i class="fa-sharp fa-solid fa-cart-shopping"></i> ${totalServicioCarrito}</a>`;

      servicioP.innerHTML =

        `<a href="#"><p class="eliminarItem"><i class="fa-solid fa-trash-can"></i></p></a>` +
        `<p class="TextoCarrito">${servicio.categoria} ${servicio.tipo}</p>` +
        `<p class="cantidadServicios">Cantidad:  ${servicio.cantidad}</p>`

      contenedorCarrito.appendChild(servicioP)
      servicioP.querySelector(".eliminarItem").addEventListener("click", () => eliminarServicio(servicio.id));

    });


    let totalCarrito = document.createElement("div");

    totalCarrito.innerHTML = `<p class="totalServ">TOTAL: $${total.toFixed(2)}</p>`;

    contenedorCarrito.appendChild(totalCarrito);
  }



  function completarPago() {
    let pagarServicio = document.querySelector(".PagarServicio")
    pagarServicio.addEventListener("click", () => {
      servicioAgendado()
    })
    vaciarCarrito();
  }

  completarPago()


  function eliminarServicio(id) {
    let index = carrito.findIndex(servicio => servicio.id === id);
    index === -1 ? null : carrito[index].cantidad > 1 ? carrito[index].cantidad-- : carrito.splice(index, 1);  
    carritoPantalla();
  }


  function vaciarCarrito() {

    carrito = [];
    carritoPantalla();
    numeroServicios.innerHTML = `<a href="#"><i class="fa-sharp fa-solid fa-cart-shopping"></i> 0</a>`;

  }


  


  let toast = function () {
    Toastify({
      text: "Servicio agregado",
      duration: 1000,
      style: {
        background: "linear-gradient(to top, #000000 20%, #a36d00 100%)",
        color: "white",
      },
      className: "toast",
      position: "center",
      gravity: "top",
      avatar: "/img/Check.png",
      offset: {
        x: 3,
        y: 60,
      },
    }).showToast();
  }

  let servicioAgotadoAlert = function () {
    Toastify({
      text: "Servicio agotado",
      duration: 1000,
      style: {
        background: "white",
        color: "black",
      },
      className: "toast1",
      position: "center",
      gravity: "top",
      avatar: "/img/Agotado.png",
      offset: {
        x: 3,
        y: 50,
      },
    }).showToast();
  }

  let servicioAgendado = async () => {
    const inputOptions = new Promise((resolve) => {

      setTimeout(() => {
        resolve({
          camilo: "Juan Camilo",
          Anderson: "Anderson",
          Andres: "Andres"
        })
      }, 1000)

    })

    const {
      value: selectedBarbero
    } = await Swal.fire({
      title: '¿Con quien deseas el servicio?',
      input: 'radio',
      inputOptions: await inputOptions,
      confirmButtonText: 'Continuar <i class="fa fa-arrow-right"></i>',
      padding: '5em',
      color: 'white',
      background: "linear-gradient(to top, #000000 20%, #a36d00 100%)",
      customClass: {
        input: "input",
        title: "tituloSweet",
        button: "botonContinuar",
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Debes seleccionar algún barbero'
        }
      }
    })

    if (selectedBarbero) {
      Swal.fire({
        html: `Seleccionaste a ${selectedBarbero}`
      })

      const hours = {};
      for (let i = 10; i <= 20; i++) {
        hours[`${i}:00`] = `${i}:00`;
        hours[`${i}:30`] = `${i}:30`;
      }
      hours['21:00'] = '21:00';
      const {
        value: selectedHour
      } = await Swal.fire({
        title: 'Selecciona una hora',
        input: 'select',
        inputOptions: {
          'Horas': hours
        },
        inputPlaceholder: 'Selecciona una hora',
        showCancelButton: true,
        confirmButtonText: 'Continuar <i class="fa fa-arrow-right"></i>',

        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              resolve()
            } else {
              resolve('Debes seleccionar una hora')
            }
          })
        }
      })

      if (selectedHour) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tu cita a sido agendada con Exito',
          text: `Te esperamos...`,
          showConfirmButton: false,
          timer: 2000
        })
      }
    }

  }

}