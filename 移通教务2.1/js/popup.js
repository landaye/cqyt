var isAuto;
var isChecked;
var speed;
var url = window.parent.location.href;
  document.addEventListener('DOMContentLoaded', function () {
    //速度
    var input = document.getElementById("myInput");
    var plusButton = document.getElementById("plusButton");
    var minusButton = document.getElementById("minusButton");
  
    plusButton.addEventListener("click", function () {
      var currentValue = parseInt(input.value, 10);
      var newValue = currentValue + 500;
      input.value = newValue;
      chrome.storage.sync.set({ speed: newValue }, function () {
        console.log(newValue);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { isSpeed: newValue });
        });
      });
    });
  
    minusButton.addEventListener("click", function () {
      var currentValue = parseInt(input.value, 10);
      if (currentValue > 1000) {
        var newValue = currentValue - 500;
        input.value = newValue;
        chrome.storage.sync.set({ speed: newValue }, function () {
          console.log(newValue);
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { isSpeed: newValue });
          });
        });
      }
    });
  
  
  
    //评教2.0开关
    var autoSwitch = document.getElementById('autoSwitch');
  
    chrome.storage.sync.get(['autoSwitch', 'speed'], function (result) {
      isAuto = result.autoSwitch || false;
      speed = result.speed || 1000;
      input.value = speed;
      autoSwitch.checked = isAuto;
      console.log(isAuto);
    });
  
    //评教1.0开关
    var toggleSwitch = document.getElementById('toggleSwitch');
  
    chrome.storage.sync.get('buttonEnabled', function (result) {
      isChecked = result.buttonEnabled || false;
      toggleSwitch.checked = isChecked;
      console.log(isChecked);
    });
  
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { isEnabled: isChecked, isAutoEnabled: isAuto, isSpeed: speed });
    });
  
  
    autoSwitch.addEventListener('click', function () {
      isAuto = autoSwitch.checked;
      if (isAuto === true && isChecked === true) {
        isChecked = false;
        toggleSwitch.checked = false;
      }
      chrome.storage.sync.set({ autoSwitch: isAuto, buttonEnabled: isChecked }, function () {
        console.log("评教2.0已存储" + isAuto);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { isAutoEnabled: isAuto, isEnabled: isChecked });
        });
      });
    });
  
  
    toggleSwitch.addEventListener('click', function () {
      isChecked = toggleSwitch.checked;
      if (isAuto === true && isChecked === true) {
        isChecked = false;
        toggleSwitch.checked = false;
      }
      chrome.storage.sync.set({ buttonEnabled: isChecked }, function () {
        console.log("评教1.0已存储" + isChecked);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { isEnabled: isChecked });
        });
      });
    });
  
    var button = document.querySelector('#jump_1');
    button.addEventListener('click', function () {
      //console.log("跳转")
      chrome.tabs.create({ url: "http://webvpn.cqyti.com:8333/" });
    });
  
    var button2 = document.querySelector('#jump_2');
    button2.addEventListener('click', function () {
      //console.log("跳转")
      chrome.tabs.create({ url: "http://192.168.200.87/jwglxt/xtgl/login_slogin.html" });
    });
  
  
  
  
    var login = document.querySelector('.imgs');
    var span=document.querySelector('span')
    var screenWidth = window.screen.availWidth;
    var screenHeight = window.screen.availHeight;
    var width = 500; // 窗口宽度
    var height = 500; // 窗口高度
  
    var left = (screenWidth - width) / 4*2.3;
    var top = (screenHeight - height) / 6;
  
    login.addEventListener('click', function () {
      window.open('login.html', '_blank', 'width=' + width + ',height=' + height + ',screenX=' + left + ',screenY=' + top);
    });
  
  
  
    chrome.storage.local.get(['username', 'password_jw', 'password_rz'], function (result) {
      if (result.username) {
        span.innerHTML = result.username.slice(-4);;
      }
    });


    const sy=document.querySelector("#sy");
    sy.addEventListener("click",function(){
      chrome.tabs.create({ url: "https://www.cqyti.com/sy.htm#pageb" });
    });
    sy.addEventListener("mouseover",function(){
      sy.innerHTML="民办第一"
    });
    sy.addEventListener("mouseout", function() {
      sy.innerHTML = "重庆移通";
    });
  });
function renderPopup() {
  const span=document.querySelector('span')
  chrome.storage.local.get(['username', 'password_jw', 'password_rz'], function (result) {
    if (result.username) {
      span.innerHTML = result.username.slice(-4);;
    }
  });
}



