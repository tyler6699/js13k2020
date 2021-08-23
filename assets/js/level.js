function level(canvasW, canvasH, id, scale) {
  this.tiles = [];
  this.backTiles = [];
  this.startX=0;
  this.startY=0;
  this.canvasHalfW = canvasW / 2;
  this.canvasHalfH = canvasH / 2;
  this.active = false;
  this.complete = false;
  var tileSize = 16;
  var levelArray;
  
  this.draw = function(hero, delta){
    for (i = 0; i < this.backTiles.length; i++) {
      var tile = this.backTiles[i];
      tile.update(delta);
    }
    
    for (i = 0; i < this.decorTiles.length; i++) {
      var tile = this.decorTiles[i];
      tile.update(delta);
    }

    // TILE DRAW
    for (i = 0; i < this.tiles.length; i++) {
      var tile = this.tiles[i];
      tile.update(delta);
    }
  }

  this.reset = function(id, scale){
    this.tiles = [];
    this.backTiles = [];
    this.decorTiles = [];
    
    var rows = 13;
    var cols = 19;
    
    // Decor and back tiles
    for (row = 0; row < rows; row++) {
      for (col = 0; col < cols; col++) {
        xx = col * tileSize * scale;
        yy = row * tileSize * scale;
        
        if(row > 1 && row < 13 && col > 0 && col < 18){
          this.backTiles.push(new Tile(tileSize, xx, yy, 0, types.FLOOR, false, col, row));
        }
        
        if(row > 1 && row < 12 && col > 0 && col < 18) {
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
            this.decorTiles.push(new Tile(tileSize, xx, yy, 0, type, false, col, row));
          }
        }  
      }
    }
    
    // Main level tiles
    for (row = 0; row < rows; row++) {
      for (col = 0; col < cols; col++) {
        xx = col * tileSize * scale;
        yy = row * tileSize * scale;
        var tile;
        var type = types.WALL;
        var angle = 0;

        // Create a room
        if(row == 2 && (col > 1 && col < 17)){
          type = types.WALL;
        } else if (row == 12 && (col > 0 && col < 18)){
          type = types.WALL;
        } else if(row == 0 || col == 0 || row == 12 || col == 18){
          type = types.AIR;
        } else if ((col == 1) || (col == 17) || (row==1 && col == 1) || (row==1 && col == 17) || 
                    (row==1 && col > 1 && col < 17) || (row==11 && col == 17) || 
                    (row==11 && col == 1) || (row==11 && col > 1 && col < 17)){
          type = types.BLOCK;
        } else {
          type = types.AIR
          
          // ROCK DECOR
          if(randomNum(0,100) > 90 && row > 2){
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
        
        tile = new Tile(tileSize, xx, yy, angle, type, false, col, row);
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
    this.tiles[112].entity.setT(types.WALL);
    this.tiles[131].entity.setT(types.DOOR);
    this.tiles[150].entity.setT(types.DOOR);
    this.tiles[150].entity.setT(types.DOOR);
  }
  
  this.doorB = function(){
    this.tiles[218].entity.setT(types.DOOR);
    this.tiles[217].entity.setT(types.DOOR);
    this.tiles[219].entity.setT(types.DOOR);
    this.tiles[238].entity.setT(types.AIR);
    this.tiles[237].entity.setT(types.AIR);
    this.tiles[236].entity.setT(types.AIR);
  }

}
