function Button(w,h,x,y,colour,action){
  var scale = 1;
  this.entity = new entity(w, h, x, y, 0, action, colour, hitboxOffsetX = 0, hitboxOffsetY = 0, true);
  this.action = action;
  
  this.update = function(){
    this.entity.update();
  }

  this.tick = function(click){}

  this.processAction = function(menu){
    menu.curItm = this.action;
    switch(this.action) {
      case actions.CARROT:
      break;
    default:
      console.log("UnKnown");
    }
  }
}
