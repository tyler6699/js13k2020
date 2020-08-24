function Tile(size, x, y, angle, type, solid, column, row) {
  this.entity = new entity(size, size, x, y, angle, type, "BLACK", 4, hitboxOffsetX = 0, hitboxOffsetY = 0, image = "atlas.png");
  this.entity.setType();
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
        this.entity.isSolid = true;
        break;
      case types.WALL_L:
        this.entity.type = types.WALL_L;
        this.entity.isSolid = true;
        break;
      case types.WALL_T:
        this.entity.type = types.WALL_T;
        this.entity.isSolid = true;
        break;
      case types.WALL_B:
        this.entity.type = types.WALL_B;
        this.entity.isSolid = true;
        break;
      case types.WALL_RT:
        this.entity.type = types.WALL_RT;
        this.entity.isSolid = true;
        break;
      case types.WALL_LT:
        this.entity.type = types.WALL_LT;
        this.entity.isSolid = true;
        break;
      case types.WALL_BR:
        this.entity.type = types.WALL_BR;
        this.entity.isSolid = true;
        break;
      case types.WALL_BL:
      this.entity.type = types.WALL_BL;
      this.entity.isSolid = true;
        break;
      case types.FLOOR:
        this.entity.type = types.FLOOR;
        this.entity.isSolid = false;
        break;
      case types.TABLE:
        this.entity.type = types.TABLE;
        this.entity.isSolid = true;
        break;
      case types.CHAIR_B:
        this.entity.type = types.CHAIR_B;
        this.entity.isSolid = false;
        break;
      case types.CHAIR_T:
        this.entity.type = types.CHAIR_T;
        this.entity.isSolid = false;
        break;
      case types.PC:
        this.entity.type = types.PC;
        this.entity.isSolid = false;
        break;
    }
    
    this.entity.setType();
  }  

}
