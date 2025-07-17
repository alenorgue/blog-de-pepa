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

function getColor(precio) {
    if (precio <= 100) return "green";
    if (precio < 200) return "gold";
    return "red";
}

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
    if (ciudadSeleccionada) {
        mostrarCiudad(ciudadSeleccionada);
        buscarApartamentos(ciudadSeleccionada);
        document.getElementById("accomodationsInfo").style.display = "block";
        document.getElementById("orderSelector").style.display = "block";
    } else {
        document.getElementById("cityInfo").style.display = "none";
        document.getElementById("accomodationsInfo").style.display = "none";
        document.getElementById("orderSelector").style.display = "none";
    }
});

//Funcion para hacer la llamada a la API Bravabook
async function buscarApartamentos(ciudad) {
    const url = `https://bravabook.onrender.com/api/apartments/search?city=${ciudad}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const contenedor = document.getElementById("accomodations");
        contenedor.innerHTML = "";
        document.getElementById("numAccomodations").textContent = data.length;
        if (data.length === 0) {
            document.getElementById("accomodationsInfo").style.display = "none";
        }
        data.forEach(apartamento => {
            const div = document.createElement("div");
            div.className = "apartamento";
            div.dataset.id = apartamento._id || apartamento.id;
            let precio = Number(apartamento.price);
            let color = getColor(precio);
            div.innerHTML = `
                <h3>${apartamento.title}</h3>
                <img src="${apartamento.mainPhoto}" alt="${apartamento.title}">
                <p>Precio: <span style="color:${color}; font-weight:bold;">${apartamento.price}</span></p>
            `;
            contenedor.appendChild(div);
        });
        // Guardar los apartamentos en una variable global para ordenarlos después
        apartamentosActuales = data;
    } catch (error) {
        console.error("Error al buscar apartamentos:", error);
        document.getElementById("accomodationsInfo").style.display = "none";
    }
}
// Evento para mostrar los detalles del apartamento al hacer clic llevando a Bravabook
document.getElementById("accomodations").addEventListener("click", function(event) {
    const apartamentoSeleccionado = event.target.closest(".apartamento");
    if (apartamentoSeleccionado && apartamentoSeleccionado.dataset.id) {
        const url = `https://bravabook.onrender.com/apartment/${apartamentoSeleccionado.dataset.id}#reservation`;
        window.open(url, "_blank");
    }
});

// Función para ordenar y mostrar los apartamentos sin hacer fetch
function ordenarApartamentos(orden) {
    const data = apartamentosActuales;
    const contenedor = document.getElementById("accomodations");
    contenedor.innerHTML = "";
    let sorted = [...data];
    if (orden === "asc") {
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
    } else {
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
    }
    sorted.forEach(apartamento => {
        let precio = Number(apartamento.price);
        let color = getColor(precio);
        const div = document.createElement("div");
        div.className = "apartamento";
        div.dataset.id = apartamento._id || apartamento.id;
        div.innerHTML = `
            <h3>${apartamento.title}</h3>
            <img src="${apartamento.mainPhoto}" alt="${apartamento.title}">
            <p>Precio: <span style="color:${color}; font-weight:bold;">${apartamento.price}</span></p>
        `;
        contenedor.appendChild(div);
    });
}

// Evento para el select de orden
const orderSelector = document.getElementById("orderSelector");
if (orderSelector) {
    orderSelector.addEventListener("change", function() {
        ordenarApartamentos(this.value);
    });
}

