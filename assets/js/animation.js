function animation(numberFrames, frameDuration, loop) {
  this.numberFrames = numberFrames;
  this.frameDuration = frameDuration;
  this.loop = loop;
  this.timeElapsed = 0;
  this.currentFrame = 0;
  this.pauseAnimation = false;

  this.getKeyFrame = function(delta) {
    this.timeElapsed += delta;
    this.currentFrame = Math.floor(this.timeElapsed / this.frameDuration);
    this.currentFrame = this.currentFrame % this.numberFrames;
  }
}