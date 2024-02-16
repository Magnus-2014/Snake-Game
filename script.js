document.addEventListener("DOMContentLoaded", () => {
  const gameArea = document.getElementById('gameArea');
  const snakeElement = document.getElementById('snake');
  const foodElement = document.getElementById('food');
  const gridSize = 20;
  let snake = [{ x: 10, y: 10 }];
  let food = { x: 0, y: 0 };
  let dx = 0;
  let dy = 0;
  
  function updateSnake() {
    snake.forEach((segment, index) => {
      const snakeSegment = document.createElement('div');
      snakeSegment.style.gridRowStart = segment.y;
      snakeSegment.style.gridColumnStart = segment.x;
      snakeSegment.classList.add('snake');
      if (index === 0) {
        snakeSegment.classList.add('head');
      }
      gameArea.appendChild(snakeSegment);
    });
  }

  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      generateFood();
    } else {
      snake.pop();
    }
    updateSnake();
  }

  function generateFood() {
    food.x = Math.floor(Math.random() * (gameArea.offsetWidth / gridSize));
    food.y = Math.floor(Math.random() * (gameArea.offsetHeight / gridSize));
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
  }

  function gameLoop() {
    moveSnake();
    setTimeout(gameLoop, 100);
  }

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (dy !== 1) {
          dx = 0;
          dy = -1;
        }
        break;
      case 'ArrowDown':
        if (dy !== -1) {
          dx = 0;
          dy = 1;
        }
        break;
      case 'ArrowLeft':
        if (dx !== 1) {
          dx = -1;
          dy = 0;
        }
        break;
      case 'ArrowRight':
        if (dx !== -1) {
          dx = 1;
          dy = 0;
        }
        break;
    }
  });

  generateFood();
  gameLoop();
});
