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
  // each block goes into a search array for last space avail
  // take difference
  // maximum, beocmes difference
  // each peiece placed by the difference


  updateGrid: function(coords) {
    // for (var i = 0; i < gridModel.height; i++){
    //   for (var j = 0; j < coords.length; j++) {
    //     var col = this.gridArray[coords[j][0]];
    //     if (!!col[i+1] || i === 19) {
    //       var diff = i - coords[j][1];
    //       for (var k = 0; k < coords.length; k++) {
    //         this.gridArray[coords[k][0]][diff + coords[k][1]] = true;
    //         console.log(this.gridArray[coords[k][0]][diff + coords[k][1]]);
    //         this.checkRow([coords[k][0], diff + coords[k][1]]);
    //       }
    //       return;
    //     }
    //   }
    // }
    // console.log(coords);
    var dist = [];
    for(var i = 0; i < coords.length; i++){
      dist.push(this.checkBlockDrop(coords[i]));
    }
    console.log(dist)
    var min_dist = this.minDistCollision(dist);
    console.log(min_dist);
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
      // console.log(distances[i]);
      if (distances[i] < min){
        min = distances[i];
      }
    }
    // console.log(min);
    return min;
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
