function Tile(size, x, y, angle, type, solid, column, row) {
  this.entity = new entity(size, size, x, y, angle, type, "white", hitboxOffsetX = 0, hitboxOffsetY = 0);
  this.entity.setType();
  this.column = column;
  this.row = row;
  this.active = true;

  this.update = function(delta) {
    this.entity.update(delta);
    // Tick Person
    if(this.person() != null) this.entity.person.tick();
  }

  //this.tick = function(hero){}

  this.change = function(){
    if (this.entity.type >= Object.values(types).length){
      this.entity.type = 0;
    }

    this.entity.setType();
  }

  this.isTable = function(){
    return this.entity.isTable();
  }

  this.isChairB = function(){
    return this.entity.isChairB();
  }

  this.isChairT = function(){
    return this.entity.isChairT();
  }

  this.isFloor = function(){
    return this.entity.isFloor();
  }

  this.person = function(){
    return this.entity.person;
  }
}
