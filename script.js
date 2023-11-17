let alarmTime;
let alarmInterval;
let audioElement;

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  document.getElementById('time').innerText = `${hours}:${minutes}:${seconds}`;
}

function setAlarm() {
  const alarmInput = document.getElementById('alarmTime');
  const alarmTimeString = alarmInput.value;

  if (alarmTimeString === "") {
    alert("Please set a valid alarm time.");
    return;
  }

  const currentDateTime = new Date();
  alarmTime = new Date(
    currentDateTime.getFullYear(),
    currentDateTime.getMonth(),
    currentDateTime.getDate(),
    parseInt(alarmTimeString.split(':')[0]),
    parseInt(alarmTimeString.split(':')[1]),
    0
  );

  const currentTime = new Date();
  const timeUntilAlarm = alarmTime - currentTime;

  if (timeUntilAlarm <= 0) {
    alert("Please set an alarm time in the future.");
    return;
  }

  audioElement = new Audio('mixkit-critical-alarm-1004.wav') // Replace 'alarm.mp3' with your audio file
  alarmInterval = setTimeout(startAlarm, timeUntilAlarm);
  document.getElementById('stopButton').disabled = false;
}

function startAlarm() {
  audioElement.play();
  document.getElementById('stopButton').disabled = false;
}

function stopAlarm() {
  audioElement.pause();
  audioElement.currentTime = 0;
  clearTimeout(alarmInterval);
  document.getElementById('stopButton').disabled = true;
}

setInterval(updateTime, 1000);
updateTime();
