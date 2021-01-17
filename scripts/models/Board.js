define(["require", "exports", "./Apple", "./Snake"], function (require, exports, Apple, Snake) {
    "use strict";
    var Board = /** @class */ (function () {
        function Board(cellCountX, cellCountY) {
            var _this = this;
            if (cellCountX === void 0) { cellCountX = 15; }
            if (cellCountY === void 0) { cellCountY = 15; }
            this.cellCountX = cellCountX;
            this.cellCountY = cellCountY;
            this.apple = new Apple(Math.round(cellCountX * 0.75), Math.round(cellCountY * 0.75));
            this.snake = new Snake(cellCountX, cellCountY, this.apple);
            this.snake.onAppleEaten = function (applesEaten) {
                //Update the game score
                document.getElementById('appleCount').innerText = applesEaten.toString();
                //Set a new position for the next apple
                _this.PlaceNextApple();
            };
        }
        Board.prototype.Initialise = function () {
            this.snake.Initialise();
            this.apple.Initialise();
        };
        Board.prototype.PlaceNextApple = function () {
            var snakePosition = this.snake.Position;
            //Set a new location for the apple
            var x;
            var y;
            do {
                //Find a new location for the apple which is 1). on the board and 2). not on the snake
                x = this.randomIntFromInterval(0, this.cellCountX - 1);
                y = this.randomIntFromInterval(0, this.cellCountY - 1);
            } while (x === snakePosition.currentX &&
                y === snakePosition.currentY);
            //Move the apple to the new location
            this.apple.currentX = x;
            this.apple.currentY = y;
        };
        //ref: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        Board.prototype.randomIntFromInterval = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        return Board;
    }());
    ;
    return Board;
});
//# sourceMappingURL=Board.js.map