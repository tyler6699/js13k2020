function PC(direction, chair, tile){
  PCID++;
  this.id = PCID;
  this.inUse = false;
  this.direction = direction;
  this.chair = chair;
  this.tile = tile;
}