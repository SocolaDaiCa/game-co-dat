class Point {
	constructor(rowIndex, colIndex) {
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
	}
	match(point) {

	}
}
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
		{point1: new Point(1, 1), point2: new Point(1, 4)},
		{point1: new Point(1, 4), point2: new Point(1, 7)},
		{point1: new Point(1, 7), point2: new Point(4, 7)},
		{point1: new Point(4, 7), point2: new Point(7, 7)},
		{point1: new Point(7, 7), point2: new Point(7, 4)},
		{point1: new Point(7, 4), point2: new Point(7, 1)},
		{point1: new Point(7, 1), point2: new Point(4, 1)},
		{point1: new Point(4, 1), point2: new Point(1, 1)},
		/* box trong */
		{point1: new Point(2, 2), point2: new Point(2, 4)},
		{point1: new Point(2, 4), point2: new Point(2, 6)},
		{point1: new Point(2, 6), point2: new Point(4, 6)},
		{point1: new Point(4, 6), point2: new Point(6, 6)},
		{point1: new Point(6, 6), point2: new Point(6, 4)},
		{point1: new Point(6, 4), point2: new Point(6, 2)},
		{point1: new Point(6, 2), point2: new Point(4, 2)},
		{point1: new Point(4, 2), point2: new Point(2, 2)},
		/* box trong */
		{point1: new Point(3, 3), point2: new Point(3, 4)},
		{point1: new Point(3, 4), point2: new Point(3, 5)},
		{point1: new Point(3, 5), point2: new Point(4, 5)},
		{point1: new Point(4, 5), point2: new Point(5, 5)},
		{point1: new Point(5, 5), point2: new Point(5, 4)},
		{point1: new Point(5, 4), point2: new Point(5, 3)},
		{point1: new Point(5, 3), point2: new Point(4, 3)},
		{point1: new Point(4, 3), point2: new Point(3, 3)},
		/* line chéo */
		{point1: new Point(2, 2), point2: new Point(3, 3)},
		{point1: new Point(2, 6), point2: new Point(3, 5)},
		{point1: new Point(6, 2), point2: new Point(5, 3)},
		{point1: new Point(6, 6), point2: new Point(5, 5)},
		/* line dọc */
		{point1: new Point(1, 4), point2: new Point(2, 4)},
		{point1: new Point(2, 4), point2: new Point(3, 4)},

		{point1: new Point(5, 4), point2: new Point(6, 4)},
		{point1: new Point(6, 4), point2: new Point(7, 4)},
		/* line ngang */
		{point1: new Point(4, 1), point2: new Point(4, 2)},
		{point1: new Point(4, 2), point2: new Point(4, 3)},

		{point1: new Point(4, 5), point2: new Point(4, 6)},
		{point1: new Point(4, 6), point2: new Point(4, 7)},
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
	matchPoint(point1, point2) {
		if(point1.rowIndex != point2.rowIndex) {
			console.log({point1, point2, match: false});
			return false;
		}
		if(point1.colIndex != point2.colIndex) {
			console.log({point1, point2, match: false});
			return false;
		}
		console.log({point1, point2, match: true});
		return true;
	}
	hasLine(point1, point2) {
		for(var i = 0; i < this.lines.length; i++) {
			if(this.matchPoint(this.lines[i].point1, point1) && this.matchPoint(this.lines[i].point2, point2)) {
				return true;
			}
			if(this.matchPoint(this.lines[i].point1, point2) && this.matchPoint(this.lines[i].point2, point1)) {
				return true;
			}
		}
		return false;
	}
	drawLine({point1, point2, color}) {
		this.ctx.beginPath();
		this.ctx.strokeStyle = color || '#000000';

		this.ctx.moveTo(
			this.convertIndexToLength(point1.colIndex),
			this.convertIndexToLength(point1.rowIndex)
			);
		this.ctx.lineTo(
			this.convertIndexToLength(point2.colIndex),
			this.convertIndexToLength(point2.rowIndex),
			);
		this.ctx.stroke();
		this.ctx.closePath();
	}
	drawMap() {
		this.ctx.clearRect(0, 0, this.size, this.size);
		this.lines.forEach((line) => {
			this.drawLine(line);
		});
	}
	changeLineColor(line) {
		for(var i = 0; i < this.lines.length; i++) {
			var currentLine = this.lines[i];
			if ((currentLine.point1.rowIndex == line.point1.rowIndex && currentLine.point2.rowIndex == line.point2.rowIndex && currentLine.point1.colIndex == line.point1.colIndex && currentLine.point2.colIndex == line.point2.colIndex) || (currentLine.point2.rowIndex == line.point1.rowIndex && currentLine.point1.rowIndex == line.point2.rowIndex && currentLine.point2.colIndex == line.point1.colIndex && currentLine.point1.colIndex == line.point2.colIndex)) {
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
			if(pointInPoints.rowIndex == point.rowIndex && pointInPoints.colIndex == point.colIndex) {
				return;
			}
		}
		this.points.push(point);
		this.drawMap();
	}
	ownerOfPoint({rowIndex, colIndex}) {
		return this.points[rowIndex][colIndex].player;
	}
	movePoint(oldPoint, newPoint) {
		if(!this.isPointFree(newPoint)) {
			return;
		}
		var player = this.points[oldPoint.rowIndex][oldPoint.colIndex].player;
		this.points[newPoint.rowIndex][newPoint.colIndex].player = player;
		this.points[oldPoint.rowIndex][oldPoint.colIndex].player = 0;
	// this.drawMap();
}
isPointFree({rowIndex, colIndex}) {
	return this.points[rowIndex][colIndex].player == 0;
}
};	

var game, play1, play2;
var app;
document.addEventListener('DOMContentLoaded', function () {
	game = new Game("game_box", 480);
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
			limitPoints: 18,
		},
		created: function () {

		},
		methods: {
			step1({rowIndex, colIndex}) {
				if(this.game.isPointFree({rowIndex, colIndex}) || true) {
					this.game.setPoint(rowIndex, colIndex, this.currentTurn);
					this.swapTurn();
					this.pointsSetted++;
				}
				if(this.pointsSetted == this.limitPoints) {
					this.step = 2;
				}
			},
			swapTurn() {
				this.currentTurn = 3 - this.currentTurn;
			},
			resetState() {
				this.preState.rowIndex = null;
				this.preState.colIndex = null;

				this.nextState.rowIndex = null;
				this.nextState.colIndex = null;
			},
			step2({rowIndex, colIndex}) {
				if(this.preState.rowIndex == null) {
					if(this.game.isPointFree({rowIndex, colIndex})) {
						this.resetState();
						return;
					}
					if(this.game.ownerOfPoint({rowIndex, colIndex}) != this.currentTurn) {
						this.resetState();
						return;
					}
					this.preState.rowIndex = rowIndex;
					this.preState.colIndex = colIndex;
					return;
				}
				this.nextState.rowIndex = rowIndex;
				this.nextState.colIndex = colIndex;

				console.log(this.game.hasLine(this.preState, this.nextState));
				if(!this.game.isPointFree(this.preState) && this.game.isPointFree(this.nextState) && this.game.ownerOfPoint(this.preState) == this.currentTurn && this.game.hasLine(this.preState, this.nextState)) {
					this.game.movePoint(this.preState, this.nextState);
					this.swapTurn();
				}
				setTimeout(() => {
					this.resetState();
				}, 1000);
			},
			clickPoint(rowIndex, colIndex) {
				console.log({rowIndex, colIndex});
				switch(this.step) {
					case 1: this.step1({rowIndex, colIndex}); break;
					case 2: this.step2({rowIndex, colIndex}); break;
					default: break;
				}
			}
		}
	});
});