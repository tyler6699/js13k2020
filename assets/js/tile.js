function Tile(size, x, y, angle, type, solid, column, row) {
  this.entity = new entity(size, size, x, y, angle, type, "", 4, hbOffX = 0, hbOffY = 0);
  this.column = column;
  this.row = row;
  this.active = true;
  this.door = null;

  this.update = function(delta) {
    this.entity.update(delta);
  }

  //this.tick = function(hero){}

  this.change = function(){
    if (this.entity.type >= Object.values(types).length){
      this.entity.type = 0;
    }
    this.entity.setType();
  }
  
  this.isFloor = function(){
    return this.entity.isFloor();
  }
  
  this.doorSet = function(){
    return this.door != null;
  }
  
  this.isTile = function(){
    return true;
  }
  
}

