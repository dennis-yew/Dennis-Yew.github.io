import { getCycleCount,startGame,updateSentence } from "./Timer.js";

// 选择 body 下所有 class 为 'pomodoro-timer' 的 div 元素
// 创建组件实例并指定父元素

// 载入 Live2D 模型
function loadLive2DModel() {
    const TimerContainer = document.querySelector('body > div.pomodoro-timer');
    // 模型载入设置
    let oml2d = OML2D.loadOml2d({
        sayHello: true,
        primaryColor: "#ff958b",
        parentElement: TimerContainer,
        mobileDisplay: true,
        statusBar: {
            // 在这里进行配置
            disable: true,
        },
        menus: {
            disable: true,
            // 在这里配置
        },
        tips: {
            messageLine: 4,
            idleTips: { wordTheDay: !1, message: [], duration: 5e3, interval: 1e4, priority: 2 },
            welcomeTip: {
                message: {
                    daybreak: "早上好呀！新的大冒险就要开始啦！嘿嘿，可莉准备好了哦~",
                    morning: "早安早安！今天要去哪里探险呢？可莉已经迫不及待了！",
                    noon: "诶，中午了！要吃好吃的午饭吗？吃饱了才有力气炸鱼呢~",
                    afternoon: "下午好呀，这个时候有点困了呢…不过再玩一会儿也没关系吧？",
                    dusk: "天快黑啦~ 要小心，不要踩到可莉的蹦蹦炸弹哦！",
                    night: "晚上好！可莉今天玩得可开心啦~不过也要早点休息哦！",
                    lateNight: "已经这么晚了嘛？可莉有点困了…不过还是要说，晚安啦！",
                    weeHours: "咦？还没睡吗？琴团长会像对可莉一样，‘禁闭’你的！"
                },
                duration: 6e3, priority: 2
            },
            style: {
                "left": "110%",
                "top": "20%",
                "width": "250px",
            },
            mobileStyle: {
                "left": "150px",
                "top": "5%",
                "width": "200px",
            }
        },
        models: [
            {
                path: '/assets/model/klee/klee.model3.json',
                position: [30, 0],
                scale: 0.06,
                stageStyle: {
                    "position": "relative",
                    "top": "-167%", /* 控制图片与闹钟的重叠程度，向上偏移 */
                    "transform": "translateX(-50%)", /* 确保图片水平居中 */
                    "width": "300px", /* 设定图片的宽度，可以根据需要调整 */
                    "z-index": "1" /* 图片位于闹钟的后面 */
                },
                mobilePosition: [10, 70],
                mobileScale: 0.04,
                mobileStageStyle: {
                    "position": "relative",
                    "top": "-39%",
                    "left": "-11%",
                    "height": "250px",
                    "width": "210px",
                    "z-index": "1"

                }
            },
        ]
    });
    console.log(oml2d);
    console.log(oml2d.models.options.models[oml2d.modelIndex].path)

    // 点击互动事件
    clickEvent();
    function clickEvent() {
        const omlcanvas = document.querySelector("#oml2d-canvas");
        if (omlcanvas) { // 确保 canvas 元素存在
            // 在这里调用 switchRandomExpression 函数，传入 modelConfig
            omlcanvas.addEventListener("click", switchRandomExpression);
            // 监听 touchstart 事件
            omlcanvas.addEventListener('touchstart', function (event) {
                switchRandomExpression();
                // 阻止 touch 事件后触发 click 事件
                event.preventDefault()
            });
        } else {
            console.error("omlcanvas 元素未找到");
        }
    }
    // 音频播放控件
    let currentAudio = null;  // 用于存储当前播放的音频
    function playAudio(src) {
        // 如果有正在播放的音频，先停止它
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;  // 重置到开头
        }

        // 创建新的音频实例并播放
        currentAudio = new Audio(src);
        // 设置音量，默认值为1（最大音量），可以通过传参调整
        currentAudio.volume = 1;
        currentAudio.play();
    }

    function switchExpression(ExpressionIndex) {
        const currentmodel = oml2d.models.model.internalModel;
        if (!currentmodel.motionManager.expressionManager.setExpression(ExpressionIndex)) {
            console.log("expression doesn't Exist");
        }
    }
    // 切换到随机表情
    function switchRandomExpression() {
        const currentmodel = oml2d.models.model.internalModel;
        console.log(currentmodel.motionManager.motionGroups);
        console.log(oml2d.models.currentModelOptions.path);
        oml2d.models.playRandomMotion('TapBody');
        if (!currentmodel.motionManager.expressionManager.setRandomExpression()) {
            console.log("expression doesn't Exist");
        }
    }

    TimerEventListener();
    function TimerEventListener() {
        // 监听 window 上的自定义事件，并获取数据
        // TimerStart
        window.addEventListener('TimerStart', (event) => {
            console.log('Received event data:', event.detail);  // 读取 file1.js 传递的数据
            switchExpression(event.detail);
            oml2d.clearTips();
            const sentence = "好耶！是大冒险！";
            oml2d.tipsMessage(sentence, 6000, 2);
            playAudio('/assets/model/klee/sounds/大冒险.mp3');
        });
        // TimerPause
        window.addEventListener('TimerPause', (event) => {
            console.log('Received event data:', event.detail);  // 读取 file1.js 传递的数据
            switchExpression(event.detail);
            oml2d.clearTips();
            const sentence = "玩累了。。。有点晕。。。";
            oml2d.tipsMessage(sentence, 4000, 2);
            playAudio('/assets/model/klee/sounds/休息.mp3');

        });
        // TimerEnd
        window.addEventListener('TimerEnd', (event) => {
            console.log('Received event data:', event.detail.eventData);  // 读取 file1.js 传递的数据
            switchExpression(event.detail.eventData);
            console.log(event.detail.key);
            oml2d.clearTips();
            const sentence = "可莉又找到新的宝物啦! " + "关键词：[" + event.detail.key + "]";
            oml2d.tipsMessage(sentence, 10000, 2);
            playAudio('/assets/model/klee/sounds/宝物.mp3');
            TreasureKeys(event.detail.keywords);
        });
        // AfterEndTimerEnd
        window.addEventListener('AfterEndTimerEnd', (event) => {
            console.log('Received event data:', event.detail);  // 读取 file1.js 传递的数据
            switchExpression(event.detail);
            oml2d.clearTips();
            const sentence = "火力全开!";
            oml2d.tipsMessage(sentence, 4000, 2);
            playAudio('/assets/model/klee/sounds/火力全开.mp3');

        });
        // ChangeTimer
        window.addEventListener('ChangeTimer', (event) => {
            console.log('Received event data:', event.detail);  // 读取 file1.js 传递的数据
            switchExpression(event.detail);
            oml2d.clearTips();
            const sentence = "可莉来帮忙~";
            oml2d.tipsMessage(sentence, 4000, 2);
            playAudio('/assets/model/klee/sounds/来帮忙.mp3');

        });
    }
}

// 根据索引切换表情


export function TreasureKeys(keywords) {
    const keywordElement = document.getElementById('keywords');
    keywordElement.textContent = " | keys " + keywords;
}

// 页面加载完后执行
window.onload = function () {
    loadLive2DModel();
    console.log("Pomodoro_Rounds: " + getCycleCount());
    updateSentence();
    TreasureKeys(startGame(getCycleCount()));
    // setTimeout(loadLive2DModel,6000); 延时加载模型
    // 页面加载时显示当前轮回次数

}