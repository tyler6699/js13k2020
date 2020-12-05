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
  this.tileSize = 16;
  this.columnCount=19;
  this.rowCount=13;
  var levelArray;

  this.draw = function(hero, delta){
    for (i = 0; i < this.backTiles.length; i++) {
      var tile = this.backTiles[i];
      tile.update(delta);
    }

    // TILE DRAW
    for (i = 0; i < this.tiles.length; i++) {
      var tile = this.tiles[i];
      tile.update(delta);
    }
  }

  this.reset = function(hero){
    var id = hero != null ? hero.currentLevel : 0;
    this.tiles = [];
    this.backTiles = [];
    levelArray = this.levels[id];
    var rows = this.rowCount;
    var cols = this.columnCount;

    for (row = 0; row < rows; row++) {
      for (col = 0; col < cols; col++) {
        xx = col * this.tileSize;
        yy = row * this.tileSize;
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
          type = types.FLOOR
        }

        tile = new Tile(this.tileSize, xx, yy, angle, type, false, col, row);
        this.tiles.push(tile);
      }
    }
  }
}
