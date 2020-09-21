const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

//지역 저장소에 저장하는 함수
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

//이벤트가 들어오면 출력하고 저장하는 함수
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

//form을 보여주며 이름을 묻는 함수
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

//form을 보여주지 않으며 출력을 해주는 함수
function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `hello ${text}`;
}

//지역저장소에서 값을 받아 값이 없으면 이름을 물어보고 값이 있으면 출력하는 함수
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
