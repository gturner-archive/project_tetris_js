function Block(x, y) {
  this.xCoord = x ||4;
  this.yCoord = y || 0;
};

function Piece(){
  types = {
    square: [new Block(4,0), new Block(3,0), new Block(4,1), new Block(3,1)],
    lShape: [new Block(4,0), new Block(4,1), new Block(3,0), new Block(2,0)],
    zShape: [new Block(4,0), new Block(3,0), new Block(3,1), new Block(2,1)],
    iShape: [new Block(4,0), new Block(2,0), new Block(3,0), new Block(5,0)]
  };

  this.shape = Object.keys(types)[Math.floor(Math.random() * 4)];
};

var gameModel = {
  init: function() {
    this.currentBlock = new Piece();
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

  checkTouch: function(block, grid) {
    var x = block.xCoord;
    var y = block.yCoord;
    if (grid[x][y+1]) {
      return true;
    }
    return false;
  },

  updatePieceCoords: function(keycode, grid) {
    if (keycode === 37) {
      if (this.validMove(-1, grid)){
        this.currentBlock.xCoord -= 1;
      }
    }
    if (keycode === 39) {
      if (this.validMove(1, grid)){
        this.currentBlock.xCoord += 1;
      }
    }
    if (keycode === 40) {
      return gameModel.setPiece(this.currentBlock);
    }
    return false;
  },

  validMove: function(move, grid) {
    var nextSpace = this.currentBlock.xCoord + move;
    if ( nextSpace < 0 || nextSpace > 9 || grid[nextSpace][this.currentBlock.yCoord] ){
      return false;
    }
    return true;
  },

  setPiece: function(block) {
    var xVal = block.xCoord;
    var yVal = block.yCoord;
    this.currentBlock = new Block(4,0);
    return [xVal, yVal];
  }
};
