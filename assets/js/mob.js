function mob(w, h, x, y, angle, type, colour, scale, hbOffX = 0, hbOffY = 0, maxHP) {
  this.entity = new entity(w, h, x, y, angle, type, colour, scale, xOff, yOff, false, maxHP);
  this.type=mobtype.FOLLOW;
  this.speed = randomNum(1,2);
  this.colArr = [];
  this.noX=false;
  this.noY=false;
  this.waitXStuck=1;
  this.waitYStuck=1;
  //this.hitHero=false;
  this.time=0;
  this.tryXSpeed=this.speed;
  this.tryYSpeed=this.speed;
  
  this.update = function(delta) {  
    this.time+=delta;
    
    if(this.time > 2){
      this.time=0
      this.noX=false;
      this.noY=false;
      this.waitYStuck=0;
      this.waitXStuck=0;
      //this.hitHero=false;
      this.tryXSpeed = randomNum(0,10)>5 ? this.speed : -this.speed;
      this.tryYSpeed = randomNum(0,10)>5 ? this.speed : -this.speed;
    }
    var x = this.entity.x;
    var y = this.entity.y;
      
    // Add surrounding tiles
    row = Math.floor((y - this.entity.mhHScaled) / cart.scaled);
    col = Math.floor((x - this.entity.mhWScaled) / cart.scaled);
    index = col + (19*row);
    
    // basic follow
    if(this.type == mobtype.FOLLOW){
      //this.hitHero=false;
      if(this.noX && this.waitXStuck>0){
        this.waitXStuck-=delta;
        this.entity.y = y += this.move(0,this.tryYSpeed);
        console.log("Move UP");
      } else {
        this.entity.y = y < cart.hero.y ? y += this.move(0,this.speed) : y += this.move(0,-this.speed);
      }
      if(this.noY && this.waitYStuck>0){
        this.waitYStuck-=delta;
        this.entity.x = x += this.move(this.tryXSpeed,0);
        console.log("MoveRIght");
      } else {
        this.entity.x = x < cart.hero.x ? x += this.move(this.speed,0) : x += this.move(-this.speed,0);
      }
    } else if(this.type==mobtype.SIMPLE){
      this.entity.y = y < cart.hero.y ? y += this.move(0,this.speed) : y += this.move(0,-this.speed)
      this.entity.x = x < cart.hero.x ? x += this.move(this.speed,0) : x += this.move(-this.speed,0);
    }
    
    // Add surrounding tiles and other entities for collision checks
    this.colArr=[];
    cart.surTiles.forEach(e => this.colArr.push(cart.level.tiles[index+e].entity));
    this.colArr.push(cart.hero);
    cart.level.mobs.forEach(e => this.colArr.push(e.entity));
        
    this.entity.update(delta);
    
    if(this.entity.hp < this.entity.maxHP){
      var e = this.entity;
      drawImg(ctx, e.image, 0, 32, e.width, 8, e.x, e.y+(e.height*e.scale+10), .8, e.scale);
      drawRect(ctx, e.x, e.y+(e.height*e.scale+12),16,14,(48/e.maxHP)*e.hp,12,"#00dcf8",.8)
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
        if(obj.isHero){
        //  this.hitHero=true
          console.log("hit hero");
        };
        canMove = false;
        amount=0;
        break;
      }
    }
    
    // Silly logic to let enemy try and move
    if(amount==0){
      if(x != 0){
        this.noX=true;
        this.waitXStuck=.8;
      } else {
        this.noY=true;
        this.waitYStuck=.8;
      }
    } else {
      if(x != 0 && this.waitXStuck==0){
        this.noX=false;
      } else if(this.waitYStuck==0) {
        this.noY=false;
      }
    }
    
    return amount;
  }
    
}