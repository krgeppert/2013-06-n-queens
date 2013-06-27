var makeRemainingSpots = function(n){
  var solution = {};
  for (var i = 0; i < (n*n); i++){
    solution[i] = undefined;
  }
  return solution;
};
window.countNQueensSolutions = function(n){
  console.log('Number of solutions for ' + n + ' queens:', Object.keys(searchForTheSolutions(makeRemainingSpots(n), n)).length);
};
var searchForTheSolutions = function(allSpots, n){
  var solutions = {};
  var recurse = function(count, openSpots, queenPlacements){
    if (count === n) {
      queenPlacements.sort();
      if (!solutions[String(queenPlacements)]) {
        solutions[String(queenPlacements)] = undefined;
      }
    }
    var queenPlacementsClone,openSpotsClone,countClone;
    for (var i = 0; i < Object.keys(openSpots).length; i++){
      countClone = count;
      openSpotsClone = {};
      for (var key in openSpots){
        openSpotsClone[key] = undefined;
      }
      queenPlacementsClone = queenPlacements.slice();
      plantAQueen(i, n, openSpotsClone);
      queenPlacementsClone.push(i);
      countClone++;
      recurse(countClone, openSpotsClone, queenPlacementsClone);
    }
  };
  recurse(0, allSpots, []);
  return solutions;
};
var plantAQueen = function (index,n,remainingSpots){
  var board = n * n;
  var columnIndex = index % n;
  for (var i =columnIndex; i < board; i += n){
    delete remainingSpots[i];
  }
  var rowIndex = index - columnIndex;
  for (i = rowIndex; i < n; i++){
    delete remainingSpots[i];
  }
  i = index;
  while (i < board){
    delete remainingSpots[i];
    if (i % n === (n-1)) { i += board;}
    i += (n+1);
  }
  i = index;
  while (i > board){
    delete remainingSpots[i];
    if (i % n === 0) { i -= board;}
    i -= (n+1);
  }
  i = index;
  while (i < board){
    delete remainingSpots[i];
    if (i % n === 0) { i+=board;}
    i += (n-1);
  }
  i = index;
  while (i > board){
    delete remainingSpots[i];
    if (i % n === (n-1)) { i-=board;}
    i -= (n-1);
  }
  return remainingSpots;
};