const weather = document.querySelector(".js-weather");

const API_KEY = "2b437231c0fb02492a2bafd5546457f0";
const COORDS = "coords";
//날씨 정보를 불러오는 함수
function getWeather(lat, lng) {
  fetch(
    //데이터를 얻을 때는 fetch를 사용 가져올 데이터가 들어가면 됨 (https://를 붙이기)
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ) //network패널은 우리가 request한 내용을 보여줌
    .then(function (response) {
      //then은 기본적으로 함수를 호출하는 것이지만 데이터가 완전히 들어온 다음 호출하는 것임
      return response.json(); //response는 network정보만 보이기 때문에 json()을 사용
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `temp:${temperature}℃ @${place}`;
    });
}
//지역저장소에 저장하는 함수
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
//지역정보를 obj로 저장한 후 지역저장소에 저장하고 날씨정보를 불러옴
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
//지역 정보를 받아오지 못할 경우 실행
function handleGeoError() {
  console.log("can't access geo location");
}
//지역 정보를 요청
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}
//지역저장소에서 값을 받아 값이 없으면 지역 정보를 요청하고 값이 있으면 출력하는 함수
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
