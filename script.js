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
  }
};

var view = {
  render: function(width, height, blockCoords) {
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

  }
};

var controller = {
  init: function() {
    gridModel.init();
    gameModel.init();
  },
  gameLoop: function(){
    view.render(gridModel.width, gridModel.height, gameModel.getCoords());
  }
}

$(document).ready( function() {
  controller.init();
  controller.gameLoop();
});
