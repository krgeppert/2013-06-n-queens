// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = [];
  console.log('Single solution for ' + n + ' rooks:', solution);
  for (var i=0;i<n;i++){
    solution.push([]);
    for(var j = 0; j < n; j++){
       if (j === i) { solution[i][j] = 1;}
       else { solution[i][j] = 0;}
    }
  }
  return solution;
};
window.countNRooksSolutions = function(n){
  var solutionCount = 2;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

var makeBoard = function(n){
  solution = [];
  for (var i = 0; i < n; i++){
    solution.push([]);
    for (var j = 0; j < n; j++){
      solution[i].push(new Spot());
    }
  }
  return solution;
};
var plantAQueen = function(cords,solution){
  i = cords[0];
  j = cords[1];
  n = solution.length;
    if (solution[i][j].canHold) {
      solution[i][j].hasQueen = true;
      for (var s = 0; s < n; s++){
        solution[s][j].canHold = false;
      }
      for (var t = 0; t < n; t++){
        solution[i][t].canHold = false;
      }
      var z = i;
      var y = j;
      while(solution[z] && solution[z][y]){
        solution[z][y].canHold = false;
        z++;
        y++;
      }
      z = i;
      y = j;
      while(solution[z] && solution[z][y]){
        solution[z][y].canHold = false;
        z--;
        y++;
      }
      z = i;
      y = j;
      while(solution[z] && solution[z][y]){
        solution[z][y].canHold = false;
        z++;
        y--;
      }
      z = i;
      y = j;
      while(solution[z] && solution[z][y]){
        solution[z][y].canHold = false;
        z--;
        y--;
      }
    }
};
window.findNQueensSolution = function(n){
  // var solution = makeBoard(n);
  // var startingPoints = findOpenSpots(solution);
  // for (var i = 0; i < startingPoints.length; i++){
  //   solution = makeBoard(n);
  //   results = searchForTheSolutions(startingPoints[i], solution);
  //   if (results) {console.log('Single solution for solutions for ' + n + ' queens:', results); return results;}
  // }
};

window.countNQueensSolutions = function(n){
  var board = makeBoard(n);
  var memory = {};
  var someResults = searchForTheSolutions(board);
  console.log(someResults);
    _.each(someResults, function(value){
      memory[JSON.stringify(value)] = value;
    });
  var solutionCount = _.size(memory);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};

var Spot = function(){
  this.hasQueen = false;
  this.canHold = true;
};

var searchForTheSolutions = function(boardy){
  var solutions = [];
  var recurse = function(board, count, openSpots){
    if (count === board.length){
      solutions.push(board);
    }
    var boardClone = [];
    var countClone;
    for (var i = 0; i < openSpots.length; i++){
      for (var k =0; k < board.length; k++){
        boardClone[k] = [];
        for (var j = 0; j< board.length; j++){
          boardClone[k][j] = new Spot();
          boardClone[k][j].hasQueen = board[k][j].hasQueen;
          boardClone[k][j].canHold = board[k][j].canHold;
        }
      }
      countClone = count;
      plantAQueen(openSpots[i], boardClone);
      countClone++;
      recurse(boardClone,countClone, findOpenSpots(boardClone));
    }
  };
  recurse(boardy,0,findOpenSpots(boardy));
  return solutions;
};

var findOpenSpots = function(board){
  var results = [];
  for(var i = 0; i < board.length; i++){
    for (var j = 0; j <board[0].length; j++){
      if (board[i][j].canHold) { results.push([i,j]);}
    }
  }
  return results;
};


// for all of the starting places
// place a queen.
//   for all of the possible spots
//   place a queen
//     ...
//     if no possible spots, return false.
//     if number of queens met, return solution.
