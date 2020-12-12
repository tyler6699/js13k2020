function Cart() {
  this.build = new Build();
  
  // Render & Logic
  this.update = function(delta, time) {
    // Controls
    if (left())  this.hero.move(direction.LEFT);
    if (right()) this.hero.move(direction.RIGHT); 
    if (up())    this.hero.move(direction.UP);
    if (down())  this.hero.move(direction.DOWN);
    if (one())   cart.reset();

    // Set Hero Current Tile
    this.hero.updateCollisionTiles(this.level.tileSize, this.level.columnCount, this.level.tiles);
    
    renderStarField(time);
    this.level.draw(this.hero, delta);

    // HERO
    this.hero.entity.update(delta);
    
    this.build.update();
    
    if(processClick){
      this.build.tick();
    }
    
    processClick=false;
    
    // Mouse
    this.updateMouse();
    
  }
  
  this.updateMouse = function(){
    // Hide Cursor
    mainGame.canvas.style.cursor='none';
    let mx = mousePos.x;
    let my = mousePos.y;
    let mw = 1;
    let mh = 6;
    mainGame.context.globalCompositeOperation = 'difference';
    mainGame.context.fillStyle='WHITE'
    mainGame.context.fillRect(mx-mw,my-mh,mw*2,mh*2);
    mainGame.context.fillRect(mx-mh,my-mw,mh*2,mw*2);
    mainGame.context.globalCompositeOperation = 'source-over';
  }
  
  this.reset = function(){
    WIN=false;
    xOffset = 8;
    yOffset = 8;
    this.hero = new Hero(16, 19, 200, 120, types.HERO, xOffset, yOffset);
    this.level = new level(canvasW, canvasH, 0);
    this.level.reset(this.hero);
  }
  
  this.reset();
}
