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

  this.shape = types[Object.keys(types)[Math.floor(Math.random() * 4)]];

  this.mapBlock = function(index){
    var blockCoords = [];
    for(var n = 0; n < 4; n++){
      var dist =
      blockCoords.push();
    }
  }
};
// [1,0] [2,0] [3,0] [4,0]
// n n n n
// n = 0th indexed block
// n->1,0->2,0->3,0
// mapping = [[2-1, 0-0], []]
//

var gameModel = {
  init: function() {
    this.currentBlock = new Piece();
    this.turn = 0;
    this.score = 0;
  },

  getCoords: function(){
    var piece = [];
    for (var i = 0; i < this.currentBlock.shape.length; i++) {
      piece.push([gameModel.currentBlock.shape[i].xCoord, gameModel.currentBlock.shape[i].yCoord])
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

  updatePieceCoords: function(keycode, grid) {
    if (keycode === 37) {
      if (this.validMove(-1, grid)){
        for (var i = 0; i < this.currentBlock.shape.length; i++) {
          this.currentBlock.shape[i].xCoord -= 1;
        }
      }
    }
    if (keycode === 39) {
      if (this.validMove(1, grid)){
        for (var i = 0; i < this.currentBlock.shape.length; i++) {
          this.currentBlock.shape[i].xCoord += 1;
        }
      }
    }
    if (keycode === 40) {
      return gameModel.setPiece(this.currentBlock.shape);
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
  }
};
