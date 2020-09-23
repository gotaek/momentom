const body = document.querySelector("body");

const IMG_NUMBER = 3;
//백그라운드를 설정
function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}
//랜덤넘버를 가져오는 함수
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}
//랜덤 넘버를 가져오고 그 숫자를 통해 백그라운드 설정
function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
