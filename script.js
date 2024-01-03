const canvas = document.getElementById('game-snake');
const context = canvas.getContext('2d');
let runGame = false;
let score = 1;
const grid = 16;
let speed = 0;
const snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 1,
};
const apple = {
    x: 320,
    y: 320,
};
stopGame();

function startGame() {
    score = 1;
    snake.x = 160;
    snake.y = 160;
    snake.dx = grid;
    snake.dy = 0;
    snake.cells = [];
    snake.maxCells = 1;

    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
}

function stopGame() {
    score = 1;
    runGame = false;

    snake.x = 160;
    snake.y = 160;
    snake.dx = 0;
    snake.dy = 0;
    snake.cells = [];
    snake.maxCells = 1;

    apple.x = 400;
    apple.y = 400;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
    requestAnimationFrame(loop);
    if (++speed < 8) {
        return;
    }
    if (!runGame) {
        drawInfo();
        return;
    }
    speed = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === apple.x && cell.y === apple.y) {
            score++;
            snake.maxCells++;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                if (score > 1) {
                    stopGame();
                    drawInfo();
                }
                startGame();
            }
        }
    });
    drawInfo();
}

function drawInfo() {
    context.font = '16px Arial';
    context.fillStyle = '#4a5568';
    context.fillText('Score: ' + score, 8, 20);
    context.fillText('v1.0.0', 180, 390);
    if (!runGame) {
        context.fillText('Press F to start', 150, 180);
    }
}

document.addEventListener('keydown', function (e) {
    if (e.which === 70) {
        runGame = true;
        startGame();
    }
    // left
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // up
    if (e.which === 38 && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = -grid;
    }
    // right
    if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // down
    if (e.which === 40 && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = grid;
    }
});

requestAnimationFrame(loop);