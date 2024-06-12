class Cell {
    constructor(x, y, w, h) {
        this.tp = y * columns + x; // Tile position
        this.x = (x * (scale + outline)) + (scale / 2);
        this.y = (y * (scale + outline)) + (scale / 2);
        this.w = w;
        this.h = h;
        this.life = false;
        this.neighbors = 0;
    }

    display() {
        if (this.life) {
            rectMode(CENTER);
            fill(255, 0, 0);
            rect(this.x, this.y, this.w, this.h);
        } else {
            rectMode(CENTER);
            fill(255);
            rect(this.x, this.y, this.w, this.h);
        }
    }

    updateScheduler() {
        if (this.tp % columns > 0 && this.tp % columns != columns - 1) {
            schedule[this.tp - 1] = true;
        }
        if (this.tp % columns < columns - 1) {
            schedule[this.tp + 1] = true;
        }
        if (this.tp >= columns && this.tp < totalSquares - columns) {
            schedule[this.tp - columns] = true;
            if (this.tp % columns > 0) {
                schedule[this.tp - columns - 1] = true;
            }
            if (this.tp % columns < columns - 1) {
                schedule[this.tp - columns + 1] = true;
            }
        }
        if (this.tp < totalSquares - columns) {
            schedule[this.tp + columns] = true;
            if (this.tp % columns > 0 && this.tp % columns != columns - 1) {
                schedule[this.tp + columns - 1] = true;
            }
            if (this.tp % columns < columns - 1) {
                schedule[this.tp + columns + 1] = true;
            }
        }
    }

    calculate(sid) {
        if (schedule[sid]) {

            if (this.tp % columns > 0 && this.tp % columns != columns - 1 && squares[this.tp - 1].life) {
                this.neighbors++;
            }
            if (this.tp % columns < columns - 1 && squares[this.tp + 1].life) {
                this.neighbors++;
            }
            if (this.tp >= columns && this.tp < totalSquares - columns) {
                if (squares[this.tp - columns].life) {
                    this.neighbors++;
                }
                if (this.tp % columns > 0 && squares[this.tp - columns - 1].life) {
                    this.neighbors++;
                }
                if (this.tp % columns < columns - 1 && squares[this.tp - columns + 1].life) {
                    this.neighbors++;
                }
            }
            if (this.tp < totalSquares - columns) {
                if (squares[this.tp + columns].life) {
                    this.neighbors++;
                }
                if (this.tp % columns > 0 && this.tp % columns != columns - 1 && squares[this.tp + columns - 1].life) {
                    this.neighbors++;
                }
                if (this.tp % columns < columns - 1 && squares[this.tp + columns + 1].life) {
                    this.neighbors++;
                }
            }

            if (!this.life && this.neighbors === 3) {
                flip.push(this.tp)
            } else if (this.life && (this.neighbors < 2 || this.neighbors > 3)) {
                flip.push(this.tp)
            }
            this.neighbors = 0;
        }
    }

    isWinning() {
        if (this.x >= (scale + outline) * columns * (3/4) && this.y >= (scale + outline) * rows / (3/4)){
            return true
        }
        else {
            return false
        }
    }
}

