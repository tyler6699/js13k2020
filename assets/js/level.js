function level(canvasW, canvasH, id, scale) {
  this.tiles = [];
  this.bTiles = [];
  this.startX=0;
  this.startY=0;
  this.active = false;
  this.complete = false;
  this.roomNo = id;
  var tileSize = 16;
  var levelArray;
  
  this.draw = function(hero, delta){
    for (i = 0; i < this.bTiles.length; i++) {
      var tile = this.bTiles[i];
      tile.update(delta);
    }
    
    for (i = 0; i < this.dTiles.length; i++) {
      var tile = this.dTiles[i];
      tile.update(delta);
    }

    // TILE DRAW
    for (i = 0; i < this.tiles.length; i++) {
      var tile = this.tiles[i];
      tile.update(delta);
    }
  }

  this.reset = function(id, scaled){
    this.tiles = [];
    this.bTiles = [];
    this.dTiles = [];
    
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
  }
  
  this.doorR = function(){
    [113,132,151].forEach(e => this.addDoor(e,id+1,130,387));
    [131,150].forEach(e => this.addAir(e));
    this.addWall(112);
  }
  
  this.doorL = function(){
    [95,114,133].forEach(e => this.addDoor(e,id-1,1024,405));
    [115,134].forEach(e => this.addAir(e));
    this.addWall(96);
  }
  
  this.doorB = function(){
    [236,237,238].forEach(e => this.addDoor(e,id+3,575,138));
    [217,218,219].forEach(e => this.addAir(e));
  }
  
  this.doorT = function(){
    [27,28,29].forEach(e => this.addDoor(e,id-3,580,700));
    [46,47,48].forEach(e => this.addAir(e));
  }
  
  this.addDoor = function(t,room,x,y){
    tile = this.tiles[t];
    tile.entity.setT(types.DOOR);
    tile.door = new door(room,x,y);
  }
  
  this.addAir = function(t){
    tile = this.tiles[t];
    tile.entity.setT(types.AIR);
  }
  
  this.addWall = function(t){
    tile = this.tiles[t];
    tile.entity.setT(types.WALL);
  }

}
