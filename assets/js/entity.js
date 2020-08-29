function entity(w, h, x, y, angle, type, colour, scale, hitboxOffsetX = 0, hitboxOffsetY = 0, imageSrc = "", isButton = false) {
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
  this.angle = angle;
  this.x = x;
  this.y = y;
  this.active = true;
  this.colour = colour;
  this.image = new Image();
  this.image.src = imageSrc;
  this.animated = false;
  this.anination = null;
  this.hitboxOffsetX = hitboxOffsetX;
  this.hitboxOffsetY = hitboxOffsetY;
  this.alpha = 1;
  this.currentTile=0;
  this.collisionArray = [];
  this.isSolid = false;
  this.isButton = isButton;
  this.chairs = 0;
  
  // DECOR
  this.hasPC_B = false;
  this.hasPC_T = false
  
  // ATLAS Positions
  this.sx=0;
  this.sy=0;
  
  this.setHitbox = function() {
    this.hitbox = new rectanlge(0, 0, 0, 0);
    if(this.isButton){
      this.hitbox.w = this.width * 2;
      this.hitbox.h = this.height * 2;
    } else {
      this.hitbox.w = (this.width * this.scale) - (this.hitboxOffsetX * this.scale);
      this.hitbox.h = (this.height * this.scale) - (this.hitboxOffsetX * this.scale);
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
    }
  }

  // Render
  this.update = function(delta) {
    this.updateHitbox();

    if (this.active) {
      ctx = mainGame.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.globalAlpha = this.alpha;
      
      // Animate Image
      if (this.animated) {
        if (!this.animation.pauseAnimation) {
          this.animation.getKeyFrame(delta);
        }
        ctx.drawImage(this.image, this.width * this.animation.currentFrame, 0, this.width, this.height, 0, 0, this.width * this.scale, this.height * this.scale);
        // No Image (Coloured Shape)
      } else if (this.image == null || this.isButton) {
        ctx.fillStyle = this.colour;
        ctx.fillRect((this.mhWidth *.5) * this.scale, (this.mhHeight * .5) * this.scale, (this.width * .5) * this.scale, (this.height * .5) * this.scale);
        // Image
      } else {
        ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height, this.hWidth, this.hHeight, this.width * this.scale, this.height * this.scale);  
      }
      
      if(this.isButton){
        if(this.type == actions.CHAIR){
          ctx.drawImage(this.image, 84, 16, 8, 8, -16, -16, 32, 32);  
        } else if (this.type == actions.DESK){
          ctx.drawImage(this.image, 64, 16, 16, 16, -16, -16, 32, 32);
        } else if (this.type == actions.PC){
          ctx.drawImage(this.image, 115, 17, 10, 13, -16, -16, 32, 32);
        }  
      }
      
      if(this.type == types.TABLE){
        ctx.globalAlpha = 1;
        if(this.hasPC_B){
          ctx.translate(0, -30);
          ctx.drawImage(this.image, 112, 16, this.width, this.height, this.hWidth, this.hHeight, this.width * this.scale, this.height * this.scale); 
        } else if (this.hasPC_T){
          ctx.translate(0, -20);
          ctx.drawImage(this.image, 128, 16, this.width, this.height, this.hWidth, this.hHeight, this.width * this.scale, this.height * this.scale); 
        }
      }
      ctx.restore();
    }
  }
  
  this.flipMonitors = function(){
    if(this.hasPC_B || this.hasPC_T){
      this.hasPC_B = !this.hasPC_B;
      this.hasPC_T = !this.hasPC_T; 
    }
  }
  
  this.isTable = function(){
    return this.type == types.TABLE;
  }
  
  this.setType = function(){
    this.alpha = 1;
    this.sy=0;
    this.sx=0;  
    
    switch(this.type) {
      case types.WALL_R:
        this.sx=80;
        this.isSolid = true;
        break;
      case types.WALL_RT:
        this.sx=128;
        this.isSolid = true;
        break;
      case types.WALL_LT:
        this.sx=16;
        this.sy=16;
        this.isSolid = true;
        break;   
      case types.WALL_L:
        this.sx=64;
        this.isSolid = true;
        break; 
      case types.WALL_T:
        this.sy=16;
        this.isSolid = true;
        break;  
      case types.WALL_B:
        this.sx=112;
        this.isSolid = true;
        break;  
      case types.WALL_BR:
        this.sx=32;
        this.sy=16;
        this.isSolid = true;
        break;  
      case types.WALL_BL:
        this.sx=48;
        this.sy=16;
        this.isSolid = true;
        break; 
      case types.FLOOR:
        this.sx=48;
        this.alpha = .4;
        this.isSolid = false;
        break; 
      case types.AIR:
        this.sx=144;
        this.isSolid = false;
        break; 
      case types.TABLE:
        this.sx=64;
        this.sy=16;
        this.isSolid = true;
        break; 
      case types.CHAIR_T:
        this.sx=80;
        this.sy=16;
        this.isSolid = false;
        break; 
      case types.CHAIR_B:
        this.sx=96;
        this.sy=16;
        this.isSolid = false;
        break; 
      case types.PC:
        this.sx=112;
        this.sy=16;
        this.isSolid = false;
        break; 
    }  
  }
}