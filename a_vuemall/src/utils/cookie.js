//保存Cookie
function setCookie(json, days) {
    let data = new Date(
        new Date().getTime() + days * 24 * 60 * 60 * 1000
    ).toUTCString();

    for (var key in json) {
        document.cookie = key + "=" + json[key] + "; expires=" + data;
    }
}
//获取cookie
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2])
    } else {
        return null
    }
}
//删除cookie
function clearCookie(name) {
    let json = {};
    json[name] = '';
    setCookie(json, -1)
}

export default {
    setCookie,
    getCookie,
    clearCookie
}