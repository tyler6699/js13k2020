function PC(direction, chairTile, tile){
  PCID++;
  this.id = PCID;
  this.inUse = false;
  this.direction = direction;
  this.chairTile = chairTile;
  this.tile = tile;
}