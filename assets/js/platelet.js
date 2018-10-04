String.prototype.render = function (context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return this.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
};

var re = /x/;
re.toString = function () {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000, true);
    return '';
};

$('.platelet-tool .eye').click(function () {
    switchNightMode();
    showMessage('你会做眼保健操吗？', 3000, true);
});

let is_play = false

$('.platelet-tool .music').click(function () {
    let text = '播放血小板之歌了哦';
    if (is_play) {
        is_play = false;
        text = '停止播放血小板之歌了哦';
    } else {
        is_play = true;
        text = '播放血小板之歌了哦';
    }
    showMessage(text, 3000, true);
    playVoice('./assets/music/platelet.mp3', is_play)
});

$('.platelet-tool .comment').click(function () {
    showHitokoto();
});

$('.platelet-tool .camera').click(function () {
    showMessage('照好了嘛，是不是很可爱呢？', 5000, true);
    window.Live2D.captureName = 'Kesshouban.png';
    window.Live2D.captureFrame = true;
});

$.ajax({
    cache: true,
    url: "./assets/platelet-tips.json",
    dataType: "json",
    success: function (result) {
        $.each(result.mouseover, function (index, tips) {
            $(document).on("mouseover", tips.selector, function () {
                var text = tips.text;
                if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                text = text.render({ text: $(this).text() });
                showMessage(text, 3000);
            });
        });
        $.each(result.click, function (index, tips) {
            $(document).on("click", tips.selector, function () {
                var text = tips.text;
                if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                text = text.render({ text: $(this).text() });
                showMessage(text, 3000, true);
            });
        });
        $.each(result.seasons, function (index, tips) {
            var now = new Date();
            var after = tips.date.split('-')[0];
            var before = tips.date.split('-')[1] || after;

            if ((after.split('/')[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split('/')[0]) &&
                (after.split('/')[1] <= now.getDate() && now.getDate() <= before.split('/')[1])) {
                var text = tips.text;
                if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                text = text.render({ year: now.getFullYear() });
                showMessage(text, 6000, true);
            }
        });
    }
});

(function () {
    var text;
    var referrer = document.createElement('a');
    if (document.referrer !== '') {
        referrer.href = document.referrer;
    }

    var now = (new Date()).getHours();
    if (now > 23 || now <= 5) {
        text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
    } else if (now > 5 && now <= 7) {
        text = '早上好！一日之计在于晨，美好的一天就要开始了';
    } else if (now > 7 && now <= 11) {
        text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
    } else if (now > 11 && now <= 14) {
        text = '中午了，工作了一个上午，现在是午餐时间！';
    } else if (now > 14 && now <= 17) {
        text = '午后很容易犯困呢，今天的运动目标完成了吗？';
    } else if (now > 17 && now <= 19) {
        text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
    } else if (now > 19 && now <= 21) {
        text = '晚上好，今天过得怎么样？';
    } else if (now > 21 && now <= 23) {
        text = '已经这么晚了呀，早点休息吧，晚安~';
    } else {
        text = '嗨~ 快来逗我玩吧！';
    }
    showMessage(text, 6000);
})();

window.hitokotoTimer = window.setInterval(showHitokoto, 30000);

function showHitokoto() {
    $.getJSON('https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=55&encode=json', function (result) {
        showMessage(result.hitokoto, 5000);
    });
}

function showMessage(text, timeout, flag) {
    if (flag || sessionStorage.getItem('platelet-text') === '' || sessionStorage.getItem('platelet-text') === null) {
        if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1];

        if (flag) sessionStorage.setItem('platelet-text', text);

        $('.platelet-tips').stop();
        $('.platelet-tips').html(text).fadeTo(200, 1);
        if (timeout === null) timeout = 5000;
        hideMessage(timeout);
    }
}
function hideMessage(timeout) {
    $('.platelet-tips').stop().css('opacity', 1);
    if (timeout === null) timeout = 5000;
    window.setTimeout(function () { sessionStorage.removeItem('platelet-text') }, timeout);
    $('.platelet-tips').delay(timeout).fadeTo(200, 0);
}

function formatSeconds(value) {
    var seconds = parseInt(value);// 秒
    var minutes = 0;
    var hours = 0;
    var days = 0;
    if (seconds > 60) {
        minutes = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60);
        if (minutes > 60) {
            hours = parseInt(minutes / 60);
            minutes = parseInt(minutes % 60);
            if (hours > 24) {
                days = parseInt(hours / 24);
                hours = parseInt(hours % 24);
            }
        }
    }
    var result = "";
    if (minutes > 0)
        result = "" + parseInt(minutes) + "分";
    if (hours > 0 && hours <= 24)
        result = "" + parseInt(hours) + "小时" + result;
    if (days > 0)
        result = "" + parseInt(days) + "天" + result;
    return result;
}

function playVoice(file, is_play) {
    if (is_play) {
        $('.music').html('<audio controls="controls" id="audio_player" style="display:none;"> <source src="' + file + '" > </audio><embed id="MPlayer_Alert" src="' + file + '" loop="false" width="0px" height="0px" /></embed>');
    } else {
        $('.music').html('');
    }
}