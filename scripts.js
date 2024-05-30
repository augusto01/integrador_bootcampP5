document.addEventListener('DOMContentLoaded', function () {

    var btn_buscar = document.querySelector('.button_buscar'); 
    var ciudad = document.querySelector('.search_input');

    /** VALORES PARA EL DIV DE LA CIUDAD */
    var ciudad_mostrar = document.querySelector('.ciudad');
    var nombre_ciudad = document.querySelector('.nombre-ciudad');
    var grados = document.querySelector('.grados');
    var descripcion = document.querySelector('.descripcion'); // Asumiendo que hay un div para la descripción
    var icono = document.querySelector('.icon'); // Elemento <img> para el icono
   
    btn_buscar.addEventListener('click', function() {
        var url_ciudad = "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad.value + "&appid=dcec7df661b1e6b0edab51d796b7339c";

        buscar_ciudad(url_ciudad, function (data){
            console.log(data);
            cargar_ciudad(data);
            
        });
    });

    /* FUNCIÓN BUSCAR CIUDAD */
    function buscar_ciudad(url, callback){
        fetch(url).then(response => {
            if(!response.ok){
                throw new Error('La respuesta de la red no fue satisfactoria: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => callback(data))
        .catch(error => console.error('Problema con la petición fetch: ', error));
    }

    /** FUNCIÓN PARA CARGAR LA CIUDAD AL DIV */
    function cargar_ciudad(data){
        if (nombre_ciudad && grados && descripcion && icono) {
            ciudad_mostrar.classList.remove('hidden'); // Mostrar el contenedor de la ciudad
            nombre_ciudad.textContent = data.name;
            grados.textContent = (data.main.temp - 273.15).toFixed(2) + "°C"; // Convertir de Kelvin a Celsius
            descripcion.textContent = data.weather[0].description; // Acceder a la descripción del clima
            
            // Construir la URL del icono
            var iconCode = data.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"; // URL del icono
            icono.src = iconUrl;
            icono.alt = data.weather[0].description; // Alternativa de texto para el icono
            ciudad.value = '';
        } else {
            console.error('Elementos del DOM no encontrados.');
        }
    }

});
