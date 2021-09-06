function Gun(){
  this.ammo=AMMOSTART;
  this.bullets=[];
  this.rate=.1;
  this.wait=0;
  
  this.addBullets = function(ox,oy,dx,dy){
    // Remove old drawBullets
    if(this.ammo>0 && this.wait<=0){
      this.wait=this.rate;
            
      // Snap mouse cursor to this radius
      // https://i.stack.imgur.com/7Rmf4.gif
      var radius = 60;
      
      // Angle of mouse and hero centre
      var angle = Math.atan2(dy - oy, dx - ox);
      
      // Get X and Y a fixed radius from the hero
      var x = ox + radius * Math.cos(angle);
      var y = oy + radius * Math.sin(angle);
      
      this.bullets.push(new Bullet(ox,oy,x,y));
            
      // Add more bullets that are a fixed distance appart
      // 1 degree is 0.0174533 radians
      // xx = ox + radius * Math.cos(angle+0.349066);
      // yy = oy + radius * Math.sin(angle+0.349066);
      // this.bullets.push(new Bullet(ox,oy,xx,yy));
      // 
      // xx = ox + radius * Math.cos(angle-0.349066);
      // yy = oy + radius * Math.sin(angle-0.349066);
      // this.bullets.push(new Bullet(ox,oy,xx,yy));

      this.ammo--;
    }
  }
  
  this.drawBullets = function(delta){
    if(this.wait>0){
      this.wait-=delta;
    }
    
    this.bullets.forEach(e => e.draw(delta));

    // Remove bullets
    this.bullets = this.bullets.filter(function (b) {
      return b.active == true;
    });
  }
}

function Bullet(ox,oy,dx,dy){
  this.id = BID++;
  this.scale = 4;
  this.speed = BSPEED;
  this.w = 50;
  this.h = 20;
  this.mhWidth = this.w / -2;
  this.mhHeight = this.h / -2;
  this.dst=0;
  this.active=true;
  this.hb = new rectanlge(ox, oy, this.w, this.h);
  this.colour="#a12161";
  this.dist=0;
  // 0 is perfect
  // .5 is awful
  this.accuracy=.1;
  
  // Vector
  this.v = new vec2(ox+10, oy+10);
    
  // atan2: convert vector to angle, sin/cos to convert back to vector.
  dir = Math.atan2(oy-dy,ox-dx) + (Math.PI) + (Math.random() - 0.5) * 2 * this.accuracy;
  this.dx = Math.cos(dir);
  this.dy = Math.sin(dir);
  this.angle = Math.atan2(oy - dy, ox - dx);

  this.checkHits = function(e){
    if(rectColiding(e.hb,this.hb) && e.hp>=0){
      e.hp--;
      this.active=false;
      
      if(e.hp < 0){
        if(e.isBarrel()){
          e.sx=0;
          e.sy=48;
          e.broke=true;
        } else if(e.isTree()){
            e.sy=48;
            e.broke=true;
        } else {
          e.active = false;
        }
        e.isSolid = false;
      }
    }
  }
  
  this.draw = function(delta){
    // Update Position
    if(this.active){ 
      // Previous position
      xx = this.v.x;
      yy = this.v.y;
      // New Position
      this.v.x +=(this.dx*delta)*this.speed;
      this.v.y +=(this.dy*delta)*this.speed; 
      // Distance Travelled
      this.dist +=  Math.sqrt( ((this.v.x-xx)*(this.v.x-xx)) + ((this.v.y-yy)*(this.v.y-yy)) );
      
      if(this.v.x < 0 || this.v.x>1300 || this.v.y < 0 || this.v.y > 840 || this.dist > SHOOTDIST){
        this.active = false;
      }
      this.hb.x = this.v.x + this.mhWidth;
      this.hb.y = this.v.y + this.mhHeight;
      
      //Collision Test
      cart.level.mobs.forEach(e => this.checkHits(e.entity));
      cart.level.breakTiles.forEach(e => this.checkHits(e.entity));
      
      // Draw
      ctx = mainGame.context;
      ctx.save();
      ctx.translate(this.v.x, this.v.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.colour;
      ctx.fillRect((this.mhWidth *.5), (this.mhHeight * .5), (this.w * .5), (this.h * .5));        
      ctx.restore();
    }
  }
}