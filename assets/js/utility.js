// Useful Functions and classes

function rectanlge(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

function getTile(index, level){
  return level.tiles[index];
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

function renderStarField(time){
  mainGame.context.fillStyle='#FFF';
  for(let i=2e3;i--;){
    x = (Math.sin(i)*1e9-time/2e3*(i+1e3)/50)%(mainGame.canvas.width+9)-9;
    y = i*9%mainGame.canvas.height;
    s = i%5;
    mainGame.context.fillRect(x,y,s,s);
  }
}

function getValueByIndex(e,i){
    return Object.values(e)[i];
}

function getEnumKeys(e) {
  return Object.keys(e);
}

function getEnumValues(e) {
  return getEnumKeys(e).map(function(key) {
    return e[key];
  });
}

function getValueByName(e, key) {
  return e[getEnumKeys(e).filter(function(k) {
    return key === k;
  }).pop() || ''];
}

function getNameByValue(e, val) {
  return getEnumKeys(e).filter(function(k) {
    return e[k] === val;
  }).pop() || null;
}
