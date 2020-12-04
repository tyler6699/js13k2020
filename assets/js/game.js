// ╔═══════════════════════════════╗
// ║ JS13K Entry by @CarelessLabs  ║
// ╚═══════════════════════════════╝
var debug = false;
var mainGame;
var controllers = [];
var canvasW = 1216;
var canvasH = 832;
var gameStarted = false;
var showtutorial = true;
var delta = 0.0;
var prevDelta = Date.now();
var currentDelta = Date.now();
var timeElapsed = 0;
var mousePos = new vec2(0,0);
var clickedAt = new vec2(0,0);
var clickIndex;
var hoverIndex;
var clickRow;
var clickCol;
var processClick = false;
var tileSize = 16;
var scale = 3;
var rect;
var scaleX;
var scaleY;
var COL1 = "990099";
var COL2 = "05f2db";
var BSPEED=300;
var WIN = false;
var atlas = new Image();
atlas.src = "atlas.png";
var cart = new Cart();

// Audio
genAudio();
var music=false;
var start=false;

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
    this.context.scale(scale, scale);

    // PixelArt Sharp
    this.context.mozImageSmoothingEnabled = false;
    this.context.webkitImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
    this.canvas.classList.add("screen");
    document.body.insertBefore(this.canvas, document.body.childNodes[6]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);

    rect = mainGame.canvas.getBoundingClientRect();
    scaleX = (canvasW / rect.width) / scale;
    scaleY = (canvasH / rect.height) / scale;

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
      clickRow = Math.floor(clickedAt.y / tileSize);
      clickCol = Math.floor(clickedAt.x / tileSize);
      clickIndex = clickCol + (19*clickRow);
      processClick = true;
      if(!music&&!start){
        music=true;
      }
    })
    window.addEventListener('mousemove', function(e) {
      e.preventDefault();
      mousePos.set((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
      row = Math.floor(mousePos.y / tileSize);
      col = Math.floor(mousePos.x / tileSize);
      hoverIndex = col + (19*row);
    })
    // Disable right click context menu
    this.canvas.oncontextmenu = function(e) {
      e.preventDefault();
    };
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
  //if(music && songLoaded){
  //  audio.play();
  //  audio.loop = true;
  //  music=false;
  //  gameStarted=true;
  //}

  if(music && songLoaded){
    gameStarted=true;
  }

  // Delta
  prevDelta = currentDelta;
  currentDelta = Date.now();
  delta = currentDelta - prevDelta;
  timeElapsed += delta;

  // Update Gamepads
  navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

  if (!gameStarted) {
    // intro Screen
    mainGame.clear();
    ctx = mainGame.context;
    ctx.save();
    ctx.globalAlpha = .3;
    ctx.fillStyle = "#"+COL1;
    ctx.fillRect(75, 75, 1070, 680);
    ctx.globalAlpha = 1;
    ctx.font = "italic 90px Arial";
    ctx.fillStyle = "WHITE";
    ctx.fillText("-- CLICK TO START --", 180, 400);
    ctx.font = "italic 50px Arial";
    ctx.fillText("JS13K 2020 - Theme 404", 200, 200);
    ctx.fillText("Get over 20 users, $10404", 200, 500);
    ctx.fillText("and a 100% rating to WIN.", 200, 600);
    ctx.fillText("@CarelessLabs", 200, 700);
    renderStarField(timeElapsed);
    ctx.restore();
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

function one() {
  return mainGame.keys && (mainGame.keys[ONE]);
}
