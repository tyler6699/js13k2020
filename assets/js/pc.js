function PC(direction, chair, tile){
  PCID++;
  this.id = PCID;
  this.inUse = false;
  this.direction = direction;
  this.chair = chair;
  this.chair.pc=this;
  this.tile = tile;
  this.hitbox = new rectanlge(tile.entity.x+30, tile.entity.y+10, 20, 20);
      
  this.getPerson = function(){
    return this.chair.entity.person;
  }
  
  this.rmPerson = function(){
    return this.chair.entity.person = null;
  }
}