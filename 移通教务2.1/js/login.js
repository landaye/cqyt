
var username = document.getElementById('username');
var password_jw = document.getElementById("password_jw");
var password_rz = document.getElementById("password_rz");
var jwxt = document.getElementById("jwxt");
var sfrz = document.getElementById("sfrz");
var submit_l = document.getElementById("submit_l");


jwxt.addEventListener("click", function () {
    if (password_jw.type === "password") {
        password_jw.type = "text";
        jwxt.innerHTML = '<img src="./image/open.png" alt="隐藏密码">';
    } else {
        password_jw.type = "password";
        jwxt.innerHTML = '<img src="./image/close.png" alt="显示密码">';
    }
})
sfrz.addEventListener("click", function () {
    if (password_rz.type === "password") {
        password_rz.type = "text";
        sfrz.innerHTML = '<img src="./image/open.png" alt="隐藏密码">';
    } else {
        password_rz.type = "password";
        sfrz.innerHTML = '<img src="./image/close.png" alt="显示密码">';
    }
})




// 从chrome.storage中获取已存储的账户和密码
chrome.storage.local.get(['username', 'password_jw', 'password_rz'], function (result) {
    if (result.username) {
        username.value = result.username;
        password_jw.value = result.password_jw;
        password_rz.value = result.password_rz;
    }
});

// 当账户或密码发生变化时，存储到chrome.storage中
username.addEventListener('change', saveAccountPassword);
password_jw.addEventListener('change', saveAccountPassword);
password_rz.addEventListener('change', saveAccountPassword);


function saveAccountPassword() {
    chrome.storage.local.set({ 'username': username.value, 'password_jw': password_jw.value, 'password_rz': password_rz.value }, function () {
        console.log('已存储：', username.value, password_jw.value, password_rz.value);
    });
}
//执行popup.js中的renderPopup()
submit_l.addEventListener('click',function(){
    window.opener.renderPopup();
})


