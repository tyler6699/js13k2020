function Hero(w, h, x, y, angle, type, colour, xOffset, yOffset, sx){
  this.entity = new entity(w, h, x, y, angle, type, "white", xOffset, yOffset);
  this.entity.sx = sx;
  this.currentLevel = 0;
  this.collisionArray = [];
  this.speed = 5;
  this.currentTile = null;
  this.prevTile = null;
  
  this.move = function(dir){
    if(dir==direction.LEFT){
      this.entity.x -= this.getMoveAmount(-this.speed,0);
    } else if (dir==direction.RIGHT){
      this.entity.x += this.getMoveAmount(this.speed,0);
    } else if (dir==direction.UP){
      this.entity.y -= this.getMoveAmount(0,-this.speed);
    } else if (dir==direction.DOWN){
      this.entity.y += this.getMoveAmount(0,this.speed);
    }
  }
    
  this.updateCollisionTiles = function(tileSize, colCount, tiles){
    heroRow = Math.floor((this.entity.y - this.entity.mhHeightScaled) / tileSize);
    heroCol = Math.floor((this.entity.x - this.entity.mhWidthScaled) / tileSize);
    heroTileIndex = heroCol + (colCount*heroRow);
    if(this.currentTile != null) this.prevTile = this.currentTile;
    this.currentTile = tiles[heroTileIndex];

    if(this.currentTile != this.prevTile){
      this.collisionArray = [];
      // Add surrounding tiles
      if(heroTileIndex) this.collisionArray.push(tiles[heroTileIndex-1]);  // LEFT
      this.collisionArray.push(tiles[heroTileIndex+1]);  // RIGHT
      this.collisionArray.push(tiles[heroTileIndex+colCount-1]); // TOP LEFT
      this.collisionArray.push(tiles[heroTileIndex+colCount]); // ABOVE
      this.collisionArray.push(tiles[heroTileIndex+colCount+1]); // TOP RIGHT
      this.collisionArray.push(tiles[heroTileIndex-colCount-1]); // BOTTOM LEFT
      this.collisionArray.push(tiles[heroTileIndex-colCount]); // BELOW
      this.collisionArray.push(tiles[heroTileIndex-colCount+1]); // BOTTOM RIGHT
    }
  }
  // check for each pixel if the hero can move (1,2,3,4,5)
  this.getMoveAmount = function(xx,yy){
    rec = cloneRectanlge(this.entity.hitbox);
    rec.x += xx;
    rec.y += yy;
    amount = 0;
    for(var i = 1; i<this.speed; i++){
      canMove = true;
      for (var t = 0; t < this.collisionArray.length; t++) {
        tile = this.collisionArray[t];
        if(tile != null && tile.entity.isSolid && rectColiding(tile.entity.hitbox, rec)){
          canMove = false;
          break;
        }
      }
      if(canMove) amount ++;
    }
    return amount;
  }
}