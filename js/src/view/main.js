window.onload = function() {
  console.log("YEPA");

  var game;
  var player = new Player();

  var canvas = document.querySelector("canvas");

  var sprite = new Image();
  sprite.src = './img/Platfor_Tiles_Free.png';


document.onkeydown = document.onkeyup = function (e) {
    game.keys[e.which || e.keyCode] = e.type === "keydown";
  //onsole.log(game.keys);

};

 document.onkeypress = function (e) {
   if ( e.keyCode == 80 || e.keyCode == 112 ) {
     if(game.isPaused){
       game.start();
       game.isPaused = false;
     } else {
       game.pause();
       game.isPaused = true;
     }

    }

 };;

sprite.onload = function() {
    game = new Game(canvas,player);
    game.start();
};

};
