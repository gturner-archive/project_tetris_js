// Model
// Array of objects: Piece object contains array of block objects
// Block object: X and Y coordinates (match the div data attrs?)
// Piece.prototype - function for rotating

// Render
//   div grid
//   max-wdith x max-hieght
//   block renderer method

function Block(x, y) {
  this.xCoord = x;
  this.yCoord = y;
};

var gridModel = {
  width: 10,
  height: 20,

  init: function() {
    this.gridArray = new Array(this.width);
    this.buildGrid();
  },

  buildGrid: function() {
    for (var i = 0; i < this.gridArray.length; i++) {
      this.gridArray[i] = new Array(this.height);
    }
  },

  updateGrid: function(coords) {
    var col = this.gridArray[coords[0]];
    for (var i = col.length - 1; i >= 0; i--) {
      if (!col[i]) {
        col[i] = true;
        return;
      }
    }
  }
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

  updateGame: function() {
    gameModel.currentBlock.yCoord += 1;
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

var view = {
  init: function() {
    this.addKeyboardListner();
  },

  render: function(width, height, blockCoords, grid) {
    $('#grid').html('');
    for(var i = 0; i < height; i++){
      var $row = $('<div>').addClass('row');
      $('#grid').append($row);
      for(var j = 0; j < width; j++){
        var $block = $('<div>')
                    .addClass('block')
                    .attr('data-x', j)
                    .attr('data-y', i);
        if (j === blockCoords[0] && i === blockCoords[1]){
          $block.addClass('current-block');
        }
        $row.append($block);
      }
    }
  },

  addKeyboardListner: function() {
    $(document).keydown(function(e) {
      var keycode = e.keyCode;
      controller.movePiece(keycode);
    });
  }

};

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
        gameModel.updateGame();
      }
      loop++;
    }, 1000);
  },

  movePiece: function(keycode) {
    var coords = gameModel.updatePieceCoords(keycode);
    if (!!coords) {
      gridModel.updateGrid(coords);
    }
  }

}

$(document).ready( function() {
  controller.init();
  controller.gameLoop();
});
