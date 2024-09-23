// script.js


function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
        // for Internet Explorer 8 and below. For Blogger, you should use &amp;&amp; instead of &&.
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
$(document).ready(function () { // when the document has completed loading
    $(document).mouseup(function (e) { // attach the mouseup event for all div and pre tags
        setTimeout(function () { // When clicking on a highlighted area, the value stays highlighted until after the mouseup event, and would therefore stil be captured by getSelection. This micro-timeout solves the issue. 
            responsiveVoice.cancel(); // stop anything currently being spoken
            responsiveVoice.speak(getSelectionText()); //speak the text as returned by getSelectionText
        }, 1);
    });
});

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
