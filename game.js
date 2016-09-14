function Block(x, y) {
  this.xCoord = x;
  this.yCoord = y;
};

var gameModel = {
  init: function() {
    this.currentBlock = new Block(4,0);
    this.turn = 0;
    this.score = 0;
  },

  getCoords: function(){
    return [gameModel.currentBlock.xCoord, gameModel.currentBlock.yCoord];
  },

  updateGame: function(grid) {
    var coords = this.getCoords();
    if (gameModel.checkTouch(grid) || coords[1] === 19) {
      this.currentBlock = new Block(4,0);
      return coords;
    }
    gameModel.currentBlock.yCoord += 1;
    return false;
  },

  checkTouch: function(grid) {
    var x = gameModel.currentBlock.xCoord;
    var y = gameModel.currentBlock.yCoord;
    if (grid[x][y+1]) {
      return true;
    }
    return false;
  },

  updatePieceCoords: function(keycode) {
    if (keycode === 37) {
      this.currentBlock.xCoord -= 1;
    }
    if (keycode === 39) {
      this.currentBlock.xCoord += 1;
    }
    if (keycode === 40) {
      return gameModel.setPiece(this.currentBlock);
    }
    return false;
  },

  setPiece: function(block) {
    var xVal = block.xCoord;
    var yVal = block.yCoord;
    this.currentBlock = new Block(4,0);
    return [xVal, yVal];
  }
};
