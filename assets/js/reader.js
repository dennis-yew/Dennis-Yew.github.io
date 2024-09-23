// script.js

document.addEventListener('DOMContentLoaded', function () {
    const speechForm = document.getElementById('speechForm');
    const textInput = document.getElementById('textInput');
    const voiceSelect = document.getElementById('voiceSelect');

    speechForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 防止表单默认提交行为

        const text = textInput.value.trim();

        if (text === "") {
            alert("请输入你想阅读的文本！");
            return;
        }
        // 获取选定的语音类型
        const selectedVoice = voiceSelect.value;

        // 检查 ResponsiveVoice 是否支持所选语音
        if (responsiveVoice.voiceSupport(selectedVoice)) {
            // 使用 ResponsiveVoice 朗读文本
            responsiveVoice.speak(text, selectedVoice);
        } else {
            alert("所选的语音不受支持。请选择其他语音。");
        }
    });
});
