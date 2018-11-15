// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"ts/common/constanats.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GAME_CONFIG = {
  // --- Game related constants
  FPS: 60,
  GAME_LIVES: 3,
  SHOW_BOUNDING: true,
  // --- ship related
  SHIP_SIZE: 30,
  SHIP_INV_DUR: 3,
  SHIP_BLINK_DUR: 0.1,
  // ---- Local storage
  SAVE_KEY_SCORE: "GAME|HighScore",
  // --- asteroids related
  ROID_NUM: 3,
  ROID_SIZE: 100,
  ROID_SPD: 50,
  ROID_VERT: 10,
  ROID_JAG: 0.4,
  // --- colors
  COLOR_BLACK: '#000',
  COLOR_WHITE: '#FFF',
  COLOR_SLATE_GRAY: '#708090',
  COLOR_LIME: '#BFFF00',
  // --- sound related
  SOUND_ON: true,
  SOUND_PATHS: [{
    "key": "FX_EXPLODE_PATH",
    "path": "./sounds/explode.m4a"
  }, {
    "key": "FX_HIT_PATH",
    "path": "./sounds/hit.m4a"
  }, {
    "key": "FX_LASER_PATH",
    "path": "./sounds/laser.m4a"
  }, {
    "key": "FX_THRUST_PATH",
    "path": "./sounds/thrust.m4a"
  }],
  MUSIC_LOW_PATH: "sounds/music-low.m4a",
  MUSIC_HIGH_PATH: "sounds/music-high.m4a"
};
exports.default = GAME_CONFIG;
},{}],"ts/common/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var utilFunc = {
  soundPromise: function soundPromise(audio) {
    console.info("Sound :: " + audio.src + " is playing.");
    var playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(function () {}).catch(function (e) {
        console.error(e);
        console.warn("unable to play Audio " + audio.src);
      });
    }
  },
  getRandom: function getRandom() {
    return Math.random();
  },
  distanceBetweenPoints: function distanceBetweenPoints(startX, startY, endX, endY) {
    return Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  }
};
exports.default = utilFunc;
},{}],"ts/common/Sound.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constanats_1 = __importDefault(require("./constanats"));

var common_1 = __importDefault(require("../common"));

var Sound =
/*#__PURE__*/
function () {
  function Sound(path) {
    var maxStream = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var volume = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;

    _classCallCheck(this, Sound);

    this.streamNum = 0;
    this.streams = [];
    this.path = path;
    this.maxStream = maxStream;
    this.volume = volume;
    this.addSound(path, maxStream, volume);
  }

  _createClass(Sound, [{
    key: "play",
    value: function play() {
      if (constanats_1.default.SOUND_ON) {
        this.streamNum = (this.streamNum + 1) % this.maxStream;
        common_1.default.soundPromise(this.streams[this.streamNum]);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.streams[this.streamNum].pause();
      this.streams[this.streamNum].currentTime = 0;
    }
  }, {
    key: "addSound",
    value: function addSound(path, maxStream, volume) {
      for (var i = 0; i < maxStream; i++) {
        var soundAudio = new Audio(path);
        this.streams.push(soundAudio);
        this.streams[i].volume = volume;
      }
    }
  }]);

  return Sound;
}();

exports.default = Sound;
},{"./constanats":"ts/common/constanats.ts","../common":"ts/common/index.ts"}],"ts/common/Music.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constanats_1 = __importDefault(require("./constanats"));

var common_1 = __importDefault(require("../common"));

var Music =
/*#__PURE__*/
function () {
  function Music(srcLow, srcHigh) {
    _classCallCheck(this, Music);

    this.isLow = true;
    this.tempo = 1.0; // --- seconds per beats

    this.beatTime = 0; // --- frames left until next beats

    this.soundLow = new Audio(srcLow);
    this.soundHigh = new Audio(srcHigh);
    this.soundLow.autoplay = true;
    this.soundHigh.autoplay = true;
  }

  _createClass(Music, [{
    key: "play",
    value: function play() {
      if (constanats_1.default.SOUND_ON) {
        if (this.isLow) {
          common_1.default.soundPromise(this.soundLow);
        } else {
          common_1.default.soundPromise(this.soundHigh);
        }

        this.isLow = !this.isLow;
      }
    }
  }, {
    key: "setAsteriodRatio",
    value: function setAsteriodRatio(ratio) {
      this.tempo = 1.0 - 0.75 * (1.0 - ratio);
    }
  }, {
    key: "tick",
    value: function tick() {
      if (this.beatTime == 0) {
        this.play();
        this.beatTime = Math.ceil(this.tempo * constanats_1.default.FPS);
      } else {
        this.beatTime--;
      }
    }
  }]);

  return Music;
}();

exports.default = Music;
},{"./constanats":"ts/common/constanats.ts","../common":"ts/common/index.ts"}],"ts/Game.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constanats_1 = __importDefault(require("./common/constanats"));

var Sound_1 = __importDefault(require("./common/Sound"));

var Music_1 = __importDefault(require("./common/Music"));

var common_1 = __importDefault(require("./common"));

var Game =
/*#__PURE__*/
function () {
  function Game() {
    _classCallCheck(this, Game);

    this.sounds = [];
    this.can = document.getElementById("gameCanvas");
    this.ctx = this.can.getContext("2d");
    this.loadSounds();
    this.loadMusics();
    this.newGame();
    this.addEvents();
    this.gameInterval = setInterval(this.update.bind(this), 1000 / constanats_1.default.FPS);
  }

  _createClass(Game, [{
    key: "setUpGame",
    value: function setUpGame() {}
  }, {
    key: "render",
    value: function render() {
      console.log("inside render");
    }
  }, {
    key: "loadSounds",
    value: function loadSounds() {
      for (var i = 0; i < constanats_1.default.SOUND_PATHS.length; i++) {
        var temp = constanats_1.default.SOUND_PATHS[i];
        var is = {
          name: temp.key,
          sound: new Sound_1.default(temp.path)
        };
        this.sounds[i] = is;
      }

      console.log(this.sounds);
    }
  }, {
    key: "loadMusics",
    value: function loadMusics() {
      this.music = new Music_1.default(constanats_1.default.MUSIC_LOW_PATH, constanats_1.default.MUSIC_HIGH_PATH);
    }
  }, {
    key: "newGame",
    value: function newGame() {
      var scoreStr;
      this.displayLevel = 0;
      this.displayLives = constanats_1.default.GAME_LIVES;
      this.displayScore = 0;
      this.ship = this.getShip();
      scoreStr = localStorage.getItem(constanats_1.default.SAVE_KEY_SCORE);

      if (scoreStr === null) {
        this.scoreHigh = 0;
      } else {
        this.scoreHigh = parseInt(scoreStr);
      }

      this.newLevel();
    }
  }, {
    key: "getShip",
    value: function getShip() {
      var ship = {
        x: this.getCanvasWidth() / 2,
        y: this.getCanvasHeight() / 2,
        a: 90 / 180 * Math.PI,
        r: constanats_1.default.SHIP_SIZE / 2,
        blinkNum: Math.ceil(constanats_1.default.SHIP_INV_DUR / constanats_1.default.SHIP_BLINK_DUR),
        blinkTime: Math.ceil(constanats_1.default.SHIP_BLINK_DUR * constanats_1.default.FPS),
        canShoot: true,
        isDead: false,
        explodeTime: 0,
        laser: [],
        rot: 0,
        isThrusting: false,
        thrust: {
          x: 0,
          y: 0
        }
      };
      return ship;
    }
  }, {
    key: "getCanvasWidth",
    value: function getCanvasWidth() {
      return this.can.width;
    }
  }, {
    key: "getCanvasHeight",
    value: function getCanvasHeight() {
      return this.can.height;
    }
  }, {
    key: "newLevel",
    value: function newLevel() {
      this.music.setAsteriodRatio(1);
      this.displayText = "Level: " + (this.displayLevel + 1);
      this.displayTextAlpha = 1.0;
      this.createAsteroidBelt();
    }
  }, {
    key: "createAsteroidBelt",
    value: function createAsteroidBelt() {
      this.asteroids = [];
      this.asteroidTotal = (constanats_1.default.ROID_NUM + this.displayLevel) * 7;
      this.asteroidLeft = this.asteroidTotal;
      var x, y;

      for (var i = 0; i < constanats_1.default.ROID_NUM; i++) {
        // --- random asteroid position not touching spaceship
        do {
          x = Math.floor(common_1.default.getRandom() * this.getCanvasWidth());
          y = Math.floor(common_1.default.getRandom() * this.getCanvasHeight());
        } while (common_1.default.distanceBetweenPoints(this.ship.x, this.ship.y, x, y) < constanats_1.default.ROID_SIZE * 2 + this.ship.r);

        this.asteroids.push(this.newAsteroid(x, y, Math.ceil(constanats_1.default.ROID_SIZE) / 2));
        console.log("Aestroid:: ", this.asteroids);
      }
    }
  }, {
    key: "newAsteroid",
    value: function newAsteroid(x, y, r) {
      var lvlMult = 1 + 1.0 * this.displayLevel;
      var asteroid = {
        x: x,
        y: y,
        xv: common_1.default.getRandom() * constanats_1.default.ROID_SPD * lvlMult / constanats_1.default.FPS * (common_1.default.getRandom() < 0.5 ? 1 : -1),
        yv: common_1.default.getRandom() * constanats_1.default.ROID_SPD * lvlMult / constanats_1.default.FPS * (common_1.default.getRandom() < 0.5 ? 1 : -1),
        a: common_1.default.getRandom() * Math.PI * 2,
        r: r,
        offset: [],
        vert: Math.floor(common_1.default.getRandom() * (constanats_1.default.ROID_VERT + 1) + constanats_1.default.ROID_VERT / 2)
      }; // --- populating the offset Array

      for (var i = 0; i < asteroid.vert; i++) {
        asteroid.offset.push(common_1.default.getRandom() * constanats_1.default.ROID_JAG * 2 + 1 - constanats_1.default.ROID_JAG);
      }

      return asteroid;
    }
  }, {
    key: "addEvents",
    value: function addEvents() {
      var _this = this;

      this.onKeyDown.bind(this);
      document.addEventListener("keydown", function (event) {
        return _this.onKeyDown(event.code.toLowerCase());
      });
      document.addEventListener("keyup", function (event) {
        return _this.onKeyUp(event.code.toLowerCase());
      });
      document.addEventListener("click", function () {});
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(code) {
      if (this.ship.isDead) return;

      switch (code) {
        case 'space':
          // --- space bar -->>> Shoot Laser
          this.shootLaser();
          break;

        case 'arrowleft':
          // --- Left Arrow -->>> Rotate Ship Left
          this.rotateShip(false);
          break;

        case 'arrowup':
          // --- Up Arrow -->>> Thrust the Ship Forward
          this.ship.isThrusting = true;
          break;

        case 'arrowright':
          // --- Right Arrow -->>> Rotate Ship Right
          this.rotateShip(true);
          break;

        default:
          console.log(code);
          break;
      }
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp(code) {
      if (this.ship.isDead) return;

      switch (code) {
        case 'space':
          // --- space bar -->>> Allow Shooting again
          this.ship.canShoot = true;
          break;

        case 'arrowleft':
          // --- Left Arrow -->>> stop rotating left
          this.ship.rot = 0;
          break;

        case 'arrowup':
          // --- Up Arrow -->>> Stop thrusting
          this.ship.isThrusting = false;
          break;

        case 'arrowright':
          // --- Right Arrow -->>> Stop rotating right
          this.ship.rot = 0;
          break;

        default:
          console.log(code);
          break;
      }
    }
  }, {
    key: "shootLaser",
    value: function shootLaser() {}
  }, {
    key: "rotateShip",
    value: function rotateShip(isClockwise) {}
  }, {
    key: "update",
    value: function update() {
      var isBlinkOn = this.ship.blinkNum % 2 === 0,
          isExploding = this.ship.explodeTime > 0;
      this.music.tick();
      this.drawSpace(); // --- drawing asteroid

      var x, y, a, r, offs, vert;

      for (var i = 0; i < this.asteroids.length; i++) {
        this.ctx.strokeStyle = constanats_1.default.COLOR_SLATE_GRAY;
        this.ctx.lineWidth = constanats_1.default.SHIP_SIZE / 20; // --- asteroids properties

        var tempAsteroid = this.asteroids[i];
        a = tempAsteroid.a;
        x = tempAsteroid.x;
        y = tempAsteroid.y;
        r = tempAsteroid.r;
        offs = tempAsteroid.offset;
        vert = tempAsteroid.vert; // --- drawing path

        this.ctx.beginPath();
        this.ctx.moveTo(x + r * offs[0] + Math.cos(a), y + r * offs[0] + Math.sin(a)); // --- drawing polygon

        for (var j = 1; j < vert; j++) {
          this.ctx.lineTo(x + r * offs[j] + Math.cos(a + j * Math.PI * 2 / vert), y + r * offs[j] + Math.sin(a + j * Math.PI * 2 / vert));
        }

        this.ctx.closePath();
        this.ctx.stroke();

        if (constanats_1.default.SHOW_BOUNDING) {
          this.ctx.strokeStyle = constanats_1.default.COLOR_LIME;
          this.ctx.beginPath();
          this.ctx.arc(x, y, r, 0, Math.PI * 2, false);
          this.ctx.closePath();
        }
      }
    }
  }, {
    key: "drawSpace",
    value: function drawSpace() {
      this.ctx.fillStyle = constanats_1.default.COLOR_BLACK;
      this.ctx.fillRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./common/constanats":"ts/common/constanats.ts","./common/Sound":"ts/common/Sound.ts","./common/Music":"ts/common/Music.ts","./common":"ts/common/index.ts"}],"ts/app.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Game_1 = __importDefault(require("./Game"));

var App =
/*#__PURE__*/
function () {
  function App(game) {
    _classCallCheck(this, App);

    this._game = game;
  }

  _createClass(App, [{
    key: "setUp",
    value: function setUp() {
      // -- Any setup that game require before boot-up the game
      this._game.setUpGame(); // this.gameLoop();

    }
  }, {
    key: "gameLoop",
    value: function gameLoop() {
      window.requestAnimationFrame(this.gameLoop.bind(this));

      this._game.render();
    }
  }]);

  return App;
}();

window.onload = function () {
  var app = new App(new Game_1.default());
  app.setUp();
};
},{"./Game":"ts/Game.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58448" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/app.ts"], null)
//# sourceMappingURL=/app.a0488aa9.map