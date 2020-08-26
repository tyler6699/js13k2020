function Build(scale) {
  this.scale = scale;
  this.menu = new entity(48, canvasH, canvasW-48, canvasH/2, 0, types.BOX, "#cc00cc", this.scale, 0, 0);
  this.menu.image = null;
  this.menu.alpha = .4;
  this.buttons = [];
  
  // 
  for(i = 0; i<10;i++){
    this.buttons.push(new Button(32,32,canvasW-48,50+(i*80),"#4c5774", getValueByIndex(actions,i)));
  }
  
  this.update = function(){
    this.menu.update();
    for(i = 0; i<10;i++){
      btn = this.buttons[i];
      btn.update();
    }
  }
  
  this.tick = function(){
    // Check buttons are clicked
    clickRec = new vecToRec(clickedAt, 10, 10);
    for (var i = 0; i < this.buttons.length; i++) {
      b = this.buttons[i];
      if(rectColiding(b.entity.hitbox, clickRec)){
        b.processAction();
        return false;
      }
    }
    return true;
  }
}