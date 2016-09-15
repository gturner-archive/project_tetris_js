var view = {
  init: function() {
    this.addKeyboardListner();
    this.newGameListener();
  },

  scoreDisplay: function(gameMod){
    var msg = "SCORE: " + gameMod.score;
    $('#score').text(msg);
  },

  render: function(blockCoords, grid, gameMod) {
    var width = grid.width;
    var height = grid.height;
    var gridArray = grid.gridArray;
    $('#grid').html('');
    for(var i = 0; i < height; i++){
      var $row = $('<div>').addClass('row');
      $('#grid').append($row);
      for(var j = 0; j < width; j++){
        var $block = $('<div>')
                    .addClass('block')
                    .attr('data-x', j)
                    .attr('data-y', i);
        for (var k = 0; k < blockCoords.length; k++) {
          if (j === blockCoords[k][0] && i === blockCoords[k][1]){
            $block.addClass('current-block');
          }
        }
        if (gridArray[j][i]) {
          $block.addClass('old-block');
        }
        $row.append($block);
      }
    }
    this.scoreDisplay(gameMod);
  },

  addKeyboardListner: function() {
    $(document).keydown(function(e) {
      var keycode = e.keyCode;
      controller.movePiece(keycode);
    });
  },

  newGameListener: function() {
    $(document).on('click', 'button', function(e) {
      $('button').fadeOut(1000);
      controller.newGame();
    });
  },

  gameOverMessage: function() {
    var $msg = $('<button>').addClass("msg");
    var $msgH2 = $('<h2>').text("Game Over");
    $msg.append($msgH2);
    var scoreLine = "score: ";
    var $scoreLine = $('h3').text(scoreLine);
    $msg.append($scoreLine);
    $('#grid').after($msg);
  }
};
