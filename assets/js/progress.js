function Progress(radius){
  this.completedPercentage = 0;
  this.startAngle = 1.5 * Math.PI;
  this.endAngle = -.5 * Math.PI + (this.completedPercentage * Math.PI * 2);
  this.radius = radius;
  
  this.draw = function(x, y){
    ctx = mainGame.context;
    this.endAngle = -.5 * Math.PI + (this.completedPercentage * Math.PI * 2);
    
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(x, y, 10, this.startAngle, this.endAngle);
    ctx.strokeStyle = '#060';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 10, this.endAngle, -.5 * Math.PI);
    ctx.strokeStyle = '#0F0';
    ctx.stroke();
    ctx.restore();
  }
  
  this.tick = function(delta){
    this.completedPercentage += delta/10000;
  }
}