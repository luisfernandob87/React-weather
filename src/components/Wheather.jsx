import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

const Wheather = () => {
    

    const [ data, setData ]= useState({});
    const [ temp, setTemp ]= useState(0);
    const [ isCelcius, setIsCelcius] = useState(true);

    useEffect(()=>{
        const success = pos =>{
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=db1315df0a819a9200216f51fb77c80e`)
            .then(res => {
                setData(res.data)
                setTemp(res.data.main.temp- 273.15)
            })
            
        }    
        navigator.geolocation.getCurrentPosition(success);
        
    },[])
    
console.log(data);
console.log(temp);



const chgTemp = () =>{
    if(isCelcius){
        setTemp(((temp)*1.8)+32);
        setIsCelcius(false)
    }else{
        setTemp((temp-32)*0.5556)
        setIsCelcius(true)
    }
}
    return (
        
        <div className='card'>
            
            <h2>Weather App</h2>
            <h3>{data.name}, {data.sys?.country}</h3>
            <div>
                <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="Icon of weather" />
            <p>{data.weather?.[0].description}</p>
            <p>{temp.toFixed(2)} {isCelcius ? "Celcius" : "Fahrenheit"}</p>
            </div>
            <button onClick={chgTemp}>{isCelcius ? "Switch to Fahrenheit" : "Switch to Celcius"}</button>
        </div>
    );
};

export default Wheather;