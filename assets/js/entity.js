function entity(w, h, x, y, angle, type, colour, scale, hitboxOffsetX = 0, hitboxOffsetY = 0, imageSrc = "") {
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
  
  // ATLAS Positions
  this.sx=0;
  this.sy=0;
  
  this.setHitbox = function() {
    this.hitbox = new rectanlge(0, 0, 0, 0);
    this.hitbox.x = this.x + this.mhWidthScaled + (this.hitboxOffsetX * this.scale);
    this.hitbox.y = this.y + this.mhHeightScaled + (this.hitboxOffsetY * this.scale);
    this.hitbox.w = (this.width * this.scale) - (this.hitboxOffsetX * this.scale);
    this.hitbox.h = (this.height * this.scale) - (this.hitboxOffsetX * this.scale);
  }
  this.setHitbox();

  this.updateHitbox = function() {
    this.hitbox.x = this.x + ((this.hitboxOffsetX * this.scale)/2);
    this.hitbox.y = this.y + ((this.hitboxOffsetX * this.scale)/2);
  }

  // Render
  this.update = function(delta) {
    this.updateHitbox();

    if (this.active) {
      ctx = mainGame.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      
      // Animate Image
      if (this.animated) {
        if (!this.animation.pauseAnimation) {
          this.animation.getKeyFrame(delta);
        }
        ctx.drawImage(this.image, this.width * this.animation.currentFrame, 0, this.width, this.height, 0, 0, this.width * this.scale, this.height * this.scale);
        // No Image (Coloured Shape)
      } else if (this.image == null) {
        ctx.fillStyle = this.colour;
        ctx.fillRect((this.mhWidth *.5) * this.scale, (this.mhHeight * .5) * this.scale, (this.width * .5) * this.scale, (this.height * .5) * this.scale);
        // Image
      } else {
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height, this.hWidth, this.hHeight, this.width * this.scale, this.height * this.scale);  
      }
      
      ctx.restore();
    }
  }
  
  this.setType = function(){
    this.alpha = 1;
    this.sy=0;
    this.sx=0;
    if(this.type == types.WALL_R){
      this.sx=80;
      this.isSolid = true;
    } else if(this.type == types.WALL_RT){
      this.sx=128;
      this.isSolid = true;
    } else if(this.type == types.WALL_LT){
      this.sx=16;
      this.sy=16;
      this.isSolid = true;
    } else if(this.type == types.WALL_L){
      this.sx=64;
      this.isSolid = true;
    } else if(this.type == types.WALL_T){
      this.sy=16;
      this.isSolid = true;
    } else if(this.type == types.WALL_B){
      this.sx=112;
      this.isSolid = true;
    } else if(this.type == types.WALL_BR){
      this.sx=32;
      this.sy=16;
      this.isSolid = true;
    } else if(this.type == types.WALL_BL){
      this.sx=48;
      this.sy=16;
      this.isSolid = true;
    } else if (this.type == types.FLOOR){
      this.sx=48;
      this.alpha = .4;
      this.isSolid = false;
    } else if (this.type == types.AIR){
      this.sx=144;
      this.isSolid = false;
    }
  }
}