var controller = {
  init: function() {
    view.init();
    gridModel.init();
    gameModel.init();
  },

  gameLoop: function(){
    var loop = 1;
    controller._intervalID = setInterval(function() {
      view.render(gameModel.getCoords(), gridModel, gameModel);
      if (loop % 2 === 0) {
        var coords = gameModel.updateGame(gridModel);
        if (!!coords) {
          gridModel.updateGrid(coords);
        }
      }
      console.log(gameModel.interval);
      gameModel.gameOver(gridModel);
      loop++;
    }, gameModel.interval);
  },

  newGame: function(){
    gridModel.init();
    gameModel.init();
    this.gameLoop();
  },

  clearGame: function() {
    view.clearBoard();
  },

  movePiece: function(keycode) {
    var coords = gameModel.updatePieceCoords(keycode, gridModel, gameModel);
    if (!!coords) {
      gridModel.updateGrid(coords);
    }
    view.render(gameModel.getCoords(), gridModel, gameModel);
  },

  stopGame: function(){
    clearInterval(controller._intervalID);
    // add score in below
    view.gameOverMessage();
  },

  updateScore: function(){
    gameModel.incScore();
  },

  updateSpeed: function(){
    gameModel.interval /= 1.05;
  },

  updateGameGear: function(){
    this.updateScore();
    this.updateSpeed();
    clearInterval(controller._intervalID);
    this.gameLoop();
  }
};
