function Customers(){
  this.customerList = [];
  this.pcs = [];
  this.time = 0;
  this.eventTime=10;
  
  this.tick = function(delta){
    this.time += delta;
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