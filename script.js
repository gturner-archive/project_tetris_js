// Model
// Array of objects: Piece object contains array of block objects
// Block object: X and Y coordinates
// Piece.prototype - function for rotating

function Block(x, y) {
  var this.xCoord = x,
      this.yCoord = y;
};

var gridModel = {
  init: function() {
    this.gridArray = new Array(20);
    this.buildGrid();
  },

  buildGrid = function() {
    for (var i = 0; i < this.gridArray.length; i++) {
      this.gridArray[i] = new Array(10);
    }
  }
};

var gameModel = {

};