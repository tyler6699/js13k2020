function Cart() {
  xOffset = 5;
  yOffset = 5;
  this.scale = 4;
  this.hero = new entity(16, 16, canvasW/2, canvasH/2, 0, types.HERO, "", this.scale, xOffset, yOffset);
  this.hero.sx = 16;
  this.speed = 5;
  this.level = new level(canvasW, canvasH, 0);
  this.hero.currentLevel = 0;
  this.hero.gun = new Gun();
  this.level.reset(this.hero, this.scale);
  this.menu = new Build(this.scale);
  this.customers = new Customers();

  // Render & Logic
  this.update = function(delta, time) {
    // Controls
    if (left()) this.hero.x -= this.getMoveAmount(-this.speed,0);
    if (right()) this.hero.x += this.getMoveAmount(this.speed,0);
    if (up()) this.hero.y -= this.getMoveAmount(0,-this.speed);
    if (down()) this.hero.y += this.getMoveAmount(0,this.speed);
    if (space()){
      this.menu.curItm=actions.GUN;
    }
    
    // Set Hero Current Tile
    heroRow = Math.floor((this.hero.y - this.hero.mhHeightScaled) / 64);
    heroCol = Math.floor((this.hero.x - this.hero.mhWidthScaled) / 64);
    heroTileIndex = heroCol + (19*heroRow);
    if(this.currentTile != null) this.prevTile = this.currentTile;
    this.currentTile = this.level.tiles[heroTileIndex];
    
    if(this.currentTile != this.prevTile){
      this.hero.collisionArray = [];
      // Add surrounding tiles
      if(heroTileIndex) this.hero.collisionArray.push(this.level.tiles[heroTileIndex-1]);  // LEFT
      this.hero.collisionArray.push(this.level.tiles[heroTileIndex+1]);  // RIGHT
      this.hero.collisionArray.push(this.level.tiles[heroTileIndex+18]); // TOP LEFT
      this.hero.collisionArray.push(this.level.tiles[heroTileIndex+19]); // ABOVE
      this.hero.collisionArray.push(this.level.tiles[heroTileIndex+20]); // TOP RIGHT
      this.hero.collisionArray.push(this.level.tiles[heroTileIndex-18]); // BOTTOM LEFT
      this.hero.collisionArray.push(this.level.tiles[heroTileIndex-19]); // BELOW
      this.hero.collisionArray.push(this.level.tiles[heroTileIndex-20]); // BOTTOM RIGHT      
    }
    
    for (var i = 0; i < this.hero.collisionArray.length; i++) {
      tile = this.hero.collisionArray[i];
      if(tile.entity.isServer() && rectColiding(tile.entity.hitbox,this.hero.sensor) && tile.entity.ammo>0){
        this.hero.gun.ammo += tile.entity.ammo;
        this.hero.showTextY=-15;
        this.hero.showTextTime=TEXTTIME/2;
        this.hero.currentGift+=tile.entity.ammo;
        this.hero.showText="++ " + this.hero.currentGift + " data";
        tile.entity.ammo=0;
        tile.entity.time=0;
      }
    }
  
    // Render
    // Star Field
    renderStarField(time);
    this.customers.tick(delta, this.level);
    this.level.draw(this.hero, delta);
    this.customers.draw(delta);
    
    // Draw Text
    gradient = ctx.createLinearGradient(0, 0, canvasW, 0);
    gradient.addColorStop("0", "#05f2db");
    gradient.addColorStop(".5", "#990099");
    ctx.fillStyle = gradient;
    ctx.font = "italic 40px Arial";
    ctx.fillText("$: " + SCORE, 900, 50);
    ctx.font = "italic 30px Arial";
    ctx.fillText("PCS: " + this.customers.pcs.length, 30, 50);
    ctx.fillText("USERS: " + this.customers.userCount, 170, 50);
    ctx.fillText("RATING: " + NEWPERSONCHANCE + "%", 350, 50);
    ctx.fillText("DATA: " + this.hero.gun.ammo, 580, 50);
      
    if(this.menu.curItm != null && this.menu.hoverTile!=null && this.menu.curItm != actions.GUN){
      ctx = mainGame.context;
      ctx.save();
      ctx.translate(this.menu.hoverTile.entity.x, this.menu.hoverTile.entity.y);
      if(this.menu.curItm == actions.PC){
        if(!this.menu.hoverTile.isTable()){
          ctx.drawImage(atlas, 32, 48, 16, 16, 8, 8, 64, 64);
        } else { 
          ctx.drawImage(atlas, 112, 32, 16, 16, 8, 8, 64, 64);  
        }
      } else {  
        if(!this.menu.canBuild){
          ctx.drawImage(atlas, 32, 48, 16, 16, 8, 8, 64, 64); 
        } else if(this.menu.canBuild && this.menu.hoverTile.isFloor()) {
          ctx.drawImage(atlas, 112, 32, 16, 16, 8, 8, 64, 64);  
        }
      }
      ctx.restore();
    }
    
    if(processClick) processClick = cart.menu.tick();
    cart.menu.checkBuild();
    
    this.menu.processBuilding(processClick,this.level, this.customers);
    processClick = false;
    // HERO
    this.hero.update(delta);
    this.hero.gun.drawBullets(delta, this.customers.pcs);
    
    this.menu.update();
    
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
  }
  
  // check for each pixel if the hero can move (1,2,3,4,5)
  this.getMoveAmount = function(xx,yy){      
    rec = cloneRectanlge(this.hero.hitbox);
    rec.x += xx;
    rec.y += yy;
    amount = 0;
    for(var i = 1; i<this.speed; i++){
      canMove = true;
      for (var t = 0; t < this.hero.collisionArray.length; t++) {
        tile = this.hero.collisionArray[t];
        if(tile.entity.isSolid && rectColiding(tile.entity.hitbox, rec)){
          canMove = false;
          break;
        }
      }
      if(canMove) amount ++;
    }
    return amount;
  }

  this.reset = function(){
    PCID = -1;
    BID = 0;
    SCORE = 404;
    VENDNUM=3;
    SERVEREVENT=10;
    VENDEVENT=10;
    AMMOCOST=5;
    AMMOGIFT=5;
    TEXTTIME=2;
    HEROTEXTTIME=.4;
    DELIVERED=25;
    EXITPENALTY=20;
    SHOOTDIST=400;
    AMMOSTART = 100;
    NEWPERSONCHANCE = 75;
    SHOOTWAIT=3;
    AUTOLEVEL=1;
    GAMEOVER=false;
    UPPRICE=1000;
    
    this.hero = new entity(16, 16, canvasW/2, canvasH/2, 0, types.HERO, "", this.scale, xOffset, yOffset);
    this.hero.sx = 16;
    this.level = new level(canvasW, canvasH, 0);
    this.hero.gun = new Gun();
    this.level.reset(this.hero, this.scale);
    this.customers = new Customers();
  }
}
