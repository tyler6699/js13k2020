function entity(w, h, x, y, type, colour, scale, hitboxOffsetX = 0, hitboxOffsetY = 0, image = "") {
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
  this.angle = 0;
  this.x = x;
  this.y = y;
  this.active = true;
  this.colour = colour;
  this.image = new Image();
  this.animated = false;
  this.anination = null;
  this.hitboxOffsetX = hitboxOffsetX;
  this.hitboxOffsetY = hitboxOffsetY;

  this.setHitbox = function() {
    this.hitbox = new rectanlge(0, 0, 0, 0);
    this.hitbox.x = this.x + this.mhWidthScaled + (this.hitboxOffsetX * this.scale);
    this.hitbox.y = this.y + this.mhHeightScaled + (this.hitboxOffsetY * this.scale);
    this.hitbox.w = (this.width * this.scale) - (this.hitboxOffsetX * this.scale);
    this.hitbox.h = (this.height * this.scale) - (this.hitboxOffsetY * this.scale);
  }
  this.setHitbox();

  this.updateHitbox = function() {
    this.hitbox.x = this.x + this.mhWidthScaled + (this.hitboxOffsetX * this.scale);
    this.hitbox.y = this.y + this.mhHeightScaled + (this.hitboxOffsetY * this.scale);
  }

  // Render
  this.update = function(delta) {
    this.updateHitbox();

    if (this.active) {
      this.hitbox.x = this.x + (this.mhWidth * this.scale);
      this.hitbox.y = this.y + (this.mhHeight * this.scale);

      ctx = mainGame.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      // Animate Image
      if (this.animated) {
        if (!this.animation.pauseAnimation) {
          this.animation.getKeyFrame(delta);
        }
        ctx.drawImage(this.image, this.width * this.animation.currentFrame, 0, this.width, this.height, this.mhWidth * this.scale, this.mhHeight * this.scale, this.width * this.scale, this.height * this.scale);
        // No Image (Coloured Shape)
      } else if (this.image == null) {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.mhWidth * this.scale, this.mhHeight * this.scale, this.width * this.scale, this.height * this.scale);
        // Image
      } else {
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.mhWidth * this.scale, this.mhHeight * this.scale, this.width * this.scale, this.height * this.scale);
      }

      ctx.restore();
    }
  }
}