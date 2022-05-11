const block = document.querySelectorAll('.block');
const API =  'https://api.openweathermap.org/data/2.5/weather?q='
const APIkey = 'a89fb7179c9a1d022384d57c5a0a7dff';

for (let i = 0; i < block.length; i++) {
    block[i].addEventListener('click', function () {
        const collection = this.children;
        const town = collection[0].innerHTML; 
        fetch(`${API + town}&units=metric&APPID=${APIkey}`)   
        .then(response => response.json())
        .then(cityinfo => {
            let degree = collection[2];
            degree.innerHTML = `${Math.round(cityinfo.main.temp)} &#8451`;
            const img = collection[3];
            let weatherIcon = cityinfo.weather[0].icon;
            img.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
            console.log(cityinfo)
        })
        .catch(error => console.log(error));
    })
}


