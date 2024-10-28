// 获取当前轮回次数（如果有）
export function getCycleCount() {
    let count = localStorage.getItem('pomodoroCycleCount');
    return count ? parseInt(count) : 0;  // 如果没有，初始化为0
}
export function resetCycleCount(){
    localStorage.setItem('pomodoroCycleCount', 0);  // 重置LocalStorage
}
// 更新轮回次数
function updateCycleCount() {
    let currentCount = getCycleCount();
    currentCount++;
    localStorage.setItem('pomodoroCycleCount', currentCount);  // 更新LocalStorage
}

// 调用函数来更新每个周期
export function finishPomodoroCycle() {
    // 完成一个番茄钟周期后调用
    updateCycleCount();
    console.log("Current Tomato Clock Rounds: " + getCycleCount());
    return getCycleCount();
}

// 引入词库
import { wordBank } from '/assets/js/wordBank.js';

// 存放所有抽取的字
const daySentence = wordBank[calculateDaysSinceLaunch() % wordBank.length];
// 将字符串分割成单词数组
const words = daySentence.split(' ');

export function updateSentence(){
    let currentDistanceDays = calculateDaysSinceLaunch();
    // 获取本地日期
    let storedDistanceDays = localStorage.getItem('distanceDays') ? parseInt(localStorage.getItem('distanceDays')) : 0;
    
    // 检查当前句子是否不同
    if (currentDistanceDays !== storedDistanceDays) {
        // 更新内置记录
        localStorage.setItem('distanceDays', currentDistanceDays);
        // 重置番茄钟轮回次数
        resetCycleCount();
        console.log("updateSentence, days:" + currentDistanceDays);
    }else{
        console.log("no need to updateSentence, days:" + storedDistanceDays);
    }
}



export function calculateDaysSinceLaunch() {
    // 网站开放日期 (2023-12-27)
    const launchDate = new Date('2023-12-27');
    // 获取当前日期
    const currentDate = new Date();
    // 计算差值 (毫秒)
    const timeDifference = currentDate - launchDate;
    // 将毫秒转换为天数
    const daysSinceLaunch = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysSinceLaunch;
}

// 游戏开始
export function startGame(CycleCount) {
    console.log(daySentence);
    // 截取前 CycleCount 个单词
    let slicedArray = "";
    if (CycleCount == 0) {
        // 如果 CycleCount 为 0，可以处理一些逻辑或返回空字符串
        return slicedArray;
    } else {
        if (CycleCount >= words.length) {
            // 获取到索引 words.length 的元素 (不包含 words.length)
            slicedArray = words.slice(0, words.length).join(''); // 无分隔符拼接
        } else {
            // 获取到索引 CycleCount 的元素 (不包含 CycleCount)
            slicedArray = words.slice(0, CycleCount).join(''); // 无分隔符拼接
        }
    }
    return slicedArray; // 返回拼接后的字符串
}