const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greetingBox = document.querySelector("#greeting-box");
const greeting = document.querySelector("#greeting");
const logoutButton = document.querySelector("#logout-button");

const clock = document.querySelector("#clock");

const todoSection = document.querySelector("#todo-section");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.querySelector("#todo-list");

const quote = document.querySelector("#quote");
const weather = document.querySelector("#weather");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
const TODOS_KEY = "todos";

let todos = [];

/* 1. 실시간 시계 */
function getClock() {
  const date = new Date();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);

/* 2. localStorage 로그인 */
function paintGreeting(username) {
  greeting.innerText = `Hello, ${username}`;
  greetingBox.classList.remove(HIDDEN_CLASSNAME);
  todoSection.classList.remove(HIDDEN_CLASSNAME);
  loginForm.classList.add(HIDDEN_CLASSNAME);
}

function onLoginSubmit(event) {
  event.preventDefault();

  const username = loginInput.value.trim();

  if (username === "") return;

  localStorage.setItem(USERNAME_KEY, username);
  paintGreeting(username);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  // 처음 접속하면 로그인 화면이 먼저 보입니다.
  // 이름에 hoon을 입력하면 localStorage에 저장되고,
  // 새로고침 후에도 로그인 상태가 유지됩니다.
  loginForm.classList.remove(HIDDEN_CLASSNAME);
} else {
  paintGreeting(savedUsername);
}

function onLogoutClick() {
  localStorage.removeItem(USERNAME_KEY);
  greetingBox.classList.add(HIDDEN_CLASSNAME);
  todoSection.classList.add(HIDDEN_CLASSNAME);
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginInput.value = "";
}

loginForm.addEventListener("submit", onLoginSubmit);
logoutButton.addEventListener("click", onLogoutClick);

/* 3. localStorage 투두리스트 */
function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;

  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const span = document.createElement("span");
  span.innerText = newTodo.text;

  const button = document.createElement("button");
  button.innerText = "×";
  button.addEventListener("click", deleteTodo);

  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();

  const newTodoText = todoInput.value.trim();

  if (newTodoText === "") return;

  todoInput.value = "";

  const newTodoObj = {
    text: newTodoText,
    id: Date.now(),
  };

  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}

/* 4. 랜덤 배경 이미지 */
const images = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];
document.body.style.backgroundImage = `url(img/${chosenImage})`;

/* 5. 랜덤 문구 */
const quotes = [
  "천천히 해도 된다. 멈추지만 않으면 된다.",
  "오늘의 작은 완료가 내일의 여유를 만든다.",
  "공부는 배신하지 않는다. 기록하지 않으면 배신한다.",
  "지금 쌓는 1시간이 미래의 선택지를 만든다.",
  "hoon, 오늘도 하나만 끝내자.",
];

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
quote.innerText = todaysQuote;

/* 6. 날씨와 위치 */
// OpenWeather API 키를 발급받아 아래 문자열에 넣으세요.
// 예: const API_KEY = "abc123...";
const API_KEY = "";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  if (API_KEY === "") {
    weather.innerHTML = `
      <span>📍 위치 확인 완료</span>
      <strong>날씨 API 키 필요</strong>
    `;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const city = data.name;
      const temp = Math.round(data.main.temp);
      const condition = data.weather[0].description;

      weather.innerHTML = `
        <span>${city}</span>
        <strong>${temp}°C / ${condition}</strong>
      `;
    })
    .catch(() => {
      weather.innerText = "날씨 정보를 불러오지 못했습니다.";
    });
}

function onGeoError() {
  weather.innerText = "위치 권한을 허용하면 날씨가 표시됩니다.";
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
