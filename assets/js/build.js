function Build(scale) {
  this.scale = scale;
  this.menu = new entity(48, canvasH, canvasW-48, canvasH/2, 0, types.BOX, "#cc00cc", this.scale, 0, 0);
  this.menu.image = null;
  this.menu.alpha = .4;
  this.buttons = [];
  this.currentBuildItem = null;
  this.nButtons = 10;
  
  // Add 10 buttons
  for(i = 0; i<this.nButtons;i++){
    this.buttons.push(new Button(32,32,canvasW-48,50+(i*80),"#4c5774", getValueByIndex(actions,i)));
  }
  
  this.update = function(){
    this.menu.update();
    for(i = 0; i<this.nButtons;i++){
      this.buttons[i].update();
    }
  }
  
  this.tick = function(){
    // Check buttons are clicked
    clickRec = new vecToRec(clickedAt, 10, 10);
    for (var i = 0; i < this.buttons.length; i++) {
      b = this.buttons[i];
      if(rectColiding(b.entity.hitbox, clickRec)){
        b.processAction();
        return false;
      }
    }
    return true;
  }
  
  this.processBuilding = function(processClick,level){
    // TESTING ITEMS
    if(processClick){
      processClick = false;
      t = level.tiles[clickIndex];
      
      if(t != null){
        switch(this.currentBuildItem) {
          case actions.CHAIR:
            tileIndex = t.column + (19*t.row);
            if(level.tiles[tileIndex+19].entity.type == types.TABLE){
              // CHAIR ABOVE TABLE
              t1 = level.tiles[tileIndex+19];
              t2 = level.tiles[tileIndex+38];
              t.entity.isSolid = false;
              t.entity.type = types.CHAIR_B; 
              if(t2.entity.type == types.CHAIR_T){
                t2.entity.type = types.FLOOR;
                t2.change();
              }
            } else if(level.tiles[tileIndex-19].entity.type == types.TABLE){
              // CHAIR BELOW TABLE
              t1 = level.tiles[tileIndex-19];
              t2 = level.tiles[tileIndex-38];
              t.entity.isSolid = false;
              t.entity.type = types.CHAIR_T;  
              if(t2.entity.type == types.CHAIR_B){
                t2.entity.type = types.FLOOR;
                t2.change();
              }
            }
            break;
          case actions.DESK:
            t.entity.isSolid = true;
            t.entity.type = types.TABLE; 
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
        
        t.change();
      }
    }
  }

}