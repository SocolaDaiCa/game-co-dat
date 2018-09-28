class Game {
	genPoints() {
		this.points = {
			"1": {
				"1": {player: 0},
				"4": {player: 0},
				"7": {player: 0},
			},
			"2": {
				"2": {player: 0},
				"4": {player: 0},
				"6": {player: 0},
			},
			"3": {
				"3": {player: 0},
				"4": {player: 0},
				"5": {player: 0},
			},
			"4": {
				"1": {player: 0},
				"2": {player: 0},
				"3": {player: 0},
				"5": {player: 0},
				"6": {player: 0},
				"7": {player: 0},
			},
			"5": {
				"3": {player: 0},
				"4": {player: 0},
				"5": {player: 0},
			},
			"6": {
				"2": {player: 0},
				"4": {player: 0},
				"6": {player: 0},
			},
			"7": {
				"1": {player: 0},
				"4": {player: 0},
				"7": {player: 0},
			},
		};
	}
	genLines() {
		// this.lines = [];
		this.lines = [
		/* box ngoài */
		{ point1: { row: 1, col: 1}, point2: { row: 1, col: 7}, color: null},
		{ point1: { row: 1, col: 7}, point2: { row: 7, col: 7}, color: null},
		{ point1: { row: 7, col: 7}, point2: { row: 7, col: 1}, color: null},
		{ point1: { row: 7, col: 1}, point2: { row: 1, col: 1}, color: null},
		/* box trong */
		{ point1: { row: 2, col: 2}, point2: { row: 2, col: 6}, color: null},
		{ point1: { row: 2, col: 6}, point2: { row: 6, col: 6}, color: null},
		{ point1: { row: 6, col: 6}, point2: { row: 6, col: 2}, color: null},
		{ point1: { row: 6, col: 2}, point2: { row: 2, col: 2}, color: null},
		/* box trong */
		{ point1: { row: 3, col: 3}, point2: { row: 3, col: 5}, color: null},
		{ point1: { row: 3, col: 5}, point2: { row: 5, col: 5}, color: null},
		{ point1: { row: 5, col: 5}, point2: { row: 5, col: 3}, color: null},
		{ point1: { row: 5, col: 3}, point2: { row: 3, col: 3}, color: null},
		/* line chéo */
		{ point1: { row: 2, col: 2}, point2: { row: 3, col: 3}, color: null},
		{ point1: { row: 3, col: 5}, point2: { row: 2, col: 6}, color: null},
		{ point1: { row: 6, col: 2}, point2: { row: 5, col: 3}, color: null},
		{ point1: { row: 5, col: 5}, point2: { row: 6, col: 6}, color: null},
		/* line dọc ngang */
		{ point1: { row: 4, col: 1}, point2: { row: 4, col: 3}, color: null},
		{ point1: { row: 1, col: 4}, point2: { row: 3, col: 4}, color: null},
		{ point1: { row: 4, col: 5}, point2: { row: 4, col: 7}, color: null},
		{ point1: { row: 5, col: 4}, point2: { row: 7, col: 4}, color: null}
		];
	}

	constructor(id, size) {
		this.genPoints();
		this.genLines();
		this.size = size;
		this.canvas = document.getElementById(id);
		this.canvas.width = this.canvas.height = size + 50;
		this.ctx = this.canvas.getContext("2d");
	}
	setPoint(rowIndex, colIndex, player) {
		this.points[rowIndex][colIndex].player = player;
	}
	convertIndexToLength(index) {
		return (index - 1) * this.size / 6 + 25;
	}
	hasLine(point1, point2) {
		for(var i = 0; i < this.lines.length; i++) {
			var line = this.lines[i];
			if(line.point1.row == point1.rowIndex &&
				line.point2.row == point2.rowIndex && 
				line.point1.col == point1.colIndex && 
				line.point2.col == point2.colIndex
				) {
				return true;
		}
		if(line.point2.row == point1.rowIndex &&
			line.point1.row == point2.rowIndex && 
			line.point2.col == point1.colIndex && 
			line.point1.col == point2.colIndex
			) {
			return true;
	}
}
return false;
}
drawLine({point1, point2, color}) {
	this.ctx.beginPath();
	this.ctx.strokeStyle = color || '#000000';

	this.ctx.moveTo(
		this.convertIndexToLength(point1.col),
		this.convertIndexToLength(point1.row)
		);
	this.ctx.lineTo(
		this.convertIndexToLength(point2.col),
		this.convertIndexToLength(point2.row),
		);
	this.ctx.stroke();
	this.ctx.closePath();
}
drawMap() {
	this.ctx.clearRect(0, 0, this.size, this.size);
	this.lines.forEach((line) => {
		this.drawLine(line);
	});
	for(var rowIndex in this.points) {
		for(var colIndex in this.points[rowIndex]) {
			this.drawPoint({
				col: colIndex,
				rol: rowIndex,
				color: '#000'
			});
		}
	}
}
changeLineColor(line) {
	for(var i = 0; i < this.lines.length; i++) {
		var currentLine = this.lines[i];
		if ((currentLine.point1.row == line.point1.row && currentLine.point2.row == line.point2.row && currentLine.point1.col == line.point1.col && currentLine.point2.col == line.point2.col) || (currentLine.point2.row == line.point1.row && currentLine.point1.row == line.point2.row && currentLine.point2.col == line.point1.col && currentLine.point1.col == line.point2.col)) {
			this.lines[i].color = line.color;
			console.log(this.lines[i]);
			console.log('vào');
			break;
		}
	}
	this.drawMap();
	console.log(this.lines);
}
addPoint(point) {
	for(var pointInPoints in this.points) {
		if(pointInPoints.row == point.row && pointInPoints.col == point.col) {
			return;
		}
	}
	this.points.push(point);
	this.drawMap();
}
movePoint(oldPoint, newPoint) {
	if(!this.isPointFree(newPoint)) {
		return;
	}
	// if(!this.hasLine(oldPoint, newPoint)) {
	// 	return;
	// }
	var player = this.points[oldPoint.rowIndex][oldPoint.colIndex].player;
	this.points[newPoint.rowIndex][newPoint.colIndex].player = player;
	this.points[oldPoint.rowIndex][oldPoint.colIndex].player = 0;
	this.drawMap();
}
drawPoint(point) {
	this.ctx.beginPath();
	this.ctx.arc(
		this.convertIndexToLength(point.col),
		this.convertIndexToLength(point.row),
		20,
		0,
		2 * Math.PI,
		false
		);
	this.ctx.fillStyle = point.color;
	this.ctx.fill();
	this.ctx.lineWidth = 1;
	this.ctx.stroke();
	this.ctx.closePath();
}
isPointFree({rowIndex, colIndex}) {
	return this.points[rowIndex][colIndex].player == 0;
}
};	

var game, play1, play2;
var app;
document.addEventListener('DOMContentLoaded', function () {
	game = new Game("game_box", 540);
	play1 = new Game('play1_box', 140);
	play2 = new Game('play2_box', 140);
	game.drawMap();
	play1.drawMap();
	play2.drawMap();
	app = new Vue({
		el: "#app",
		data: {
			game,
			currentTurn: 1,
			step: 1,
			pointsSetted: 0,
			preState: {
				rowIndex: null,
				colIndex: null,
			},
			nextState: {
				rowIndex: null,
				colIndex: null,
			},
			limitPoints: 2,
		},
		created: function () {

		},
		methods: {
			clickPoint(rowIndex, colIndex) {
				console.log({rowIndex, colIndex});
				if(this.pointsSetted == this.limitPoints) {
					this.step = 2;
				}
				if(this.step == 1 && this.pointsSetted < this.limitPoints && this.game.isPointFree({rowIndex, colIndex})) {
					this.game.setPoint(rowIndex, colIndex, this.currentTurn);
					this.currentTurn = 3 - this.currentTurn;
					this.pointsSetted++;
					return;
				}
				if(this.step != 2 ) {
					return;
				}
				if(this.preState.rowIndex == null) {
					this.preState.rowIndex = rowIndex;
					this.preState.colIndex = colIndex;
					return;
				}
				this.nextState.rowIndex = rowIndex;
				this.nextState.colIndex = colIndex;
				
				// if(this.game.hasLine(this.preState, this.nextState)) {
					this.game.movePoint(this.preState, this.nextState);
				// }
				this.preState.rowIndex = null;
				this.preState.colIndex = null;

				this.nextState.rowIndex = null;
				this.nextState.colIndex = null;
			}
		}
	});
});