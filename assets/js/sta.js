// script.js

document.addEventListener('DOMContentLoaded', function () {
    const speechForm = document.getElementById('speechForm');
    const textInput = document.getElementById('textInput');

    speechForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 防止表单默认提交行为

        const text = textInput.value.trim();

        if (text === "") {
            alert("请输入你想阅读的文本！");
            return;
        }

        // 选择语音类型：美式英语 'US English Female' 或 英式英语 'UK English Female'
        const selectedVoice = 'UK English Male'; // 你可以根据需要更改

        // 使用 ResponsiveVoice 朗读文本
        responsiveVoice.speak(text, selectedVoice);
    });
});
