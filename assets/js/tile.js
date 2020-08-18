function Tile(size, x, y, type, solid, column, row) {
  this.entity = new entity(size, size, x, y, types.WALL, "BLACK", 4, hitboxOffsetX = 0, hitboxOffsetY = 0, image = "assets/images/tile.png")
  this.entity.alpha = .4;
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