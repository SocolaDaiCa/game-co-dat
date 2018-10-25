import Point from './Models/Point.js';
import Game from './Models/Game.js';
var game, play1, play2;
var app;
document.addEventListener('DOMContentLoaded', function() {
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
			preState: new Point(null, null),
			nextState: new Point(null, null),
			limitPoints: 6,
		},
		created: function() {

		},
		methods: {
			step1({ rowIndex, colIndex }) {
				if (this.game.isPointFree({ rowIndex, colIndex })) {
					this.game.points[rowIndex][colIndex].setPlayer(this.currentTurn);
					this.swapTurn();
					this.pointsSetted++;
				}
			},
			swapTurn() {
				this.currentTurn = 3 - this.currentTurn;
			},
			resetState() {
				this.preState = new Point();
                // this.nextState = new Point();
            },
            step2({ rowIndex, colIndex }) {
            	if (this.preState.rowIndex == null) {
            		if (this.game.isPointFree({ rowIndex, colIndex })) {
            			this.resetState();
            			return;
            		}
            		if (this.game.ownerOfPoint({ rowIndex, colIndex }) != this.currentTurn) {
            			this.resetState();
            			return;
            		}
            		this.preState.setIndex(rowIndex, colIndex);
            		this.hightlightStateYouCanGo();
            		return;
            	}
            	this.nextState.setIndex(rowIndex, colIndex);

            	setTimeout(() => {
            		this.resetState();
            	}, 500);

            	if (!this.game.isPointFree(this.preState) && this.game.isPointFree(this.nextState) && this.game.ownerOfPoint(this.preState) == this.currentTurn && this.game.hasLine(this.preState, this.nextState)) {
            		this.game.movePoint(this.preState, this.nextState);
            		if (this.playerCanEat(this.currentTurn, { rowIndex, colIndex })) {
            			this.step = 3;
            			console.log('can eat');
            			this.unHightlightAllState();
            			return;
            		}
            		this.swapTurn();
            	}
            	this.unHightlightAllState();
            },
            hightlightStateYouCanGo() {
            	for (var rowIndex in this.game.points) {
            		for (var colIndex in this.game.points[rowIndex]) {
            			var point = this.game.points[rowIndex][colIndex];
            			if (!this.game.hasLine(this.preState, point)) {
            				continue;
            			}
            			if (!point.isFree()) {
            				continue;
            			}
            			point.canGo = true;
            		}
            	}
            },
            unHightlightAllState() {
            	for (var rowIndex in this.game.points) {
            		for (var colIndex in this.game.points[rowIndex]) {
            			var point = this.game.points[rowIndex][colIndex];
            			point.canGo = false;
            		}
            	}
            },

            stepEat({ colIndex, rowIndex }) {
            	var point = this.game.points[rowIndex][colIndex];
            	if (this.game.isPointFree({ rowIndex, colIndex })) {
            		console.log(`cant eat, point is free ${rowIndex}, ${colIndex}`);
            		return;
            	}
            	/* quân ta không được ăn quân mình*/
            	if (point.player == this.currentTurn) {
            		console.log('cant eat, point of myself');
            		return;
            	}
            	console.log('eat success');
            	console.log({ rowIndex, colIndex });

            	point.player = 0;
            	this.swapTurn();
            },
            isStateCanEat(player, point1, point2, point3) {
            	var a = [null, point1, point2, point3];
            	var points = this.points;
            	for(let i = 1; i <= 3; i++) {
            		for(let j = 1; j <= 3; j++) {
            			for(let k = 1; k <= 3; k ++) {
            				if(i == j || i == k || j == k) {
            					continue;
            				}
            				if(a[i] !== )
            			}
            		}
            	}
            }
            playerCanEat(player, { rowIndex, colIndex }) {
            	var i = rowIndex;
            	var j = colIndex;
            	var points = this.game.points;
            	var a = this.game.points;
            	for(let k = 1; k <= 3; k ++) {
            		/*điểm vừa đia nằm giữa*/
            		try {
            			if(a[i - k][j].player == player && a[i + k][j].player == player) {
            				this.`player{this.currentTurn}`
            					.changeLineColor({i, j}, {i - k, j, i + k, j});
            				return true;
            			}
            		} catch(e) {}
            		try {
            			if(a[i][j - k].player == player && a[i][j + k].player == player) {
            				this.`player{this.currentTurn}`
            					.changeLineColor({i, j}, {i - k, j, i + k, j});
            				return true;
            			}
            		} catch(e) {}
            		/*nằm lệch về 1 phía*/
            		try {
            			if(a[i - k][j].player == player && a[i - 2 * k][j].player == player) {
            				this.`player{this.currentTurn}`
            					.changeLineColor({i, j}, {i - k, j, i + k, j});
            				return true;
            			}
            		} catch(e) {}
            		try {
            			if(a[i + k][j].player == player && a[i + 2 * k][j].player == player) {
            				return true;
            			}
            		} catch(e) {}
            		try {
            			if(a[i][j - k].player == player && a[i][j - 2 * k].player == player) {
            				return true;
            			}
            		} catch(e) {}
            		try {
            			if(a[i][j + k].player == player && a[i][j + 2 * k].player == player) {
            				return true;
            			}
            		} catch(e) {}
            	}
            	return false;
            },
            setStep(step) {
            	this.step = step;
            	toastr.success('Thông báo', `change to step ${this.step}`);
            },
            clickPoint(rowIndex, colIndex) {
            	console.log({ rowIndex, colIndex });
            	switch (this.step) {
            		case 1:
            		{
            			this.step1({ rowIndex, colIndex });
            			if (this.pointsSetted == this.limitPoints) {
            				this.setStep(2);
            			}
            			break;
            		};
            		case 2:
            		{
            			this.step2({ rowIndex, colIndex });
            			break;
            		};
            		case 3:
            		{
            			this.stepEat({ rowIndex, colIndex });
            			this.step = 2;
            			break;
            		};
            		default:
            		break;
            	}
            },
            playerHasPoint(player) {
            	var count = 0;
            	var points = this.game.points;
            	for (var rowIndex in points) {
            		for (var colIndex in points[rowIndex]) {
            			count += points[rowIndex][colIndex].player == player;
            		}
            	}
            	return count;
            }
        }
    });
});