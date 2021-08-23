function entity(w, h, x, y, angle, type, colour, scale, hitboxOffsetX = 0, hitboxOffsetY = 0, isButton = false) {
  this.scale = scale;
  this.type = type;
  this.width = w;
  this.height = h;
  this.mhWidth = w / -2;
  this.mhHeight = h / -2;
  this.mhWidthScaled = (w / -2) * scale;
  this.mhHeightScaled = (h / -2) * scale;
  this.hWidth = w / 2;
  this.hHeight = h / 2;
  this.yOffset = 0;
  this.yDrawOffset=0;
  this.angle = angle;
  this.x = x;
  this.y = y;
  this.active = true;
  this.colour = colour;
  this.image = atlas;
  this.animated = false;
  this.anination = null;
  this.hitboxOffsetX = hitboxOffsetX;
  this.hitboxOffsetY = hitboxOffsetY;
  this.alpha = 1;
  this.currentTile=0;
  this.collisionArray = [];
  this.isSolid = false;
  this.isButton = isButton;
  this.pc = null;
  this.person = null;
  this.gun = null;
  this.ammo = 5;
  this.time=0;
  this.showText="";
  this.showTextTime=0;
  this.showTextY=0;
  this.currentGift=0;
  this.shootTime=0;
  this.hover=false;
  this.hoverText="";
  this.hoverText2="";
  // ATLAS Positions
  this.sx=0;
  this.sy=0;

  this.setHitbox = function() {
    this.hitbox = new rectanlge(0, 0, 0, 0);
    this.sensor = new rectanlge(0, 0, 0, 0);
    if(this.isButton){
      this.hitbox.w = this.width * 2;
      this.hitbox.h = this.height * 2;
    }
  }
  this.setHitbox();

  this.updateHitbox = function() {
    // Buttons are rendered the screen size and do not need scaling
    if(this.isButton){
      this.hitbox.x = this.x - this.width;
      this.hitbox.y = this.y - this.height;
    } else {
      // Images are all scaled up so hitboxes are also scaled up
      this.hitbox.x = this.x + ((this.hitboxOffsetX * this.scale)/2);
      this.hitbox.y = this.y + ((this.hitboxOffsetX * this.scale)/2);
      this.hitbox.w = (this.width * this.scale) - (this.hitboxOffsetX * this.scale);
      this.hitbox.h = (this.height * this.scale) - (this.hitboxOffsetY * this.scale);

      this.sensor.x = this.x-5;
      this.sensor.y = this.y-5;
      this.sensor.w = (this.width * this.scale) + 10;
      this.sensor.h = (this.height * this.scale) + 10;
    }
  }

  this.isFloor = function(){
    return this.type == types.FLOOR;
  }

  // Render
  this.update = function(delta) {
    this.updateHitbox();

    if(this.active) {
      ctx = mainGame.context;
      ctx.save();
      ctx.translate(this.x, this.y);

      ctx.globalAlpha = this.alpha;
      // Animate Image
      if (this.image == null || this.isButton) {
        ctx.fillStyle = this.colour;
        ctx.fillRect((this.mhWidth *.5) * this.scale, (this.mhHeight * .5) * this.scale, (this.width * .5) * this.scale, (this.height * .5) * this.scale);
        // Image
      } else {
        ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height, this.hWidth, this.hHeight + this.yDrawOffset, this.width * this.scale, this.height * this.scale);
      }

      // SHOW TEXT
      if(this.showTextTime>0){
        this.showTextTime-=delta;
        gradient = ctx.createLinearGradient(0, 0, canvasW, 0);
        gradient.addColorStop("0", "#"+COL2);
        gradient.addColorStop(".1", "#"+COL1);
        ctx.font = "italic 25px Arial";
        ctx.fillStyle = gradient;
        ctx.fillText(this.showText, 0, this.showTextY+(10*this.showTextTime));
      } else {
        this.currentGift=0;
      }

      if(this.isButton){
        by=32;
        bx=48;
        ctx.drawImage(this.image, bx, by, 10, 10, -16, -16, 32, 32);

        if(this.hover){
          ctx.globalAlpha = .8;
          ctx.fillStyle = "#"+COL1;
          ctx.fillRect(-215, -50, 167, 100);
          ctx.fillStyle = this.colour;
          ctx.fillRect(-200, -32, 165, 64);
          ctx.globalAlpha = 1;
          ctx.font = "italic 25px Arial";
          ctx.fillStyle = "#"+COL1;
          ctx.fillText(this.hoverText, -180, -5);
          ctx.fillText(this.hoverText2, -180, 20);
        }
      }

      ctx.restore();
    }
  }

  this.isHero = function(){
    return this.type == types.HERO;
  }
  
  this.setT = function(t){
    this.type = t;
    this.setType();
  }

  this.setType = function(){
    this.alpha = 1;
    this.sy=0;
    this.sx=0;
    this.yDrawOffset = 0;
    this.hitboxOffsetY = 0;
    this.isSolid = true;
    
    switch(this.type) {
      case types.HERO:
        this.sx=96;
        this.sy=16;
        this.isSolid = true;
        break;
      case types.WALL:
        this.sy=16;
        this.isSolid = false;
        break;
      case types.BLOCK:
        this.sx=16;
        break;
      case types.FLOOR:
        this.sx=32;
        this.sy=32;
        this.alpha = .9;
        this.isSolid = false;
        break;
      case types.AIR:
        this.sx=144;
        this.isSolid = false;
      case types.DOOR:
        this.sx=144;
        this.isSolid = false;
        break;
      case types.GRID_1:
        this.sx=96;
        this.sy=32;
        this.isSolid = false;
        break;
      case types.GRID_2:
        this.sx=112;
        this.sy=32;
        this.isSolid = false;
        break;
      case types.GRID_3:
        this.sx=80;
        this.sy=32;
        this.isSolid = false;
        break;
      case types.GRID_4:
        this.sx=48;
        this.sy=32;
        this.isSolid = false;
        break;
      case types.ROCK_1:
        this.sx=48;
        this.isSolid = false;
        break;
      case types.ROCK_2:
        this.sx=64;
        this.isSolid = false;
        break;
      case types.ROCK_3:
        this.sx=80;
        this.isSolid = false;
        break;
      case types.ROCK_4:
        this.sx=96;
        this.isSolid = false;
        break;
     }
  }
}
