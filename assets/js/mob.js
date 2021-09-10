function mob(w, h, x, y, angle, type, scale, maxHP) {
  this.entity = new entity(w, h, x, y, angle, type, "", scale, false, maxHP);
  this.type=mobtype.FOLLOW;
  this.spd = randomNum(1,2);
  this.colArr = [];
  this.noX=false;
  this.noY=false;
  this.waitX=1;
  this.waitY=1;
  this.time=0;
  this.tryXSpeed=this.spd;
  this.tryYSpeed=this.spd;
  
  this.update = function(delta) {  
    this.time+=delta;
    
    if(this.time > 2){
      this.time=0
      this.noX=false;
      this.noY=false;
      this.waitY=0;
      this.waitX=0;
      this.tryXSpeed = randomNum(0,10)>5 ? this.spd : -this.spd;
      this.tryYSpeed = randomNum(0,10)>5 ? this.spd : -this.spd;
    }
    var x = this.entity.x;
    var y = this.entity.y;
      
    // Add surrounding tiles
    row = Math.floor((y - this.entity.mhHScaled) / cart.scaled);
    col = Math.floor((x - this.entity.mhWScaled) / cart.scaled);
    index = col + (19*row);
    e = this.entity;
    // basic follow
    if(this.type == mobtype.FOLLOW){
      //this.hitHero=false;
      if(this.noX && this.waitX>0){
        this.waitX-=delta;
        e.y = y += this.move(0,this.tryYSpeed);
      } else {
        e.y = y < cart.hero.e.y ? y += this.move(0,this.spd) : y += this.move(0,-this.spd);
      }
      if(this.noY && this.waitY>0){
        this.waitY-=delta;
        e.x = x += this.move(this.tryXSpeed,0);
      } else {
        e.x = x < cart.hero.e.x ? x += this.move(this.spd,0) : x += this.move(-this.spd,0);
      }
    } else if(this.type==mobtype.SIMPLE){
      e.y = y < cart.hero.e.y ? y += this.move(0,this.spd) : y += this.move(0,-this.spd)
      e.x = x < cart.hero.e.x ? x += this.move(this.spd,0) : x += this.move(-this.spd,0);
    }
    
    // Add surrounding tiles and other entities for collision checks
    this.colArr=[];
    cart.surTiles.forEach(e => this.colArr.push(cart.level.tiles[index+e].entity));
    this.colArr.push(cart.hero.e);
    cart.level.mobs.forEach(e => this.colArr.push(e.entity));
        
    e.update(delta);
    
    if(e.hp < e.maxHP){
      drawImg(ctx, e.image, 0, 32, e.width, 8, e.x, e.y+(e.height*e.scale+10), .8, e.scale);
      drawRect(ctx, e.x, e.y+(e.height*e.scale+8),16,14,(48/e.maxHP)*e.hp,12,"#00dcf8",.8)
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
    
    if(amount==0){
      if(x != 0){
        this.noX=true;
        this.waitX=.8;
      } else {
        this.noY=true;
        this.waitY=.8;
      }
    } else {
      if(x != 0 && this.waitX==0){
        this.noX=false;
      } else if(this.waitY==0) {
        this.noY=false;
      }
    }
    
    return amount;
  }
    
}