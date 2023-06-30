// Creamos IIFE para que no se exporten las funciones

import { mostrarAlerta, validar } from "./funciones.js";
import { nuevoCliente } from "./API.js";

(function () {
  // Seleccionamos el formulario
  const formulario = document.querySelector("#formulario");

  // Escuchamos por el submit
  formulario.addEventListener("submit", validarCliente);

  // Funcion que valida el cliente
  function validarCliente(e) {
    e.preventDefault();

    // Selectores de los campos
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    // Objeto que incluye los datos del cliente introducidos
    const cliente = {
      nombre,
      email,
      telefono,
      empresa,
    };

    // Si no pasa la validación del formulario
    if (validar(cliente)) {
      // Mostrar mensaje de error
      mostrarAlerta("Todos los campos son obligatorios");
      return;
    }

    // Si se pasa la validación

    nuevoCliente(cliente);
  }
})();
