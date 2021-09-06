// ╔═══════════════════════════════╗
// ║ JS13K Entry by @CarelessLabs  ║
// ╚═══════════════════════════════╝
var debug = false;
var mainGame;
var canvasW = 1232;
var canvasH = 846;
var gameStarted = false;
var delta = 0.0;
var prevDelta = Date.now();
var currentDelta = Date.now();
var TIME = 0;
var introT = 0;
var mousePos = new vec2(0,0);
var clickedAt = new vec2(0,0);
var clickIndex;
var hoverIndex;
var clickRow;
var clickCol;
var processClick = false;
var holdClick = false;
var holdClickT = 0;
var GAMEOVER=false;
var COL1 = "990099";
var COL2 = "05f2db";
var BSPEED=1000;
var WIN = false;
var SCORE = 0;
var AMMOSTART=10000;
var BID = 0;
var SHOOTDIST = 600;
var STAGE=1;
var atlas = new Image();
atlas.src = "atlas.png";
var cart = new Cart();

// Audio
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
      holdClick = true;
    })
    window.addEventListener('mouseup', function(e) {
      e.preventDefault();
      mainGame.keys = (mainGame.keys || []);
      mainGame.keys[e.button] = false;
      setclicks();
      holdClick = false;
      holdClickT = 0;
      processClick = true;
      if(!start) start=true;
    })
    window.addEventListener('mousemove', function(e) {
      e.preventDefault();
      var r = mainGame.canvas.getBoundingClientRect();
      mousePos.set((e.clientX - r.left) / (r.right - r.left) * canvasW, 
                   (e.clientY - r.top) / (r.bottom - r.top) * canvasH);
      row = Math.floor(mousePos.y / this.scaled);
      col = Math.floor(mousePos.x / this.scaled);
      hoverIndex = col + (19*row);
      
      setclicks();
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

function setclicks(){
  clickedAt.set(mousePos.x, mousePos.y);
  clickRow = Math.floor(clickedAt.y / this.scaled);
  clickCol = Math.floor(clickedAt.x / this.scaled);
  clickIndex = clickCol + (19*clickRow);
}

function updateGameArea() {
  if(start){
    gameStarted=true;  
  }

  // Delta
  prevDelta = currentDelta;
  currentDelta = Date.now();
  delta = currentDelta - prevDelta;
  TIME += delta;

  if (!gameStarted) {
    // intro Screen
    mainGame.clear();
    ctx = mainGame.context;
    ctx.save();
    drawBox(ctx,0.3,"#"+COL1,75,75,1070,680)
    writeTxt(ctx, 1, "italic 90px Arial","WHITE","-- CLICK TO START --", 180, 400);
    writeTxt(ctx, 1, "italic 50px Arial","WHITE","JS13K 2021 - Theme SPACE", 200, 200);
    writeTxt(ctx, 1, "italic 50px Arial","WHITE","@CarelessLabs", 200, 700);
    renderStarField(TIME);
    ctx.restore();
  } else {
    mainGame.clear();
    cart.update(delta / 1e3, TIME);
  }
}

function drawBox(ctx,a,colour,xy,w,h) {
  ctx.globalAlpha = a;
  ctx.fillStyle = colour;
  ctx.fillRect(75, 75, 1070, 680);
}

function writeTxt(ctx,a,font,colour,txt,x,y) {
  ctx.globalAlpha = a;
  ctx.font = font;
  ctx.fillStyle = colour;
  ctx.fillText(txt, x, y);
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

function map() {
  return mainGame.keys && (mainGame.keys[M]);
}