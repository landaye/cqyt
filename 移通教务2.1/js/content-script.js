/*
 * 我的信息：
 * 姓名: 兰大爷
 * 邮箱: 2219816262@qq.com
 * 时间: 2023-06-06T15:30:00
 */
var autoInterval;
var interval;
var auto_on_off;
var noAuto;
var url = window.parent.location.href;
var item = 0;
var trs;
var speeds;
(function () {
  if (url.includes("jwglxt/xtgl/login_slogin")) {
    const yhm = document.querySelector("#yhm")
    const mm = document.querySelector("#mm")
    chrome.storage.local.get(['username', 'password_jw', 'password_rz'], function (result) {
      if (result.username) {
        yhm.value = result.username;
        mm.value = result.password_jw;
      }
    });
  }
  else if (url.includes("/authserver/login")) {
    const user = document.querySelector(".no-auto-input");
    console.log(user)
    const password = document.querySelector("#password");
    chrome.storage.local.get(['username', 'password_jw', 'password_rz'], function (result) {
      if (result.username) {
        //user.ariaAutoComplete=on;
        user.value = result.username;
        password.value = result.password_rz;
      }
    });
  }
  else if (url.includes("com:8333/login")) {
    const user = document.querySelector("#user_login");
    console.log(user)
    const password = document.querySelector("#user_password");
    chrome.storage.local.get(['username', 'password_jw', 'password_rz'], function (result) {
      if (result.username) {
        //user.ariaAutoComplete=on;
        user.value = result.username;
        password.value = result.password_rz;
      }
    });
  }
  else if (url.includes("jwglxt/xspjgl/xspj_cxXspjIndex")) {
    chrome.runtime.onMessage.addListener(function (request) {
      chrome.storage.sync.get(['buttonEnabled', 'autoSwitch', 'speed'], function (result) {
        noAuto = result.buttonEnabled || false;
        speeds = result.speed || 1000;
        auto_on_off = result.autoSwitch || false;
        console.log(speeds)
        if (auto_on_off) {
          console.log(" 执行 2.0")
          interval = speeds
          console.log(interval)
          console.log(url)
          if (url.includes("jwglxt/xspjgl/xspj_cxXspjIndex.html?doType=details&gnmkdm=N401605&layout=default&su")) {
            next();
          }
        } else if (noAuto) {
          console.log(" 执行 1.0")
          interval = speeds
          if (url.includes("jwglxt/xspjgl/xspj_cxXspjIndex.html?doType=details&gnmkdm=N401605&layout=default&su")) {
            on_off()
          }
        }
        else {
          console.log("停止执行")
          autoInterval = 999999999999;
          next()
          interval = 99999999999;
          on_off()
          return
        }

      });
    });

    window.onload = function () {
      //1.0默认状态
      chrome.storage.sync.get(['buttonEnabled', 'autoSwitch', 'speed'], function (result) {
        noAuto = result.buttonEnabled || false;
        var speed = result.speed;
        auto_on_off = result.autoSwitch || false;
        if (noAuto) {
          console.log("页面刷新，执行 1.0")
          interval = speed;
          on_off();
        }
        //2.0默认状态 
        else if (auto_on_off) {
          console.log("页面刷新, 执行 2.0")
          interval = speed;
          console.log(speed)
          next()
        }
        else {
          interval = 99999999999999;
        }
      });
    }


    function on_off() {
      var timer = setInterval(function () {
        if (noAuto === false) {
          clearInterval(timer);
        }
        btn_radio()
      }, interval);
    }

    async function next() {
      var selectElement = document.querySelector('.ui-pg-selbox');
      var changeEvent = new Event('change');
      selectElement[3].selected = true
      selectElement.dispatchEvent(changeEvent);
      // console.log(selectElement[3])



      console.log(interval)
      setTimeout(function () {
        async function performClickAndActions(tr) {
          await tr.click();
          await btn_radio();
          item++;
          console.log(item + "次执行")
          await click_ok();
        }
        async function iterateTableRows() {
          trs = document.querySelectorAll('tr[role="row"]');
          console.log(trs.length)
          for (let i = 1; i < trs.length; i++) {
            var tr = document.querySelector(`tr[id="${i}"]`);
            //console.log(tr)
            await performClickAndActions(tr);
          }
        }
        iterateTableRows();
      }, interval)
    }

    async function waitForElements() {
      return new Promise((resolve) => {
        const intervalId = setInterval(() => {
          const inputs = document.querySelectorAll('input[data-dyf="100"]');
          if (inputs.length > 0) {
            clearInterval(intervalId);
            resolve(inputs);
          }
        }, 1000);
      });
    }


    async function btn_radio() {
      const inputs = await waitForElements();
      inputs.forEach((input) => {
        input.click();
      });

      const inputs2 = document.querySelectorAll('input[data-dyf="90"]');
      const num = Math.floor(Math.random() * (inputs2.length - 1)) + 1;
      inputs2[num].click();

      const texts = document.querySelectorAll('textarea');
      const studentComments = [
        "老师讲解清晰，耐心解答我们的问题。",
        "老师对每个学生都很关心，总是给予鼓励和支持。",
        "老师教学生动有趣，让我们更容易理解知识。",
        "老师对学习要求严格，帮助我们养成了良好的学习习惯。",
        "老师很有耐心，不厌其烦地解释知识点。",
        "老师总是激发我们的学习兴趣，让课堂变得生动有趣。",
        "老师注重培养我们的思维能力和创新精神。",
        "老师引导我们积极参与讨论和团队合作，培养了我们的合作能力。",
        "老师鼓励我们勇于表达自己的观点，增强了我们的自信心。",
        "老师课堂教学生动有趣，让我们喜欢上了这门学科。",
        "老师在辅导上给予我们很多帮助，让我们取得了进步。",
        "老师关心我们的学习和成长，给予了很多个人指导。",
        "老师教学认真负责，总是确保每个学生都能跟上进度。",
        "老师严格要求我们的学习质量，提高了我们的学习水平。",
        "老师经验丰富，给我们分享了很多实用的学习方法和技巧。",
        "老师为我们创造了良好的学习氛围，让我们感到温馨和融洽。",
        "老师对我们的问题总是认真倾听并给予详细解答。",
        "老师注重培养我们的创造力和思考能力，提升了我们的综合素质。",
        "老师鼓励我们勇于尝试和失败，教会了我们重要的人生价值。",
        "老师非常好，我非常喜欢！"
      ];
      const num2 = Math.floor(Math.random() * studentComments.length - 1) + 1;
      for (var n of texts) {
        n.innerHTML = studentComments[num2];
      }

      var btnXspjBc = document.getElementById("btn_xspj_bc");
      var btnXspjTj = document.getElementById("btn_xspj_tj");
      var btn_xspj_bc = document.getElementById("btn_xspj_bc");

      console.log(btnXspjBc)
      console.log(btnXspjTj)

      if (auto_on_off) {
        var event = new MouseEvent('mouseenter', {
          bubbles: false,
          cancelable: true,
          view: window,
        });
        btn_xspj_bc.dispatchEvent(event);
        var btnXspjBc = document.getElementById("btn_xspj_bc");
        var btnXspjTj = document.getElementById("btn_xspj_tj");

        function mouseenterHandler(e) {
          if (!this.dataset.enter) {
            this.dataset.enter = "1";
            console.log("dataset")
            if (item === trs.length - 2) {
              btnXspjTj.click();
            }
            else {
              btn_xspj_bc.click();
              console.log("自动保存");
            }
          }
        }

        mouseenterHandler.call(btnXspjBc);
        btnXspjBc.addEventListener("mouseenter", mouseenterHandler);

        mouseenterHandler.call(btnXspjTj);
        btnXspjTj.addEventListener("mouseenter", mouseenterHandler);

        btn_xspj_bc.addEventListener("mouseenter", function () {
          btn_xspj_bc.click();
          console.log("自动点击了保存");
        });

        console.log("===========================================");
        btnXspjTj.addEventListener("mouseenter", async function () {
          if (item === trs.length - 1) {
            console.log(item);
          }
        });
      }

      if (noAuto) {
        btn_xspj_bc.addEventListener("click", async function () {
          console.log("保存")
          var checkButOk = setInterval(async function () {
            var but_ok = document.getElementsByClassName("bootbox-close-button");
            //console.log(but_ok)
            if (but_ok) {
              clearInterval(checkButOk);
              await but_ok[0].click();
            };
          }, interval);
        });
      }
    }
    async function click_ok() {
      return new Promise((resolve, reject) => {
        var but_ok = document.getElementsByClassName("bootbox-close-button");
        if (but_ok.length > 0) {
          but_ok[0].click();
          console.log("点击了xxxxxx")
          setTimeout(() => {
            resolve(); // 延迟执行后续操作
          }, 500);
        } else {
          console.log("11111111111111" + interval)
          setTimeout(() => {
            resolve(click_ok());
          }, interval);
        }
      });
    }
  }
})();



