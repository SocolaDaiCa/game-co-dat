class AI {
    genWeights() {
        return {
            "1": { "1": 0, "4": 0, "7": 0 },
            "2": { "2": 0, "4": 0, "6": 0 },
            "3": { "3": 0, "4": 0, "5": 0 },
            "4": { "1": 0, "2": 0, "3": 0, "5": 0, "6": 0, "7": 0 },
            "5": { "3": 0, "4": 0, "5": 0 },
            "6": { "2": 0, "4": 0, "6": 0 },
            "7": { "1": 0, "4": 0, "7": 0 },
        };
    }
    constructor(deepLimit) {
        this.deepLimit = deepLimit;
        this.MIN = -10000000;
        this.MAX = 10000000;
    }
    put(_points, map, players, currentTurn) {
    	let weights = this.genWeights();
    	console.log('AI PUT run');
    	var points =  Object.assign({}, _points);
    	// var map    = Object.assign({}, _map);
    	for(let i in points) {
    		for(let j in points[i]) {
    			if(points[i][j] != 0) {
    				continue;
    			}
    			i = Number(i);
    			j = Number(j);
    			console.log(`check ${i} ${j}`);
    			for(let wi = -3; wi <= 3; wi++) {
    				for(let wj = -3; wj <= 3; wj++) {
    					if(!map.hasLine(
    						{rowIndex: i, colIndex: j},
    						{rowIndex: i + wi, colIndex: j + wj}
    					)) {
    						continue;
    					}
    					weights[i][j] += 50;
    				}
    			}
    		}
    	}
    	var maxWeight = 0;
    	console.log(weights);
    	var wi = 1, wj = 1;
        for(let i in points) {
    		for(let j in points[i]) {
    			i = Number(i);
    			j = Number(j);
    			if(maxWeight >= weights[i][j]) {
    				continue;
    			}
    			maxWeight = weights[i][j];
    			wi = Number(i), wj = Number(j);
    		}
    	}
    	points[wi][wj] = currentTurn;
    	return {
    		points
    	};
    }
    move(_points, _players, map, currentTurn) {
    	let points = {};
    	let players = {};
    	Object.assign(points, _points);
    	Object.assign(players, _players);
    	let weights = this.genWeights();
    	// select point to move
    	let maxWeight = {
    		i: 1,
    		j: 1,
    		value: 0
    	};
    	for(let i in points) {
    		for(let j in points[i]) {
    			if(points[i][j] != currentTurn) {
    				continue;
    			}
    			i = Number(i);
    			j = Number(j);
    			for(let wi = -3; wi <= 3; wi++) {
    				for(let wj = -3; wj <= 3; wj++) {
    					if(!map.hasLine(
    						{rowIndex: i, colIndex: j},
    						{rowIndex: i + wi, colIndex: j + wj}
    					)) {
    						continue
    					}
    					if(points[i + wi][j + wj]) {
    						continue;
    					}
    					weights[i][j] += 50;
    				}
    			}
    			if(maxWeight.value <= weights[i][j]) {
    				maxWeight.value = weights[i][j];
    				maxWeight.i = i;
    				maxWeight.j = j;
    			}
    		}
    	}
    	//  move to 
    	let to = {
    		value: 0,
    		i: 1, 
    		j:1,
    	};
    	weights = this.genWeights();
    	for(let i in points) {
    		for(let j in points[i]) {
    			if(points[i][j] != 0 || !map.hasLine(
    				{rowIndex: maxWeight.i, colIndex: maxWeight.j},
    				{rowIndex: i, colIndex: j }
    			)) {
    				continue;
    			}
    			i = Number(i);
    			j = Number(j);
    			for(let wi = -3; wi <= 3; wi++) {
    				for(let wj = -3; wj <= 3; wj ++) {
    					if(!map.hasLine(
    						{rowIndex: i, colIndex: j},
    						{rowIndex: i + wi, colIndex: j + wj}
    					)) {
    						continue;
    					}
    					if(points[i + wi][j + wj] != 0) {
    						console.log('zzz');
    						continue;
    					}
    					weights[i][j] += 50;
    				}
    			}
    			if (to.value <= weights[i][j]) {
    				to.value = weights[i][j];
    				to.i = i, to.j = j;
    			}
    		}
    	}
    	console.log(weights);
    	console.log(`AI move (${maxWeight.i}, ${maxWeight.j}) to (${to.i}, ${to.j})`);
	    	points[to.i][to.j] = currentTurn;
	    	points[maxWeight.i][maxWeight.j] = 0;
    	if(players[currentTurn].canEat(to.i, to.j, points, currentTurn)) {
    		let {points: points3} = this.eat(points, map, currentTurn);
    		points = points3;
    	}
    	return {points, players};
    }
    eat(_points, map, currentTurn) {
    	let points = {};
    	Object.assign(points, _points);
    	let weights = this.genWeights();
    	let maxWeight = {
    		value: 0,
    		i: 1,
    		j: 1
    	}
    	for(let i in points) {
    		for(let j in points[i]) {
    			if(points[i][j] != 3 - currentTurn) {
    				continue;
    			}
    			i = Number(i);
    			j = Number(j);
    			for(let wi = -3; wi <= 3; wi++) {
    				for(let wj = -3; wj <= 3; wj ++) {
    					if(!map.hasLine(
    						{rowIndex: i, colIndex: j},
    						{rowIndex: i + wi, colIndex: j + wj}
    					)) {
    						continue;
    					}
    					weights[i][j] += 50 * (points[i + wi][j + wj] == 0);
    					weights[i][j] += 75 * (points[i + wi][j + wj] == 3 - currentTurn);
    					weights[i][j] += 100 * (points[i + wi][j + wj] == currentTurn);
    				}
    			}
    			if(maxWeight.value <= weights[i][j]) {
    				maxWeight.value = weights[i][j];
    				maxWeight.i = i;
    				maxWeight.j = j;
    			}
    		}
    	}
    	console.log(`AI eat ${maxWeight.i} ${maxWeight.j}`);
    	points[maxWeight.i][maxWeight.j] = 0;
    	return {points};
    }
}
export default AI;