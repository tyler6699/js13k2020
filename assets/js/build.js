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
    if(processClick){
      processClick = false;
      ci = clickIndex;
      t = getTile(ci, level);
      
      if(t != null){
        // Tile Above
        ta = getTile(ci-19, level);
        taa = getTile(ci-38, level);
        // Tile Below
        tb = getTile(ci+19, level);
        tbb = getTile(ci+38, level);
        
        switch(this.currentBuildItem) {
          case actions.CHAIR:
            console.log(ci);
            // A table between tables
            if(t.isChairB()){
                if(ta.isTable() && !taa.isChairB()){
                    t.entity.type = types.CHAIR_T;
                    t.entity.drawTile = true;
                    tb.entity.hasPC_T = false;
                }
                break;
            } else if(t.isChairT()){
              if(tb.isTable() && !tbb.isChairT()){  
                  t.entity.type = types.CHAIR_B;
                  t.entity.drawTile = true;
                  ta.entity.hasPC_B = false;
              }
              break;
            }

            if(tb.isTable()){
              // CHAIR ABOVE TABLE
              t.entity.isSolid = false;
              t.entity.type = types.CHAIR_B;
              t.entity.drawTile = true;
              
              if(tbb.isChairT()){
               tbb.entity.type = types.FLOOR;
               tbb.entity.drawTile = false;
               tbb.change();
               tb.entity.flipMonitors();
              }
            } else if(ta.isTable()){
              // CHAIR BELOW TABLE
              t.entity.isSolid = false;
              t.entity.type = types.CHAIR_T; 
              t.entity.drawTile = true;
               
              if(taa.isChairB()){
                taa.entity.type = types.FLOOR;
                taa.entity.drawTile = false;
                taa.change();
                ta.entity.flipMonitors();
              }
            }
            break;
          case actions.DESK:
            if(t.entity.type == types.FLOOR){
              t.entity.isSolid = true;
              t.entity.type = types.TABLE; 
              t.entity.drawTile = true;
            }
            break;
          case actions.PC:
            if(t.isTable()){
              if (ta.isChairB()){
                t.entity.hasPC_T = true;
              } else if (tb.isChairT()) {
                t.entity.hasPC_B = true;
              }
            }
            t.change();
            break;
          case actions.VEND:
            console.log("VEND");
            break;
          case actions.SERVER:
            if(t.entity.type == types.FLOOR){
              t.entity.isSolid = true;
              t.entity.type = types.SERVER; 
              t.entity.yDrawOffset = -20;
              t.entity.hitboxOffsetY = 5;
              t.entity.drawTile = true;
            }
            break;
          default:
            console.log("NaN");
        }
        
        t.change();
      }
    }
  }

}