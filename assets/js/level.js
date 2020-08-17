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

  this.draw = function(hero){
    for (i = 0; i < this.backTiles.length; i++) {
      var tile = this.backTiles[i];
      tile.update();
    }

    // Collision Tiles
    for (i = 0; i < this.tiles.length; i++) {
      var tile = this.tiles[i];
      tile.update();
    }
  }

  this.tick = function(hero){
    // Collision Tiles
    for (i = 0; i < this.tiles.length; i++) {
      var tile = this.tiles[i];
      tile.tick(hero);
    }    
  }

  this.reset = function(hero, scale){
    //this.active = false;
    var id = hero != null ? hero.currentLevel : 0;
    this.tiles = [];
    this.backTiles = [];
    levelArray = this.levels[id];
    var rows = 5;
    var cols = 5;

    for (row = 0; row < rows; row++) {
      for (col = 0; col < cols; col++) {
        xx = col * tileSize * scale;
        yy = row * tileSize * scale;
        var tile;
        var type = 0;
        tile = new Tile(tileSize, xx, yy, type, true, col, row);
        this.tiles.push(tile);

        // Decor Tiles
        //if(Math.random() > .8){
        //  tile = new Tile(tileSize, xx, yy, types.WALL, false, col, row);
        //  this.backTiles.push(tile);
        //}
      }
    }
  }
}