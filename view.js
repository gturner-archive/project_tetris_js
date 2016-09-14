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
        if (j === blockCoords[0] && i === blockCoords[1]){
          $block.addClass('current-block');
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
  }

};
