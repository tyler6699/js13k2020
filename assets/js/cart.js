function Cart() {
  xOffset = 5;
  yOffset = 5;
  this.scale = 4;
  this.hero = new entity(16, 16, canvasW/2, canvasH/2, 0, types.HERO, "red", this.scale, xOffset, yOffset);
  this.hero.image.src = "atlas.png";
  this.hero.sx = 16;
  this.entities = [];
  this.speed = 5;
  this.level = new level(canvasW, canvasH, 0);
  this.hero.currentLevel = 0;
  this.level.reset(this.hero, this.scale);

  // Render
  this.update = function(delta, time) {
    controllers = navigator.getGamepads();
    
    // Controls
    if (left()) {
      rec = cloneRectanlge(this.hero.hitbox);
      rec.x -= this.speed;
      canMove = true;
      for (var t = 0; t < this.hero.collisionArray.length; t++) {
        tile = this.hero.collisionArray[t];
        if(tile.entity.isSolid && rectColiding(tile.entity.hitbox, rec)){
          console.log(tile);
          canMove = false;
          break;
        }
      }
      if(canMove) this.hero.x -= this.speed;
    }

    if (right()) {
      canMove = true;
      rec = cloneRectanlge(this.hero.hitbox);
      rec.x += this.speed;
      for (var t = 0; t < this.hero.collisionArray.length; t++) {
        tile = this.hero.collisionArray[t];
        if(tile.entity.isSolid && rectColiding(tile.entity.hitbox, rec)){
          canMove = false;
          break;
        }
      }
      if(canMove) this.hero.x += this.speed;
    }

    if (up()) {
      rec = cloneRectanlge(this.hero.hitbox);
      rec.y -= this.speed;
      canMove = true;
      for (var t = 0; t < this.hero.collisionArray.length; t++) {
        tile = this.hero.collisionArray[t];
        if(tile.entity.isSolid && rectColiding(tile.entity.hitbox, rec)){
          canMove = false;
          break;
        }
      }
      if(canMove) this.hero.y -= this.speed;
    }

    if (down()) {
      rec = cloneRectanlge(this.hero.hitbox);
      rec.y += this.speed;
      canMove = true;
      for (var t = 0; t < this.hero.collisionArray.length; t++) {
        tile = this.hero.collisionArray[t];
        if(tile.entity.isSolid && rectColiding(tile.entity.hitbox, rec)){
          canMove = false;
          break;
        }
      }
      if(canMove) this.hero.y += this.speed;
    }

    if (space()) {

    }
    
    // Set Hero Current Tile
    // Set Hero Centre.....TODO: THIS
    heroRow = Math.floor((this.hero.y - this.hero.mhHeightScaled) / 64);
    heroCol = Math.floor((this.hero.x - this.hero.mhWidthScaled) / 64);
    heroTileIndex = heroCol + (19*heroRow);
    this.currentTile = this.level.tiles[heroTileIndex];
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
    //console.log(this.hero.collisionArray);
    
    // Render

    // Star Field
    mainGame.context.fillStyle='#FFF';
    for(let i=2e3;i--;){
      x = (Math.sin(i)*1e9-time/2e3*(i+1e3)/50)%(mainGame.canvas.width+9)-9;
      y = i*9%mainGame.canvas.height;
      s = i%5;
      mainGame.context.fillRect(x,y,s,s);
    }

    this.level.tick(this.hero);
    this.level.draw(this.hero);

    // Entities
    for (entity in this.entities) {
      e = this.entities[entity]
      if (e.type == types.WALL) {
        // Check hit
        //if (rectColiding(game.hero.hitbox, rainbow.hitbox)) {

        //}
      }
      e.update(delta);
    }

    // TESTING ITEMS
    if(processClick){
      processClick = false;
      t = this.level.tiles[clickIndex];
      
      if(t.entity.type == types.FLOOR){
          t.entity.isSolid = true;
          t.entity.type = types.TABLE;  
      } else if(t.entity.type == types.TABLE){
        // check if table is above or below
        tileIndex = t.column + (19*t.row);

        // Test placing PCS
        if(this.level.tiles[tileIndex+19].entity.type == types.TABLE){
          t.entity.isSolid = false;
          t.entity.type = types.CHAIR_B; 
          this.level.tiles[tileIndex+19].entity.hasPC_T = true; 
          this.level.tiles[tileIndex+19].entity.hasPC_B = false; 
          if(this.level.tiles[tileIndex+38].entity.type != types.FLOOR){
              this.level.tiles[tileIndex+38].entity.type = types.FLOOR;
              this.level.tiles[tileIndex+38].change();
          }
        } else if(this.level.tiles[tileIndex-19].entity.type == types.TABLE){
          // CHAIR BELOW TABLE
          t.entity.isSolid = false;
          t.entity.type = types.CHAIR_T;  
          this.level.tiles[tileIndex-19].entity.hasPC_T = false; 
          this.level.tiles[tileIndex-19].entity.hasPC_B = true; 
          if(this.level.tiles[tileIndex-38].entity.type != types.FLOOR){
              this.level.tiles[tileIndex-38].entity.type = types.FLOOR;
              this.level.tiles[tileIndex-38].change();
          }
        }
        
      }  
      t.change();
    }
    
    this.hero.update(delta);

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
}
