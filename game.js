function Block(x, y) {
  this.xCoord = x ||4;
  this.yCoord = y || 0;
}

function Piece(){
  types = {
    square: [new Block(4,0), new Block(3,0), new Block(4,1), new Block(3,1)],
    lShape: [new Block(2,0), new Block(3,0), new Block(4,0), new Block(4,1)],
    zShape: [new Block(2,1), new Block(3,1), new Block(3,0), new Block(4,0)],
    iShape: [new Block(2,0), new Block(3,0), new Block(4,0), new Block(5,0)],
    tShape: [new Block(3,0), new Block(4,0), new Block(4,1), new Block(5,0)],
    lLeftShape: [new Block(2,0), new Block(3,0), new Block(4,0), new Block(2,1)],
    zLeftShape: [new Block(3,1), new Block(4,1), new Block(2,0), new Block(3,0)]
  };

  this.type = Object.keys(types)[Math.floor(Math.random() * 7)];
  this.shape = types[this.type];
  this.rotations = 0;

  this.getType = function() {
    return this.type;
  };
}

var gameModel = {
  init: function() {
    this.currentBlock = new Piece();
    this.turn = 0;
    this.score = 0;
  },

  getCoords: function(){
    var piece = [];
    for (var i = 0; i < this.currentBlock.shape.length; i++) {
      piece.push([gameModel.currentBlock.shape[i].xCoord, gameModel.currentBlock.shape[i].yCoord]);
    }
    return piece;
  },

  updateGame: function(grid) {
    var coords = this.getCoords();
    for (var i = 0; i < this.currentBlock.shape.length; i++) {
      if (gameModel.checkTouch(grid, this.currentBlock.shape[i]) || coords[i][1] === 19) {
        this.currentBlock = new Piece();
        return coords;
      }
      gameModel.currentBlock.shape[i].yCoord += 1;
    }
    return false;
  },

  checkTouch: function(grid, block) {
    var x = block.xCoord;
    var y = block.yCoord;
    if (grid[x][y+1]) {
      return true;
    }
    return false;
  },

  updatePieceCoords: function(keycode, grid, block) {
    if (keycode === 37) {
      if (this.validMove(-1, grid)){
        for (var i = 0; i < this.currentBlock.shape.length; i++) {
          this.currentBlock.shape[i].xCoord -= 1;
        }
      }
    }
    if (keycode === 39) {
      if (this.validMove(1, grid)){
        for (var j = 0; j < this.currentBlock.shape.length; j++) {
          this.currentBlock.shape[j].xCoord += 1;
        }
      }
    }
    if (keycode === 40) {
      return gameModel.setPiece(this.currentBlock.shape);
    }
    if (keycode === 32) {
      this.rotate(block);
    }
    return false;
  },

  validMove: function(move, grid) {
    for (var i = 0; i < this.currentBlock.shape.length; i++) {
      var nextSpace = this.currentBlock.shape[i].xCoord + move;
      if ( nextSpace < 0 || nextSpace > 9 || grid[nextSpace][this.currentBlock.shape[i].yCoord] ){
        return false;
      }
    }
    return true;
  },

  setPiece: function(piece) {
    var coords = [];
    for (var i = 0; i < this.currentBlock.shape.length; i++) {
      var xVal = piece[i].xCoord;
      var yVal = piece[i].yCoord;
      coords.push([xVal, yVal]);
    }
    this.currentBlock = new Piece();
    return coords;
  },

  gameOver: function(grid){
    console.log(grid.width);
    for(var i = 0; i < grid.width; i++){
      if (grid.gridArray[i][0]){
        controller.stopGame();
        break;
      }
    }
  }
};
