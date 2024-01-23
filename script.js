
/*Задание:
В папке Task9 создаем файл weather.html.
Необходимо реализовать следующее: 
1) +
2) Объект от класса WheatherWidget должен уметь запрашивать данные о погоде с http://openweathermap.org. По умолчанию запрос делать для Минска 
(для улучшения, можно сделать по определению местоположения и запросу по координатам), формат температуры в цельсиях, на русском.
3) Когда придут данные, то необходимо отрендерить информацию, т.е. на экране, в правом верхнем углу например, должно появиться всплывающее маленькое стилизованное окошко
с информацией о погоде с инфой вроде «Сейчас в Минске -5 °C (Иконка погоды) "Ясно". Ветер: 4 м/c». Вся информация должна быть взята из ответа (response) API сервиса погоды.
4) В окошке должна быть кнопочка с крестиком, по клику по которой окно виджета можно закрыть или свернуть, чтобы оно не мешало.
5) Инициализироваться объект погоды должен следующим образом: 
new WheatherWidget().getWeather();
6) Так же в окошке виджета погоды вверху добавить кнопочку а-ля  «Прогноз на 3 дня», по клику на которую должен отправиться запрос за информацией на три-пять дней,
затем отфильтровать ее, и забрать информацию о погоде на сегодня, завтра, послезавтра примерно на 12 часов дня. Пока обрабатываются данные показать анимированный лоадер (можно просто gif картинку, 
но желательно какую-нибудь svg-анимацию).
7) Необходимо, чтобы WheatherWidget был совершенно независимый модуль/класс, т.е. отдельный файл, который можно подключить к себе на страницу и запустить new WheatherWidget().getWeather().
8) Использовать promise для обработки полученных данных (fetch или  async/await).
 */



// const apiKey = '807c38438480cc9371714293aa8eb1f0';
// const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${apiKey}`;
// const apiLocation = document.getElementById('location');

// fetch(apiCall)
//   .then(response => response.json())
//   .then(data => printData(data))
//   .catch(error => console.log('Something went wrong. Sorry \n' + error));

// function printData(data) {
//   apiLocation.innerHTML = JSON.stringify(data);
//   console.log(data);
// }

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

class WeatherWidget {
  constructor () {
    this.apiKey = '807c38438480cc9371714293aa8eb1f0';
    this.apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=`;
    this.cityName = 'Minsk';
  }
  getWeather() {
    console.log('getWeather!');
    return new Promise((resolve, reject) => {
      let url = `${this.apiUrl}${this.apiKey}`;
      fetch(url)
      .then(response => response.json())
      .then(data => {
        this.print(data);
        resolve('Weather data resolved');
      })
      .catch(error => reject('Weather data rejected in: '+error));
    })
  }

  print(data) {
    let weatherContainer = document.createElement('div');
    weatherContainer.innerHTML = '<div style="display: flex;"><p style="font-size: 20px;font-family: monospace;">This moment in the window: '+data.weather[0].main+
                                 '</p>'+'<img src="https://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png"/></div><hr/>';
    weatherContainer.style = 'position: absolute; top: 2%; right: 2%; word-wrap: break-word; width: 350px; color: white; border-radius: 20px; height: 300px; background-color: #818080; overflow:hidden; border: 1px solid #ccc; padding: 10px;';
    //alert(JSON.stringify(data.weather[main']));
    console.log(data.weather[0])
    document.body.append(weatherContainer);
  }
  getForecast() {
    
  }

}


let WWidget = new WeatherWidget().getWeather();
console.log(WWidget)