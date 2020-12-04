function Cart() {
  xOffset = 5;
  yOffset = 5;
  this.scale = 1;
  this.tileSzie = 16;
  this.hero = new entity(16, 16, canvasW/2, canvasH/2, 0, types.HERO, "", this.scale, xOffset, yOffset);
  this.hero.sx = 16;
  this.speed = 5;
  this.level = new level(canvasW, canvasH, 0);
  this.hero.currentLevel = 0;
  this.level.reset(this.hero, this.scale);

  // Render & Logic
  this.update = function(delta, time) {
    // Controls
    if (left()) this.hero.x -= this.getMoveAmount(-this.speed,0);
    if (right()) this.hero.x += this.getMoveAmount(this.speed,0);
    if (up()) this.hero.y -= this.getMoveAmount(0,-this.speed);
    if (down()) this.hero.y += this.getMoveAmount(0,this.speed);
    if(one()) cart.reset();

    // Set Hero Current Tile
    heroRow = Math.floor((this.hero.y - this.hero.mhHeightScaled) / this.tileSzie);
    heroCol = Math.floor((this.hero.x - this.hero.mhWidthScaled) / this.tileSzie);
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

    // Render
    // Star Field
    renderStarField(time);
    this.level.draw(this.hero, delta);
    processClick = false;

    // HERO
    this.hero.update(delta);

    // Mouse
    // Hide Cursor
    //mainGame.canvas.style.cursor='none';
    let mx = mousePos.x;
    let my = mousePos.y;
    let mw = 2;
    let mh = 10;
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
        if(tile != null && tile.entity.isSolid && rectColiding(tile.entity.hitbox, rec)){
          canMove = false;
          break;
        }
      }
      if(canMove) amount ++;
    }
    return amount;
  }

  this.reset = function(){
    BSPEED=300;
    WIN=false;
    this.hero = new entity(this.tileSzie, this.tileSzie, canvasW/2, canvasH/2, 0, types.HERO, "", this.scale, xOffset, yOffset);
    this.hero.sx = 16;
    this.level = new level(canvasW, canvasH, 0);
    this.level.reset(this.hero, this.scale);
  }
}
