function mob(w, h, x, y, angle, type, colour, scale, hbOffX = 0, hbOffY = 0) {
  this.entity = new entity(w, h, x, y, angle, type, colour, scale, xOff, yOff);
  this.type=0;
  this.speed = 1;
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
    
    this.colArr=[];
    [-1,1,18,19,20,-18,-19,-20].forEach(e => this.colArr.push(cart.level.tiles[index+e].entity));
    this.colArr.push(cart.hero);
    cart.level.mobs.forEach(e => this.colArr.push(e.entity));
        
    this.entity.update(delta);
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