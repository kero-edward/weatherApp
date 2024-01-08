"use strict";
var currentLocation = new XMLHttpRequest();
const baseURL = 'https://api.weatherapi.com/v1/forecast.json';
const API_Key = '?key=16b2f00309554f6fbab00424240401';
const daysNumber = '&days=7';
var latitude = '';
var longitude = '';

const searchInput = document.querySelector('#mainSection .searchInput .searchInputBar');
const todayWeatherDay = document.querySelector('.weatherInfo .card.firstDay .card-header #day');
const tomorrowWeatherDay = document.querySelector('.weatherInfo .card.secondDay .card-header #day');
const afterTomorrowWeatherDay = document.querySelector('.weatherInfo .card.thirdDay .card-header #day');
const todayWeatherDate = document.querySelector('.weatherInfo .card.firstDay .card-header #date');
const weatherLocation = document.querySelector('.weatherInfo .card.firstDay .card-body .card-title.locationName');
const todayDegree = document.querySelector('.weatherInfo .card.firstDay .card-body .degree .num span');
const highestTomorrowDegree = document.querySelector('.weatherInfo .card.secondDay .card-body .degreeNum .highest span');
const highestAfterTomorrowDegree = document.querySelector('.weatherInfo .card.thirdDay .card-body .degreeNum .highest span');
const smallestTomorrowDegree = document.querySelector('.weatherInfo .card.secondDay .card-body .degreeNum .smallest span');
const smallestAfterTomorrowDegree = document.querySelector('.weatherInfo .card.thirdDay .card-body .degreeNum .smallest span');
const todayWeatherIcon = document.querySelector('.weatherInfo .card.firstDay .card-body .degree .icon');
const tomorrowWeatherIcon = document.querySelector('.weatherInfo .card.secondDay .card-body .degree .icon');
const afterTomorrowWeatherIcon = document.querySelector('.weatherInfo .card.thirdDay .card-body .degree .icon');
const todayWeatherWord = document.querySelector('.weatherInfo .card.firstDay .card-body .describeWord');
const tomorrowWeatherWord = document.querySelector('.weatherInfo .card.secondDay .card-body .describeWord');
const afterTomorrowWeatherWord = document.querySelector('.weatherInfo .card.thirdDay .card-body .describeWord');
const todayHotness = document.querySelector('.weatherInfo .card.firstDay .card-body .info .hotness span');
const todayWindSpeed = document.querySelector('.weatherInfo .card.firstDay .card-body .info .windSpeed span');
const todayWindDirection = document.querySelector('.weatherInfo .card.firstDay .card-body .info .windDirection span');
const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
var weatherArray = [];

const successCallback = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    currentLocation.open('GET', `${baseURL}${API_Key}&q=${latitude},${longitude}${daysNumber}`);
    currentLocation.send();
    currentLocation.addEventListener('loadend', function () {
        if (currentLocation.status == 200) {
            weatherArray.push(JSON.parse(currentLocation.response));
            getWeatherData();
        }
    });
};

const errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);



function searchWeather() {
    var searchedLocation = new XMLHttpRequest();
    searchedLocation.open('GET', `${baseURL}${API_Key}&q=${searchInput.value}${daysNumber}`);
    searchedLocation.send();
    searchedLocation.addEventListener('loadend', function () {
        if (searchedLocation.status == 200) {
            weatherArray = []
            weatherArray.push(JSON.parse(searchedLocation.response));
            getWeatherData();
        }
    });
}

function getWeatherData() {
    const todayWeatherFullDate = new Date(weatherArray[0].location.localtime);
    const tomorrowWeatherFullDate = new Date(weatherArray[0].forecast.forecastday[1].date);
    const afterTomorrowWeatherFullDate = new Date(weatherArray[0].forecast.forecastday[2].date);
    todayWeatherDay.innerHTML = days[todayWeatherFullDate.getDay()];
    todayWeatherDate.innerHTML = todayWeatherFullDate.toDateString().slice(4,);
    weatherLocation.innerHTML = weatherArray[0].location.name;
    todayDegree.innerHTML = weatherArray[0].current.temp_c;
    todayWeatherIcon.innerHTML = `<img src="${weatherArray[0].current.condition.icon}" alt="${weatherArray[0].current.condition.text}">`;
    todayWeatherWord.innerHTML = weatherArray[0].current.condition.text;
    todayWindSpeed.innerHTML = weatherArray[0].current.wind_kph;
    todayWindDirection.innerHTML = weatherArray[0].current.wind_dir;
    tomorrowWeatherDay.innerHTML = days[tomorrowWeatherFullDate.getDay()];
    afterTomorrowWeatherDay.innerHTML = days[afterTomorrowWeatherFullDate.getDay()];
    tomorrowWeatherIcon.innerHTML = `<img src="${weatherArray[0].forecast.forecastday[1].day.condition.icon}" alt="${weatherArray[0].forecast.forecastday[1].day.condition.text}">`;
    tomorrowWeatherWord.innerHTML = weatherArray[0].forecast.forecastday[1].day.condition.text;
    highestTomorrowDegree.innerHTML = weatherArray[0].forecast.forecastday[1].day.maxtemp_c;
    smallestTomorrowDegree.innerHTML = weatherArray[0].forecast.forecastday[1].day.mintemp_c;
    afterTomorrowWeatherIcon.innerHTML = `<img src="${weatherArray[0].forecast.forecastday[2].day.condition.icon}" alt="${weatherArray[0].forecast.forecastday[2].day.condition.text}">`;
    afterTomorrowWeatherWord.innerHTML = weatherArray[0].forecast.forecastday[2].day.condition.text;
    highestAfterTomorrowDegree.innerHTML = weatherArray[0].forecast.forecastday[2].day.maxtemp_c;
    smallestAfterTomorrowDegree.innerHTML = weatherArray[0].forecast.forecastday[2].day.mintemp_c;
}