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
      for(var j = 0; j < this.gridArray[i].length; j++){
        this.gridArray[i][j] = false;
      }
    }
  },

  updateGrid: function(coords) {
    var dist = [];
    for(var j = 0; j < coords.length; j++){
      dist.push(this.checkBlockDrop(coords[j]));
    }
    var min_dist = this.minDistCollision(dist);
    for(var i =0; i < coords.length; i++){
      this.gridArray[coords[i][0]][min_dist + coords[i][1]] = true;
      this.checkRow([coords[i][0], min_dist + coords[i][1]]);
    }
  },

  checkBlockDrop: function(coord){
    var col = this.gridArray[coord[0]];
    for (var i = 0; i < gridModel.height; i++){
      if (!!col[i + 1] || i === 19){
        return i - coord[1];
      }
    }
  },

  minDistCollision: function(distances){
    var min = distances[0];
    for(var i = 1; i < distances.length; i++){
      if (distances[i] < min){
        min = distances[i];
      }
    }
    return min;
  },

  checkRow: function(coord){
    if(this.fullRow(coord[1])) {
      this.removeRow(coord[1]);
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
    controller.updateScore();
    controller.updateSpeed();
  }
};
