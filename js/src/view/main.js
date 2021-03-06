window.onload = function() {

  var game;
  var canvas = document.querySelector("canvas");

  var sprite = new Image();
  sprite.src = '../img/Platfor_Tiles_Free.png';

  var currentTries = 0;
  var scores = [];


  // TO COUNT THE TIME IN THE FIRST LEVEL
  var count = 0;

  document.onkeydown = document.onkeyup = function(e) {
    game.keys[e.which || e.keyCode] = e.type === "keydown";
  };

  document.onkeypress = function(e) {
    if (e.keyCode == 80 || e.keyCode == 112) {
      if (game.isPaused) {
        game.mainInterval = setInterval(refreshGame, 1000 / 60);
        game.isPaused = false;
      } else {
        pauseGame();
        game.isPaused = true;
      }

    } else if (e.keyCode == 32 && game.firstMap.name !== "Lvl1") {
      game.player.shoot();
      game.boss.shootPlayer();
      console.log(game.obstacles);
    }

  };;

  sprite.onload = function() {
    game = new Game(canvas, "Lvl1");
    game.drawBoard('first');
    game.mainInterval = setInterval(refreshGame, 1000 / 60);
  };

  function refreshGame() {
    game.update();
    game.context.clearRect(0, 0, 4000, 2000);
    game.drawBoard();
    game.drawPlayer();
    game.drawBullet();
    changeLvl();
    count++;
    game.time = count;
    if (game.player.alive == false && game.firstMap.name == "Lvl2") {
      currentTries = game.player.trys;
      game = new Game(canvas, "Lvl2");
      game.drawBoard('first');
      game.player.trys = currentTries;
    }
  }

  function pauseGame() {
    clearInterval(game.armorInteval);
    clearInterval(game.mainInterval);
  }

  function changeLvl() {
    if (game.player.winner == true) {
      switch (game.firstMap.name) {
        case "Lvl0":
          currentTries = game.player.trys;
          game = new Game(canvas, "Lvl1");
          game.drawBoard('first');
          game.player.trys = currentTries;
          break;
        case "Lvl1":
          currentTries = game.player.trys;
          game = new Game(canvas, "Lvl2");
          game.drawBoard('first');
          game.player.trys = currentTries;
          break;
        case "Lvl2":
          scores.push([game.player.trys, new Date()]);
          game.player.winner = false;
          console.log(scores);
          $('#pause').hide();
          $('canvas').hide();
          $('#final-score').show();
          $('#final-score span').text(game.player.trys);
          pauseGame();
          break;
        default:
      }
    }
  }

};
