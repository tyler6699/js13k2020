function Customers(){
  this.customerList = [];
  this.pcs = [];
  this.time = 0;
  this.eventTime=3;
  this.newPersonChance = 1;
  
  this.tick = function(delta){
    this.time += delta;
    if(this.time > this.eventTime){
      this.time = 0;
      for(i=0;i<this.pcs.length;i++){
        pc=this.pcs[i];
        if(pc != null && pc.chairTile.entity.person == null){
          x = Math.floor(Math.random() * 100);
          if(x > this.newPersonChance){
            pc.chairTile.entity.person = new Person(pc.chairTile);
          }
        }
      }
    }
  }
  
  this.removePC = function(pc){
    pc.chairTile.entity.person
    this.pcs[pc.id] = null;
    this.pcs = this.pcs.filter(
      function(value, index, arr){ 
        return value != null;
      }
    );
  }
  
  this.addPC= function(pc){
    this.pcs[pc.id] = pc;
  }
}