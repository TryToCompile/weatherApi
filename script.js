
/*Задание:
В папке Task9 создаем файл weather.html.
Необходимо реализовать следующее: 
1) +

2) +

3) +
4) +
5) +
6) Так же в окошке виджета погоды вверху добавить кнопочку а-ля  «Прогноз на 3 дня», по клику на которую должен отправиться запрос за информацией на три-пять дней,
затем отфильтровать ее, и забрать информацию о погоде на сегодня, завтра, послезавтра примерно на 12 часов дня. Пока обрабатываются данные показать анимированный лоадер (можно просто gif картинку, 
но желательно какую-нибудь svg-анимацию).
7) Необходимо, чтобы WheatherWidget был совершенно независимый модуль/класс, т.е. отдельный файл, который можно подключить к себе на страницу и запустить new WheatherWidget().getWeather().
8) +
 */
{
  let a = 5;
// {
//   "coord": {
//     "lon": 27.5667,
//     "lat": 53.9
//   },
//   "weather": [{
//     "id": 804,
//     "main": "Clouds",
//     "description": "overcast clouds",
//     "icon": "04n"
//   }],
//   "base": "stations",
//   "main": {
//     "temp": 274.01,
//     "feels_like": 268.73,
//     "temp_min": 274.01,
//     "temp_max": 274.01,
//     "pressure": 1018,
//     "humidity": 93,
//     "sea_level": 1018,
//     "grnd_level": 991
//   },
//   "visibility": 10000,
//   "wind": {
//     "speed": 6.12,
//     "deg": 238,
//     "gust": 12.71
//   },
//   "clouds": {
//     "all": 100
//   },
//   "dt": 1706044730,
//   "sys": {
//     "type": 1,
//     "id": 8939,
//     "country": "BY",
//     "sunrise": 1706076595,
//     "sunset": 1706106782
//   },
//   "timezone": 10800,
//   "id": 625144,
//   "name": "Minsk",
//   "cod": 200
// }
}
class WeatherWidget {
  constructor () {
    this.apiKey = '807c38438480cc9371714293aa8eb1f0';
    this.apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&units=metric&appid=`;
    this.apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&lang=ru&units=metric&appid=`;
    this.interval;
    this.cityName = 'Minsk';
    this.preloader = function (toggle){      
      if (toggle && !document.getElementById('weather-preloader')){
        let preloader = document.createElement('div');
        preloader.id = 'weather-preloader';
        //preloader.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); display:block;';
        preloader.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: white; display:block;';
        preloader.innerHTML = `<svg class='loader-example' viewBox='0 0 100 100'>
        <g fill='red' stroke='red'>
            <g class='circle' transform='translate(0, 0)'>
                <circle cx='45' cy='25' r='1' />
                <circle cx='55' cy='25' r='1' />                
                <circle cx='50' cy='20' r='1' />
                <circle cx='50' cy='30' r='1' />
            </g>
        </g>
        <g fill='blue' stroke='blue'>
          <g class='circle-second' transform='translate(0, 0)'>
                  <circle cx='40' cy='25' r='1' />
                  <circle cx='50' cy='35' r='1' />                
                  <circle cx='60' cy='25' r='1' />
                  <circle cx='50' cy='15' r='1' />
          </g>
        </g>
    </svg>`;
        document.body.append(preloader);
        let circles = document.querySelectorAll('.circle');
        let circlerSecond = document.querySelectorAll('.circle-second');
        let angle = 0;
        let angleSecond = 360;
        function update() {
          circles.forEach((circle, index) => {
            angle -= 1;  // вперед/назад
            if (angle == 0) {
                angle = 360;
            }
            circle.setAttribute('transform', `rotate(${angle}, 50, 25)`);    
          });
          circlerSecond.forEach((circle, index) => {
            angleSecond += 1;  // вперед/назад
            if (angleSecond == 360) {
                angleSecond = 0;
            }
            circle.setAttribute('transform', `rotate(${angleSecond}, 50, 25)`);
          })
        }
        this.interval = setInterval(update, 1);
        update();
      } else {
        let preloader = document.getElementById('weather-preloader');
        preloader.remove();
        clearInterval(this.interval);
      }
    };
  }
  getWeather() {
    this.preloader(true);
    return new Promise((resolve, reject) => {
      let url = `${this.apiUrl}${this.apiKey}`;
      fetch(url)
      .then(response => response.json())
      .then(data => {
        this.preloader(false);
        this.printWeather(data);
        resolve('Weather data resolved');
      })
      .catch(error => reject('Weather data rejected in: '+error));
    })
  }
  printWeather(data) {
    let weatherContainer = document.createElement('div');
    weatherContainer.style.cssText = 'position: absolute; top: 2%; right: 2%; word-wrap: break-word; width: 350px; color: white; border-radius: 20px; height: 300px; background-color: #818080; overflow:hidden; border: 1px solid #ccc; padding: 10px;';

    let titleDiv = document.createElement('div');
    titleDiv.style.cssText = 'display: flex';
  
    let title = document.createElement('p');
    title.style.cssText = 'font-size: 20px; margin-bottom: auto; font-family: monospace'; 
    title.textContent = `Город ${data.name}: ${data.weather[0].description} с температурой аля ${Math.round(data.main.temp)} °C`;
  
    let icon = document.createElement('img');
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = 'weather icon';
  
    let closeButton = document.createElement('span');
    closeButton.id = 'closeWeatherWindow';
    closeButton.style.cssText = 'position: absolute; top: 0px; right: 11px; cursor: pointer; font-size: 20px; font-family:cursive; color: white';
    closeButton.textContent = 'x';
  
    titleDiv.appendChild(title); 
    titleDiv.appendChild(icon);
  
    weatherContainer.appendChild(titleDiv);
    weatherContainer.appendChild(closeButton);
    
    let hr = document.createElement('hr');

    let detailsDiv = document.createElement('div');
    detailsDiv.style.cssText = 'font-family: monospace; font-size: 40px;';
  
    let wind = document.createElement('div');
    wind.textContent = `Ветер: ${data.wind.speed} м/с`;
  
    let humidity = document.createElement('div'); 
    humidity.textContent = `Влажность: ${data.main.humidity}%`;
  
    detailsDiv.appendChild(wind);
    detailsDiv.appendChild(humidity);
  
    weatherContainer.appendChild(hr);
    weatherContainer.appendChild(detailsDiv);
  
    let forecastButton = document.createElement('button');
    forecastButton.id = 'forecast-btn';
    forecastButton.style.cssText = 'background-color: #97f6ff; font-family: monospace; font-size: 25px; width: 200px; margin: 13px 22%; border:none; border-radius: 10px; transition: 0.3s; box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 10px;';
    forecastButton.textContent = 'Хочу прогноз на 5 дней!';
  
    weatherContainer.appendChild(forecastButton);
  
    document.body.appendChild(weatherContainer);

    forecastButton.addEventListener('mouseenter', () => {
      forecastButton.style.backgroundColor = 'rgba(20, 80, 90, 0.5)';
      forecastButton.style['box-shadow'] = 'rgba(100, 100, 255, 0.9) 0px 0px 10px';
      forecastButton.style.color = 'white';
    });
    
    forecastButton.addEventListener('mouseleave', () => {
      forecastButton.style.backgroundColor = '#97f6ff';
      forecastButton.style['box-shadow'] = 'rgba(0, 0, 0, 0.4) 0px 5px 10px';
      forecastButton.style.color = 'black';
    });

    forecastButton.addEventListener('click', () => {
      this.clear(weatherContainer);
      this.getForecast();
    });

    closeButton.addEventListener('click', () => {
      this.clear(weatherContainer);
    });
  }

  clear(element) {
    element.remove();
  }

  
  printForecast(data) {
    let weatherContainer = document.createElement('div');
    weatherContainer.style.cssText = 'position: absolute; top: 2%; right: 2%; word-wrap: break-word; width: 370px; color: white; border-radius: 20px; height: auto; background-color: #818080; overflow:hidden; border: 1px solid #ccc; padding: 10px;';
    console.log(JSON.stringify(data))
    let container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column;';
    
    let date;
    let cnt = 0;
    for (let i = 0; i < data.list.length; i++) {
      date = new Date(data.list[i]["dt_txt"]);
      if ((date.getHours() == 12 || (date.getHours() > 12 && i == 0)) && cnt < 5) {
         let p = document.createElement('p');
         p.style.cssText = 'font-size: 20px; margin-bottom: auto; margin-top: 15px; margin-left: 10px; font-family: monospace'; 
         p.textContent = `${(date.getMonth() + 1) >9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}` }.${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}` }: ${data.list[i].weather[0].description}, темп. ${Math.round(data.list[i].main.temp)} °C`;
        weatherContainer.appendChild(p);
        ++cnt;
      }
    }
     
  
    // let icon = document.createElement('img');
    // icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    // icon.alt = 'weather icon';
  
     let closeButton = document.createElement('span');
     closeButton.id = 'closeWeatherWindow';
     closeButton.style.cssText = 'position: absolute; top: 0px; right: 11px; cursor: pointer; font-size: 20px; font-family:cursive; color: white';
     closeButton.textContent = 'x';
  
    // titleDiv.appendChild(title); 
    // titleDiv.appendChild(icon);
  
    // weatherContainer.appendChild(titleDiv);
    weatherContainer.appendChild(closeButton);
    
     let hr = document.createElement('hr');

    // let detailsDiv = document.createElement('div');
    // detailsDiv.style.cssText = 'font-family: monospace; font-size: 40px;';
  
    // let wind = document.createElement('div');
    // wind.textContent = `Ветер: ${data.wind.speed} м/с`;
  
    // let humidity = document.createElement('div'); 
    // humidity.textContent = `Влажность: ${data.main.humidity}%`;
  
    // detailsDiv.appendChild(wind);
    // detailsDiv.appendChild(humidity);
  
     weatherContainer.appendChild(hr);
    // weatherContainer.appendChild(detailsDiv);
  
    let forecastButton = document.createElement('button');
    forecastButton.id = 'forecast-btn';
    forecastButton.style.cssText = 'background-color: #97f6ff; font-family: monospace; font-size: 25px; width: 200px; margin: 13px 22%; border:none; border-radius: 10px; transition: 0.3s;';
    forecastButton.textContent = 'Назад!';
  
     weatherContainer.appendChild(forecastButton);
  
     document.body.appendChild(weatherContainer);

     forecastButton.addEventListener('mouseenter', () => {
       forecastButton.style.backgroundColor = 'rgba(20, 80, 90, 0.5)';
     });
    
     forecastButton.addEventListener('mouseleave', () => {
       forecastButton.style.backgroundColor = '#97f6ff';
     });

     forecastButton.addEventListener('click', () => {
       this.clear(weatherContainer);
       this.getWeather();
     });

     closeButton.addEventListener('click', () => {
       this.clear(weatherContainer);
     });
  }
  getForecast() {
    this.preloader(true);
    return new Promise((resolve, reject) => {
      let url = `${this.apiForecastUrl}${this.apiKey}`;
      fetch(url)
      .then(response => response.json())
      .then(data => {
        this.printForecast(data);
        this.preloader(false);
        resolve('Forecast data resolved');
      })
      .catch(error => reject('Forecast data rejected in: '+error));
    }) 
  }
}


let WWidget = new WeatherWidget().getWeather();
console.log(WWidget)