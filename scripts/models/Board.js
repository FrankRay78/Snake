define(["require", "exports", "./Apple", "./Snake"], function (require, exports, Apple, Snake) {
    "use strict";
    var Board = /** @class */ (function () {
        function Board(cellCountX, cellCountY) {
            if (cellCountX === void 0) { cellCountX = 15; }
            if (cellCountY === void 0) { cellCountY = 15; }
            this.cellCountX = cellCountX;
            this.cellCountY = cellCountY;
            this.applesEaten = 0;
            this.RaiseAppleEatenEvent();
            this.snake = new Snake(cellCountX, cellCountY);
            this.apple = new Apple(Math.round(cellCountX * 0.75), Math.round(cellCountY * 0.75));
        }
        Board.prototype.Initialise = function () {
            this.applesEaten = 0;
            this.RaiseAppleEatenEvent();
            this.snake.Initialise();
            this.apple.Initialise();
            this.UpdateBoard();
        };
        Board.prototype.Update = function () {
            this.snake.Update();
            this.UpdateBoard();
        };
        Board.prototype.UpdateBoard = function () {
            var snakePosition = this.snake.Position;
            var applePosition = this.apple.Position;
            if (snakePosition.currentX === applePosition.currentX &&
                snakePosition.currentY === applePosition.currentY) {
                //SNAKE HAS EATEN THE APPLE
                this.applesEaten = this.applesEaten + 1;
                //Raise apple eaten event
                this.RaiseAppleEatenEvent();
                //Set a new location for the apple
                var x = void 0;
                var y = void 0;
                do {
                    x = this.randomIntFromInterval(0, this.cellCountX - 1);
                    y = this.randomIntFromInterval(0, this.cellCountY - 1);
                } while (x === snakePosition.currentX && y === snakePosition.currentY);
                //Move the apple to the new location
                this.apple.currentX = x;
                this.apple.currentY = y;
                applePosition = this.apple.Position;
            }
        };
        Board.prototype.RaiseAppleEatenEvent = function () {
            if (this.onAppleEaten)
                this.onAppleEaten(this.applesEaten);
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