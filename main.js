//
const board = document.querySelector('.game-board');
const instructionText = document.querySelector('.instruction');
const score = document.querySelector('.score');
const highScore = document.querySelector('.high-score');


//game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = randomFood();
let highScoreText = 0;
let direction = 'right';
let gameInterval;
let gameSpeed = 200;
let gameStart = false;

// game, snake, food
function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore();
}

//Draw snake
function drawSnake() {
    snake.forEach((el) => {
        const snakeEl = createGame('div', 'snake');
        setPosition(snakeEl, el);
        board.appendChild(snakeEl);
    });

}

//draw food 
function drawFood() {
    const foodEl = createGame('div', 'food');
    setPosition(foodEl, food);
    board.appendChild(foodEl);
}

//create a snake or food
function createGame(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//set position snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

//TEST
//draw();

//rand food
function randomFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

//move the snake
function moveSnake() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;

        default:
            break;
    }
    snake.unshift(head);
    //snake.pop();

    if (head.x == food.x && head.y === food.y) {
        food = randomFood();
        changeSpeed();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            moveSnake();
            check();
            draw();
        }, gameSpeed)
    } else {
        snake.pop();
    }
}

//start game
function startGame() {
    gameStart = true;
    instructionText.style.display = 'none';
    gameInterval = setInterval(() => {
        moveSnake();
        check();
        draw();
    }, gameSpeed)
};

//event listener
function handlePress(e) {
    if (
        (!gameStart && e.code === 'Space') ||
        (!gameStart && e.key === '')) {
        startGame();
    } else {
        switch (e.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}

document.addEventListener('keydown', handlePress);


//increase
function changeSpeed() {
    if (gameSpeed > 150) {
        gameSpeed -= 5;
    } else if (gameSpeed > 100) {
        gameSpeed -= 3;
    } else if (gameSpeed > 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeed > 25) {
        gameSpeed -= 1;
    }
};

//check
function check() {
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

//reset the game
function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{ x: 10, y: 10 }];
    food = randomFood();
    direction = 'right';
    gameSpeed = 200;
    updateScore();
}
//score
function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
}

//stop
function stopGame() {
    clearInterval(gameInterval);
    gameStart = false;
    instructionText.style.display = 'block';
}

//highscore
function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScoreText) {
        highScoreText = currentScore;
        highScore.textContent = highScoreText.toString().padStart(3, '0');
        highScore.style.display = 'block';
    }

}