function hero(w, h, x, y, angle, type, scale) {
  this.e = new entity(w, h, x, y, angle, type, "", scale, 0, 0, false, 100);
  this.e.hp=100;
  this.e.gun = new Gun();
  
  this.update = function(delta) {  
    this.time+=delta;
    this.e.gun.drawBullets(delta);
    this.e.update(delta);
  }  
}