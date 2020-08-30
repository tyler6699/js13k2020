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
    
    this.entity.setType();
  }  

  this.isTable = function(){
    return this.entity.type == types.TABLE;
  }
  
  this.isChairB = function(){
    return this.entity.type == types.CHAIR_B;
  }
  
  this.isChairT = function(){
    return this.entity.type == types.CHAIR_T;
  }
}
