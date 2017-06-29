$('title', window.parent.document).html(OSS.systemName);
$(function() {
    if (!sessionStorage.getItem('token')) {
        location.href = 'signin.html';
        return;
    }

    // 获取用户
    reqApi({
        code: '805056',
        cache: true,
        sync: true,
        json: {
            'userId': sessionStorage.getItem('userId')
        }
    }).then(function(data) {
        window.ossKind = data ? data.kind : '';
        $('#topUserName').html(data.loginName);
         $('#userName').html(data.loginName);
        sessionStorage.setItem('roleCode', data.roleCode);
        sessionStorage.setItem('userName', data.loginName);
    });

    reqApi({
        code: '805022',
        cache: true,
        sync: true,
        json: {
            'code': sessionStorage.getItem('roleCode')
        }
    }).then(function(data) {
          $('#role').html(data.name);
        sessionStorage.setItem('roleLevel', data.level);
    });
      //获取公告信息
   reqApi({
        code: '804040',
        cache: true,
        sync: true,
        json: {
           limit:1000,
           start:0,
           status:"1",
           toKind:"3"
        }
    }).then(function(data) {
         $('#smsTitle').html(data.list.length&&data.list[0].smsTitle);
         $('#smsContent').html(data.list.length&&data.list[0].smsContent);
         $('#pushedDatetime').html(data.list.length&&dateTimeFormat(data.list[0].pushedDatetime));
    });
    // 设置根目录
    window.parentCode = 'CYCSM201500000000000000';

    var data = { "parentCode": window.parentCode, "type": "1", 'roleCode': sessionStorage.getItem('roleCode') };
    reqApi({
        code: '805026',
        json: data,
        sync: true
    }).done(function(data) {
        var firstMenuCode = null;
        $.each(data, function(i, item) {
            if (i == 0) {
                firstMenuCode = item.code;
            }
            $(".nav").append("<li><a id=\"menu" + i + "\" data-code='" + item.code +
                "' href=\"javascript:void(0)\" onclick=\"initLefMenu('" + item.code +
                "');return false;\" target=\"leftFrame\"><img src=\"" + __uri('../images/icon01.png') +
                "\" title=\"" + item.name + "\" /><h2>" + item.name + "</h2></a></li>");
        });
        $(".nav").find('a:first').addClass('selected');

        //顶部导航切换
        $(".nav li a").click(function() {
            $(".nav li a.selected").removeClass("selected");
            $(this).addClass("selected");
        });

        if (window.parent.noRenderLeftMenu) {
            initLefMenu(firstMenuCode);
        }
    });

    $("#logout").click(function() {
        ajaxGet(OSS.mainUrl + '/logOut', {
            token: window.sessionStorage.getItem('token')
        }).then(function(res) {
            if (res.errorCode == '0') {
                window.sessionStorage.setItem('token', '');
                window.sessionStorage.setItem('userId', '');
                window.sessionStorage.setItem('userName', '');
                window.sessionStorage.setItem('roleCode', '');
                location.href = 'signin.html?kind=' + (sessionStorage.getItem('loginKind') || '01')
            }
        });
    });

    $('#change-pwd').on('click', function() {
        parent.frames["rightFrame"].window.location.href = 'security/user_pwd_change.html';
    });
});


//重新加载左侧页面
function initLefMenu(parentCode) {
    parent.frames["leftFrame"].window.initMenu && parent.frames["leftFrame"].window.initMenu(parentCode);
}

function mainReload() {
    window.parent.location.reload(true);
}
//时间
function dateTimeFormat(date) {
    if (date == '' || typeof(date) == 'undefined') {
        return '-';
    }
    var format = "yyyy-MM-dd hh:mm:ss";
    date = new Date(date);

    var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(), //day
        "h+": date.getHours(), //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}