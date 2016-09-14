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
        this.checkRow([coords[0],i]);
        return;
      }
    }
  },

  checkRow: function(coord){
    if(this.fullRow(coord[1])) {
      this.removeRow(coord[1])
    }
  },

  fullRow: function(y){
    for(var j = 0; j < this.width; j++ ){
      if(!this.gridArray[j][y]){
        return false;
      }
    }
    return true;
  },

  removeRow: function(rowNum){
    for(var k = this.width - 1; k >= 0; k--){
      var ele = this.gridArray[k].splice(rowNum, 1);
      this.gridArray[k].unshift(undefined);
    }
  }
};
