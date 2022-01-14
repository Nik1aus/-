// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
/*加载时间设置 */
var time;

window.onload = function () {
  setTime();
  time = setInterval(function () {
    setTime();
  }, 5000);
};

window.onbeforeunload = function () {
  window.clearInterval(time);
  var string = JSON.stringify(hashMap);
  localStorage.setItem("getData", string);
};

function setTime() {
  var time = new Date();
  var shi = time.getHours();
  var fen = time.getMinutes();

  if (fen < 10) {
    fen = "0" + fen.toString();
  }

  $(".shi").html(shi);
  $(".fen").html(fen);
}
/*input样式设置*/


$(".headerInput").click(function () {
  $(".headerInput").addClass("inputDown");
  $(".headerInput").attr("placeholder", "");
});
$(".headerInput").blur(function () {
  $(".headerInput").removeClass("inputDown");
  $(".headerInput").attr("placeholder", "Search");
});
/*时间样式设置*/

$(".time").mousemove(function () {
  $(".time").removeClass("timeMoveOut");
  $(".time").addClass("timeMove");
});
$(".time").mouseout(function () {
  $(".time").addClass("timeMoveOut");
});
/*添加网址并且添加缓存和删除网址 */

var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last");
var x = localStorage.getItem("getData");
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: "音乐",
  url: "http://tool.liumingye.cn/music/?page=homePage"
}, {
  logo: "电影",
  url: "http://www.gotobt.com"
}, {
  logo: "弱智游戏",
  url: "http://h.4399.com"
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ""); //删除 / 开头内容
};

var render = function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n  <li>\n    <div class=\"site\">\n        <div class=\"logo\">".concat(node.logo, "</div>\n        <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n        <div class=\"close\">\n          <svg class=\"icon\">\n            <use xlink:href=\"#icon-chacha\"></use>\n          </svg>\n        </div>\n      </div>\n  </li>\n  ")).insertBefore($lastLi);
    $li.click(function () {
      window.open(node.url);
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    }); //鼠标滑过样式设置

    $li.mousemove(function () {
      $li.removeClass("lastStyleOut");
      $li.addClass("lastStyle");
    });
    $li.mouseout(function () {
      $li.addClass("lastStyleOut");
    });
    $li.mousemove(function () {
      $li.find(".site").removeClass("moveSiteOut");
      $li.find(".site").addClass("moveSite");
    });
    $li.mouseout(function () {
      $li.find(".site").removeClass("moveSite");
      $li.find(".site").addClass("moveSiteOut");
    }); //鼠标滑过样式设置结束
  });
};

render();
  $(".addButton").click(function () {
  
  var urlName = window.prompt('先先先先先先先先输入网址名称');  
  var url = window.prompt("再再再再再再再再输入网址");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  hashMap.push({
    logo: urlName,
    url: url
  });
  render();
});
/*监听键盘事件 */

$(document).on("keypress", function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
/*网址样式设置 */

$(".last").mousemove(function () {
  $(".last").removeClass("lastStyleOut");
  $(".last").addClass("lastStyle");
});
$(".last").mouseout(function () {
  $(".last").addClass("lastStyleOut");
});
$(".last").mousemove(function () {
  $(".addButton").removeClass("moveButtonOut");
  $(".addButton").addClass("moveButton");
});
$(".last").mouseout(function () {
  $(".addButton").addClass("moveButtonOut");
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.27bf90ca.js.map
