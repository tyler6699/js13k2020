function Customers(){
  this.customerList = [];
  this.pcs = [];
  this.time = 0;
  this.eventTime=3;
  this.newPersonChance = 1; // Increase this over time?
  
  this.tick = function(delta){
    this.time += delta;
    // Spawn new customers
    if(this.time > this.eventTime){
      this.time = 0;
      for(i=0;i<this.pcs.length;i++){
        pc=this.pcs[i];
        if(pc != null && pc.chair.person() == null){
          if(randomNum(0,100) > this.newPersonChance){
            pc.chair.entity.person = new Person(pc.chair);
          }
        }
      }
    }
  }
  
  this.draw = function(delta){
    for(i=0;i<this.pcs.length;i++){
      pc=this.pcs[i];
      if(pc != null && pc.chair.person()!= null){
        if(pc.chair.person().hasTarget){
          // Draw Person if its moving to ensure its over tiles
          pc.chair.person().entity.update(delta);  
        }  
      }
    }
  }
  
  this.removePC = function(pc){
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