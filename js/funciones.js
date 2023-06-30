// Funcion para mostrar alerta de error
export function mostrarAlerta(mensaje) {
  const alerta = document.querySelector(".bg-red-100");

  if (!alerta) {
    const alerta = document.createElement("P");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
            <strong class='font-bold'>ERROR!</strong>
            <span class='block'>${mensaje}</span>
        `;

    const formulario = document.querySelector("#formulario");
    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

// ********************************************

// Funcion que valida el objeto de cliente pasado, si tiene todos los campos

// Se utiliza el metodo .every sobre los valores del objeto
// Si todos los valores son distintos a un string vacio, devuelve true y lo negamos con la ! del principio del return

// Si un value es igual a un string vacío, devuelve false y la ! del principio del return lo convierte en true, con lo que marca error al usuario por faltar un campo.

export function validar(objeto) {
  return !Object.values(objeto).every((input) => input !== "");
}
