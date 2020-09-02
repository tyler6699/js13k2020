function Person(tile){
  this.scale = 4;
  this.entity = new entity(16, 16, tile.entity.x, tile.entity.y, 0, types.PERSON, "blue", this.scale, 0, 0, "atlas.png");
  this.requestTime = 0;
  this.useTime = 0;
  this.hasTarget = false;
  this.progress = new Progress(10);
  
  if(tile.entity.type == types.CHAIR_B){
    this.entity.sx = 32;
    this.entity.sy = 32;  
  } else if (tile.entity.type == types.CHAIR_T){
    this.entity.sx = 16;
    this.entity.sy = 32;
    this.entity.y -= 40;
  }

  this.tick = function(){
    // Logic for person
    if(!this.hasTarget){
      this.entity.update();  
      this.progress.draw(this.entity.x, this.entity.y);
      this.progress.tick(delta);
    } else {
      this.entity.x ++;
    }
  }
}