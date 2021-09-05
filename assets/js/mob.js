function mob(w, h, x, y, angle, type, colour, scale, hbOffX = 0, hbOffY = 0, maxHP) {
  this.entity = new entity(w, h, x, y, angle, type, colour, scale, xOff, yOff, false, maxHP);
  this.type=0;
  this.speed = randomNum(1,2);
  this.colArr = [];
  
  this.update = function(delta) {  
    var x = this.entity.x;
    var y = this.entity.y;
      
    // Add surrounding tiles
    row = Math.floor((y - this.entity.mhHScaled) / cart.scaled);
    col = Math.floor((x - this.entity.mhWScaled) / cart.scaled);
    index = col + (19*row);
    
    // basic follow
    if(this.type == mobtype.FOLLOW){
      this.entity.x = x < cart.hero.x ? x += this.move(this.speed,0) : x += this.move(-this.speed,0);
      this.entity.y = y < cart.hero.y ? y += this.move(0,this.speed) : y += this.move(0,-this.speed);
    }
    
    // Add surrounding tiles and other entities for collision checks
    this.colArr=[];
    cart.surTiles.forEach(e => this.colArr.push(cart.level.tiles[index+e].entity));
    this.colArr.push(cart.hero);
    cart.level.mobs.forEach(e => this.colArr.push(e.entity));
        
    this.entity.update(delta);
    
    if(this.entity.hp < this.entity.maxHP){
      //ctx.save();
      ctx.save();
      var e = this.entity;
      ctx.globalAlpha = .8
      // Draw HP box;
      ctx.translate(e.x, e.y+(e.height*e.scale+10));
      ctx.drawImage(e.image, 0, 32, e.width, 8, e.hWidth, 4, e.width * e.scale, 7 * e.scale);
      // Draw HP
      ctx.fillStyle = "#00dcf8";
      w=(48/e.maxHP)*e.hp;
      ctx.fillRect(16,14,w,10);
      ctx.restore();
    }
  }
  
  this.move = function(x,y){
    rec = cloneRectanlge(this.entity.hb);
    rec.x += x;
    rec.y += y;
    canMove = true;
    amount = x+y;

    for (var t = 0; t < this.colArr.length; t++) {
      obj = this.colArr[t];
      
      if(obj != this.entity && obj.isSolid && rectColiding(obj.hb,rec)){
        canMove = false;
        amount=0;
        break;
      }
    }
    return amount;
  }
    
}