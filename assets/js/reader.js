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

        // 使用 ResponsiveVoice 朗读文本
        responsiveVoice.speak(text, selectedVoice);
    });
});
