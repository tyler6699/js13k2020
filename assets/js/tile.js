function Tile(size, x, y, angle, type, solid, column, row) {
  this.entity = new entity(size, size, x, y, angle, type, "BLACK", 4, hitboxOffsetX = 0, hitboxOffsetY = 0, image = "atlas.png");
  this.entity.setType();
  this.isSolid = solid;
  this.column = column;
  this.row = row;
  this.active = true;
  
  this.update = function() {
    this.entity.update();
  }

  this.tick = function(hero){
    // Code
  }
  
  this.change = function(){
    if (this.entity.type >= Object.values(types).length){
      this.entity.type = 0;
    }
    switch(this.entity.type) {
      case types.WALL_R:
        this.entity.type = types.WALL_R;
        break;
      case types.WALL_L:
        this.entity.type = types.WALL_L;
        break;
      case types.WALL_T:
        this.entity.type = types.WALL_T;
        break;
      case types.WALL_B:
        this.entity.type = types.WALL_B;
        break;
      case types.WALL_RT:
        this.entity.type = types.WALL_RT;
        break;
      case types.WALL_LT:
        this.entity.type = types.WALL_LT;
        break;
      case types.WALL_BR:
        this.entity.type = types.WALL_BR;
        break;
      case types.WALL_BL:
      this.entity.type = types.WALL_BL;
        break;
      case types.FLOOR:
        this.entity.type = types.FLOOR;
        break;
    }
    
    this.entity.setType();
  }  

}
