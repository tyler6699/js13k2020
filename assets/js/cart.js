function Cart() {
  xOff = 0;
  yOff = 0;
  this.scale = 4;
  this.cube = 16; // width of tiles
  this.scaled = this.scale*this.cube;
  this.hero = new entity(16, 16, canvasW/2, canvasH/2, 0, types.HERO, "", this.scale, xOff, yOff);
  this.hero.gun = new Gun();
  this.speed = 7;
  this.levels = [];
  
  // Set up levels
  for(i=0;i<9;i++){
    var lvl = new level(canvasW, canvasH, i, this.scale);
    lvl.reset(i, this.scaled);
    this.levels.push(lvl);
  }
  
  this.level = this.levels[0];
  this.hero.currentLevel = 0;
  this.menu = new Build(this.scale);

  // Render & Logic
  this.update = function(delta, time) {
    // Track Hero Door collisions
    this.door = null;
    
    // Controls
    if (left())   this.hero.x -= this.gMove(-1,0);
    if (right())  this.hero.x += this.gMove(1,0);
    if (up())     this.hero.y -= this.gMove(0,-1);
    if (down())   this.hero.y += this.gMove(0,1);
    if (space())  this.menu.curItm=actions.GUN;
    if(one()) cart.reset();

    // Check for door hit
    if(this.door != null){
      this.hero.gun.bullets=[];
      this.level = this.levels[this.door.loadRoom];
      if(this.door.exitX != -1) this.hero.x = this.door.exitX;
      if(this.door.exitY != -1) this.hero.y = this.door.exitY;
      this.door = null;
      introT = 32;
    }
    
    // Set Hero Current Tile
    heroRow = Math.floor((this.hero.y - this.hero.mhHScaled) / this.scaled);
    heroCol = Math.floor((this.hero.x - this.hero.mhWScaled) / this.scaled);
    heroTileIndex = heroCol + (19*heroRow);
    if(this.currentTile != null) this.prevTile = this.currentTile;
    this.currentTile = this.level.tiles[heroTileIndex];

    if(this.currentTile != this.prevTile){
      this.hero.colArr = [];
      
      // Add surrounding tiles
      if(heroTileIndex) this.hero.colArr.push(this.level.tiles[heroTileIndex-1]);  // LEFT
      [-1,1,18,19,20,-18,-19,-20].forEach(e => this.hero.colArr.push(this.level.tiles[heroTileIndex+e]));
      this.level.mobs.forEach(e => this.hero.colArr.push(e));
    }

    //GUN TEST
    if(holdClick) holdClickT += delta;
    if(processClick || holdClickT > .25){
      ox = cart.hero.x - cart.hero.mhWScaled ;
      oy = cart.hero.y - cart.hero.mhHScaled;
      dx = clickedAt.x;
      dy = clickedAt.y;
      cart.hero.gun.addBullets(ox,oy,dx,dy);
    }
        
    // check for each pixel if the hero can move, starting with full amount
    // The array contains tiles and mobs (Entities)
    this.gMove = function(xx,yy){
      rec = cloneRectanlge(this.hero.hb);
      rec.x += xx * this.speed;
      rec.y += yy * this.speed;
      amount = this.speed;
      stop=false;
      canMove = true;
      
      // Move full amount and then try decreasing 
      for(var i = this.speed; i>0; i--){
        canMove = true;
        
        for (var t = 0; t < this.hero.colArr.length; t++) {
          obj = this.hero.colArr[t];
          
          if(obj.isTile()){
            if(!stop && rectColiding(obj.entity.hb,rec)){
              if(obj.active && obj.entity.isSolid){
                canMove = false;
                break;
              } else if(obj.isDoor && obj.doorSet()){  
                this.door = obj.door;
                stop = true;
                break;
              }
            }
          } else { // MOB
            if(!stop && obj.active && obj.isSolid && rectColiding(obj.hb, rec)){
              canMove = false;
              break;
            }
          }
        }
        if(canMove || stop){
          break;
        } else {
          amount--;
          rec.x -= xx;
          rec.y -= yy;
        }
      }
      
      return amount;
    }

    // Render
    renderStarField(time);
    this.level.draw(this.hero, delta);

    // Draw Text
    gradient = ctx.createLinearGradient(0, 0, canvasW, 0);
    gradient.addColorStop("0", "#"+COL2);
    gradient.addColorStop(".5", "#"+COL1);
    ctx.fillStyle = gradient;
    ctx.font = "italic 40px Arial";
    ctx.fillText("SCORE " + SCORE, 900, 50);
    processClick = false;

    // HERO
    this.hero.update(delta);
    this.hero.gun.drawBullets(delta);

    //this.menu.update();
    // Mouse
    mainGame.canvas.style.cursor='none';
    let mx = mousePos.x;
    let my = mousePos.y;
    let mw = 2;
    let mh = 15;
    mainGame.context.globalCompositeOperation = 'difference';
    mainGame.context.fillStyle='WHITE'
    mainGame.context.fillRect(mx-mw,my-mh,mw*2,mh*2);
    mainGame.context.fillRect(mx-mh,my-mw,mh*2,mw*2);
    mainGame.context.globalCompositeOperation = 'source-over';
    
    if(introT > 0){
      for(i = 0;i <= canvasW/33;i++){
        for(j = 0;j <= canvasH/33;j++){
          ctx = mainGame.context;
          ctx.save();
          ctx.translate(i*32, j*32);
          col = i%2==0&&j%2==0 ? "#000" : "#FFF";
          ctx.fillStyle = col;
          ctx.globalAlpha = .5;
          ctx.fillRect(introT/-2, introT/-2, introT, introT);
          ctx.restore();
        }
      }
      introT -= delta*48;
    }
    
    // Clear Mobs
    // Remove bullets
    this.level.mobs = this.level.mobs.filter(function (m) {
      return m.active == true;
    });
    
    if(this.level.mobs.length == 0 && !this.level.gatesOpen){
      this.level.openDoors();
    }
    
    if (map()){
      // Render Map
      ctx = mainGame.context;
      ctx.save();
      ctx.translate(0, 0);
      ctx.globalAlpha = .8;
      ctx.fillStyle = "WHITE";
      offX = (canvasW/2) - 180;
      offY = (canvasH/2) - 180;
      this.levels.forEach((l, i) => {
        var X = (i % 3) * 120;
        var Y = Math.floor(i / 3) * 120;
        c = l.gatesOpen ? "GREEN" : "RED";
        ctx.fillStyle=c;
        ctx.fillRect(X+offX, Y+offY, 100, 100);
        if(this.level == l){
          ctx.fillStyle="BLACK";
          ctx.fillRect(X+25+offX, Y+25+offY, 50, 50);
        }
      });      
      ctx.restore();
    }
  }

  this.reset = function(){
    GAMEOVER=false;
    WIN=false;
    this.hero = new entity(16, 16, canvasW/2, canvasH/2, 0, types.HERO, "", this.scale, xOff, yOff);
    this.hero.sx = 16;
    this.level = new level(canvasW, canvasH, 0);
    this.level.reset(this.hero, this.scale);
  }
}
