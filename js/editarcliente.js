import { obtenerCliente, editarCliente } from "./API.js";
import { mostrarAlerta, validar } from "./funciones.js";

(function () {
  // Campos del formulario
  const nombreInput = document.querySelector("#nombre");
  const emailInput = document.querySelector("#email");
  const telefonoInput = document.querySelector("#telefono");
  const empresaInput = document.querySelector("#empresa");
  const idInput = document.querySelector("#id");

  // Una vez que cargue el dom
  document.addEventListener("DOMContentLoaded", async () => {
    // Extraemos el parametro ID de la url
    const parametrosURL = new URLSearchParams(window.location.search);
    const idCLiente = parametrosURL.get("id");

    // Asignamos el ID a cliente y usamos la funcion de obtenerLCiente para traer sus datos
    const cliente = await obtenerCliente(idCLiente);

    // Rellenamos los campso del form con los datos del cliente
    mostrarCliente(cliente);

    // Submit al formulario
    const formulario = document.querySelector("#formulario");

    // Al hacer submit, validamos los campos
    formulario.addEventListener("submit", validarCliente);
  });

  // *****************************************************************

  // Funcion que llena los campos del formulario
  function mostrarCliente(cliente) {
    const { nombre, empresa, email, telefono, id } = cliente;

    nombreInput.value = nombre;
    empresaInput.value = empresa;
    emailInput.value = email;
    telefonoInput.value = telefono;
    idInput.value = id;
  }

  // *****************************************************************

  function validarCliente(e) {
    e.preventDefault();

    // Objeto que incluye los datos del cliente introducidos 
    const cliente = {
      nombre: nombreInput.value,
      email: emailInput.value,
      telefono: telefonoInput.value,
      empresa: empresaInput.value,
      id: parseInt(idInput.value),
    };

    // Si no pasa la validación del formulario
    if (validar(cliente)) {
      // Mostrar mensaje de error
      mostrarAlerta("Todos los campos son obligatorios");
      return;
    }

    // Si se pasa la validación, reescribe el objeto
    editarCliente(cliente);
  }
})();
