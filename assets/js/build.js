function Build() {
  var width = canvasW/scale;
  this.menu = new entity(28, canvasH/scale, width-24, 0, 0, types.BOX, "#cc00cc", 0, 0);
  this.menu.image = null;
  this.menu.alpha = .4;
  this.buttons = [];
  this.curItm = null;
  this.nButtons = 5;
  this.canBuild=false;
  this.hoverTile;

  // Add Buttons
  for(i = 0; i<this.nButtons;i++){
    this.buttons.push(new Button(20,20,width-22,(i*22)+2,"#131a2d", getValueByIndex(actions,i)));
  }

  this.update = function(){
    this.menu.update();
    for(i = 0; i<this.nButtons;i++){
      b = this.buttons[i];
      b.update();
      if(collision(mousePos.x,mousePos.y,32,32,b.entity.x, b.entity.y, b.entity.width, b.entity.height)){
        b.entity.hover=true;
      } else {
        b.entity.hover=false;
      }
    }
  }

  this.checkBuild = function(){
    // Check can build
    this.canBuild=false;
    this.hoverTile = getTile(hoverIndex, cart.level);
    // if(this.hoverTile!=null && this.hoverTile.isFloor() || (this.hoverTile!=null && this.curItm==actions.PC && this.hoverTile.isTable())){
    //   switch(this.curItm) {
    //     case actions.CHAIR:
    //       if(SCORE>CHAIRPRICE)this.canBuild=true;
    //       break;
    //     case actions.DESK:
    //       if(SCORE>TABLEPRICE)this.canBuild=true;
    //       break;
    //     case actions.PC:
    //       ta = getTile(hoverIndex-19, cart.level);
    //       tb = getTile(hoverIndex+19, cart.level);
    //       if(SCORE>PCPRICE && (ta.isChairB() || tb.isChairT())){
    //         this.canBuild=true;
    //       }
    //       break;
    //     case actions.VEND:
    //       if(SCORE>VENDPRICE)this.canBuild=true;
    //       break;
    //     case actions.SERVER:
    //       if(SCORE>SERVERPRICE)this.canBuild=true;
    //       break;
    //     case actions.AUTO:
    //       if(SCORE>AUTOPRICE)this.canBuild=true;
    //       break;
    //   }
    // }
  }

  this.tick = function(){
    // Check buttons are clicked
    clickRec = new vecToRec(clickedAt, 10, 10);
    for (var i = 0; i < this.buttons.length; i++) {
      b = this.buttons[i];
      if(rectColiding(b.entity.hitbox, clickRec)){
        b.processAction(this.menu);
        return false;
      }
    }
    return true;
  }

  this.processBuilding = function(processClick, level){
    if(processClick){
      processClick = false;
    }
  }
}
