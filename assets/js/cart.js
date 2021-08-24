function Cart() {
  xOff = 0;
  yOff = 0;
  this.scale = 4;
  this.cube = 16; // width of tiles
  this.scaled = this.scale*this.cube;
  this.hero = new entity(16, 16, canvasW/2, canvasH/2, 0, types.HERO, "", this.scale, xOff, yOff);
  this.hero.setType();
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
    if (left())   this.hero.x -= this.gMove(-this.speed,0);
    if (right())  this.hero.x += this.gMove(this.speed,0);
    if (up())     this.hero.y -= this.gMove(0,-this.speed);
    if (down())   this.hero.y += this.gMove(0,this.speed);
    if (space())  this.menu.curItm=actions.GUN;
    if(one()) cart.reset();

    // Check for door hit
    if(this.door != null){
      this.level = this.levels[this.door.loadRoom];
      if(this.door.exitX != -1) this.hero.x = this.door.exitX;
      if(this.door.exitY != -1) this.hero.y = this.door.exitY;
      this.door = null;
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
      this.hero.colArr.push(this.level.tiles[heroTileIndex+1]);  // RIGHT
      this.hero.colArr.push(this.level.tiles[heroTileIndex+18]); // TOP LEFT
      this.hero.colArr.push(this.level.tiles[heroTileIndex+19]); // ABOVE
      this.hero.colArr.push(this.level.tiles[heroTileIndex+20]); // TOP RIGHT
      this.hero.colArr.push(this.level.tiles[heroTileIndex-18]); // BOTTOM LEFT
      this.hero.colArr.push(this.level.tiles[heroTileIndex-19]); // BELOW
      this.hero.colArr.push(this.level.tiles[heroTileIndex-20]); // BOTTOM RIGHT
    }

    //GUN TEST
    if(processClick){
      ox = cart.hero.x - cart.hero.mhWScaled ;
      oy = cart.hero.y - cart.hero.mhHScaled;
      dx = clickedAt.x;
      dy = clickedAt.y;
      cart.hero.gun.addBullets(ox,oy,dx,dy);
    }
    
    // check for each pixel if the hero can move (1,2,3,4,5)
    this.gMove = function(xx,yy){
      rec = cloneRectanlge(this.hero.hb);
      rec.x += xx;
      rec.y += yy;
      amount = 0;
      stop=false;
      for(var i = 1; i<this.speed; i++){
        canMove = true;
        for (var t = 0; t < this.hero.colArr.length; t++) {
          tile = this.hero.colArr[t];
          if(!stop){
            if(rectColiding(tile.entity.hb, rec)){
              if(tile.entity.isSolid){
                canMove = false;
                break;
              } else if(tile.entity.isDoor && tile.doorSet()){
                console.log("Door");
                this.door = tile.door;
                stop = true;
                break;
              }  
            }
          }
        }
        if(canMove) amount ++;
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
