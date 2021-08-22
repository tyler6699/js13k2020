function level(canvasW, canvasH, id) {
  this.tiles = [];
  this.backTiles = [];
  this.startX=0;
  this.startY=0;
  this.canvasHalfW = canvasW / 2;
  this.canvasHalfH = canvasH / 2;
  this.levels = [];
  this.active = false;
  this.complete = false;
  this.maxLevels;
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

  this.reset = function(hero, scale){
    var id = hero != null ? hero.currentLevel : 0;
    this.tiles = [];
    this.backTiles = [];
    this.decorTiles = [];
    levelArray = this.levels[id];
    var rows = 13;
    var cols = 19;
    
    for (row = 0; row < rows; row++) {
      for (col = 0; col < cols; col++) {
        xx = col * tileSize * scale;
        yy = row * tileSize * scale;
        
        if(row > 1 && row < 12 && col > 0 && col < 18){
          this.backTiles.push(new Tile(tileSize, xx, yy, 0, types.FLOOR, false, col, row));
        }
        
        if((row == 2 || row == 12) && col > 0 && col < 18){
          this.decorTiles.push(new Tile(tileSize, xx, yy, 0, types.WALL, false, col, row));
        } else if(row > 1 && row < 12 && col > 0 && col < 18) {
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
    
    for (row = 0; row < rows; row++) {
      for (col = 0; col < cols; col++) {
        xx = col * tileSize * scale;
        yy = row * tileSize * scale;
        var tile;
        var type = types.WALL;
        var angle = 0;

        // Create a room
        if(row == 0 || col == 0 || row == 12 || col == 18){
          type = types.AIR;
        } else if (row==1 && col == 1) {
          type = types.WALL_RT;
        } else if (row==1 && col > 1 && col < 17) {
          type = types.WALL_T;
        } else if (row==1 && col == 17) {
          type = types.WALL_LT;
        } else if (row==11 && col == 17) {
          type = types.WALL_BR;
        } else if (row==11 && col == 1) {
          type = types.WALL_BL;
        } else if (row==11 && col > 1 && col < 17) {
          type = types.WALL_B;
        } else if(col == 17) {
          type = types.WALL_R;
        } else if(col == 1){
          type = types.WALL_L;
        } else {
          type = types.AIR
          
          // ROCK DECOR
          if(randomNum(0,100) > 90 && row > 2){
            var rock = randomNum(0,3);
            if(rock == 1){
              type = types.ROCK_1;
            } else if (rock ==2){
              type = types.ROCK_2;
            } else if (rock == 3){
              type = types.ROCK_3;
            } else if (rock == 4){
              type = types.ROCK_4;
            }
          }
          
        }

        tile = new Tile(tileSize, xx, yy, angle, type, false, col, row);
        this.tiles.push(tile);
      }
    }
  }
}
