function Button(w,h,x,y,colour,action){
  this.entity = new entity(w, h, x, y, 0, types.BOX, colour, 4, hitboxOffsetX = 0, hitboxOffsetY = 0, "", true);
  this.entity.image = null;
  this.action = action;
  this.update = function(){
    this.entity.update();
  }
  
  this.tick = function(click){
    
  }
  
  this.processAction = function(){
    switch(this.action) {
      case actions.CHAIR:
        console.log("Chair");
        break;
      case actions.DESK:
        console.log("Desk");
        break;
      case actions.PC:
        console.log("PC");
        break;
      case actions.VEND:
        console.log("VEND");
        break;
      default:
        console.log("NaN");
    }
  }
}