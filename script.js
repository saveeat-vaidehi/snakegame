const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snakeSize = 10;
let dx = snakeSize;
let dy = 0;
let snake = [{ x: 150, y: 150 }];
let food = { x: 0, y: 0 };
let score = 0;

function createFood() {
  food.x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
  food.y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
}

function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "#333";
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(segment.x, segment.y, snakeSize, snakeSize);
  });
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    createFood();
    score++;
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
  }
}

document.addEventListener("keydown", (event) => {
  const keyPressed = event.key;
  if (keyPressed === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -snakeSize;
  } else if (keyPressed === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = snakeSize;
  } else if (keyPressed === "ArrowLeft" && dx === 0) {
    dx = -snakeSize;
    dy = 0;
  } else if (keyPressed === "ArrowRight" && dx === 0) {
    dx = snakeSize;
    dy = 0;
  }
});

// Touch controls for mobile
let touchStartX, touchStartY;
document.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

document.addEventListener("touchmove", (event) => {
  const touchEndX = event.touches[0].clientX;
  const touchEndY = event.touches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // horizontal swipe
    if (deltaX > 0 && dx === 0) {
      dx = snakeSize;
      dy = 0;
    } else if (deltaX < 0 && dx === 0) {
      dx = -snakeSize;
      dy = 0;
    }
  } else {
    // vertical swipe
    if (deltaY > 0 && dy === 0) {
      dx = 0;
      dy = snakeSize;
    } else if (deltaY < 0 && dy === 0) {
      dx = 0;
      dy = -snakeSize;
    }
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

createFood();
let game = setInterval(gameLoop, 100);
