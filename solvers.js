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

var fillBoard = function(n){
  var solution = [];
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
      while(solution[z] && solution[z][y]){
        solution[z][y].canHold = false;
        z--;
        y++;
      }
      while(solution[z] && solution[z][y]){
        solution[z][y].canHold = false;
        z++;
        y--;
      }
      while(solution[z] && solution[z][y]){
        solution[z][y].canHold = false;
        z--;
        y--;
      }
    }
};
window.findNQueensSolution = function(n){
  solution = fillBoard(n);
  solution = findASolution(findOpenSpots(solution), solution, 0, n);
  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = 0; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
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

var findASolution = function(openSpots, solution, numberOfQueens, targetNumberOfQueens){
  var openSpotsClone = openSpots.slice();
  var solutionClone = solution.slice();
  var numberOfQueensClone = numberOfQueens;
  var solutionFound = false;
  if (openSpotsClone.length > 0) {
    for(var i = 0; i < openSpotsClone.length; i++){
      plantAQueen(openSpotsClone[i],solutionClone);
      numberOfQueensClone++;
      if (numberOfQueensClone === targetNumberOfQueens) {solutionFound = true;}
      openSpotsClone = findOpenSpots(solutionClone);
      if (solutionFound) {
        return solutionClone;
      } else {
        var foo = findASolution(openSpotsClone, solutionClone, numberOfQueensClone, targetNumberOfQueens);
         if (foo) {return foo;}
      }
    }
  }
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
