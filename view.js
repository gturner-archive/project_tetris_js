var view = {
  init: function() {
    this.addKeyboardListner();
  },

  render: function(width, height, blockCoords, gridArray) {
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
  },

  addKeyboardListner: function() {
    $(document).keydown(function(e) {
      var keycode = e.keyCode;
      controller.movePiece(keycode);
    });
  },

  gameOverMessage: function() {
    var $msg = $('<div>').addClass("msg");
    var $msgH2 = $('<h2>').text("Game Over");
    $msg.append($msgH2);
    var scoreLine = "score: ";
    var $scoreLine = $('h3').text(scoreLine);
    $msg.append($scoreLine);
    $('#grid').after($msg);
  }
};
