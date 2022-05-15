const container = document.querySelector('.container');
const block = document.querySelectorAll('.block');
const addInfo = document.querySelector('.add-info')
const API =  'https://api.openweathermap.org/data/2.5/weather?q='
const APIkey = 'a89fb7179c9a1d022384d57c5a0a7dff';

for (let i = 0; i < block.length; i++) {
    const collection = block[i].children;
    const town = collection[0].innerHTML; 
    fetch(`${API + town}&units=metric&APPID=${APIkey}`)   
    .then(response => response.json())
    .then(cityinfo => {
        let degree = collection[2];
        degree.innerHTML = `${Math.round(cityinfo.main.temp)} &#8451`;
        const img = collection[3];
        let weatherIcon = cityinfo.weather[0].icon;
        img.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    })
    .catch((error) => {
        degree.innerHTML = `The service is not available`;
        return console.log(error)
    });
}

container.addEventListener('click', function (event) {
    const town = event.path.sort()[4].querySelector('.town').innerHTML;
    const infoPlus = document.querySelector('.info');
    infoPlus.innerHTML = '';
    fetch(`${API + town}&units=metric&APPID=${APIkey}`)   
    .then(response => response.json())
    .then(info => {
        const tempMin = Math.round(info.main.temp_min);
        const tempMax = Math.round(info.main.temp_max);
        const humidity = info.main.humidity;
        const weather = info.weather[0].description;
        const windSpeed = info.wind.speed;

        const h2 = document.createElement('H2');
        const p = document.createElement('P');

        h2.innerHTML = `Additional weather information in ${town}`;
        p.innerHTML = `Minimum temperature: ${tempMin} &#8451.<br>Maximum temperature: ${tempMax} &#8451.<br>Wind speed: ${windSpeed} m/s.<br>Relative humidity: ${humidity}%.<br>Description of weather conditions: ${weather}.`;

        infoPlus.appendChild(h2);
        infoPlus.appendChild(p);
    })
    .catch((error) => {
        degree.innerHTML = `The service is not available`;
        return console.log(error);
    });
    container.classList.add('blur');
    addInfo.classList.remove('none');    
});

const displayNone = () => {
    container.classList.remove('blur');
    addInfo.classList.add('none');
} 

addInfo.addEventListener('click', displayNone);
document.querySelector('.close').addEventListener('click', displayNone);




