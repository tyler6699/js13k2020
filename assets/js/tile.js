function Tile(size, x, y, angle, type, solid, column, row) {
  this.entity = new entity(size, size, x, y, angle, type, "BLACK", 4, hitboxOffsetX = 0, hitboxOffsetY = 0, image = "atlas.png")
  this.isSolid = solid;
  this.column = column;
  this.row = row;
  this.type = type;
  this.active = true;
  
  this.update = function() {
    this.entity.update();
  }

  this.tick = function(hero){
    // Code
  }
}