function Cart() {
  this.scale = 4;
  this.cube = 16; // width of tiles
  this.scaled = this.scale*this.cube;
  this.hero = new hero(16, 16, canvasW/2, canvasH/2, 0, types.HERO, this.scale);
  this.surTiles = [-1,1,18,19,20,-18,-19,-20];
  this.introT=0;
  this.shake=0;
  this.shakeTime=0;
    
  this.genLevel = function(num){
    this.bkcol = ranColor();
    this.levels = []; // Array to get tiles surrounding an entity
    for(i=0;i<9;i++){
      var lvl = new level(num, canvasW, canvasH, i, this.scale);
      lvl.reset(i, this.scaled);
      this.levels.push(lvl);
    }
    this.level = this.levels[0];  
    this.hero.e.currentLevel = 0;
  }
  
  this.genLevel(0);

  // Render & Logic
  this.update = function(delta, time) {
    // Screen shake
    this.shake = shaky ? Math.cos(TIME) : 0;
    
    // Track Hero Door collisions
    this.door = null;
    
    // Controls
    if (left()){
      this.hero.e.x -= this.hero.gMove(-1,0);
      this.hero.e.flip = true;
    }
    if (right()){
      this.hero.e.x += this.hero.gMove(1,0);
      this.hero.e.flip = false;
    }
    if (up())    this.hero.e.y -= this.hero.gMove(0,-1);
    if (down())  this.hero.e.y += this.hero.gMove(0,1);
    if (space()) this.menu.curItm=actions.GUN;

    this.hero.checkDoor();
    this.hero.setCurrentTile(this.scaled);
    this.hero.checkGun();
        
    // Render
    renderStarField(TIME);
    
    // Render back
    drawRect(ctx, 80, 120, 0, 0, 1080, 710, this.bkcol, .8);
    
    this.level.draw(this.hero.e, delta);

    // Draw Text
    gradient = ctx.createLinearGradient(0, 0, canvasW, 0);
    gradient.addColorStop("0", "#"+COL2);
    gradient.addColorStop(".5", "#"+COL1);
    ctx.fillStyle = gradient;
    ctx.font = "italic 40px Arial";
    ctx.fillText("AMMO " + this.hero.e.gun.ammo, 900, 50);
    ctx.fillText("LEVEL " + (STAGE+1), 600, 50);
    
    // Reset mouse click checker
    processClick = false;

    // HERO
    this.hero.update(delta);

    // MOUSE
    mg.canvas.style.cursor='none';
    let mx = mousePos.x;
    let my = mousePos.y;
    let mw = 2;
    let mh = 15;
    mg.context.globalCompositeOperation = 'difference';
    mg.context.fillStyle='WHITE'
    mg.context.fillRect(mx-mw,my-mh,mw*2,mh*2);
    mg.context.fillRect(mx-mh,my-mw,mh*2,mw*2);
    mg.context.globalCompositeOperation = 'source-over';
    
    if(this.introT > 0){
      for(i = 0;i <= canvasW/33;i++){
        for(j = 0;j <= canvasH/33;j++){
          ctx = mg.context;
          ctx.save();
          ctx.translate(i*32, j*32);
          col = i%2==0&&j%2==0 ? "#000" : "#FFF";
          ctx.fillStyle = col;
          ctx.globalAlpha = .5;
          ctx.fillRect(this.introT/-2, this.introT/-2, this.introT, this.introT);
          ctx.restore();
        }
      }
      this.introT -= delta*48;
    }
    
    // Clear dead Mobs
    this.level.mobs = this.level.mobs.filter(function (m) {
      return m.entity.active == true;
    });
    
    // Ceck if the doors can open
    if(this.level.mobs.length == 0 && !this.level.gatesOpen){
      this.level.openDoors();
      if(this.hero.roomsDone>=0)this.hero.roomsDone++;
    }
    
    // Level Done Condition
    if(this.hero.roomsDone==1){
      l = this.levels[this.hero.e.currentLevel];
      l.showPortal = true;
      l.complete();
      this.hero.roomsDone = -1;
      tile = this.levels[this.hero.e.currentLevel].tiles[142];
      tile.entity.type = types.PC;
      tile.entity.setType();
    }
    
    if (map()) this.renderMap();
    this.renderHP();
  }
  
  this.renderHP = function(){
    ctx = mg.context;
    ctx.save();
    ctx.translate(0, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#001832";
    ctx.fillRect(20, 20, 300, 40);     
    ctx.fillStyle = "#a12161";
    l = this.hero.e.hp * 2.8;
    ctx.fillRect(30, 30, l, 20); 
    ctx.restore();
  }
  
  this.renderMap = function(){
    ctx = mg.context;
    ctx.save();
    ctx.translate(0, 0);
    ctx.globalAlpha = .8;
    ctx.fillStyle = "WHITE";
    offX = (canvasW/2) - 180;
    offY = (canvasH/2) - 180;
    
    this.levels.forEach((l, i) => {
      var X = (i % 3) * 120;
      var Y = Math.floor(i / 3) * 120;
      c = l.gatesOpen ? "#a12161" : "#001832";
      if(l.showPortal) c = "GOLD";
      ctx.fillStyle=c;
      ctx.fillRect(X+offX, Y+offY, 100, 100);
      if(this.level == l){
        ctx.fillStyle="BLACK";
        ctx.fillRect(X+offX+(this.hero.e.x*0.065), Y+offY+(this.hero.e.y*0.095), 20, 20);
      }
    });      
    ctx.restore();
  }
  
  this.reset = function(){
    GAMEOVER=false;
    WIN=false;
    //this.hero = new hero(16, 16, canvasW/2, canvasH/2, 0, types.HERO, this.scale);
    //this.level = new level(canvasW, canvasH, 0);
    //this.level.reset(this.hero.e, this.scale);
  }
}
