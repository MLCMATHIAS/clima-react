import React, { useState } from 'react';


const apiKey ='294dd68637ff1c6ddfa6583811d0a627';
 //estados
function App() {
  const [data, setData] = useState('');
  const [city, setCity] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${apiKey}&units=metric&lang=sp`)
        .then(res => res.json())
        .then(result => {
          setCity(result);
          setData('');
          console.log(result);
        });
    }
  }

  const datosAño = (d) => {
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octobre", "Noviembre", "Diciembre"];
    let days = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

  //mostrar
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof city.main != "undefined") ?
     ((city.main.temp < 14) ? 'img frio' : 'img calido'): 'img normal' 
    //  (city.main.temp < 5 ? 'img nevando' : 'img calido'):'img calido'
     }>
      <main>
        <div className="contenedor-buscador">
          <input 
            type="text"
            className="buscador"
            placeholder="Ciudad..."
            onChange={e => setData(e.target.value)}
            value={data}
            onKeyPress={search}
          />
        </div>
        {(typeof city.main != "undefined") ? (
        <div>
          <div className="contenedor-ciudad">
            <div className="ciudad">{city.name}, {city.sys.country}</div>
            <div className="datos">{datosAño(new Date())}</div>
          </div>
          <div className="contedor-tiempo">
            <div className="temp">
              {Math.round(city.main.temp)}°c
            </div>
             <div className="tiempo">{city.weather[0].main}weather</div>
           </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
