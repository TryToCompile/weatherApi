// //let apiCall = 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={5460396124d03105c9daf93bcc5f456a}';
// //const apiUrl = 'https://api.openweathermap.org/data/2.5/';
// const apiKey = '{807c38438480cc9371714293aa8eb1f0}';
// const apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid='+apiKey;
// //const apiKeyFromVideo = '{5460396124d03105c9daf93bcc5f456a}';
// //const apiQuery = apiUrl+'/weather?id='+625144+'&units=metric&lang=ru&appid='+apiKey;
// const ApiLocation = document.getElementById('location');

// function callApi (apiCall) {

// }


// fetch(apiCall)
// //fetch(apiQuery)
// .then(Response => Response.json())
// .then(data => printData(data))
// .catch(error => console.log('Something went wrong. Sorry \n'+error));

// function printData (data) {
//     ApiLocation.innerHTML = JSON.stringify(data);
//     console.log(data);
// }



const apiKey = '807c38438480cc9371714293aa8eb1f0';
const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`;
const apiLocation = document.getElementById('location');

fetch(apiCall)
  .then(response => response.json())
  .then(data => printData(data))
  .catch(error => console.log('Something went wrong. Sorry \n' + error));

function printData(data) {
  apiLocation.innerHTML = JSON.stringify(data);
  console.log(data);
}