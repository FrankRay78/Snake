define(["require", "exports", "./Apple", "./Snake", "./SnakeDirection", "./GameRenderer"], function (require, exports, Apple, Snake, SnakeDirection, GameRenderer) {
    "use strict";
    class Game {
        constructor(canvas, boardDimensionX = 15, boardDimensionY = 15) {
            this.boardDimensionX = boardDimensionX;
            this.boardDimensionY = boardDimensionY;
            //Initial starting position for the apple
            const appleX = Math.round(boardDimensionX * 0.75);
            const appleY = Math.round(boardDimensionY * 0.75);
            this.apple = new Apple(appleX, appleY);
            //Initial starting position for the snake
            const snakeX = Math.round(boardDimensionX / 2) - 1;
            const snakeY = Math.round(boardDimensionY / 2) - 1;
            const snakeGrowIncrement = 2;
            this.snake = new Snake(boardDimensionX, boardDimensionY, SnakeDirection.Right, snakeX, snakeY, snakeGrowIncrement, this.apple);
            this.snake.onAppleEaten = (applesEaten) => {
                //Update the game score
                document.getElementById('appleCount').innerText = applesEaten.toString();
                //Set a new position for the next apple
                this.PlaceNextApple();
            };
            this.isRunning = false;
            this.gameRenderer = new GameRenderer(canvas, this);
            // Initialise the game before starting
            this.Initialise();
            //Draw the game in its starting state
            this.gameRenderer.Draw();
            this.gameRenderer.DrawPlayArrow();
        }
        get IsRunning() {
            return this.isRunning;
        }
        Initialise() {
            // Initialise apple and snake before starting
            this.apple.Initialise();
            this.snake.Initialise();
            //Zero the game score
            document.getElementById('appleCount').innerText = '0';
        }
        PlaceNextApple() {
            //Set a new location for the apple
            let x;
            let y;
            do {
                //Find a new location for the apple which is 1). on the board and 2). not on the snake
                x = this.randomIntFromInterval(0, this.boardDimensionX - 1);
                y = this.randomIntFromInterval(0, this.boardDimensionY - 1);
            } while (this.snake.SnakeOverlapsWith(x, y));
            //Move the apple to the new location
            this.apple.SetPosition(x, y);
        }
        //ref: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        Start() {
            if (this.isRunning)
                return;
            // Initialise the game before starting
            this.Initialise();
            this.gameRenderer.Draw();
            this.timerToken = window.setInterval(() => {
                try {
                    //Update the game and redraw it to the canvas on each timer tick
                    this.snake.Update();
                    this.gameRenderer.Draw();
                }
                catch (e) {
                    this.Stop();
                    this.gameRenderer.DrawGameOver();
                    this.gameRenderer.DrawPlayArrow();
                }
            }, 200);
            this.isRunning = true;
        }
        Stop() {
            if (!this.isRunning)
                return;
            clearTimeout(this.timerToken);
            this.isRunning = false;
        }
        GetSnakeCoordinates() {
            const dimensions = this.gameRenderer.GetBoardDimensions();
            const snakePosition = this.snake.HeadPosition;
            //nb. the following coordinates refer to the top, left hand side of the current cell the snake's head resides in
            const snakeCoordinatesX = snakePosition.currentX * dimensions.cellWidth;
            const snakeCoordinatesY = snakePosition.currentY * dimensions.cellHeight;
            return { snakeDirection: snakePosition.direction, snakeCoordinatesX: snakeCoordinatesX, snakeCoordinatesY: snakeCoordinatesY };
        }
        KeyPress(keyCode) {
            if (!this.isRunning)
                return;
            if (keyCode < 37 || keyCode > 40)
                return;
            let newDirection;
            if (keyCode === 38) {
                // up arrow
                newDirection = SnakeDirection.Up;
            }
            else if (keyCode === 40) {
                // down arrow
                newDirection = SnakeDirection.Down;
            }
            else if (keyCode === 37) {
                // left arrow
                newDirection = SnakeDirection.Left;
            }
            else if (keyCode === 39) {
                // right arrow
                newDirection = SnakeDirection.Right;
            }
            this.snake.Direction = newDirection;
        }
        MouseDown(mouseX, mouseY) {
            if (!this.isRunning)
                return;
            const snakeCoordinates = this.GetSnakeCoordinates();
            let newDirection = snakeCoordinates.snakeDirection;
            switch (snakeCoordinates.snakeDirection) {
                case SnakeDirection.Up:
                    if (mouseX < snakeCoordinates.snakeCoordinatesX)
                        newDirection = SnakeDirection.Left;
                    else if (mouseX > snakeCoordinates.snakeCoordinatesX)
                        newDirection = SnakeDirection.Right;
                    break;
                case SnakeDirection.Down:
                    if (mouseX < snakeCoordinates.snakeCoordinatesX)
                        newDirection = SnakeDirection.Left;
                    else if (mouseX > snakeCoordinates.snakeCoordinatesX)
                        newDirection = SnakeDirection.Right;
                    break;
                case SnakeDirection.Left:
                    if (mouseY < snakeCoordinates.snakeCoordinatesY)
                        newDirection = SnakeDirection.Up;
                    else if (mouseY > snakeCoordinates.snakeCoordinatesY)
                        newDirection = SnakeDirection.Down;
                    break;
                case SnakeDirection.Right:
                    if (mouseY < snakeCoordinates.snakeCoordinatesY)
                        newDirection = SnakeDirection.Up;
                    else if (mouseY > snakeCoordinates.snakeCoordinatesY)
                        newDirection = SnakeDirection.Down;
                    break;
                default:
                    //should never happen
                    throw new Error();
            }
            this.snake.Direction = newDirection;
        }
        Touch(mouseX, mouseY) {
            if (!this.isRunning)
                return;
            const snakeCoordinates = this.GetSnakeCoordinates();
            let newDirection = snakeCoordinates.snakeDirection;
            switch (snakeCoordinates.snakeDirection) {
                case SnakeDirection.Up:
                    if (mouseX < snakeCoordinates.snakeCoordinatesX)
                        newDirection = SnakeDirection.Left;
                    else if (mouseX > snakeCoordinates.snakeCoordinatesX)
                        newDirection = SnakeDirection.Right;
                    break;
                case SnakeDirection.Down:
                    if (mouseX < snakeCoordinates.snakeCoordinatesX)
                        newDirection = SnakeDirection.Left;
                    else if (mouseX > snakeCoordinates.snakeCoordinatesX)
                        newDirection = SnakeDirection.Right;
                    break;
                case SnakeDirection.Left:
                    if (mouseY < snakeCoordinates.snakeCoordinatesY)
                        newDirection = SnakeDirection.Up;
                    else if (mouseY > snakeCoordinates.snakeCoordinatesY)
                        newDirection = SnakeDirection.Down;
                    break;
                case SnakeDirection.Right:
                    if (mouseY < snakeCoordinates.snakeCoordinatesY)
                        newDirection = SnakeDirection.Up;
                    else if (mouseY > snakeCoordinates.snakeCoordinatesY)
                        newDirection = SnakeDirection.Down;
                    break;
                default:
                    //should never happen
                    throw new Error();
            }
            this.snake.Direction = newDirection;
        }
    }
    ;
    return Game;
});
//# sourceMappingURL=Game.js.map