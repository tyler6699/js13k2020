function hero(w, h, x, y, angle, type, scale) {
  this.e = new entity(w, h, x, y, angle, type, "", scale, 0, 0, false, 100);
  this.e.hp=100;
  this.e.gun = new Gun();
  this.speed=5;
  this.door=null;
  this.currentTile=null;
  
  this.update = function(delta) {  
    this.time+=delta;
    this.e.gun.drawBullets(delta);
    this.e.update(delta);
  }  
  
  this.checkGun = function(){
    if(holdClick) holdClickT += delta;
    if(processClick || holdClickT > .25){
      ox = this.e.x - this.e.mhWScaled;
      oy = this.e.y - this.e.mhHScaled;
      dx = clickedAt.x;
      dy = clickedAt.y;
      
      this.e.gun.addBullets(ox,oy,dx,dy);
    }
  }
  
  this.checkDoor = function(){
    // Check for door hit
    if(this.door != null){
      this.e.gun.bullets=[];
      cart.level = cart.levels[this.door.loadRoom];
      if(this.door.exitX != -1) this.e.x = this.door.exitX;
      if(this.door.exitY != -1) this.e.y = this.door.exitY;
      this.door = null;
      cart.introT = 32;
    }
  }
  
  this.setCurrentTile = function(scaled){
    // Set Hero Current Tile
    heroRow = Math.floor((this.e.y - this.e.mhHScaled) / scaled);
    heroCol = Math.floor((this.e.x - this.e.mhWScaled) / scaled);
    heroTileIndex = heroCol + (19*heroRow);
    if(this.currentTile != null) this.prevTile = this.currentTile;
    this.currentTile = cart.level.tiles[heroTileIndex];

    if(this.currentTile != this.prevTile){
      this.e.colArr = [];
      
      // Add surrounding tiles
      cart.surTiles.forEach(e => this.e.colArr.push(cart.level.tiles[heroTileIndex+e]));
      cart.level.mobs.forEach(e => this.e.colArr.push(e.entity));
    }
  }
  
  // check for each pixel if the hero can move, starting with full amount
  // The array contains tiles and mobs (Entities)
  this.gMove = function(xx,yy){
    rec = cloneRectanlge(this.e.hb);
    rec.x += xx * this.speed;
    rec.y += yy * this.speed;
    amount = this.speed;
    stop = false;
    canMove = true;
    
    // Move full amount and then try decreasing 
    for(var i = this.speed; i>0; i--){
      canMove = true;
      
      for (var t = 0; t < this.e.colArr.length; t++) {
        obj = this.e.colArr[t];
        
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
            // Hurt Hero when on Oooze and moving
            if(obj.entity.isBarrel()){
              this.e.hp-=.5;
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
}