const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector("#board");
let time = 0,
    score = 0;
const circle = document.createElement('div'),
      circle.classList.add('circle');
let musicStart = document.createElement('div'),
      musicStart.classList.add('music');

  startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');

  });

  timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
     time = parseInt((event.target.getAttribute('data-time')));
     screens[1].classList.add('up');
      musicStart.innerHTML = ` 
     <audio class="musicAudio"src="//song.lemuzika.pro/download/33b63432b6b4b434318937313503328d8d2d01/28a6dbef539975ab90e840d834103aa3/%D0%B4%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F%20-%20%D0%B2%D0%B5%D1%81%D0%B5%D0%BB%D0%B0%D1%8F%20%D0%B1%D0%B5%D0%B7%20%D1%81%D0%BB%D0%BE%D0%B2.mp3" autoplay loop ></audio>
    `;
      startBtn.append(musicStart);
     StartGame();
    }
  });


board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
  createRandomCircle(); 
}
});


let timeStart; 
function StartGame() {
  setTime(time);
  createRandomCircle();
  timeStart = setInterval(decreaseTime, 1000);
}

function decreaseTime() { // Обработка времени
  if (time === 0 ) {
    finishGame();
  }else{
    let current = --time;
    if (current < 10){
      current = `0${current}`;
    }
    setTime(current);
  }
}
function setTime(value) { // Показ времени
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() { 
  musicStart.remove();
  timeEl.parentNode.classList.add('hide');
  clearInterval(timeStart);
  circle.remove();

  let ScoreYou = document.createElement('div');
  ScoreYou.classList.add('score_you');
  ScoreYou.innerHTML = `<h1 class="score">Счет: <span class="primary">${score}</span></h1>`;
 board.append(ScoreYou);

  let restartDiv = document.createElement('div');
  restartDiv.classList.add('restart_div');
  board.append(restartDiv);

  let restarBtn = document.createElement('button');
  restarBtn.classList.add('restart');
  restarBtn.innerHTML = `Restart`;
  restartDiv.append(restarBtn);

restartDiv.addEventListener('click', () => {
  screens[1].classList.remove('up');
  score = 0;
  timeEl.parentNode.classList.remove('hide');
  deletInBoard(restartDiv, restarBtn, ScoreYou); 

  });
}

function deletInBoard(q,w,e) {
 q.remove();
  w.remove();
  e.remove();
}

let colors = ['red', 'blue', 'yellow', '#fff', 'pink', 'green', 'purple', 'Fuchsia', 'Lime','Navy'];

function createRandomCircle() { // Созадние кругов
  const size = getRandomNumber(10, 60);
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size),
        y = getRandomNumber(0 , height - size);

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`; 
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = getRandomColor();
  board.append(circle);
}


function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length + getRandomNumber(0,5) + 0.5)
  return colors[index];
}

function getRandomNumber(min, max) {
 return Math.round(Math.random() * (max - min) + min);
}
