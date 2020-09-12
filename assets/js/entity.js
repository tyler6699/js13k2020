function entity(w, h, x, y, angle, type, colour, scale, hitboxOffsetX = 0, hitboxOffsetY = 0, imageSrc = "", isButton = false) {
  this.scale = scale;
  this.type = type;
  this.width = w;
  this.height = h;
  this.mhWidth = w / -2;
  this.mhHeight = h / -2;
  this.mhWidthScaled = (w / -2) * scale;
  this.mhHeightScaled = (h / -2) * scale;
  this.hWidth = w / 2;
  this.hHeight = h / 2;
  this.yOffset = 0;
  this.yDrawOffset=0;
  this.angle = angle;
  this.x = x;
  this.y = y;
  this.active = true;
  this.colour = colour;
  this.image = new Image();
  this.image.src = imageSrc;
  this.animated = false;
  this.anination = null;
  this.hitboxOffsetX = hitboxOffsetX;
  this.hitboxOffsetY = hitboxOffsetY;
  this.alpha = 1;
  this.currentTile=0;
  this.collisionArray = [];
  this.isSolid = false;
  this.isButton = isButton;
  this.drawTile = false;
  this.pc = null;
  this.person = null;
  this.gun = null;
  this.ammo = 5;
  this.time=0;
  this.showText="";
  this.showTextTime=0;
  this.showTextY=0;
  this.currentGift=0;
  this.shootTime=0;
  this.hover=false;
  this.hoverText="";
  this.hoverText2="";
  // ATLAS Positions
  this.sx=0;
  this.sy=0;
  
  this.setHitbox = function() {
    this.hitbox = new rectanlge(0, 0, 0, 0);
    this.sensor = new rectanlge(0, 0, 0, 0);
    if(this.isButton){
      this.hitbox.w = this.width * 2;
      this.hitbox.h = this.height * 2;
    }
  }
  this.setHitbox();

  this.updateHitbox = function() {
    // Buttons are rendered the screen size and do not need scaling
    if(this.isButton){
      this.hitbox.x = this.x - this.width;
      this.hitbox.y = this.y - this.height;
    } else {
      // Images are all scaled up so hitboxes are also scaled up
      this.hitbox.x = this.x + ((this.hitboxOffsetX * this.scale)/2);
      this.hitbox.y = this.y + ((this.hitboxOffsetX * this.scale)/2);
      this.hitbox.w = (this.width * this.scale) - (this.hitboxOffsetX * this.scale);
      this.hitbox.h = (this.height * this.scale) - (this.hitboxOffsetY * this.scale);
      
      this.sensor.x = this.x-5;
      this.sensor.y = this.y-5;
      this.sensor.w = (this.width * this.scale) + 10;
      this.sensor.h = (this.height * this.scale) + 10;
    }
  }

  this.addPC = function(direction, chair, tile){
    if(this.pc == null){
      this.pc = new PC(direction, chair, tile);
    } else {
      this.pc.direction = direction;
    }
  }
  // Render
  this.update = function(delta) {
    this.updateHitbox();
    
    if(this.active) {
      ctx = mainGame.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      
      if(this.drawTile){
        ctx.globalAlpha = .4;
        ctx.drawImage(this.image, 48, 0, 16, 16, 8, 8, 64, 64);  
      }
      
      ctx.globalAlpha = this.alpha;
      // Animate Image
      if (this.animated) {
        if (!this.animation.pauseAnimation) {
          this.animation.getKeyFrame(delta);
        }
        ctx.drawImage(this.image, this.width * this.animation.currentFrame, 0, this.width, this.height, 0, 0, this.width * this.scale, this.height * this.scale);
        // No Image (Coloured Shape)
      } else if (this.image == null || this.isButton) {
        ctx.fillStyle = this.colour;
        ctx.fillRect((this.mhWidth *.5) * this.scale, (this.mhHeight * .5) * this.scale, (this.width * .5) * this.scale, (this.height * .5) * this.scale);
        // Image
      } else {
        ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height, this.hWidth, this.hHeight + this.yDrawOffset, this.width * this.scale, this.height * this.scale);  
      }
      
      if(this.isServer() && this.ammo > 0){
        ctx.drawImage(this.image, 128, 32, this.width, this.height, this.hWidth, this.hHeight + this.yDrawOffset, this.width * this.scale, this.height * this.scale);  
      }
      
      // SHOW TEXT
      if(this.showTextTime>0){
        this.showTextTime-=delta;
        gradient = ctx.createLinearGradient(0, 0, canvasW, 0);
        gradient.addColorStop("0", "#05f2db");
        gradient.addColorStop(".1", "#990099");
        ctx.font = "italic 700 25px Unknown Font, sans-serif";
        ctx.fillStyle = gradient;
        ctx.fillText(this.showText, 0, this.showTextY+(10*this.showTextTime));
      } else {
        this.currentGift=0;
      }
      
      if(this.isButton){
        by=32;
        if(this.type == actions.CHAIR){
          this.hoverText="Chair";
          this.hoverText2="$"+CHAIRPRICE;
          bx=48;
          if(cart.menu.currentBuildItem == actions.CHAIR)ctx.drawImage(this.image, 112, 32, 16, 16, -32, -32, 64, 64); 
        } else if (this.type == actions.DESK){
          bx=58;
          this.hoverText="Desk";
          this.hoverText2="$"+TABLEPRICE;
          if(cart.menu.currentBuildItem == actions.DESK)ctx.drawImage(this.image, 112, 32, 16, 16, -32, -32, 64, 64); 
        } else if (this.type == actions.PC){
          this.hoverText="PC";
          this.hoverText2="$"+PCPRICE;
          bx=68;
          if(cart.menu.currentBuildItem == actions.PC)ctx.drawImage(this.image, 112, 32, 16, 16, -32, -32, 64, 64); 
        } else if (this.type == actions.SERVER){
          this.hoverText="Server";
          this.hoverText2="$"+SERVERPRICE;
          bx=78;
          if(cart.menu.currentBuildItem == actions.SERVER)ctx.drawImage(this.image, 112, 32, 16, 16, -32, -32, 64, 64); 
        } else if (this.type == actions.VEND){
          bx=88;
          this.hoverText="Vending";
          this.hoverText2="$"+VENDPRICE;
          if(cart.menu.currentBuildItem == actions.VEND)ctx.drawImage(this.image, 112, 32, 16, 16, -32, -32, 64, 64); 
        } else if (this.type == actions.GUN){
          bx=98;
          this.hoverText="SELECT";
          this.hoverText2="DATA GUN";
          if(cart.menu.currentBuildItem == actions.GUN)ctx.drawImage(this.image, 112, 32, 16, 16, -32, -32, 64, 64); 
        } else if (this.type == actions.AUTO){
          bx=48;by=42;
          this.hoverText="AUTO";
          this.hoverText2="$"+AUTOPRICE;
          if(cart.menu.currentBuildItem == actions.AUTO)ctx.drawImage(this.image, 112, 32, 16, 16, -32, -32, 64, 64); 
        } else if(this.type == actions.UP){
          bx=58;
          by=42;
          this.hoverText="Upgrade";
          this.hoverText="$"+UP;
        } else {
          bx=115;by=36;
        }  
        ctx.drawImage(this.image, bx, by, 10, 10, -16, -16, 32, 32); 
        
        if(this.hover){
          // #05f2db#990099
          ctx.globalAlpha = .8;
          ctx.fillStyle = "#990099";
          ctx.fillRect(-215, -50, 167, 100);
          ctx.fillStyle = this.colour;
          ctx.fillRect(-200, -32, 165, 64);
          ctx.globalAlpha = 1;
          ctx.font = "italic 700 25px Unknown Font, sans-serif";
          ctx.fillStyle = "#990099";
          ctx.fillText(this.hoverText, -180, -5);
          ctx.fillText(this.hoverText2, -180, 20);
        }
      }
      
      if(this.isTable()){
        ctx.globalAlpha = 1;
        if(this.pc != null && this.pc.direction == types.PC_B){
          ctx.translate(0, -30);
          ctx.drawImage(this.image, 112, 16, this.width, this.height, this.hWidth, this.hHeight, this.width * this.scale, this.height * this.scale); 
        } else if (this.pc != null && this.pc.direction == types.PC){
          ctx.translate(0, -20);
          ctx.drawImage(this.image, 128, 16, this.width, this.height, this.hWidth, this.hHeight, this.width * this.scale, this.height * this.scale); 
        }
      } else if (this.isServer()){
        this.time+=delta;
        if(this.time > SERVEREVENT){
          this.time=0;
          if(this.ammo==0){
            this.ammo+=AMMOGIFT;
            this.showTextY=-35;
            this.showTextTime=TEXTTIME;
            this.showText="+" + AMMOGIFT + " data - $" + AMMOCOST;
            SCORE-=AMMOCOST;
          }  
        }
      } else if(this.isVend()){
        this.time+=delta;
        if(this.time > VENDEVENT){
          this.time=0;
          amount = cart.customers.userCount*VENDNUM;
          SCORE+=amount;
          if(amount>0){
            this.showTextY=-35;
            this.showTextTime=TEXTTIME;
            this.showText="+ $" + cart.customers.userCount*VENDNUM;
          }
        }
      } else if(this.isAuto()){        
        var pcs = cart.customers.pcs;
        
        for(var i=0;i< pcs.length; i++){
          pc=pcs[i];
          person = pc.getPerson();
          if(person!=null && person.progress.waiting && this.shootTime <= 0 && !targets[pc.id]){
            this.shootTime = SHOOTWAIT;
            ox = this.x;
            oy = this.y;
            dx = pc.tile.entity.x;
            dy = pc.tile.entity.y;
            cart.hero.gun.addBullets(ox,oy,dx,dy);
            targets[pc.id]=true;
            break;
          } else if (this.shootTime > 0){
            this.shootTime-=delta;
          }
        }
      }

      ctx.restore();
    }
  }
  
  this.flipMonitors = function(){
    if(this.pc != null){
      if(this.pc.direction == types.PC){
        this.pc.direction = types.PC_B;
      } else {
        this.pc.direction = types.PC;
      }
    }
  }
  
  this.isHero = function(){
    return this.type == types.HERO;
  }
  
  this.isTable = function(){
    return this.type == types.TABLE;
  }
  
  this.isChairB = function(){
    return this.type == types.CHAIR_B;
  }
  
  this.isChairT = function(){
    return this.type == types.CHAIR_T;
  }
  
  this.isFloor = function(){
    return this.type == types.FLOOR;
  }
  
  this.isServer = function(){
    return this.type == types.SERVER;
  }
  
  this.isVend = function(){
    return this.type == types.VEND;
  }
  
  this.isAuto = function(){
    return this.type == types.AUTO;
  }
  
  this.setType = function(){
    this.alpha = 1;
    this.sy=0;
    this.sx=0;  
    this.yDrawOffset = 0;
    this.hitboxOffsetY = 0;
    this.isSolid = true;
    
    switch(this.type) {
      case types.WALL_R:
        this.sx=80;
        break;
      case types.WALL_RT:
        this.sx=128;
        break;
      case types.WALL_LT:
        this.sx=16;
        this.sy=16;
        break;   
      case types.WALL_L:
        this.sx=64;
        break; 
      case types.WALL_T:
        this.sy=16;
        break;  
      case types.WALL_B:
        this.sx=112;
        break;  
      case types.WALL_BR:
        this.sx=32;
        this.sy=16;
        break;  
      case types.WALL_BL:
        this.sx=48;
        this.sy=16;
        break; 
      case types.FLOOR:
        this.sx=48;
        this.alpha = .4;
        this.isSolid = false;
        this.drawTile = false;
        break; 
      case types.AIR:
        this.sx=144;
        this.isSolid = false;
        break; 
      case types.TABLE:
        this.sx=64;
        this.sy=16;
        this.drawTile = true;
        break; 
      case types.CHAIR_T:
        this.sx=80;
        this.sy=16;
        this.isSolid = false;
        this.drawTile = true;
        break; 
      case types.CHAIR_B:
        this.sx=96;
        this.sy=16;
        this.isSolid = false;
        this.drawTile = true;
        break; 
      case types.PC:
        this.sx=112;
        this.sy=16;
        this.isSolid = false;
        break;
      case types.SERVER:
        this.sx=144;
        this.sy=16;
        this.yDrawOffset = -20;
        this.hitboxOffsetY = 5;
        this.drawTile = true;
        break;
      case types.VEND:
        this.sx=144;
        this.sy=32;
        this.yDrawOffset = -20;
        this.hitboxOffsetY = 5;
        this.drawTile = true;
        break;
      case types.AUTO:
        this.sx=128;
        this.sy=48;
        this.yDrawOffset = -20;
        this.hitboxOffsetY = 5;
        this.drawTile = true;
        break; 
    }  
  }
}