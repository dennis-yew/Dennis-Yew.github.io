let timer;
let isRunning = false;
let timeLeft = 1500; // 25 minutes in seconds
let defaultTime = 1500;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workButton = document.getElementById('work');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                alert('Time is up!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = defaultTime;
    updateTimerDisplay();
    isRunning = false;
}

function setTimer(seconds) {
    timeLeft = seconds;
    defaultTime = seconds;
    updateTimerDisplay();
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

workButton.addEventListener('click', () => setTimer(1500)); // 25 minutes
shortBreakButton.addEventListener('click', () => setTimer(300)); // 5 minutes
longBreakButton.addEventListener('click', () => setTimer(900)); // 15 minutes
