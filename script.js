import Map from './Models/Map.js';
import _AI from './Models/AI.js';
var AI = new _AI(1);
var app = new Vue({
    el: "#app",
    data: {
        map: null,
        players: {
            "1": null,
            "2": null
        },
        points: null,
        currentTurn: 1,
        currentStep: 1,
        limitPoints: 18,
        pointsSetted: 0,
        pointSelected: null,
        modes: {
            'PLAY_WITH_AI': 1,
            '2_PLAYER': 2
        },
        mode: 1,
    },
    methods: {
        genPoints() {
            this.points = {
                "1": { "1": 0, "4": 0, "7": 0 },
                "2": { "2": 0, "4": 0, "6": 0, },
                "3": { "3": 0, "4": 0, "5": 0, },
                "4": { "1": 0, "2": 0, "3": 0, "5": 0, "6": 0, "7": 0, },
                "5": { "3": 0, "4": 0, "5": 0, },
                "6": { "2": 0, "4": 0, "6": 0, },
                "7": { "1": 0, "4": 0, "7": 0, },
            }
            // this.points = {
            //     "1": { "1": 1, "4": 1, "7": 0 },
            //     "2": { "2": 2, "4": 0, "6": 1, },
            //     "3": { "3": 2, "4": 0, "5": 0, },
            //     "4": { "1": 2, "2": 0, "3": 0, "5": 0, "6": 0, "7": 0, },
            //     "5": { "3": 2, "4": 0, "5": 0, },
            //     "6": { "2": 1, "4": 0, "6": 0, },
            //     "7": { "1": 0, "4": 0, "7": 0, },
            // }
        },
        swapTurn() {
            this.currentTurn = 3 - this.currentTurn;
        },
        setPoint(i, j, value) {
            this.points[i][j] = value;
        },
        clickPoint(i, j) {
            switch (this.currentStep) {
                case 1:
                    if (this.points[i][j] !== 0) {
                        break;
                    }
                    this.setPoint(i, j, this.currentTurn);
                    this.pointsSetted++;
                    if (this.pointsSetted == this.limitPoints) {
                        toastr.success('Alert!', 'Change to step 2');
                        this.currentStep = 2;
                    }
                    this.swapTurn();
                    break;
                case 2:
                    this.movePoint(i, j);
                    break;
                case 3:
                    this.eatPoint(i, j);
                    break;
            }
            if(this.checkEndGame()) {
                return;
            }
            if (this.mode != this.modes.PLAY_WITH_AI || this.currentTurn != 2) {
                return;
            }
            switch (this.currentStep) {
                case 1:
                    let { points: points1 } = AI.put(this.points, this.map, this.players, this.currentTurn);
                    this.points = points1;
                    this.pointsSetted++;
                    if (this.pointsSetted == this.limitPoints)
                        this.currentStep = 2;
                    this.swapTurn();
                    break;
                case 2:
                    let {
                        points: points2,
                        players: players2
                    } = AI.move(this.points, this.players, this.map, this.currentTurn);
                    this.points = points2;
                    this.players = players2;
                    this.swapTurn();
                    break;
            }
            if(this.checkEndGame()) {
                return;
            }
        },
        movePoint(i, j) {
            if ((this.points[i][j] == 2 || this.points[i][j] == 1) && this.points[i][j] !== this.currentTurn) {
                return;
            }
            if (this.pointSelected == null && this.points[i][j] == 0) {
                return;
            }
            if (this.pointSelected === null || this.points[i][j] == this.currentTurn) {
                this.pointSelected = {
                    rowIndex: i,
                    colIndex: j,
                }
                this.hightlightStateYouCanGo();
                return;
            }
            this.unHightlightStateYouCanGo();
            if (this.pointSelected.rowIndex == i && this.pointSelected.colIndex == j) {
                return;
            }
            if (!this.map.hasLine(this.pointSelected, { rowIndex: i, colIndex: j })) {
                return this.pointSelected = null;
            }
            this.points[i][j] = this.currentTurn;
            this.points[this.pointSelected.rowIndex][this.pointSelected.colIndex] = 0;
            this.pointSelected = null;
            if (this.players[this.currentTurn].canEat(i, j, this.points, this.currentTurn)) {
                console.log(`player ${this.currentTurn} can eat`);
                this.currentStep = 3;
                return;
            } else {
                console.log(`player ${this.currentTurn} can't eat`);
            }
            this.swapTurn();
        },
        hightlightStateYouCanGo() {
            for (let i in this.points) {
                for (let j in this.points[i]) {
                    if (i == this.pointSelected.rowIndex && j == this.pointSelected.colIndex) {
                        continue;
                    }
                    if (this.points[i][j] !== 0) {
                        continue;
                    }
                    if (!this.map.hasLine(this.pointSelected, { rowIndex: i, colIndex: j })) {
                        continue;
                    }
                    this.points[i][j] = 3;
                }
            }
        },
        unHightlightStateYouCanGo() {
            for (let i in this.points) {
                for (let j in this.points[i]) {
                    if (this.points[i][j] !== 3) {
                        continue;
                    }
                    this.points[i][j] = 0;
                }
            }
        },
        eatPoint(i, j) {
            if (this.points[i][j] != (3 - this.currentTurn)) {
                return;
            }
            this.points[i][j] = 0;
            this.currentStep = 2;
            this.swapTurn();
        },
        playerHasPoint(index) {
            var count = 0;
            for (let i in this.points) {
                for (let j in this.points[i]) {
                    count += this.points[i][j] == index;
                }
            }
            return count;
        },
        checkEndGame() {
            var isEndgame = false;
            isEndgame = isEndgame || this.playerHasPoint(1) < 3;
            isEndgame = isEndgame || this.playerHasPoint(2) < 3;
            isEndgame = isEndgame && this.currentStep == 2;
            if (!isEndgame) {
                return false;
            }
            $('#modal-gameover').modal('show');
            return true;
        }
    },
    created: function() {
        this.genPoints();
        this.map = new Map('game_box', 480);
        this.players[1] = new Map('play1_box', 140);
        this.players[2] = new Map('play2_box', 140);

        this.map.draw();
        this.players[1].draw();
        this.players[2].draw();
    }
});