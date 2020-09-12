function Gun(){
  this.ammo=AMMOSTART;
  this.bullets=[];
  
  this.addBullets = function(ox,oy,dx,dy){
    // Remove old drawBullets
    if(this.ammo>0){
      this.bullets.push(new Bullet(ox,oy,dx,dy));
      this.ammo--;
    }
  }
  
  this.drawBullets = function(delta, pcs){
    for (i = 0; i < this.bullets.length; i++) {
      var b = this.bullets[i];
      b.draw(delta, pcs);
    }
    // Remove bullets
    this.bullets = this.bullets.filter(function (b) {
      return b.active == true;
    });
  }
}

function Bullet(ox,oy,dx,dy){
  this.id = BID++;
  this.scale = 4;
  this.speed = 300;
  this.w = 50;
  this.h = 50;
  this.mhWidth = this.w / -2;
  this.mhHeight = this.h / -2;
  this.dst=0;
  this.active=true;
  this.hitbox = new rectanlge(ox, oy, this.w, this.h);
  this.colour="#a205a2";
  this.dist=0;
  // Vector
  this.v = new vec2(ox+10, oy+10);
  this.dx = dx - ox;
  this.dy = dy - oy;
  this.length = Math.sqrt( ((this.dx)*(this.dx)) + ((this.dy)*(this.dy)) );
  this.dx = this.dx / this.length;
  this.dy = this.dy / this.length;
  
  this.draw = function(delta, pcs){
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
      this.hitbox.x = this.v.x + this.mhWidth;
      this.hitbox.y = this.v.y + this.mhHeight;
      
      //Collision Test
      for(j=0;j< pcs.length; j++){
        pc=pcs[j];
        person = pc.getPerson();
        if(person != null){
          if(rectColiding(pc.hitbox,this.hitbox) && person.progress != null && person.progress.percent < 1){
            person.progress.percent = 1;
            if(person.progress.happy < 5){
              person.progress.happy += 2;
            }
            person.progress.delivered=true;
            person.progress.mHappy=false;
            SCORE+=DELIVERED;
            targets[pc.id]=false;
            this.active=false;
            cart.hero.showTextY=-5;
            cart.hero.showTextTime=HEROTEXTTIME;
            cart.hero.showText="+ S" + DELIVERED;
          }
        }
      }
      
      // Draw
      ctx = mainGame.context;
      ctx.save();
      ctx.translate(this.v.x, this.v.y);
      ctx.fillStyle = this.colour;
      ctx.fillRect((this.mhWidth *.5), (this.mhHeight * .5), (this.w * .5), (this.h * .5));         
      ctx.restore();
    }
  }
}