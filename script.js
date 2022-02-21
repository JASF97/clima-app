
window.addEventListener('load', () => {
    const searchForm = document.getElementById('search');
    const searchInput = document.getElementById('search-input');
    searchForm.addEventListener('submit', onSubmit, true);

    let ubicacionUnica = document.getElementById('ubicacion')
    let temperatura = document.getElementById('temperatura')
    let fechaHora = document.getElementById('fecha-hora')
    let temperaturaDescripcion = document.getElementById('temp-description')
    
    let wind = document.getElementById('wind')
    let humidity = document.getElementById('humidity')
    let visibility = document.getElementById('visibility')
    let pressure = document.getElementById('pressure')
        
    let iconAnimado = document.getElementById('icon')
        
    const diaSemana = ['Domingo', 'Lunes', 'Martes','Miercoles', 'Jueves', 'Viernes', 'Sabado']
    
    let fecha = new Date()
    fechaHora.textContent = `Today - ${diaSemana[fecha.getDay()]}, ${fecha.toLocaleDateString()}`


    function onSubmit(event) {
        event.preventDefault();
        searchCiudad(searchInput.value);
    }

    function fetchApi(props) {
        fetch(props)
            .then( response => { return response.json() })
            .then(data => { 
    
                let temp = Math.round(data.main.temp)
                temperatura.textContent = `${temp} °C`
    
                let ubic = data.name
                ubicacionUnica.textContent = ubic
    
                let descriptionTemp = data.weather[0].description
                temperaturaDescripcion.textContent = descriptionTemp.toUpperCase()
    
                wind.textContent = `${data.wind.speed}`
                humidity.textContent = `${data.main.humidity}`
                visibility.textContent = `${data.visibility}`
                pressure.textContent = `${data.main.pressure}`
    
                // console.log(data)
    
                // En caso de querer iconos estaticos
    
                // let iconTemp = data.weather[0].icon
                // const urlIcon = `http://openweathermap.org/img/wn/${iconTemp}.png`
    
                // En caso de querer iconos dinamicos
    
                switch (data.weather[0].main) {
                    case 'Clouds':
                        iconAnimado.src='animated/cloudy-day-1.svg'
                        break;
                    case 'Thunderstorm':
                        iconAnimado.src='animated/thunder.svg'
                        break;
                    case 'Drizzle':
                        iconAnimado.src='animated/rainy-2.svg'
                        break;
                    case 'Rain':
                        iconAnimado.src='animated/rainy-7.svg'
                        break;
                    case 'Snow':
                        iconAnimado.src='animated/snow-6.svg'
                        break;
                    case 'Clear':
                        iconAnimado.src='animated/day.svg'
                        break;
                    case 'Atmosphere':
                        iconAnimado.src='animated/weather.svg'
                        break;
                    default:
                        iconAnimado.src='animated/day.svg'
                }
            })
            .catch( error => { 
                console.log(error)
            } )
    }

    function geolocation () {
        let lon
        let lat
        navigator.geolocation.getCurrentPosition( posicion => { 
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude
            
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=a6550093b25aecf7a3b85c887a9ea08a`
            fetchApi(url);
        })
    }
        

    function searchCiudad(query) {

        document.getElementById('search-input').value=""
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&lang=es&appid=a6550093b25aecf7a3b85c887a9ea08a`
        fetchApi(url);             
    }
    
    geolocation()
})




