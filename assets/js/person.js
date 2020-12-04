function Person(tile){
  this.entity = new entity(16, 16, tile.entity.x, tile.entity.y, 0, types.PERSON, "white", 0, 0);
  this.useTime = 0;
  this.hasTarget = false;
  this.progress = new Progress();
  this.parent = tile.entity;
  this.tile = tile;

  if(tile.entity.type == types.CHAIR_B){
    this.entity.sx = 32;
    this.entity.sy = 32;
  } else if (tile.entity.type == types.CHAIR_T){
    this.entity.sx = 16;
    this.entity.sy = 32;
    this.entity.y -= 40;
  }

  this.tick = function(){
    this.entity.update();
    this.progress.draw(this.entity.x, this.entity.y, this.entity);
    this.progress.tick(delta);

    if(this.progress.fourfour || this.progress.delivered){
      targets[this.tile.pc.id]=false;
      if(this.parent.type == types.CHAIR_B){
        this.parent.showTextY=-25;
      } else {
        this.parent.showTextY=-70;
      }
      this.parent.showText = this.progress.fourfour ? "Status: 404" : "Status: 200";
      this.parent.showTextTime=TEXTTIME;
      this.progress.fourfour=false;
      this.progress.delivered=false;
    } else if (this.progress.percent > .75 && targets[this.tile.pc.id]) {
      targets[this.tile.pc.id]=false;
    }
  }
}
