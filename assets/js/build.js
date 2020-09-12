function Build(scale) {
  this.scale = scale;
  this.menu = new entity(48, canvasH, canvasW-48, canvasH/2, 0, types.BOX, "#cc00cc", this.scale, 0, 0);
  this.menu.image = null;
  this.menu.alpha = .4;
  this.buttons = [];
  this.curItm = null;
  this.nButtons = 10;
  this.canBuild=false;
  this.hoverTile;
  
  // Add 10 buttons
  for(i = 0; i<this.nButtons;i++){
    this.buttons.push(new Button(32,32,canvasW-48,50+(i*80),"#131a2d", getValueByIndex(actions,i)));
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
    if(this.hoverTile!=null && this.hoverTile.isFloor() || (this.hoverTile!=null && this.curItm==actions.PC && this.hoverTile.isTable())){
      switch(this.curItm) {
        case actions.CHAIR:
          if(SCORE>CHAIRPRICE)this.canBuild=true;
          break;
        case actions.DESK:
          if(SCORE>TABLEPRICE)this.canBuild=true;
          break;
        case actions.PC:
          ta = getTile(hoverIndex-19, cart.level);
          tb = getTile(hoverIndex+19, cart.level);
          if(SCORE>PCPRICE && (ta.isChairB() || tb.isChairT())){
            this.canBuild=true;
          }
          break;
        case actions.VEND:
          if(SCORE>VENDPRICE)this.canBuild=true;
          break;
        case actions.SERVER:
          if(SCORE>SERVERPRICE)this.canBuild=true;
          break;
        case actions.AUTO:
          if(SCORE>AUTOPRICE)this.canBuild=true;
          break;
      }
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
  
  this.processBuilding = function(processClick,level, customer){
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
        
        switch(this.curItm) {
          case actions.CHAIR:
            // A table between tables
            if(t.isChairB()){
                if(ta.isTable() && !taa.isChairB()){
                  t.entity.type = types.CHAIR_T;
                  if(tb.entity.pc != null){
                    t.entity.person = null;
                    customer.removePC(tb.entity.pc);
                    tb.entity.pc = null;
                  }
                }
                break;
            } else if(t.isChairT()){
              if(tb.isTable() && !tbb.isChairT()){  
                t.entity.type = types.CHAIR_B;
                if(ta.entity.pc != null){
                  t.entity.person = null;
                  customer.removePC(ta.entity.pc);
                  ta.entity.pc = null;
                }  
              }
              break;
            }

            if(tb.isTable()){
              // CHAIR ABOVE TABLE
              if(tbb.isChairT()){
                // The PC is below
                tbb.entity.type = types.FLOOR;
                t.entity.person = null;
                tbb.entity.person = null;
                if(tb.entity.pc != null) tb.entity.pc.chair = t;
                tbb.change();
                tb.entity.flipMonitors();
                t.entity.type = types.CHAIR_B;
              } else {
                if(SCORE>CHAIRPRICE){
                  t.entity.type = types.CHAIR_B;
                  SCORE-=CHAIRPRICE;
                  setHeroText("- $"+CHAIRPRICE);
                } else {
                  setHeroText("Not enough $");
                }
              }
            } else if(ta.isTable()){
              // The PC is above
              if(taa.isChairB()){
                taa.entity.type = types.FLOOR;
                t.entity.person = null;
                taa.entity.person = null;
                if(ta.entity.pc != null) ta.entity.pc.chair = t;
                taa.change();
                ta.entity.flipMonitors();
                t.entity.type = types.CHAIR_T;
              } else {
                if(SCORE>CHAIRPRICE){
                  t.entity.type = types.CHAIR_T;
                  SCORE-=CHAIRPRICE;
                  setHeroText("- $"+CHAIRPRICE);
                } else {
                  setHeroText("Not enough $");
                }
              }
            }
            break;
          case actions.DESK:
            if(t.isFloor()){
              if(SCORE>TABLEPRICE){
                SCORE-=TABLEPRICE;
                setHeroText("- $"+TABLEPRICE);
                t.entity.type = types.TABLE;
              } else {
                setHeroText("Not enough $");
              }
            }
            break;
          case actions.PC:
            if(t.isTable()){  
              if(SCORE>PCPRICE && (ta.isChairB() || tb.isChairT()) && t.entity.pc==null){
                SCORE-=PCPRICE;
                setHeroText("- $"+PCPRICE);
                if (ta.isChairB()){
                  t.entity.addPC(types.PC,ta,t);
                  customer.addPC(t.entity.pc);
                } else if (tb.isChairT()) {
                  t.entity.addPC(types.PC_B,tb,t);
                  customer.addPC(t.entity.pc);
                }
              } else {
                if(t.entity.pc!=null){
                  setHeroText("Has PC!");
                } else if (!ta.isChairB() && !tb.isChairT()){
                  setHeroText("No Chairs");
                } else {
                  setHeroText("Not enough $");
                }  
              }
            }
            t.change();
            break;
          case actions.VEND:
            if(SCORE>VENDPRICE){
              if(t.isFloor()){
                t.entity.type = types.VEND;
                SCORE-=VENDPRICE;
                setHeroText("- $"+VENDPRICE);
              }
            } else {
              setHeroText("Not enough $");
            }
            break;
          case actions.SERVER:
            if(SCORE>SERVERPRICE){
              if(t.isFloor()){
                t.entity.type = types.SERVER;
                SCORE-=SERVERPRICE;
                setHeroText("- $"+SERVERPRICE);
              }
            } else {
              setHeroText("Not enough $");
            }
            break;
          case actions.GUN:
            ox = cart.hero.x - cart.hero.mhWidthScaled ;
            oy = cart.hero.y - cart.hero.mhHeightScaled;
            dx = clickedAt.x;
            dy = clickedAt.y;
            cart.hero.gun.addBullets(ox,oy,dx,dy);
            break;
          case actions.AUTO:
            if(t.isFloor()){
              t.entity.type = types.AUTO;
              SCORE-=AUTOPRICE;
              setHeroText("- $"+AUTOPRICE);
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