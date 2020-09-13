function Button(w,h,x,y,colour,action){
  this.entity = new entity(w, h, x, y, 0, action, colour, 4, hitboxOffsetX = 0, hitboxOffsetY = 0, true);
  this.action = action;
  this.update = function(){
    this.entity.update();
  }
  
  this.tick = function(click){}
  
  this.processAction = function(){
    cart.menu.curItm = this.action;
    if(this.action == actions.UP){
      console.log("here");
      if(SCORE>UPPRICE){
        if(!DATAUPGRADE){
          DATAUPGRADE=true;
          SCORE-=UPPRICE;
          UPPRICE=1500;
          cart.hero.showTextY=-30;
          cart.hero.showTextTime=TEXTTIME*2;
          cart.hero.showText="AUTO DATA COLLECTION!";
        } else if(!SHOOTUPGRADE){
          SHOOTUPGRADE=true;
          SCORE-=UPPRICE;
          UPPRICE=2000;
          cart.hero.showTextY=-30;
          cart.hero.showTextTime=TEXTTIME*2;
          cart.hero.showText="SHOOT SPEED +++";
          BSPEED=1000;
        } else if(!AMMOGIFTUPGRADE){ // MORE DATA PER TICK
          AMMOGIFTUPGRADE=true;
          AMMOGIFT=20;         
          SCORE-=UPPRICE;
          UPPRICE=0;
          cart.hero.showTextY=-30;
          cart.hero.showTextTime=TEXTTIME*2;
          cart.hero.showText="MORE DATA PER SERVER";
        } else {
          if(NEWPERSONCHANCE<100){
            SCORE-=UPPRICE;
            NEWPERSONCHANCE+=10;
            cart.hero.showTextY=-30;
            cart.hero.showTextTime=TEXTTIME*2;
            cart.hero.showText="Rating ++";
          }
        }
      } else {
        cart.hero.showTextY=-30;
        cart.hero.showTextTime=TEXTTIME;
        cart.hero.showText="Not enough $$";
      }
      
    }
  }
}