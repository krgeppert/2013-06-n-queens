// make a board.
// make n unique rows
// for all the combinations of the rows, check to see if they could work.
var countNQueensSolutions = function(n){
	var rows = _.range(n);
	var solutions = [];
	var board = n * n;
	var recurse = function(prefix, placements, mahashmap,minhashmap,colhashmap){
		if (placements.length !== 0){
			for (var i = 0; i < placements.length; i++){
				var mahashMapClone = {};
				var minhashMapClone = {};
				var colhashMapClone = {};
				_.each(mahashmap,function(value,key){
					mahashMapClone[parseInt(key)+1] = true;
				});
				_.each(minhashmap,function(value,key){
					minhashMapClone[parseInt(key)-1] = true;
				});
				_.each(colhashmap,function(value,key){
					colhashMapClone[key] = true;
				});
				var prefixClone = prefix.slice();
				var placementsClone = placements.slice();
				if (!mahashmap[placements[i]] && !minhashmap[placements[i]] && !colhashmap[placements[i]]) {
					prefixClone.push(placements[i]);
					mahashMapClone[parseInt(placements[i])+1] = true;
					minhashMapClone[parseInt(placements[i])-1] = true;
					colhashMapClone[placements[i]] = true;
					placementsClone.splice(i, 1);
					recurse(prefixClone, placementsClone,mahashMapClone,minhashMapClone,colhashMapClone);
				}
			}
		} else {
			solutions.push(prefix);
		}
	};
	recurse([], rows, {},{},{});
	console.log(solutions);
	return solutions;
};
