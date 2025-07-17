// Información de las ciudades
const ciudades = {
    palamos: {
        nombre: "Palamós",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7S9XTzYJAo90itEe4avmv2JyFs6pcgnvIw&s",
        descripcion: "Palamós es una localidad costera de la Costa Brava, conocida por sus playas y su puerto pesquero. Es famosa por sus gambas y su ambiente marinero."
    },
    blanes: {
        nombre: "Blanes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/BLANES_DONDE_COMIENZA_LA_%29%28%28%28%28%28%C2%BA%29_COSTA_BRAVA%28%C2%BA%29%29%29%29%29%28_-_panoramio.jpg/330px-BLANES_DONDE_COMIENZA_LA_%29%28%28%28%28%28%C2%BA%29_COSTA_BRAVA%28%C2%BA%29%29%29%29%29%28_-_panoramio.jpg",
        descripcion: "Blanes es la puerta de entrada a la Costa Brava, famosa por su jardín botánico y su animado paseo marítimo. Sus playas y calas son muy apreciadas por los visitantes."
    }
};

// ¡Buena suerte!

// Función para mostrar la información de una ciudad
function mostrarCiudad(ciudad) {
    const infoCiudad = ciudades[ciudad];
    if (infoCiudad) {
        document.getElementById("cityNombre").textContent = infoCiudad.nombre;
        document.getElementById("cityImagen").src = infoCiudad.imagen;
        document.getElementById("cityDescripcion").textContent = infoCiudad.descripcion;
        document.getElementById("cityInfo").style.display = "block";
    } else {
        console.error("Ciudad no encontrada");
    }
};
// Evento para cargar la información de la ciudad al hacer clic en el botón
document.getElementById("citySelector").addEventListener("change", function() {
    const ciudadSeleccionada = document.getElementById("citySelector").value;
    mostrarCiudad(ciudadSeleccionada);
});
