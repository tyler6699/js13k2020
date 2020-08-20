function Cart() {
  xOffset = 5;
  yOffset = 5;
  this.scale = 4;
  this.hero = new entity(16, 16, canvasW/2, canvasH/2, 0, types.HERO, "red", this.scale, xOffset, yOffset);
  this.hero.image.src = "atlas.png";
  this.hero.sx = 16;
  this.entities = [];
  this.speed = 5;
  this.level = new level(canvasW, canvasH, 0);
  this.hero.currentLevel = 0;
  this.level.reset(this.hero, this.scale);

  // Render
  this.update = function(delta, time) {
    controllers = navigator.getGamepads();

    // Controls
    if (left()) {
      this.hero.x -= this.speed;
    }

    if (right()) {
      this.hero.x += this.speed;
    }

    if (up()) {
      this.hero.y -= this.speed;
    }

    if (down()) {
      this.hero.y += this.speed;
    }

    if (space()) {

    }

    //
    // Render
    //

    // Star Field
    mainGame.context.fillStyle='#FFF';
    for(let i=2e3;i--;){
      x = (Math.sin(i)*1e9-time/2e3*(i+1e3)/50)%(mainGame.canvas.width+9)-9;
      y = i*9%mainGame.canvas.height;
      s = i%5;
      mainGame.context.fillRect(x,y,s,s);
    }

    this.level.tick(this.hero);
    this.level.draw(this.hero);

    // Entities
    for (entity in this.entities) {
      e = this.entities[entity]
      if (e.type == types.WALL) {
        // Check hit
        //if (rectColiding(game.hero.hitbox, rainbow.hitbox)) {

        //}
      }
      e.update(delta);
    }

    // Hero
    if(processClick){
      processClick = false;
      console.log(clickIndex);
      this.level.tiles[clickIndex].entity.active = false;
      //this.hero.x = clickedAt.x + this.hero.mhWidth - 5;
      //this.hero.y = clickedAt.y + this.hero.mhHeight - 5;
    }
    this.hero.update(delta);

    // Mouse
    mainGame.canvas.style.cursor='none';
    let mx = mousePos.x;
    let my = mousePos.y;
    let mw = 2;
    let mh = 15;
    mainGame.context.globalCompositeOperation = 'difference';
    mainGame.context.fillStyle='WHITE'
    mainGame.context.fillRect(mx-mw,my-mh,mw*2,mh*2);
    mainGame.context.fillRect(mx-mh,my-mw,mh*2,mw*2);
    mainGame.context.globalCompositeOperation = 'source-over';
  }
}
