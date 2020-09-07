function Gun(){
  this.ammo=0;
  this.bullets=[];
  
  this.addBullets = function(ox,oy,dx,dy){
    this.bullets.push(new Bullet(ox,oy,dx,dy));
    console.log("shoot: ox: " + ox + " oy:" + oy + " dx: " + dx + " dy: " + dy);
  }
  
  this.drawBullets = function(delta){
    for (i = 0; i < this.bullets.length; i++) {
      var b = this.bullets[i];
      b.draw(delta);
    }
  }
    
}

function Bullet(ox,oy,dx,dy){
  this.scale = 4;
  this.speed = 3;
  this.source = new vec2(ox+10,oy+10);
  this.dest = new vec2(dx,dy);
  this.vec = new vec2(ox+10, oy+10);
  this.h = Math.sqrt(dx * dx + dy * dy);
  this.dn = (this.h / 1.4142135623730951);
  this.dx = dx - ox;
  this.dy = dy - oy;
  
  // move to entity
  this.w = 50;
  this.h = 50;
  this.mhWidth = this.w / -2;
  this.mhHeight = this.h / -2;
  
  this.draw = function(delta){
    // Update Position
    this.vec.x += (this.dx*delta)*this.speed;
    this.vec.y += (this.dy*delta)*this.speed;
    //console.log("before: " + this.vec.x + " after: " + dx2)
    // float dx = (delta * vector.x) * speed;
		// float dy = (delta * vector.y) * speed;
		// float dx2 = pos.x + dx;
		// float dy2 = pos.y + dy;
    // 
		// distMoved += Vector2.dst(pos.x, pos.y, dx2, dy2);
		// pos.set(dx2, dy2, 0);
		// sensor.setTransform(pos.x + width/2, pos.y + height/2, 0);
    
    // Draw
    ctx = mainGame.context;
    ctx.save();
    ctx.translate(this.vec.x, this.vec.y);
    ctx.fillStyle = "BLUE";
    ctx.fillRect((this.mhWidth *.5), (this.mhHeight * .5), (this.w * .5), (this.h * .5));
    ctx.restore();
  }
}