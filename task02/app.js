const apikey="44297df09c6e1472d2da890e26cb7272";
const cityInput=document.querySelector("#city-input");
const weatherData=document.querySelector(".weather-data");
const formE=document.querySelector("form");


formE.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log(event);
    const cityValue=cityInput.value;
    console.log(cityValue);

    getWeatherData(cityValue);

})

async function getWeatherData(cityValue){
    
    try {
        const url=`http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}`;
        const response =await fetch(url);

        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data=await response.json()
        // console.log(data);
        const icon= data.weather[0].icon;
        const temperature=Math.round(data.main.temp)-273;
        const description =data.weather[0].description;
        const detail=[
            `Feels like : ${Math.round(data.main.feels_like)-273}°C`,
            `Humidity : ${data.main.humidity}%`,
            `Wind speed : ${data.wind.speed} m/s`,
        ]

        weatherData.querySelector(".icon").innerHTML=`<img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon">`;

        weatherData.querySelector(".temperature").textContent=`${temperature}°C`;

        weatherData.querySelector(".description").textContent=`${description}`;

        weatherData.querySelector(".details").innerHTML=
         `<div>${detail[0]}</div>
         <div>${detail[1]}</div>
         <div>${detail[2]}</div>`
        
    } catch (error) {
        weatherData.querySelector(".icon").innerHTML="";

        weatherData.querySelector(".temperature").textContent="";

        weatherData.querySelector(".description").textContent="An error happened, please try again";

        weatherData.querySelector(".details").innerHTML= "";
    }
}