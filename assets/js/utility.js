// Useful Functions and classes

function rectanlge(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
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