define(["require", "exports", "./Apple", "./Snake", "./SnakeDirection"], function (require, exports, Apple, Snake, SnakeDirection) {
    "use strict";
    class Board {
        constructor(boardDimensionX = 15, boardDimensionY = 15) {
            this.boardDimensionX = boardDimensionX;
            this.boardDimensionY = boardDimensionY;
            //Initial starting position for the apple
            const appleX = Math.round(boardDimensionX * 0.75);
            const appleY = Math.round(boardDimensionY * 0.75);
            //Initial starting position for the snake
            const snakeX = Math.round(boardDimensionX / 2) - 1;
            const snakeY = Math.round(boardDimensionY / 2) - 1;
            this.apple = new Apple(appleX, appleY);
            this.snake = new Snake(boardDimensionX, boardDimensionY, SnakeDirection.Right, snakeX, snakeY, this.apple);
            this.snake.onAppleEaten = (applesEaten) => {
                //Update the game score
                document.getElementById('appleCount').innerText = applesEaten.toString();
                //Set a new position for the next apple
                this.PlaceNextApple();
            };
        }
        Initialise() {
            this.snake.Initialise();
            this.apple.Initialise();
        }
        PlaceNextApple() {
            const snakePosition = this.snake.Position;
            //Set a new location for the apple
            let x;
            let y;
            do {
                //Find a new location for the apple which is 1). on the board and 2). not on the snake
                x = this.randomIntFromInterval(0, this.boardDimensionX - 1);
                y = this.randomIntFromInterval(0, this.boardDimensionY - 1);
            } while (x === snakePosition.currentX &&
                y === snakePosition.currentY);
            //Move the apple to the new location
            this.apple.currentX = x;
            this.apple.currentY = y;
        }
        //ref: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }
    ;
    return Board;
});
//# sourceMappingURL=Board.js.map