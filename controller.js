var controller = {
  init: function() {
    view.init();
    gridModel.init();
    gameModel.init();
  },

  gameLoop: function(){
    var loop = 1;
    controller._intervalID = setInterval(function() {
      console.log("game loop");
      view.render(gameModel.getCoords(), gridModel);
      if (loop % 2 === 0) {
        var coords = gameModel.updateGame(gridModel);
        if (!!coords) {
          gridModel.updateGrid(coords);
        }
      }
      gameModel.gameOver(gridModel);
      loop++;
    }, 1000);
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
    view.render(gameModel.getCoords(), gridModel);
  },

  stopGame: function(){
    clearInterval(controller._intervalID);
    // add score in below
    view.gameOverMessage();
  }
};
