function Customers(){
  this.customerList = [];
  this.pcs = [];
  this.time = 0;
  this.eventTime=3;
  this.maxPChance=90;
  this.newPersonChance = 20;
  
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
        } else {
          if(pc.getPerson() != null){
            pc.getPerson().progress.reset();
            if(pc.getPerson().progress.exit){
              pc.rmPerson();
              this.newPersonChance = this.newPersonChance < this.maxPChance ? this.newPersonChance+1: this.maxPChance;
            }
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