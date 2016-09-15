var controller = {
  init: function() {
    view.init();
    gridModel.init();
    gameModel.init();
  },

  gameLoop: function(){
    var loop = 1;
    setInterval(function() {
      view.render(gridModel.width, gridModel.height, gameModel.getCoords(), gridModel.gridArray);
      if (loop % 2 === 0) {
        var coords = gameModel.updateGame(gridModel.gridArray);
        if (!!coords) {
          gridModel.updateGrid(coords);
        }
      }
      gameModel.gameOver(gridModel);
      loop++;
    }, 1000);
  },

  movePiece: function(keycode) {
    var coords = gameModel.updatePieceCoords(keycode, gridModel.gridArray, gameModel.currentBlock);
    if (!!coords) {
      gridModel.updateGrid(coords);
    }
    view.render(gridModel.width, gridModel.height, gameModel.getCoords(), gridModel.gridArray);
  },

  stopGame: function(){
    clearInterval(this.gameLoop);
    // add score in below
    view.gameOverMessage();
  }
};
