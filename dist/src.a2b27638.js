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
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/paddle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Paddle =
/*#__PURE__*/
function () {
  function Paddle(game) {
    _classCallCheck(this, Paddle);

    this.game = game;
    this.size = {
      width: 100,
      height: 10
    };
    this.position = {
      x: this.game.width / 2 - this.size.width / 2,
      y: this.game.height - this.size.height - 10
    };
    this.maxSpeed = 10;
    this.speed = 0;
  }

  _createClass(Paddle, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "#0000ff";
      ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.position.x += this.speed;
      if (this.position.x < 0) this.position.x = 0;
      if (this.position.x + this.size.width > this.game.width) this.position.x = this.game.width - this.size.width;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.speed = 0;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.speed = -this.maxSpeed;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.speed = +this.maxSpeed;
    }
  }]);

  return Paddle;
}();

exports.default = Paddle;
},{}],"src/collisionDetection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detectCollition = detectCollition;

function detectCollition(ball, gameObject) {
  var bottomOfTheBall = ball.position.y + ball.size.height;
  var topOfTheBall = ball.position.y; // let topOfTheObject = gameObject.position.y;
  // let bottomOfTheObject = gameObject.position.y - gameObject.size.height;
  // let leftSideOfTheObject = gameObject.position.x;
  // let rightSideOfTheObject = gameObject.position.x + gameObject.size.width;

  var topOfTheObject = gameObject.position.y;
  var bottomOfTheObject = gameObject.position.y + gameObject.size.height;
  var leftSideOfTheObject = gameObject.position.x;
  var rightSideOfTheObject = gameObject.position.x + gameObject.size.width;

  if (bottomOfTheBall >= topOfTheObject && topOfTheBall <= bottomOfTheObject && ball.position.x >= leftSideOfTheObject && ball.position.x + ball.size.width <= rightSideOfTheObject) {
    return true;
  }

  return false;
}
},{}],"src/ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _collisionDetection = require("./collisionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball =
/*#__PURE__*/
function () {
  function Ball(game) {
    _classCallCheck(this, Ball);

    this.game = game;
    this.image = document.getElementById("ball");
    this.size = {
      height: 24,
      width: 24
    };
    this.reset();
  }

  _createClass(Ball, [{
    key: "reset",
    value: function reset() {
      this.position = {
        x: 10,
        y: 10
      };
      this.speed = {
        x: 5,
        y: 5
      };
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;

      if (this.position.x + this.size.width > this.game.width || this.position.x < 0) {
        this.speed.x = -this.speed.x;
      }

      if (this.position.y < 0) {
        this.speed.y = -this.speed.y;
      }

      if (this.position.y + this.size.width > this.game.height) {
        this.game.lives -= 1;
        this.reset();
      }

      if ((0, _collisionDetection.detectCollition)(this, this.game.paddle)) {
        this.speed.y = -this.speed.y;
        this.position.y = this.game.paddle.position.y - this.size.height;
      }
    }
  }]);

  return Ball;
}();

exports.default = Ball;
},{"./collisionDetection":"src/collisionDetection.js"}],"src/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputHandler = function InputHandler(paddle, game) {
  _classCallCheck(this, InputHandler);

  document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 37:
        paddle.moveLeft();
        break;

      case 39:
        paddle.moveRight();
        break;

      case 27:
        game.togglePause();
        break;

      case 32:
        game.start();
        break;

      default:
        break;
    }
  });
  document.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
      case 37:
        paddle.stop();
        break;

      case 39:
        paddle.stop();
        break;

      default:
        break;
    }
  });
};

exports.default = InputHandler;
},{}],"src/brick.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _collisionDetection = require("./collisionDetection");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Brick =
/*#__PURE__*/
function () {
  function Brick(game) {
    _classCallCheck(this, Brick);

    this.game = game;
    this.image = document.getElementById("brick");
    this.position = {
      x: 0,
      y: 0
    };
    this.size = {
      height: 20,
      width: 30
    };
    this.markForDeletion = false;
  }

  _createClass(Brick, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
    }
  }, {
    key: "update",
    value: function update() {
      if ((0, _collisionDetection.detectCollition)(this.game.ball, this)) {
        this.game.ball.speed.y = -this.game.ball.speed.y;
        this.markForDeletion = true;
      }
    }
  }]);

  return Brick;
}();

exports.default = Brick;
},{"./collisionDetection":"src/collisionDetection.js"}],"src/levels.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildLevel = buildLevel;
exports.level2 = exports.level1 = void 0;

var _brick = _interopRequireDefault(require("./brick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildLevel(game, level) {
  var bricks = [];
  level.forEach(function (row, rowIndex) {
    row.forEach(function (item, ItemIndex) {
      if (item === 1) {
        var brick = new _brick.default(game);
        brick.position = {
          x: ItemIndex * brick.size.width,
          y: rowIndex * brick.size.height + 100
        };
        bricks.push(brick);
      }
    });
  });
  return bricks;
}

var level1 = [// [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0, 0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
// [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],  
[0, 0, 0, 0, 1]];
exports.level1 = level1;
var level2 = [[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
exports.level2 = level2;
},{"./brick":"src/brick.js"}],"src/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _paddle = _interopRequireDefault(require("./paddle"));

var _ball = _interopRequireDefault(require("./ball"));

var _input = _interopRequireDefault(require("./input"));

var _levels = require("./levels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAME_OVER: 3,
  NEW_LEVEL: 4
};

var Game =
/*#__PURE__*/
function () {
  function Game(gameWidth, gameHeight) {
    _classCallCheck(this, Game);

    this.width = gameWidth;
    this.height = gameHeight;
    this.gameState = GAME_STATE.MENU;
    this.paddle = new _paddle.default(this);
    this.ball = new _ball.default(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 2;
    this.levels = [_levels.level1, _levels.level2];
    this.currentLevel = 0;
    new _input.default(this.paddle, this);
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      if (this.gameState !== GAME_STATE.MENU && this.gameState !== GAME_STATE.NEW_LEVEL) return;
      this.bricks = (0, _levels.buildLevel)(this, this.levels[this.currentLevel]);
      this.ball.reset();
      this.gameObjects = [this.paddle, this.ball];
      this.gameState = GAME_STATE.RUNNING;
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      if (this.lives === 0) this.gameState = GAME_STATE.GAME_OVER;
      if (this.gameState === GAME_STATE.PAUSED || this.gameState === GAME_STATE.MENU || this.gameState === GAME_STATE.GAME_OVER) return;

      if (this.bricks.length === 0) {
        this.currentLevel++;
        this.gameState = GAME_STATE.NEW_LEVEL;
        this.start();
      }

      [].concat(_toConsumableArray(this.gameObjects), _toConsumableArray(this.bricks)).forEach(function (obj) {
        return obj.update(deltaTime);
      });
      this.bricks = this.bricks.filter(function (obj) {
        return !obj.markForDeletion;
      });
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      [].concat(_toConsumableArray(this.gameObjects), _toConsumableArray(this.bricks)).forEach(function (obj) {
        return obj.draw(ctx);
      });

      if (this.gameState === GAME_STATE.PAUSED) {
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Paused", this.width / 2, this.height / 2);
      }

      if (this.gameState === GAME_STATE.MENU) {
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Press Spacebar to start", this.width / 2, this.height / 2);
      }

      if (this.gameState === GAME_STATE.GAME_OVER) {
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", this.width / 2, this.height / 2);
      }
    }
  }, {
    key: "togglePause",
    value: function togglePause() {
      if (this.gameState == GAME_STATE.PAUSED) {
        this.gameState = GAME_STATE.RUNNING;
      } else {
        this.gameState = GAME_STATE.PAUSED;
      }
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./paddle":"src/paddle.js","./ball":"src/ball.js","./input":"src/input.js","./levels":"src/levels.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _game = _interopRequireDefault(require("./game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GAME_SCREEN = {
  height: 600,
  width: 800
};
var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");
var game = new _game.default(GAME_SCREEN.width, GAME_SCREEN.height);
var lastTime = 0;

function gameLoop(timeStamp) {
  var deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  ctx.clearRect(0, 0, GAME_SCREEN.width, GAME_SCREEN.height);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}

gameLoop();
},{"./styles.css":"src/styles.css","./game":"src/game.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "43633" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map