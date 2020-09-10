function Progress(){
  this.percent = 0;
  this.startAngle = 1.5 * Math.PI;
  this.endAngle = -.5 * Math.PI + (this.percent * Math.PI * 2);
  this.colour1 = "silver";
  this.colour2 = getRandomColor();
  this.resetChance = 60;
  this.happy=randomNum(1,5);
  this.mHappy=true;
  this.speed=8000;
  this.minSpeed=8000;
  this.maxSpeed=3000;
  this.exit=false;
  this.fourfour=false;
  
  this.draw = function(x, y){
    ctx = mainGame.context;
    this.endAngle = -.5 * Math.PI + (this.percent * Math.PI * 2);
    ctx.lineWidth = 10;

    if(!completed(this.percent)){
      this.mHappy=true;
      ctx.beginPath();
      ctx.arc(x, y, 10, this.startAngle, this.endAngle);
      ctx.strokeStyle = this.colour1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 10, this.endAngle, -.5 * Math.PI);
      ctx.strokeStyle = this.colour2;
      ctx.stroke();
      ctx.restore();
    } else {
      if(this.mHappy){
        this.fourfour=true;
        this.happy --;
        this.mHappy=false;
        if(this.happy==0){
          this.exit=true;
        }
      }
    }
  }
  
  this.tick = function(delta){
    if(!completed(this.percent)) this.percent += delta/this.speed;
  }
  
  this.reset = function(){
    if(completed(this.percent) && this.resetChance > randomNum(0,100)){
      this.percent = 0;
      this.speed=randomNum(this.maxSpeed,this.minSpeed);
    }
  }
  
  function completed(p){
    return p >= 1;
  }
}