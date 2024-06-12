let screenWidth = 500;
let screenHeight = 500;
let scale = 20;
let outline = 5;
let rows = 0;
let columns = 0;
let squares = [];
let schedule = [];
let flip = [];
let totalSquares;
let gamestate = "play";
let fpsC = 0;
let fps = 29
let level = 1;
let levelDisplay;
let goalCell;

function setup() {
    createCanvas(screenWidth, screenHeight);
    rows = Math.floor(screenHeight / (scale + outline));
    columns = Math.floor(screenWidth / (scale + outline));
    totalSquares = rows * columns;

    levelDisplay = createDiv(`Level: ${level}`);
    levelDisplay.style('font-size', '48px');
    levelDisplay.style('color', 'white');
    levelDisplay.style('text-align', 'center');
    levelDisplay.style('position', 'absolute');
    levelDisplay.style('left', '50%');
    levelDisplay.style('top', '50%');
    levelDisplay.style('transform', 'translate(-50%, -50%)');
    levelDisplay.style('text-shadow', '2px 2px 4px rgba(0, 0, 0, 0.5)');
    levelDisplay.hide();

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            squares.push(new Cell(j, i, scale, scale));
            schedule.push(false);
        }
    }
    rectMode(CORNER)
    const goalSizeX = Math.floor(columns / 4) * (scale + outline);
    const goalSizeY = Math.floor(rows / 4) * (scale + outline);
    const goalX = screenWidth - goalSizeX;
    const goalY = screenHeight - goalSizeY;
    goalCell = new GoalCell(goalX, goalY, goalSizeX, goalSizeY);
}

function draw() {
    background(0);
    rectMode(CORNER); // Set rectMode to CORNER
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            squares[i * columns + j].display();
        }
    }
    if (gamestate == "play") {
        if (fpsC > fps) {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    squares[i * columns + j].updateScheduler();
                    squares[i * columns + j].calculate(i * columns + j);
                }
            }
            for (let i = 0; i < totalSquares; i++) {
                schedule[i] = false;
            }
            update();
            fpsC = 0;
        }
        levelDisplay.hide();
    } else {
        darkenBackground();
        levelDisplay.show();
    }
    fpsC++;
    goalCell.display();
}

class GoalCell {
    constructor(x, y, sizeX, sizeY) {
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    display() {
        fill(0, 0, 255);
        rectMode(CORNER)
        rect(this.x, this.y, this.sizeX, this.sizeY);
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        if (gamestate === "pause") {
            gamestate = "play";
            levelDisplay.hide();
        } else {
            gamestate = "pause";
        }
    } else if (gamestate === "pause") {
        if (keyCode === UP_ARROW) {
            changeLevel(1);
        } else if (keyCode === DOWN_ARROW) {
            changeLevel(-1);
        }
    }
}

function changeLevel(change) {
    level += change;
    level = constrain(level, 1, 10);
    updateLevelDisplay();
}

function updateLevelDisplay() {
    levelDisplay.html(`Level: ${level}`);
}

function leftClickAction(e) {
    if (e.button === 0 && gamestate === "pause") {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;
        const col = Math.floor(x / (scale + outline));
        const row = Math.floor(y / (scale + outline));
        const index = row * columns + col;

        if (y / (scale + outline) <= rows / 2)
        {
            toggleCell(index);
        } else if (level !== 1) {
            toggleCell(index);
        }
    }
}

function toggleCell(index) {
    if (index >= 0 && index < squares.length) {
        const cell = squares[index];
        if (cell) {
            cell.life = !cell.life;
            cell.display();
        }
    }
}

document.addEventListener('mousedown', leftClickAction);

function update() {
    for (let i = flip.length - 1; i >= 0; i--) {
        squares[flip[i]].life = !squares[flip[i]].life;
        flip.pop();
    }
    for (i = rows * columns; i <= 0; i++){

    if (level === 1 && squares[i].isWinning()) {
        level++;
        updateLevelDisplay();
    }
}
}

function darkenBackground() {
    fill(0, 0, 0, 200);
    if (level === 1) {
        const columnsToShade = Math.floor(columns * 4 / 3);
        const shadedWidth = columnsToShade * 2 * (scale + outline);
        rect(0, 0, shadedWidth, screenHeight);
    } else {
        rect(0, 0, screenWidth, screenHeight);
    }
}
