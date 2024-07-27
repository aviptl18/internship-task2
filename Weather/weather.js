// script.js
const apiKey = 'a783f932623527f7579b09372ab77423'; 
const cityinput = document.querySelector('#cityInput');
async function getWeather() {   
    const city = document.getElementById('cityInput').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    if (response.ok && forecast.ok) {
        const data = await response.json();
        const forecastData = await forecast.json();
        displayWeather(data);
        displayhourlyforecast(forecastData.list);
    } else {
        alert('City not found');
    }
}

function displayWeather(data) {
    const resultDiv = document.getElementById('temp-div');
    const weatherinfo = document.getElementById('weather-info');
    const weatherforecast = document.getElementById('hourly-forecast');
    const weathericon = document.getElementById('weather-icon');
    resultDiv.innerHTML = ``;
    weatherforecast.innerHTML = '';
    // weathericon.innerHTML = '';
    weatherinfo.innerHTML = '';

    if(data.cod === '404'){
        weatherinfo.innerHTML = `<p>${data.message}</p>`
    }else{
        const cityname = data.name;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const iconcode = data.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;

        const temperaturehtml = `<p>${temperature}°C</p>`;
        const weatherhtml = `<p>${cityname}</p>
        <p>${description}</p>`;
        resultDiv.innerHTML = weatherhtml;
        weatherinfo.innerHTML = temperaturehtml;
        weathericon.src = iconurl;
        weathericon.alt = description;
        document.getElementById('humidity').innerHTML = `<img class="iconWind" src="./img/wind2.png" alt="not found"><span class="percent">${data.main.humidity}%</span> <p class="wind"><br>Humidity</p>`;
        document.getElementById('wind-speed').innerHTML = `<img class="iconWind" src="./img/wind1.png" alt="not found"><span class="percent">${data.wind.speed}Km/h</span> <p class="wind"><br>Wind Speed</p>`;
        showimage();
    }
}
function displayhourlyforecast(hourlydata){
    const hourlyforecastdiv = document.getElementById('hourly-forecast');
    const next24hours = hourlydata.slice(0,8);
    next24hours.forEach(item => {
        const datetime = new Date(item.dt*1000);
        const hour = datetime.getHours();
        const temperature = Math.round(item.main.temp);
        const iconcode = item.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`;

        const hourlyitemhtml = `
        <div class= "hourly-item">
            <span>${hour}:00</span>
            <img src="${iconurl}" alt="hourly weather icon"></img>
            <span>${temperature}°C</span></div>`;
            hourlyforecastdiv.innerHTML += hourlyitemhtml;
    });
}
function showimage(){
    const weathericon = document.getElementById('weather-icon');
    weathericon.style.display = 'block';
}