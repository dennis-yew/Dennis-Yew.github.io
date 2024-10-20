// 获取页面元素
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');

let countdownInterval;
let timeLeft = 25 * 60; // 25分钟，单位为秒
let isRunning = false;

// 格式化时间
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return {
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds
    };
}

// 更新显示的时间
function updateDisplay() {
    const { minutes, seconds } = formatTime(timeLeft);
    minutesDisplay.textContent = minutes;
    secondsDisplay.textContent = seconds;
}

// 开始或暂停计时器
function startStopTimer() {
    if (isRunning) {
        clearInterval(countdownInterval);  // 暂停
        startStopButton.textContent = 'Start';  // 改变按钮文本为“Start”
        startStopButton.classList.remove('pause');  // 移除暂停样式，恢复为绿色
    } else {
        countdownInterval = setInterval(() => {
            timeLeft--;  // 每秒递减时间
            updateDisplay();

            // 倒计时结束时停止计时
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                isRunning = false;
                startStopButton.textContent = 'Start';  // 恢复按钮为“Start”
                startStopButton.classList.remove('pause');  // 恢复为绿色
                timeLeft = 0;
                updateDisplay();
            }
        }, 1000);
        startStopButton.textContent = 'Stop';  // 改变按钮文本为“Stop”
        startStopButton.classList.add('pause');  // 变为红色的停止按钮
    }
    isRunning = !isRunning;  // 切换运行状态
}

// 重置计时器
function resetTimer() {
    clearInterval(countdownInterval);  // 停止计时
    isRunning = false;
    timeLeft = 25 * 60;  // 重置时间为25分钟
    updateDisplay();  // 更新显示
    startStopButton.textContent = 'Start';  // 将按钮改为“Start”
    startStopButton.classList.remove('pause');  // 恢复为绿色
}

// 事件监听
startStopButton.addEventListener('click', startStopTimer);
resetButton.addEventListener('click', resetTimer);

// 初始化显示
updateDisplay();
