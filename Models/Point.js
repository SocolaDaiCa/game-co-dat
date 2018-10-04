class Point {
	constructor(rowIndex = null, colIndex = null) {
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		this.player   = 0;
		this.canGo    = false;
	}
	match(point) {
		if(this.rowIndex != point.rowIndex) {
			return false;
		}
		if(this.colIndex != point.colIndex) {
			return false;
		}
		return true;
	}
	setIndex(rowIndex, colIndex) {
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
	}
	setPlayer(player) {
		this.player = player;
	}
	isFree() {
		return this.player == 0;
	}
	clearPlayer() {
		this.player = 0;
	}
}
export default Point;