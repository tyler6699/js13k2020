function Button(w,h,x,y,colour,action){
  this.entity = new entity(w, h, x, y, 0, action, colour, 4, hitboxOffsetX = 0, hitboxOffsetY = 0, "atlas.png", true);
  this.action = action;
  this.update = function(){
    this.entity.update();
  }
  
  this.tick = function(click){
    
  }
  
  this.processAction = function(){
    cart.menu.currentBuildItem = this.action;
  }
}