const timer = document.querySelector('.js-timer');
const start = document.querySelector('.js-play-btn');
const reset = document.querySelector('.js-reset-btn');
let isClicked = false;

let time = JSON.parse(localStorage.getItem('time'));
if(!time) {
    time = {
    hours:0,
    minutes : 0 ,
    seconds : 0
  };
  start.innerHTML = 'Start';
}else {
  start.innerHTML = 'Resume';
}

setTime();

function setTime() {
  timer.innerHTML = `${(time.hours < 10)?0:''}${time.hours}:${(time.minutes < 10)?0:''}${time.minutes}:${(time.seconds < 10)?0:''}${time.seconds}`;
}

function saveToStorage() {
  localStorage.setItem('time',JSON.stringify(time));
}
const stopWatch = () => {

  time.seconds++;
  if(time.seconds == 60) {
    time.seconds = 0;
    time.minutes++;
    if(time.minutes == 60) {
      time.minutes = 0;
      time.hours++;
    }
  }
  setTime();
  saveToStorage();

}

let intervalId = 0;
start.addEventListener('click',(event) => {
    
    if(isClicked) {
      clearInterval(intervalId);
      isClicked = false;
      start.innerHTML = 'Resume';
    }
    else{
      intervalId = setInterval(stopWatch,1000);
      isClicked = true;
      start.innerHTML = 'Pause';
      
    } 
});

reset.addEventListener('click',() => {
  clearInterval(intervalId);
  isClicked = false;
  timer.innerHTML = '00:00:00';
  start.innerHTML = 'Start';
  time.hours = time.minutes = time.seconds = 0;

  saveToStorage();
  localStorage.removeItem('time');
});