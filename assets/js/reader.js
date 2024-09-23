// script.js

document.addEventListener('DOMContentLoaded', function () {
    const speechForm = document.getElementById('speechForm');
    const textInput = document.getElementById('textInput');
    const voiceSelect = document.getElementById('voiceSelect');
    const speedRange = document.getElementById('speedRange');
    const speedValue = document.getElementById('speedValue');

    // 更新语速显示
    speedRange.addEventListener('input', function () {
        // 将滑块的值显示到 span 中
        speedValue.textContent = speedRange.value;
    });

    speechForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 防止表单默认提交行为

        const text = textInput.value.replace(/\n/g, '');
        const selectedVoice = voiceSelect.value;
        const selectedRate = parseFloat(speedRange.value);



        if (text === "") {
            alert("请输入你想阅读的文本！");
            return;
        }
        // 获取选定的语音类型

        // 检查 ResponsiveVoice 是否支持所选语音
        if (responsiveVoice.voiceSupport(selectedVoice)) {
            // 使用 ResponsiveVoice 朗读文本，设置语速
            responsiveVoice.speak(text, selectedVoice, { rate: selectedRate });
        } else {
            alert("所选的语音不受支持。请选择其他语音。");
        }
    });
});
