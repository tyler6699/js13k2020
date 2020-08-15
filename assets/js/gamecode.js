function gameCode() {
  xOffset = 5;
  yOffset = 5;
  this.scale = 4;

  this.hero = new entity(30, 30, 200, 300, types.HERO, "red", this.scale, xOffset, yOffset);
  this.hero.image.src = "assets/images/square.png";

  this.entities = [];
  this.speed = 5;

  // Render
  this.update = function(delta) {
    
    // Controls
    if (left()) {
      // this.hero.x -= this.speed;
    }

    if (right()) {
      // this.hero.x += this.speed;
    }

    if (up()) {
      // this.hero.y -= this.speed;
    }

    if (down()) {
      // this.hero.y += this.speed;
    }

    if (space()) {
    
    }

    // Render

    // Entities
    for (entity in this.entities) {
      e = this.entities[entity]
      if (e.type == types.WALL) {
        // Check hit
        //if (rectColiding(gameCode.hero.hitbox, rainbow.hitbox)) {

        //}
      }
      e.update(delta);
    }

    // Hero
    //this.hero.update(delta);
  }
}