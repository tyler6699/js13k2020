function Button(w,h,x,y,colour){
  this.entity = new entity(w, h, x, y, 0, types.BOX, colour, 4, hitboxOffsetX = 0, hitboxOffsetY = 0, "", true);
  this.entity.image = null;
  
  this.update = function(){
    this.entity.update();
  }
  
  this.tick = function(click){
    
  }
}