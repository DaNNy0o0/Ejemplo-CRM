import { eliminarCliente, obtenerClientes } from "./API.js";

// Creamos un IIFE para proteger las funciones
(function () {
  // Seleccionamos el listado donde se inyectarán los clientes
  const listado = document.querySelector("#listado-clientes");

  // Cuando el documento cargue, usamos la funcion para mostrar los clientes (Una vez que ya hayan llegado desde la API)
  document.addEventListener("DOMContentLoaded", mostrarClientes);

  listado.addEventListener('click', confirmarEliminar)

  // Creamos la funcion asincrona que muestra los clientes
  async function mostrarClientes() {
    // Una vez que hemos obtenido los clientes desde la API, gracias a la funcion importada de obtenerClientes(), se los asignamos la variable de clientes
    const clientes = await obtenerClientes();

    // Recorremos el array de clientes
    clientes.forEach((cliente) => {
      // Extraemos de cada cliente
      const { nombre, email, telefono, empresa, id } = cliente;

      // Creamos un table row para cada cliente
      const row = document.createElement("TR");

      // A cada row le inyectamos el html necesario para mostrar cada dato
      row.innerHTML += `
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                    <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${telefono}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${empresa}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
            `;

      // Inyectamos cada row al listado general de los lcientes
      listado.appendChild(row);
    });
  }

  // *******************************************

  // Funcion que eliminar registro de la DB por su ID
  function confirmarEliminar(e) {
    // Si el elemento del DOM al que se hace click contiene la clase
    // significa que hacemos click al boton de eliminar
    if (e.target.classList.contains('eliminar')) {
        // Obtenemos el id (dataset) del cliente al que hacemos click
        const clienteID = parseInt(e.target.dataset.cliente)

        // Preguntamos confirmacion al usuario
        const confirmar = confirm('¿Deseas eliminar este registro?')

        // Si es true, usamos la funcion que elimina el registro de la DB
        if (confirmar) {
           eliminarCliente(clienteID)
        }
    }
  }
})();
