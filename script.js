// Model
// Array of objects: Piece object contains array of block objects
// Block object: X and Y coordinates (match the div data attrs?)
// Piece.prototype - function for rotating

// Render
//   div grid
//   max-wdith x max-hieght
//   block renderer method


$(document).ready( function() {
  controller.init();
  controller.gameLoop();
});
