gameModel.rotate= function(block){
  var typo = block.getType(),
      that = this;
  if(typo === 'iShape' || typo === 'zShape' || typo === 'zLeftShape'){
    gameModel.rotations[typo][gameModel.currentBlock.rotations % 2](that);
  }
  else if(typo === 'lShape' || typo === 'tShape' || typo === 'lLeftShape'){
    gameModel.rotations[typo][gameModel.currentBlock.rotations % 4](that);
  }

  block.rotations += 1;
};

gameModel.rotations = {
  zLeftShape: {
    0: function(obj){
      var block = obj.currentBlock;
      block.shape[1].xCoord -= 2;
      block.shape[2].yCoord += 2;
    },
    1: function(obj){
      var block = obj.currentBlock;
      block.shape[1].xCoord += 2;
      block.shape[2].yCoord -= 2;
    }
  },
  lLeftShape: {
    0: function(obj){
      var block = obj.currentBlock;
      block.shape[3].yCoord -= 2;
      block.shape[0].xCoord += 1;
      block.shape[0].yCoord -= 1;
      block.shape[2].xCoord -= 1;
      block.shape[2].yCoord += 1;
    },
    1: function(obj){
      var block = obj.currentBlock;
      block.shape[3].xCoord += 2;
      block.shape[0].xCoord += 1;
      block.shape[0].yCoord += 1;
      block.shape[2].xCoord -= 1;
      block.shape[2].yCoord -= 1;
    },
    2: function(obj){
      var block = obj.currentBlock;
      block.shape[3].yCoord += 2;
      block.shape[0].xCoord -= 1;
      block.shape[0].yCoord += 1;
      block.shape[2].xCoord += 1;
      block.shape[2].yCoord -= 1;
    },
    3: function(obj){
      var block = obj.currentBlock;
      block.shape[3].xCoord -= 2;
      block.shape[0].xCoord -= 1;
      block.shape[0].yCoord -= 1;
      block.shape[2].xCoord += 1;
      block.shape[2].yCoord += 1;
    }
  },

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
      block.shape[0].xCoord += 1;
      block.shape[0].yCoord -= 1;
      block.shape[2].xCoord -= 1;
      block.shape[2].yCoord += 1;
      block.shape[3].xCoord -= 2;
    },
    1: function(obj){
      var block = obj.currentBlock;
      block.shape[0].xCoord += 1;
      block.shape[0].yCoord += 1;
      block.shape[2].xCoord -= 1;
      block.shape[2].yCoord -= 1;
      block.shape[3].yCoord -= 2;
    },
    2: function(obj){
      var block = obj.currentBlock;
      block.shape[0].xCoord -= 1;
      block.shape[0].yCoord += 1;
      block.shape[2].xCoord += 1;
      block.shape[2].yCoord -= 1;
      block.shape[3].xCoord += 2;
    },
    3: function(obj){
      var block = obj.currentBlock;
      block.shape[0].xCoord -= 1;
      block.shape[0].yCoord -= 1;
      block.shape[2].xCoord += 1;
      block.shape[2].yCoord += 1;
      block.shape[3].yCoord += 2;
    }
  }
};
