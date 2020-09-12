// ╔═══════════════════════════════╗
// ║ JS13K Entry by @CarelessLabs  ║
// ╚═══════════════════════════════╝
var debug = false;
var mainGame;
var controllers = [];
var canvasW = 1216;
var canvasH = 832;
var gameStarted = false;
var delta = 0.0;
var prevDelta = Date.now();
var currentDelta = Date.now();
var timeElapsed = 0;
var mousePos = new vec2(0,0);
var clickedAt = new vec2(0,0);
var clickIndex;
var clickRow;
var clickCol;
var processClick = false;
var scaleX = 1.346;
var scaleY = 1.38;
var PCID = -1;
var BID = 0;
var HUE = 0;
var SAT = "100%";
var SCORE = 404;
var VENDNUM=3;
var SERVEREVENT=10;
var VENDEVENT=10;
var AMMOCOST=5;
var AMMOGIFT=5;
var TEXTTIME=2;
var HEROTEXTTIME=.4;
var DELIVERED=25;
var EXITPENALTY=20;
var SHOOTDIST=400;
var TABLEPRICE=100;
var CHAIRPRICE=25;
var VENDPRICE=1500;
var PCPRICE=150;
var SERVERPRICE=150;
var RESETCHANCE = 80;
var AMMOSTART = 100;
var NEWPERSONCHANCE = 50;
var AUTOPRICE=0;

// The Game
var cart = new Cart();

// Audio
genAudio();
var music=false;
var start=false;
var mTime=0;

// Called by body onload on index page
function startGame() {
  mainGame.start();
}

var mainGame = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = canvasW;
    this.canvas.height = canvasH;
    this.context = this.canvas.getContext("2d");
    this.context.scale(1, 1);

    // PixelArt Sharp
    this.context.mozImageSmoothingEnabled = false;
    this.context.webkitImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
    this.canvas.classList.add("screen");
    document.body.insertBefore(this.canvas, document.body.childNodes[6]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);

    // Keyboard
    window.addEventListener('keydown', function(e) {
      e.preventDefault();
      mainGame.keys = (mainGame.keys || []);
      mainGame.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', function(e) {
      mainGame.keys[e.keyCode] = (e.type == "keydown");
    })
    // Mouse Buttons
    window.addEventListener('mousedown', function(e) {
      e.preventDefault();
      mainGame.keys = (mainGame.keys || []);
      mainGame.keys[e.button] = true;
    })
    window.addEventListener('mouseup', function(e) {
      e.preventDefault();
      mainGame.keys = (mainGame.keys || []);
      mainGame.keys[e.button] = false;
      clickedAt.set(mousePos.x, mousePos.y);
      // Grid Clicked 64 ( Tiles are 16 * scale of 4 = 64)
      clickRow = Math.floor(clickedAt.y / 64);
      clickCol = Math.floor(clickedAt.x / 64);
      clickIndex = clickCol + (19*clickRow);
      processClick = true;
      if(!music&&!start){
        music=true;
      }
    })
    window.addEventListener('mousemove', function(e) {
      e.preventDefault();
      var rect = mainGame.canvas.getBoundingClientRect();
      mousePos.set((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
    })
    // Disable right click context menu
    this.canvas.oncontextmenu = function(e) {
      e.preventDefault();
    };
    window.addEventListener("gamepadconnected", function(e) {
      var gp = navigator.getGamepads()[e.gamepad.index];
      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", gp.index, gp.id, gp.buttons.length, gp.axes.length);
    });
  },
  stop: function() {
    clearInterval(this.interval);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function updateGameArea() {
  // Music  
  if(music && songLoaded){
    //audio.play();
    music=false;
    mTime=0;
  } else {
    mTime += delta;
    if(mTime > 49000){
      audio.currentTime = 0;
      //audio.play();
      mTime=0;
    }
  }
  
  // Delta
  prevDelta = currentDelta;
  currentDelta = Date.now();
  delta = currentDelta - prevDelta;
  timeElapsed += delta;

  // Update Gamepads
  navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

  if (gameStarted) {
    mainGame.clear();
  } else {
    mainGame.clear();
    cart.update(delta / 1e3, timeElapsed);
  }
}

function left() {
  return mainGame.keys && (mainGame.keys[LEFT] || mainGame.keys[A]);
}

function right() {
  return mainGame.keys && (mainGame.keys[RIGHT] || mainGame.keys[D]);
}

function up() {
  return mainGame.keys && (mainGame.keys[UP] || mainGame.keys[W]);
}

function down() {
  return mainGame.keys && (mainGame.keys[DOWN] || mainGame.keys[S]);
}

function space() {
  return mainGame.keys && (mainGame.keys[SPACE]);
}