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
    }
  }
  
  this.doorR = function(){
    this.addDoor(112,id+1);
    this.addDoor(131,id+1);
    this.addDoor(150,id+1);
  }
  
  this.doorB = function(){
    this.addDoor(218,id+3);
    this.addDoor(217,id+3);
    this.addDoor(219,id+3);
    this.addAir(238);
    this.addAir(237);
    this.addAir(236);
  }
  
  this.addDoor = function(t, room){
    tile = this.tiles[t];
    tile.entity.setT(types.DOOR);
    tile.door = new door(room);
  }
  
  this.addAir = function(t){
    tile = this.tiles[t];
    tile.entity.setT(types.AIR);
  }

}
