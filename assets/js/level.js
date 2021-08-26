function level(canvasW, canvasH, id, scale) {
  this.tiles = [];
  this.bTiles = [];
  this.mobs = [];
  this.startX=0;
  this.startY=0;
  this.active = false;
  this.complete = false;
  this.roomNo = id;
  var tileSize = 16;
  var levelArray;
  
  this.draw = function(hero, delta){
    this.bTiles.forEach(e => e.update(delta));
    this.dTiles.forEach(e => e.update(delta));
    this.tiles.forEach(e => e.update(delta));
    this.mobs.forEach(e => e.update(delta));
  }

  this.reset = function(id, scaled){
    this.tiles = [];
    this.bTiles = [];
    this.dTiles = [];
    this.mobs = [];
    
    var rows = 13;
    var cols = 19;
    
    // Decor and back tiles
    for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
        xx = c * scaled;
        yy = r * scaled;
        
        if(r > 1 && r < 13 && c > 0 && c < 18){
          this.bTiles.push(new Tile(tileSize, xx, yy, 0, types.FLOOR, false, c, r));
        }
        
        if(r > 1 && r < 12 && c > 0 && c < 18) {
          var type = null;
          
          // GRID Background Patterns
          if(randomNum(0,100) > 80){
            type = types.GRID_1;
          } else if(randomNum(0,100) > 70){
            type = types.GRID_2;
          } else if(randomNum(0,100) > 70){
            type = types.GRID_3;
          } else if(randomNum(0,100) > 70){
            type = types.GRID_4;
          }
          if(type != null){
            this.dTiles.push(new Tile(tileSize, xx, yy, 0, type, false, c, r));
          }
        }  
      }
    }
    
    // Main level tiles
    for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
        xx = c * tileSize * scale;
        yy = r * tileSize * scale;
        var tile;
        var type = types.WALL;
        var angle = 0;

        // Create a room
        if(r == 2 && (c > 1 && c < 17)){
          type = types.WALL;
        } else if (r == 12 && (c > 0 && c < 18)){
          type = types.WALL;
        } else if(r == 0 || c == 0 || r == 12 || c == 18){
          type = types.AIR;
        } else if ((c == 1) || (c == 17) || (r==1 && c == 1) || (r==1 && c == 17) || 
                    (r==1 && c > 1 && c < 17) || (r==11 && c == 17) || 
                    (r==11 && c == 1) || (r==11 && c > 1 && c < 17)){
          type = types.BLOCK;
        } else {
          type = types.AIR
          
          // ROCK DECOR
          if(randomNum(0,100) > 90 && r > 2){
            var rock = randomNum(0,3);
            switch(rock) {
              case 0:
                type = types.ROCK_1;
                break;
              case 1:
                type = types.ROCK_2;
                break;
              case 2:
                type = types.ROCK_3;
                break;
              case 3:
                type = types.ROCK_4;
                break;
            }
          }
        }
        
        tile = new Tile(tileSize, xx, yy, angle, type, false, c, r);
        this.tiles.push(tile);
      }
    }
    
    // DOORS
    switch(id) {
      case 0:
        this.doorR();
        this.doorB();
        break;
      case 1:
        this.doorR();
        this.doorL();
        this.doorB();
        break;
      case 2:
        this.doorL();
        this.doorB();
        break;
      case 3:
        this.doorR();
        this.doorB();
        this.doorT();
        break;
      case 4:
        this.doorR();
        this.doorL();
        this.doorT();
        this.doorB();
        break;
      case 5:
        this.doorL();
        this.doorT();
        this.doorB();
        break;
      case 6:
        this.doorR();
        this.doorT();
        break;
      case 7:
        this.doorR();
        this.doorL();
        this.doorT();
        break;
      case 8:
        this.doorT();
        this.doorL();
        break;
    }
    
    // MOBS
    noMobs = randomNum(0,3)+STAGE;
    console.log("Level: " + id + " Mobs: " + noMobs);
    for (m = 0; m < noMobs; m++) {
      // Add a random enemy
      mob = new entity(16, 16, 200, 200, 0, types.DOOR_BLOCK, "", scale, xOff, yOff);
      mob.isSolid = true;
      this.mobs.push(mob);
    }
  }
  
  this.doorR = function(){
    [113,132,151].forEach(e => this.addDoor(e,id+1,130,-1,types.AIR,true));
    [112,131,150].forEach(e => this.addDoor(e,0,0,0,types.AIR,false));
    //this.addWall(112);
  }
  
  this.doorL = function(){
    [95,114,133].forEach(e => this.addDoor(e,id-1,1024,-1,types.AIR,true));
    [96,115,134].forEach(e => this.addDoor(e,0,0,0,types.DOOR_BLOCK,false));
    //this.addWall(96);
  }
  
  this.doorB = function(){
    [236,237,238].forEach(e => this.addDoor(e,id+3,-1,138,types.DOOR_WALL,true));
    [217,218,219].forEach(e => this.addDoor(e,0,0,0,types.DOOR_BLOCK,false));
  }
  
  this.doorT = function(){
    [27,28,29].forEach(e => this.addDoor(e,id-3,-1,700,types.DOOR_BLOCK,true));
    [46,47,48].forEach(e => this.addDoor(e,0,0,0,types.DOOR_WALL,false));
  }
    
  this.addDoor = function(t,room,x,y,type,d=false){
    tile = this.tiles[t];
    tile.entity.setT(type);
    if(d)tile.door = new door(room,x,y);
  }
  
  this.addAir = function(t){
    this.tiles[t].entity.setT(types.AIR);
  }
  
  this.addWall = function(t){
    this.tiles[t].entity.setT(types.WALL);
  }

}
