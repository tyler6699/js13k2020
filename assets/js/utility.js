// Useful Functions and classes
//
function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

function rectanlge(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function cloneRectanlge(rec) {
  return new rectanlge(rec.x, rec.y, rec.w, rec.h);
}

function vecToRec(vec2, w, h) {
  return new rectanlge(vec2.x, vec2.y, w, h);
}

function rectColiding(rx, ry, rw, rh, r2x, r2y, r2w, r2h) {
  return (rx < r2x + r2w &&
    rx + rw > r2x &&
    ry < r2y + r2h &&
    ry + rh > r2y)
}

function rectColiding(rec1, rec2) {
  return (rec1.x < rec2.x + rec2.w &&
    rec1.x + rec1.w > rec2.x &&
    rec1.y < rec2.y + rec2.h &&
    rec1.y + rec1.h > rec2.y)
}

function vec2(x,y){
  this.x = x;
  this.y = y;
  
  this.set = function(x,y) {
    this.x = x;
    this.y = y;
  }
}