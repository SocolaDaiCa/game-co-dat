import Point from './Models/Point.js';
import Game from './Models/Game.js';
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
			preState: new Point(null, null),
			nextState: new Point(null, null),
			limitPoints: 4,
		},
		created: function () {

		},
		methods: {
			step1({rowIndex, colIndex}) {
				if(this.game.isPointFree({rowIndex, colIndex})) {
					this.game.points[rowIndex][colIndex].setPlayer(this.currentTurn);
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
				this.preState  = new Point();
				// this.nextState = new Point();
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
					this.preState.setIndex(rowIndex, colIndex);
					this.hightlightStateYouCanGo();
					return;
				}
				this.nextState.setIndex(rowIndex, colIndex);

				setTimeout(() => {
					this.resetState();
				}, 500);
				
				if(!this.game.isPointFree(this.preState) && this.game.isPointFree(this.nextState) && this.game.ownerOfPoint(this.preState) == this.currentTurn && this.game.hasLine(this.preState, this.nextState)) {
					this.game.movePoint(this.preState, this.nextState);
					if(this.playerCanEat(this.currentTurn)) {
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
				for(var rowIndex in this.game.points) {
					for(var colIndex in this.game.points[rowIndex]) {
						var point = this.game.points[rowIndex][colIndex];
						if(!this.game.hasLine(this.preState, point)) {
							continue;
						}
						if(!point.isFree()) {
							continue;
						}
						point.canGo = true;
					}
				}
			},
			unHightlightAllState() {
				for(var rowIndex in this.game.points) {
					for(var colIndex in this.game.points[rowIndex]) {
						var point = this.game.points[rowIndex][colIndex];
						point.canGo = false;
					}
				}
			},
			stepEat({colIndex, rowIndex}) {
				var point = this.game.points[rowIndex][colIndex];
				if(this.game.isPointFree({rowIndex, colIndex})) {
					console.log(`cant eat, point is free ${rowIndex}, ${colIndex}`);
					return;
				}
				/* quân ta không được ăn quân mình*/
				if(point.player == this.currentTurn) {
					console.log('cant eat, point of myself');
					return;
				}
				console.log('eat success');
				point.player = 0;
				this.swapTurn();
			},
			playerCanEat(player) {
				// var {rowIndex: rowIndex, colIndex: colIndex} = this.nextState;
				// var canEat
				// if(rowIndex < 4 && colIndex < 4) {

				// }
				// return true;
			},
			clickPoint(rowIndex, colIndex) {
				console.log({rowIndex, colIndex});
				switch(this.step) {
					case 1: {
						this.step1({rowIndex, colIndex});
						break;
					};
					case 2: {
						this.step2({rowIndex, colIndex});
						break;
					};
					case 3: {
						this.stepEat({rowIndex, colIndex});
						this.step = 2;
						break;
					};
					default: break;
				}
			},
			playerHasPoint(player) {
				var count = 0;
				var points = this.game.points;
				for(var rowIndex in points) {
					for(var colIndex in points[rowIndex]) {
						count += points[rowIndex][colIndex].player == player;
					}
				}
				return count; 
			}
		}
	});
});