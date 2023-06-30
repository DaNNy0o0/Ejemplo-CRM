// URL de la que obtenemos o enviamos los datos
const url = "http://localhost:4000/clientes";

// Funcion que va a insertar el objeto de cliente drecibido en la BD
export const nuevoCliente = async (cliente) => {
  // Fetch a la URL
  // Al estar inyectando un registro en la DB, le pasamos un objeto de configuracion para el metodo POST
  try {
    await fetch(url, {
      method: "POST", // MEtodo POST para enviar registros a la DB
      body: JSON.stringify(cliente), // Pasamos el objeto recibido a string
      headers: {
        "Content-Type": "application/json", // El tipo de contenido que enviamos
      },
    });

    // Cuando haya terminado de insertarlo, enviamos al usuario al inicio
    window.location.href = "index.html";
  } catch (error) {
    // En caso de error, lo mostramops en la consola
    console.log(error);
  }
};

// ***************************************************

// Funcion que trae todos los clientes
export const obtenerClientes = async () => {
  // Fetch a la url y asignamos el resultado a la variable de clientes
  try {
    const resultado = await fetch(url);
    const clientes = await resultado.json();

    //retornamos los clientes
    return clientes;
  } catch (error) {
    console.log(error);
  }
};

// ***************************************************

// Funcion que elimina un resgistro de la DB

// Le pasamos el id del cliente que hacemos click
export const eliminarCliente = async (id) => {
    // Hacemos fetch a la url, pasando el id elegido y con el metodo DELETE lo eliminamos de la DB
  try {
    await fetch(`${url}/${id}`, {
      method: "DELETE", // MEtodo DELETE para eliminar registros de la DB
    });
  } catch (error) {
    console.log(error);
  }
};

// ***************************************************

// Obtiene un cliente por su ID

export const obtenerCliente = async id => {
    // Realizamos el fetch a la DB usando el ID elegido
    try {
        const resultado = await fetch(`${url}/${id}`)
        const cliente = await resultado.json()
        // Retornamos el cliente elegido mediante su ID
        return cliente
    } catch (error) {
        console.log(error)
    }
}


// ***************************

// Actualiza un registro
export const editarCliente = async cliente => {

    // Extraemos el ID del objeto del cliente que pasamos
    const {id} = cliente 

    try {
        // Realizamos el fetch a la url con el ID elegido
        await fetch(`${url}/${id}`, {
          method: "PUT", // MEtodo PUT para actualizar registros de la DB
          body: JSON.stringify(cliente), // Pasamos el objeto recibido a string
          headers: {
            'Content-Type': 'application/json'
          }
        });

        window.location.href= 'index.html' // Devolvemos al usuario al index al acabar la edicion
      } catch (error) {
        console.log(error);
      }
}