window.onload = function() {
    // Create a canvas and append it to the body
    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = 512;
    canvas.height = 512;

    // Initialize the score
    let score = 0;

    // Get the score element
    let scoreElement = document.getElementById('score');

    // Get the 2D context of the canvas
    let context = canvas.getContext('2d');

    // Define the size of each square (box)
    let box = 32;

    // Initialize the snake as an array of objects
    let snake = [];
    snake[0] = { x: 8 * box, y: 8 * box };

    // Initialize the obstacles as an array of objects
    let obstacles = [
        { x: 5 * box, y: 7 * box },
        { x: 5 * box, y: 8 * box },
        { x: 7 * box, y: 5 * box },
        { x: 8 * box, y: 5 * box }
        // Add more obstacles as needed
    ];

    // Set the initial direction of the snake
    let direction = "right";

    // Create the food object at a random position
    let food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }

    // Function to draw the background
    function createBG() {
        context.fillStyle = "lightgreen";
        context.fillRect(0, 0, 16 * box, 16 * box);
    }

    // Function to draw the snake
    function createSnake() {
        for (i = 0; i < snake.length; i++) {
            context.fillStyle = "green";
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }

    // Function to draw the food
    function drawFood() {
        context.fillStyle = "red";
        context.fillRect(food.x, food.y, box, box);
    }

    // Function to draw the obstacles
    function createObstacles() {
        context.fillStyle = "gray";
        for (i = 0; i < obstacles.length; i++) {
            context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
        }
    }    

    // Event listener for the arrow keys to change the direction of the snake
    document.addEventListener('keydown', update);

    function update(event) {
        if (event.keyCode == 37 && direction != 'right') direction = 'left';
        if (event.keyCode == 38 && direction != 'down') direction = 'up';
        if (event.keyCode == 39 && direction != 'left') direction = 'right';
        if (event.keyCode == 40 && direction != 'up') direction = 'down';
    }

    // Main function of the game
    function startGame() {
        // Check if the snake hit the border and make it appear on the opposite side
        if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
        if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
        if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
        if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

        // Check if the snake hit itself
        for (i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                clearInterval(game);
                alert('Game Over :(');
            }
        }

        // Check if the snake hit an obstacle
        for (i = 0; i < obstacles.length; i++) {
            if (snake[0].x == obstacles[i].x && snake[0].y == obstacles[i].y) {
                clearInterval(game);
                alert('Game Over :(');
            }
        }

        // Draw the background, snake and food
        createBG();
        createSnake();
        drawFood();
        createObstacles();

        // Get the head position of the snake
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        // Check the direction and update the position accordingly
        if (direction == "right") snakeX += box;
        if (direction == "left") snakeX -= box;
        if (direction == "up") snakeY -= box;
        if (direction == "down") snakeY += box;

        // Check if the snake has eaten the food
        if (snakeX == food.x && snakeY == food.y) {
            // If yes, increment the score and create a new food object at a random position
            score++;
            food.x = Math.floor(Math.random() * 15) * box;
            food.y = Math.floor(Math.random() * 15) * box;

            // Update the score element
            scoreElement.innerText = 'Score: ' + score;
        } else {
            // If not, remove the tail
            snake.pop();
        }

        // Create a new head and add it to the beginning of the snake
        let newHead = {
            x: snakeX,
            y: snakeY
        }

        snake.unshift(newHead);
    }

    // Call the startGame function every 100ms
    let game = setInterval(startGame, 100);
}