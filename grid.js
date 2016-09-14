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


  //LOOKING FOR FIRST
  updateGrid: function(coords) {
    for (var j = 0; j < coords.length; j++) {
      var col = this.gridArray[coords[j][0]];
      for (var i = 0; i < col.length; i++){
        if (!!col[i+1] || i === 19) {
          var diff = i - coords[j][1];
          for (var k = 0; k < coords.length; k++) {
            console.log(this.gridArray[coords[k][0]][diff + coords[k][1]]);
            this.gridArray[coords[k][0]][diff + coords[k][1]] = true;
            this.checkRow([coords[k][0], diff + coords[k][1]]);
          }
          return;
        }
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
