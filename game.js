function Block(x, y) {
  this.xCoord = x ||4;
  this.yCoord = y || 0;
};

function Piece(direction){
  types = {
    square: [new Block(4,0), new Block(3,0), new Block(4,1), new Block(3,1)],
    lShape: [new Block(2,0), new Block(3,0), new Block(4,0), new Block(4,1)],
    zShape: [new Block(2,1), new Block(3,1), new Block(3,0), new Block(4,0)],
    iShape: [new Block(2,0), new Block(3,0), new Block(4,0), new Block(5,0)],
    tShape: [new Block(3,0), new Block(4,0), new Block(4,1), new Block(5,0)],
    lLeftShape: [new Block()]
  };

  this.type = Object.keys(types)[Math.floor(Math.random() * 5)];
  this.shape = types[this.type];
  this.dir = direction || 1;
  this.rotations = 0;

  this.getType = function() {
    return this.type;
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
        for (var i = 0; i < this.currentBlock.shape.length; i++) {
          this.currentBlock.shape[i].xCoord += 1;
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

  rotate: function(block){
    var typo = block.getType(),
        that = this;
        console.log(that);
    if(typo === 'iShape' || typo === 'zShape'){
      gameModel.rotations[typo][gameModel.currentBlock.rotations % 2](that);
    }
    else if(typo === 'lShape' || typo === 'tShape'){
      gameModel.rotations[typo][gameModel.currentBlock.rotations % 4](that);
    }

    block.rotations += 1;
  },

  rotations: {
    tShape: {
      0: function(obj){
        var block = obj.currentBlock;
        block.shape[3].xCoord -= 1;
        block.shape[3].yCoord -= 1;
      },
      1: function(obj){
        var block = obj.currentBlock;
        block.shape[2].xCoord += 1;
        block.shape[2].yCoord -= 1;
      },
      2: function(obj){
        var block = obj.currentBlock;
        block.shape[0].xCoord += 1;
        block.shape[0].yCoord += 1;
      },
      3: function(obj){
        var block = obj.currentBlock;
        block.shape[0].xCoord -= 1;
        block.shape[0].yCoord -= 1;
        block.shape[2].xCoord -= 1;
        block.shape[2].yCoord += 1;
        block.shape[3].xCoord += 1;
        block.shape[3].yCoord += 1;
      }
    },

    zShape: {
      0: function(obj){
        var block = obj.currentBlock;
        block.shape[0].xCoord += 2;
        block.shape[1].yCoord -= 2;
      },
      1: function(obj){
        var block = obj.currentBlock;
        block.shape[0].xCoord -= 2;
        block.shape[1].yCoord += 2;
      }
    },

    iShape: {
      0: function(obj){
          var block = obj.currentBlock;
          block.shape[0].xCoord += 2;
          block.shape[0].yCoord -= 2;
          block.shape[1].xCoord += 1;
          block.shape[1].yCoord -= 1;
          block.shape[3].xCoord -= 1;
          block.shape[3].yCoord += 1;
      },
      1: function(obj){
        var block = obj.currentBlock;
        block.shape[0].xCoord -= 2;
        block.shape[0].yCoord += 2;
        block.shape[1].xCoord -= 1;
        block.shape[1].yCoord += 1;
        block.shape[3].xCoord += 1;
        block.shape[3].yCoord -= 1;
      }
    },

    lShape: {
      0: function(obj) {
        var block = obj.currentBlock;
        block.shape[0].xCoord += 1 * block.dir;
        block.shape[0].yCoord -= 1 * block.dir;
        block.shape[2].xCoord -= 1 * block.dir;
        block.shape[2].yCoord += 1 * block.dir;
        block.shape[3].xCoord -= 2 * block.dir;
      },
      1: function(obj){
        var block = obj.currentBlock;
        block.shape[0].xCoord += 1 * block.dir;
        block.shape[0].yCoord += 1 * block.dir;
        block.shape[2].xCoord -= 1 * block.dir;
        block.shape[2].yCoord -= 1 * block.dir;
        block.shape[3].yCoord -= 2 * block.dir;
      },
      2: function(obj){
        var block = obj.currentBlock;
        block.shape[0].xCoord -= 1 * block.dir;
        block.shape[0].yCoord += 1 * block.dir;
        block.shape[2].xCoord += 1 * block.dir;
        block.shape[2].yCoord -= 1 * block.dir;
        block.shape[3].xCoord += 2 * block.dir;
      },
      3: function(obj){
        var block = obj.currentBlock;
        block.shape[0].xCoord -= 1 * block.dir;
        block.shape[0].yCoord -= 1 * block.dir;
        block.shape[2].xCoord += 1 * block.dir;
        block.shape[2].yCoord += 1 * block.dir;
        block.shape[3].yCoord += 2 * block.dir;
      }
    }
  }
};
