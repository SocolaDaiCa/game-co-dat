import Point from './Point.js';
class Line {
	constructor(point1, point2, color = 'black') {
		this.point1 = point1;
		this.point2 = point2;
		this.color  = color;
	}
	match(line) {
		if(this.point1.match(line.point1) && this.point2.match(line.point2)) {
			return true;
		}
		if(this.point1.match(line.point2) && this.point2.match(line.point1)) {
			return true;
		}
		return false;
	}
}
export default Line;