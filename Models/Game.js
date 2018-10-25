import Point from './Point.js';
import Line from './Line.js';
class Game {
	genPoints() {
		this.points = {
			
		};
	}
	genLines() {
		// this.lines = [];
		this.lines = [
		/* box ngoài */
		new Line(new Point(1, 1), new Point(1, 4)),
		new Line(new Point(1, 4), new Point(1, 7)),
		new Line(new Point(1, 7), new Point(4, 7)),
		new Line(new Point(4, 7), new Point(7, 7)),
		new Line(new Point(7, 7), new Point(7, 4)),
		new Line(new Point(7, 4), new Point(7, 1)),
		new Line(new Point(7, 1), new Point(4, 1)),
		new Line(new Point(4, 1), new Point(1, 1)),
		/* box trong */
		new Line(new Point(2, 2), new Point(2, 4)),
		new Line(new Point(2, 4), new Point(2, 6)),
		new Line(new Point(2, 6), new Point(4, 6)),
		new Line(new Point(4, 6), new Point(6, 6)),
		new Line(new Point(6, 6), new Point(6, 4)),
		new Line(new Point(6, 4), new Point(6, 2)),
		new Line(new Point(6, 2), new Point(4, 2)),
		new Line(new Point(4, 2), new Point(2, 2)),
		/* box trong */
		new Line(new Point(3, 3), new Point(3, 4)),
		new Line(new Point(3, 4), new Point(3, 5)),
		new Line(new Point(3, 5), new Point(4, 5)),
		new Line(new Point(4, 5), new Point(5, 5)),
		new Line(new Point(5, 5), new Point(5, 4)),
		new Line(new Point(5, 4), new Point(5, 3)),
		new Line(new Point(5, 3), new Point(4, 3)),
		new Line(new Point(4, 3), new Point(3, 3)),
		/* line chéo */
		new Line(new Point(2, 2), new Point(3, 3)),
		new Line(new Point(2, 6), new Point(3, 5)),
		new Line(new Point(6, 2), new Point(5, 3)),
		new Line(new Point(6, 6), new Point(5, 5)),
		/* line dọc */
		new Line(new Point(1, 4), new Point(2, 4)),
		new Line(new Point(2, 4), new Point(3, 4)),

		new Line(new Point(5, 4), new Point(6, 4)),
		new Line(new Point(6, 4), new Point(7, 4)),
		/* line ngang */
		new Line(new Point(4, 1), new Point(4, 2)),
		new Line(new Point(4, 2), new Point(4, 3)),

		new Line(new Point(4, 5), new Point(4, 6)),
		new Line(new Point(4, 6), new Point(4, 7)),
		];
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
		return true;
	}
	hasLine(point1, point2) {
		for(var i = 0; i < this.lines.length; i++) {
			if(this.lines[i].match({point1, point2})) {
				return true;
			}
		}
		return false;
	}
	
	// setLineColor
	changeLineColor({point1, point2, point3}) {
		if(!this.hasLine(point1, point2)) {
			console.log('line not exist');
			return;
		}
		if(!this.hasLine(point2, point3)) {
			console.log('line not exist');
			return;
		}
		this.setLineColor(point1, point2);
		this.setLineColor(poin2, point3);

		// if(!this.hasLine(point1, point2)) {
		// 	[point1, point2] = [point2, point1];
		// }
		// if(!this.hasLine(point1, point2)) {
		// 	console.log('line not exit');
		// }
		// for(var i = 0; i < this.lines.length; i++) {
		// 	var currentLine = this.lines[i];
		// 	var isMatch = false;
		// 	if (currentLine.point1.match(line.point1) && currentLine.point1.match(line.point1)) {
		// 		isMatch = true;
		// 	}
		// 	if (currentLine.point1.match(line.point2) && currentLine.point2.match(line.point1)) {
		// 		isMatch = true;
		// 	}
		// 	if(!isMatch) {
		// 		continue;
		// 	}
		// 	if ((currentLine.point1.rowIndex == line.point1.rowIndex && currentLine.point2.rowIndex == line.point2.rowIndex && currentLine.point1.colIndex == line.point1.colIndex && currentLine.point2.colIndex == line.point2.colIndex) || (currentLine.point2.rowIndex == line.point1.rowIndex && currentLine.point1.rowIndex == line.point2.rowIndex && currentLine.point2.colIndex == line.point1.colIndex && currentLine.point1.colIndex == line.point2.colIndex)) {
		// 		this.lines[i].color = line.color;
		// 		console.log(this.lines[i]);
		// 		console.log('vào');
		// 		break;
		// 	}
		// }
		// this.drawMap();
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
	}
	isPointFree({rowIndex, colIndex}) {
		return this.points[rowIndex][colIndex].player == 0;
	}
};
export default Game;