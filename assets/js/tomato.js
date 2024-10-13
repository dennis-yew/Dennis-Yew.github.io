let timer;
let isRunning = false;
let is25Timer = true;
let timeLeft = 1500; // 25 minutes in seconds
let defaultTime = 1500;
let postEndTimer; // 新增：用于处理计时结束后5分钟的延迟触发
let startTime;
let expectedEndTime;
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workButton = document.getElementById('work');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');


// 更新计时器的显示
function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

// 开始计时
function startTimer() {
    // 确保计时器为零时不开始计时
    if (timeLeft === 0) {
        timeLeft = 1500;
        updateTimerDisplay();
    }
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now(); // 获取当前时间戳
        expectedEndTime = startTime + timeLeft * 1000; // 预计结束时间 = 当前时间 + 剩余秒数

        timer = setInterval(() => {
            let currentTime = Date.now(); // 获取当前时间戳
            timeLeft = Math.round((expectedEndTime - currentTime) / 1000); // 计算剩余秒数
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                alert('Time is up!'); // 计时结束时的提示

                // 新增：计时结束后触发的事件
                triggerEndEvent();

                // 新增：设置计时结束后5分钟触发的事件
                postEndTimer = setTimeout(() => {
                    triggerFiveMinutesAfterEnd();
                }, 5 * 60 * 1000); // 5分钟后触发
            }
        }, 1000);
    }

    // 新增：点击开始按钮时的触发事件
    triggerStartEvent();
}

// 暂停计时
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;

    // 新增：点击暂停按钮时的触发事件
    triggerPauseEvent();
}

// 重置计时器
function resetTimer() {
    clearInterval(timer);
    clearTimeout(postEndTimer); // 新增：清除5分钟的计时器
    timeLeft = defaultTime;
    updateTimerDisplay();
    isRunning = false;
    isworkTimer();
    triggerChangeTimer();
}

// 设置计时器时间
function setTimer(seconds) {
    clearInterval(timer);
    clearTimeout(postEndTimer); // 新增：重置时取消5分钟的触发
    timeLeft = seconds;
    defaultTime = seconds;
    isRunning = false;
    isworkTimer();
    updateTimerDisplay();
    triggerChangeTimer();
}

// 检查是否为番茄钟
function isworkTimer() {
    if (timeLeft == 5) {
        is25Timer = true;
    } else {
        is25Timer = false;
    }
    console.log("is this a 25 timer: " + is25Timer);
}


// ############################## 自定义触发事件 ##############################

// 自定义触发事件开始时触发
function triggerStartEvent() {
    console.log('Start button clicked');
    // 你可以在这里添加计时开始时需要执行的功能
    const eventData = 1; // maozi
    const event = new CustomEvent('TimerStart', { detail: eventData });
    window.dispatchEvent(event);  // 触发事件
}
// 自定义触发事件：暂停时触发
function triggerPauseEvent() {
    console.log('Pause button clicked');
    // 你可以在这里添加其他暂停时需要执行的功能
    const eventData = 3; // OO
    const event = new CustomEvent('TimerPause', { detail: eventData });
    window.dispatchEvent(event);  // 触发事件

}
// 自定义触发事件：计时结束时触发
function triggerEndEvent() {
    console.log('Timer ended');
    if (is25Timer) {
        const Gameindex = finishPomodoroCycle();
        // 可以在这里添加25计时结束后的其他功能
        const eventData = 5; // ><
        const newWord = wordBank[Gameindex-1];
        const keywords = startGame(Gameindex);
        const event = new CustomEvent('TimerEnd', { detail: { eventData: eventData, keys: newWord, keywords: keywords} });
        window.dispatchEvent(event);  // 触发事件
    } else {
        // #####?
        const eventData = 5; // ><
        const newWord = " ";
        const event = new CustomEvent('TimerEnd', { detail: { eventData: eventData, keys: newWord } });
        window.dispatchEvent(event);  // 触发事件
    }
}
// 自定义触发事件：计时结束后5分钟触发
function triggerFiveMinutesAfterEnd() {
    console.log('5 minutes after timer ended');
    // 在这里添加计时结束后5分钟触发的功能
    const eventData = 4; //xingxing
    const event = new CustomEvent('AfterEndTimerEnd', { detail: eventData });
    window.dispatchEvent(event);  // 触发事件
}
// 自定义触发事件：计时结束后5分钟触发

function triggerChangeTimer() {
    console.log('ChangeTimer');
    // 在这里添加改变时间的功能
    const eventData = 2; //maomao
    const event = new CustomEvent('ChangeTimer', { detail: eventData });
    window.dispatchEvent(event);  // 触发事件
}


// ################################ 页面内事件监听 ############################
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

workButton.addEventListener('click', () => setTimer(5)); // 25 minutes
shortBreakButton.addEventListener('click', () => setTimer(300)); // 5 minutes
longBreakButton.addEventListener('click', () => setTimer(900)); // 15 minutes


// 点击暂停按钮时触发事件：
// 在 pauseTimer 函数中，新增了 triggerPauseEvent() 函数，它会在暂停按钮被点击时调用。你可以在该函数中实现你想要的功能。

// 计时结束后触发事件：
// 在 startTimer 函数中，计时结束时调用了 triggerEndEvent() 函数。这个函数在倒计时结束时触发，你可以在这里添加任何需要执行的功能。

// 计时结束后过 5 分钟触发事件：
// 使用 setTimeout 在计时结束时启动一个 5 分钟的计时器，5 分钟后调用 triggerFiveMinutesAfterEnd() 函数。这个函数会在 5 分钟后触发你定义的事件。


// 获取当前轮回次数（如果有）
function getCycleCount() {
    let count = localStorage.getItem('pomodoroCycleCount');
    return count ? parseInt(count) : 0;  // 如果没有，初始化为0
}

// 更新轮回次数
function updateCycleCount() {
    let currentCount = getCycleCount();
    currentCount++;
    localStorage.setItem('pomodoroCycleCount', currentCount);  // 更新LocalStorage
}

// 调用函数来更新每个周期
function finishPomodoroCycle() {
    // 完成一个番茄钟周期后调用
    updateCycleCount();
    console.log("Current Tomato Clock Rounds: " + getCycleCount());
    return getCycleCount();
}

// 页面加载时显示当前轮回次数
window.onload = function () {
    console.log("Current Tomato Clock Rounds: " + getCycleCount());
    return getCycleCount();
}



// 小彩蛋
// 字库
// const wordBank = ['去','爱', '去','创造', '并','最终', '一起','燃烧'];
// const wordBank = [
//     "No mistakes", "in the tango", "not like", "life", 
//     "It's simple",  "That's", "what makes", "the tango", "so great", 
//     "If you", "make a mistake", "get", "all", "tangled", "up"];
const wordBank = [
    "J", "u", "m", "p",
    "Y", "o", "u","I"
    ];
// 随机抽取一个字
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
}

// 存放所有抽取的字
var keywords = startGame(getCycleCount());

// 游戏开始
function startGame(Gameindex) {
    let slicedArray = ' | keys';

    if (Gameindex == 0) {
        // 如果 Gameindex 为 0，可以处理一些逻辑或返回空字符串
        return slicedArray;
    } else {
        if (Gameindex >= wordBank.length) {
            // 获取到索引 wordBank.length 的元素 (不包含 wordBank.length)
            slicedArray = wordBank.slice(0, wordBank.length).join(''); // 无分隔符拼接
            slicedArray = ' | keys: ' + slicedArray; // 在字符串前加 " | keys: "
        } else {
            // 获取到索引 Gameindex 的元素 (不包含 Gameindex)
            slicedArray = wordBank.slice(0, Gameindex).join(''); // 无分隔符拼接
            slicedArray = ' | keys: ' + slicedArray; // 在字符串前加 " | keys: "
        }
    }
    return slicedArray; // 返回拼接后的字符串
}