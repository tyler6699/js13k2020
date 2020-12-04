function entity(w, h, x, y, angle, type, colour, scale, hitboxOffsetX = 0, hitboxOffsetY = 0, isButton = false) {
  this.scale = 1;
  this.type = type;
  this.width = w;
  this.height = h;
  this.mhWidth = w / -2;
  this.mhHeight = h / -2;
  this.mhWidthScaled = (w / -2);
  this.mhHeightScaled = (h / -2);
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
  this.drawTile = false;
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
      // TODO: Remove all scale
      this.hitbox.x = this.x + ((this.hitboxOffsetX)/2);
      this.hitbox.y = this.y + ((this.hitboxOffsetX)/2);
      this.hitbox.w = (this.width) - (this.hitboxOffsetX);
      this.hitbox.h = (this.height) - (this.hitboxOffsetY);

      this.sensor.x = this.x-5;
      this.sensor.y = this.y-5;
      this.sensor.w = (this.width) + 10;
      this.sensor.h = (this.height) + 10;
    }
  }

  this.addPC = function(direction, chair, tile){
    if(this.pc == null){
      this.pc = new PC(direction, chair, tile);
    } else {
      this.pc.direction = direction;
    }
  }
  // Render
  this.update = function(delta) {
    this.updateHitbox();

    if(this.active) {
      ctx = mainGame.context;
      ctx.save();
      ctx.translate(this.x, this.y);

      if(this.drawTile){
        ctx.globalAlpha = .4;
        //ctx.drawImage(this.image, 48, 0, 16, 16, 8, 8, 64, 64);
        // TODO Fix scale - Draws centre
      }

      ctx.globalAlpha = this.alpha;
      // Animate Image
      if (this.image == null || this.isButton) {
        ctx.fillStyle = this.colour;
        ctx.fillRect((this.mhWidth *.5), (this.mhHeight * .5), (this.width * .5), (this.height * .5));
        // Image
      } else {
        ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height, this.hWidth, this.hHeight + this.yDrawOffset, this.width , this.height);
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

      ctx.restore();
    }
  }

  this.isHero = function(){
    return this.type == types.HERO;
  }

  this.isTable = function(){
    return this.type == types.TABLE;
  }

  this.isChairB = function(){
    return this.type == types.CHAIR_B;
  }

  this.isChairT = function(){
    return this.type == types.CHAIR_T;
  }

  this.isFloor = function(){
    return this.type == types.FLOOR;
  }

  this.isServer = function(){
    return this.type == types.SERVER;
  }

  this.isVend = function(){
    return this.type == types.VEND;
  }

  this.isAuto = function(){
    return this.type == types.AUTO;
  }

  this.setType = function(){
    this.alpha = 1;
    this.sy=0;
    this.sx=0;
    this.yDrawOffset = 0;
    this.hitboxOffsetY = 0;
    this.isSolid = true;

    switch(this.type) {
      case types.WALL_R:
        this.sx=80;
        break;
      case types.WALL_RT:
        this.sx=128;
        break;
      case types.WALL_LT:
        this.sx=16;
        this.sy=16;
        break;
      case types.WALL_L:
        this.sx=64;
        break;
      case types.WALL_T:
        this.sy=16;
        break;
      case types.WALL_B:
        this.sx=112;
        break;
      case types.WALL_BR:
        this.sx=32;
        this.sy=16;
        break;
      case types.WALL_BL:
        this.sx=48;
        this.sy=16;
        break;
      case types.FLOOR:
        this.sx=48;
        this.alpha = .4;
        this.isSolid = false;
        this.drawTile = false;
        break;
      case types.AIR:
        this.sx=144;
        this.isSolid = false;
        break;
      case types.TABLE:
        this.sx=64;
        this.sy=16;
        this.drawTile = true;
        break;
      case types.CHAIR_T:
        this.sx=80;
        this.sy=16;
        this.isSolid = false;
        this.drawTile = true;
        break;
      case types.CHAIR_B:
        this.sx=96;
        this.sy=16;
        this.isSolid = false;
        this.drawTile = true;
        break;
      case types.PC:
        this.sx=112;
        this.sy=16;
        this.isSolid = false;
        break;
      case types.SERVER:
        this.sx=144;
        this.sy=16;
        this.yDrawOffset = -20;
        this.hitboxOffsetY = 5;
        this.drawTile = true;
        break;
      case types.VEND:
        this.sx=144;
        this.sy=32;
        this.yDrawOffset = -20;
        this.hitboxOffsetY = 5;
        this.drawTile = true;
        break;
      case types.AUTO:
        this.sx=128;
        this.sy=48;
        this.yDrawOffset = -20;
        this.hitboxOffsetY = 5;
        this.drawTile = true;
        break;
    }
  }
}
