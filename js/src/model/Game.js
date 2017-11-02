function Game(canvas, lvl="Lvl1") {
  this.player = new Player();

  this.canvas = canvas;
  this.context = canvas.getContext('2d');


  switch (lvl) {
    case "Lvl1":
    this.firstMap = new Lvl1();
      break;
    case "Lvl2":
    this.firstMap = new Lvl2();
      break;
    default:

  }

  console.log(this.firstMap);
  this.width = canvas.width = 1200;
  this.height = canvas.height = 600;

  this.scale = 5;
  this.obstacles = [];
  this.bullets = [];

  this.currentMap = this.firstMap.tiles;
  this.currentMapArray = this.firstMap.atlas.TextureAtlas.SubTexture;

  // Weapons start activated
  this.activado = true;
  this.mainInterval = 0;

  this.isPaused = false;
  this.keys = [];

  this.moved = 0;



}

var sprite = new Image();
sprite.src = './img/Platfor_Tiles_Free.png'
var rick = new Image()
rick.src = './img/picklerick0.png'
var rick1 = new Image()
rick1.src = './img/picklerick1.png'
var picklewalkLeft = new Image()
picklewalkLeft.src = './img/picklewalk-left.png'
var picklewalkLeft1 = new Image()
picklewalkLeft1.src = './img/picklewalk-left1.png'
var picklewalkLeft2 = new Image()
picklewalkLeft2.src = './img/picklewalk-left2.png'
var picklewalkRight = new Image()
picklewalkRight.src = './img/picklewalk-right.png'
var picklewalkRight1 = new Image()
picklewalkRight1.src = './img/picklewalk-right1.png'
var picklewalkRight2 = new Image()
picklewalkRight2.src = './img/picklewalk-right2.png'
var ratBoss = new Image()
ratBoss.src = './img/ratboss.png'
var ratBossDead = new Image()
ratBossDead.src = './img/ratboss-dead.png'
var bulletImage = new Image()
bulletImage.src = './img/bullet.png'

Game.prototype.update = function() {
  // Gravity
  this.player.velY += 1;
  // Right - Left movement
  this.player.velX = 6 * (!!this.keys[39] - !!this.keys[37]); //

  // Move the player and detect collisions
  var expectedY = this.player.posY + this.player.velY;
  this.player.move(this.obstacles, this.activado);

  this.player.onFloor = expectedY > this.player.posY;

  if (expectedY !== this.player.posY) this.player.velY = 0;

  // PLAYER ONLY CAN JUMP IS HE IS ON THE FLOOR
  if (this.player.onFloor && this.keys[38]) {
    this.player.velY = -14;
  }

  this.player.updateBullets();
  this.player.checkCollisionBullets(this.boss);

};


Game.prototype.drawPlayer = function() {
  if(this.firstMap.name == "Lvl1"){
    var width = rick.width ;
    var height = rick.height;
    if(this.keys[37]){
      var image = rick;
      this.context.drawImage(rick, this.player.posX, this.player.posY, 30, 60);
    } else {
      this.context.drawImage(rick1, this.player.posX, this.player.posY, 30, 60);
    }
  } else {
    var width = rick.width ;
    var height = rick.height;
    if(this.keys[37]){
      this.context.translate(this.player.velX * -1,0);

      switch (this.player.image) {
        case picklewalkLeft1:
        this.context.drawImage(picklewalkLeft, this.player.posX, this.player.posY, 50, 80);
        this.player.image = picklewalkLeft;
        break;
        case picklewalkLeft:
        this.context.drawImage(picklewalkLeft2, this.player.posX, this.player.posY, 50, 80);
        this.player.image = picklewalkLeft2;
        break;
        default:
        this.context.drawImage(picklewalkLeft1, this.player.posX, this.player.posY, 50, 80);
        this.player.image = picklewalkLeft1;
      }
    } else if (this.keys[39]){
      if (this.player.posX + this.moved > this.canvas.width/3 ) {
        this.moved += 1;
        this.context.translate(this.player.velX * -1,0);
      }
      switch (this.player.image) {
        case picklewalkRight1:
        this.context.drawImage(picklewalkRight, this.player.posX, this.player.posY, 50, 80);
        this.player.image = picklewalkRight;
        break;
        case picklewalkRight:
        this.context.drawImage(picklewalkRight2, this.player.posX, this.player.posY, 50, 80);
        this.player.image = picklewalkRight2;
        break;
        default:
        this.context.drawImage(picklewalkRight1, this.player.posX, this.player.posY, 50, 80);
        this.player.image = picklewalkRight1;
      }
    } else {
      this.context.drawImage(picklewalkRight, this.player.posX, this.player.posY, 50, 80);
      this.player.image = picklewalkRight;
    }
  }





}

// Game.prototype.changeArmo = function(){
//   var that = this;
//     if (that.activado == false) {
//       that.activado = true;
//     } else {
//       that.activado = false;
//     }
//   };

Game.prototype.drawBoard = function(primera) {
  if (primera != undefined) {
    obstacles = [];
    var that = this;
     this.armorInteval = setInterval(function() {

      if (that.activado == false) {
        that.activado = true;
      } else {
        that.activado = false;
      }
    }, 1000);
  }
  if (this.firstMap.name === "Lvl1") {
    this.player.width = 30;
    this.player.height = 60;
  }

for (var a = 0; a < this.currentMap.length; a++) {
  for (var c = 0; c < this.currentMap[a].length; c++) {
    for (var r = 0; r < this.currentMap[a][c].length; r++) {
      switch (this.currentMap[a][c][r]) {

        // GROUND
        case 01:
          this.drawObject(1, r, c, undefined, true);
          break;

        // SMALL GROUND
        case 02:
          this.drawObject(2, r, c, true, true);
          break;

        // TRIANGLE GROUND
        case 03:
          this.drawObject(3, r, c);
          break;

        // METAL PLATFORM
        case 26:

          this.drawObject(26, r, c,true, true);
          break;

        // SKY
        case 34:
          this.drawObject(34, r, c);
          break;

        // BOX
        case 35:
          this.drawObject(35, r, c, undefined, true);
          break;

          // SIGN
          case 44:
            this.drawObject(44, r, c, true, false);
          break;

          // SIGN
          case 45:
            this.drawObject(45, r, c);
          break;

          // SIGN
          case 46:
            this.drawObject(46, r, c, false, false);
          break;

          // SIGN
          case 48:
            this.drawObject(48, r, c);
          break;

        // SIGN
        case 50:
          this.drawObject(50, r, c, true);
          this.obstacles.push(new Obstacle("GOAL",width, height, 256/this.scale * r, 256/this.scale * c));
        break;

        // SPIKES
        case 62:

          image = this.currentMapArray[62 - 1];
          width = image['-width'] / this.scale;
          height = image['-height'] / this.scale;
          imageON = this.currentMapArray[63 - 1];
          heightON = imageON['-height'] / this.scale;

          if (this.activado) {
            this.context.drawImage(sprite, imageON['-x'], imageON['-y'], imageON['-width'], imageON['-height'],
              width * r, height * c - (heightON - height), width, heightON);
          } else {
            this.context.drawImage(sprite, image['-x'], image['-y'], image['-width'], image['-height'],
              width * r, height * c, width, height);
          }

          // Add obstacles objecto to array only on the first paint
           if (primera != undefined) {
             this.obstacles.push(new Spikes(width, height, heightON, width * r, height * c, height * c - (heightON - height)));
           }
          break;

          case 72:
            var image = this.currentMapArray[72 - 1];
            var width = image['-width'] / this.scale;
            var height = image['-height'] / this.scale;

            this.drawObject(72, r, c);

            break;

        // Secret Break with no collision to reach goal
        case 99:
          this.drawObject(1, r, c);
          break;

        case 98:

        if (primera != undefined) {
          this.boss = new RatBoss(ratBoss.width, ratBoss.height, 256/this.scale * r, 256/this.scale * c);
        }

        if(this.bossAlive()){
          this.context.drawImage(ratBoss,
            256/this.scale * r, 256/this.scale * c , ratBoss.width, ratBoss.height);
        } else {
          this.context.drawImage(ratBossDead,
            256/this.scale * r, 256/this.scale * c , ratBoss.width, ratBoss.height);
        }

            var filledRect = this.boss.hp / 50
            for (var i = 0; i < filledRect; i++) {
              this.context.beginPath();
              this.context.fillStyle = "#FF0000";
              this.context.fillRect(
                256/this.scale * r + ratBoss.width / 10 * i,
                256/this.scale * c - 20 ,
                ratBoss.width / 10 , 10);
            }



          // this.context.rect(
          //   256/this.scale * r + ratBoss.width / 10 * filledRect,
          //   256/this.scale * c - 20 ,
          //   ratBoss.width / 10 - 5 , 20);
          // this.context.stroke();



            break;

      }
    }
  }
}


  this.context.fillStyle = 'blue';
  this.context.font = '20pt Calibri';
  this.context.fillText("Tries : " + this.player.trys, 10,35);
};

Game.prototype.drawObject = function(n,r,c,resta,add) {

  var image = this.currentMapArray[n - 1];
  var width = image['-width'] / this.scale;
  var height = image['-height'] / this.scale;
  if (resta != true){ var resta = 0; } else {
     var resta = height; c += 1;
   }
  this.context.drawImage(sprite, image['-x'], image['-y'], image['-width'], image['-height'],
    256/this.scale * r, 256/this.scale * c - resta, width, height);
  if(add == true){
      this.obstacles.push(new Ground(width, height, 256/this.scale * r, 256/this.scale * c -resta));
  }

}

Game.prototype.drawBullet = function() {

  for (var i = 0; i < this.player.bullets.length; i++) {
    this.context.drawImage(bulletImage,
      this.player.bullets[i].posX + this.player.width +10,
      this.player.bullets[i].posY + 25,
      this.player.bullets[i].width , this.player.bullets[i].height);
  }
}

Game.prototype.pause = function() {
  clearInterval(this.armorInteval);
  clearInterval(this.mainInterval);
}

Game.prototype.bossAlive = function(){
    return this.boss.hp > 0 ? true : false;
}
