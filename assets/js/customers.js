function Customers(){
  this.customerList = [];
  this.pcs = [];
  
  this.tick = function(){
    
  }
  
  this.removePC = function(pc){
    console.log("Remove PC: " + pc.id);
    this.pcs[pc.id] = null;
    this.pcs = this.pcs.filter(
      function(value, index, arr){ 
        return value != null;
      }
    );
  }
  
  this.addPC= function(pc){
    console.log("Add PC: " + pc.id);
    this.pcs[pc.id] = pc;
  }
}