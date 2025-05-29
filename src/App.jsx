import { useEffect, useState } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_API_KEY
function App() {
  const [weather, setWeather] = useState(null);
  const [userLocation,setUserLocation] = useState(null)

  useEffect(()=>{
    const getLocation = () => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude,longitude} = position.coords;
            setUserLocation({latitude,longitude})
    
          }, (error) => {
            console.error(error)
          }
        );
      } else{
        console.error("GeoLocation is not supported in this browser")
      }
    }
    getLocation()
  },[])

  useEffect(()=> { 

    if(userLocation) {
      const  fetchWeatherInfo = async () => {
        try {
           const response =  await fetch(` https://api.openweathermap.org/data/2.5/forecast?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${API_KEY}&units=metric`)
           const data = await response.json()
           setWeather(data)
            } catch(e) {
              console.error(e)
            }
            }
            fetchWeatherInfo()
    }
   
  },[userLocation])

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-pink-400 via-blue-400 to-purple-600">
      <div className="flex flex-col gap-5 bg-white shadow-2xl rounded-2xl w-[650px] p-6">
        <h2 className="text-2xl font-bold text-center text-cyan-900 italic drop-shadow-md">
          WEATHER: {weather?.list?.[0]?.weather?.[0]?.description}
        </h2>
  
        <div className="flex flex-col items-center gap-4 p-5 rounded-xl bg-slate-300 shadow-inner">
          {weather?.list?.[0]?.weather?.[0]?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
              alt={weather.list[0].weather[0].description}
              className="w-36 h-36"
            />
          )}
  
          <div className="flex flex-col gap-2 items-center text-teal-700 font-semibold italic">
            <span className="text-md">
              🌡️ Temperature: {weather?.list?.[0]?.main?.temp}°C
            </span>
            <span className="text-md">
              💧 Humidity: {weather?.list?.[0]?.main?.humidity}%
            </span>
            <span className="text-md">
              🌬️ Wind: {weather?.list?.[0]?.wind?.speed} m/s
            </span>
          </div>
        </div>
  
        {/* Forecast section placeholder */}
        <div className="rounded-xl bg-blue-100 text-blue-800 text-sm p-3 items-center text-center italic grid grid-rows-2 grid-cols-3">
         
        {weather?.list ? (
  weather.list
    .filter(item => item.dt_txt.includes("12:00:00")) // one forecast per day
    .map((item, i) => (
      <div key={i} className="p-2 m-1 text-md bg-white rounded-xl transition-all duration-100 hover:-translate-y-1 flex flex-col items-center justify-center shadow">
        <h3 className="font-bold">{item.dt_txt.split(" ")[0]}</h3>
        <img
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          alt={item.weather[0].description}
          className="w-16 h-16"
        />
        <p>{item.weather[0].description}</p>
        <p>🌡️ {item.main.temp}°C</p>
      </div>
    ))
) : (
  <p>Forecast for next 3 days coming soon...</p>
)}

        </div>
      </div>
    </div>
  );
  
  }

export default App;
