class Map {
    constructor(id, size) {
        this.size = size;
        this.genCanvas(id);
        this.genLines();
        console.log('s');
    }

    genCanvas(id) {
        this.canvas = document.getElementById(id);
        this.canvas.width = this.canvas.height = this.size + 50;
        this.ctx = this.canvas.getContext("2d");
    }

    genLines() {
        var lines = [
            /* v1 */
            '1, 1, 1, 7',
            '1, 7, 7, 7',
            '7, 7, 7, 1',
            '7, 1, 1, 1',
            /* v2 */
            '2, 2, 2, 6',
            '2, 6, 6, 6',
            '6, 6, 6, 2',
            '6, 2, 2, 2',
            /* v3 */
            '3, 3, 3, 5',
            '3, 5, 5, 5',
            '5, 5, 5, 3',
            '5, 3, 3, 3',
            /* chéo */
            '1, 1, 3, 3',
            '1, 7, 3, 5',
            '7, 1, 5, 3',
            '5, 5, 7, 7',
            /* dọc */
            '1, 4, 3, 4',
            '5, 4, 7, 4',
            /* ngang */
            '4, 1, 4, 3',
            '4, 5, 4, 7',
        ];
        this.lines = {};
        for (let i = 0; i < lines.length; i++) {
            let c = lines[i].split(', ');
            this.lines[c[0]] = this.lines[c[0]] || {};
            this.lines[c[0]][c[1]] = this.lines[c[0]][c[1]] || {};
            this.lines[c[0]][c[1]][c[2]] = this.lines[c[0]][c[1]][c[2]] || {};
            this.lines[c[0]][c[1]][c[2]][c[3]] = 0;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.size + 50, this.size + 50);
        for (let x1 in this.lines) {
            for (let y1 in this.lines[x1]) {
                for (let x2 in this.lines[x1][y1]) {
                    for (let y2 in this.lines[x1][y1][x2]) {
                        this.drawLine({
                            point1: {
                                rowIndex: x1,
                                colIndex: y1,
                            },
                            point2: {
                                rowIndex: x2,
                                colIndex: y2,
                            },
                            color: this.lines[x1][y1][x2][y2]
                        });
                    }
                }
            }
        }
    }

    drawLine({ point1, point2, color }) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color == 0 ? '#000000' : 'red';

        this.ctx.moveTo(
            this.convertIndexToLength(Number(point1.colIndex)),
            this.convertIndexToLength(Number(point1.rowIndex))
        );
        this.ctx.lineTo(
            this.convertIndexToLength(Number(point2.colIndex)),
            this.convertIndexToLength(Number(point2.rowIndex)),
        );
        this.ctx.stroke();
        this.ctx.closePath();
    }

    convertIndexToLength(index) {
        return (index - 1) * this.size / 6 + 25;
    }

    setLineColor({ point1, point2, color }) {
        if (!this.hasLine(point1, point2)) {
            [point1, point2] = [point2, point1];
        }
        if (!this.hasLine(point1, point2)) {
            toastr.error('Error', 'setLineColor fail!')[point1, point2] = [point2, point1];
        }
        this.lines[point1.rowIndex][point1.colIndex][point2.rowIndex][point2.colIndex] = color;
    }

    hasLine(point1, point2) {
        let x1 = point1.rowIndex;
        let y1 = point1.colIndex;
        let x2 = point2.rowIndex;
        let y2 = point2.colIndex;
        try {
            if (this.lines[2 * x1 - x2][2 * y1 - y2][x2][y2] !== undefined) {
                return true;
            }
        } catch (e) {}
        try {
            if (this.lines[x2][y2][2 * x1 - x2][2 * y1 - y2] !== undefined) {
                return true;
            }
        } catch (e) {}
        try {
            if (this.lines[2 * x2 - x1][2 * y2 - y1][x1][y1] !== undefined) {
                return true;
            }
        } catch (e) {}

        try {
            if (this.lines[x1][y1][2 * x2 - x1][2 * y2 - y1] !== undefined) {
                return true;
            }
        } catch (e) {}
        return false;
    }
    canEat(i, j, points, currentTurn) {
    console.log(`check can eat ${i} ${j}`);
        for (let x1 in this.lines) {
            for (let y1 in this.lines[x1]) {
                for (let x2 in this.lines[x1][y1]) {
                    for (let y2 in this.lines[x1][y1][x2]) {
                        var check = false;
                        check = check || (x1 == i && y2 == j);
                        check = check || (x2 == i && y2 == j);
                        check = check || (x1 + x2 == 2 * i && y1 + y2 == 2 * j);
                        check = check && points[x1][y1] == currentTurn;
                        check = check && points[x2][y2] == currentTurn;
                        check = check && points[i ][j ] == currentTurn;
                        if (!check) {
                            continue;
                        }
                        if(this.lines[x1][y1][x2][y2]) {
                            return false;
                        }

                        this.lines[x1][y1][x2][y2] = 1;
                        this.draw();
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
export default Map;