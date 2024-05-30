document.addEventListener('DOMContentLoaded', function () {

    var btn_buscar = document.querySelector('.button_buscar'); 
    var ciudad = document.querySelector('.search_input');

    /**VALORES PARA EL DIV DE LA CIUDAD */
    var nombre_ciudad = document.querySelector('.nombre-ciudad');
    var grados_celcius = document.querySelector('.grados')
    var descripcion = document.querySelector('.descripcion');
    var icono = document.querySelector('.icon');
   

    btn_buscar.addEventListener('click', function() {
        var url_ciudad = "https://api.openweathermap.org/data/2.5/weather?q=" + ciudad.value + "&appid=dcec7df661b1e6b0edab51d796b7339c";

        buscar_ciudad(url_ciudad, function (data){
            console.log(data);
            cargar_ciudad(data);
        });
    });

    /* FUNCION BUSCAR CIUDAD */
    function buscar_ciudad(url, callback){
        fetch(url).then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => callback(data))
    
        .catch(error => console.error('Problema con la peticion fetch: ', error));
    }

    /**FUNCION PARA CARGAR LA CIUDAD AL DIV */
    function cargar_ciudad(data){
        nombre_ciudad.textContent = data.name;
        grados_celcius.textContent = (data.main.temp - 273.15).toFixed(0) + "°C";
        descripcion.textContent = data.weather[0].description; // Acceder a la descripción del clima

        // Construir la URL del icono
        var iconCode = data.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"; // URL del icono
        icono.src = iconUrl;
        icono.alt = data.weather[0].description; // Alternativa de texto para el icono

    }

});
