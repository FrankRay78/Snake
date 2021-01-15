define(["require", "exports", "./Apple", "./Snake"], function (require, exports, Apple, Snake) {
    "use strict";
    var Board = /** @class */ (function () {
        function Board(cellCountX, cellCountY) {
            if (cellCountX === void 0) { cellCountX = 15; }
            if (cellCountY === void 0) { cellCountY = 15; }
            this.cellCountX = cellCountX;
            this.cellCountY = cellCountY;
            //Initialse the underlying matrix
            //ref: https://stackoverflow.com/questions/8301400/how-do-you-easily-create-empty-matrices-javascript
            //nb. will always be a normalised array (ie. the second dimension is never jagged)
            this.matrix = [];
            for (var y = 0; y < this.cellCountY; y++) {
                this.matrix[y] = [];
                for (var x = 0; x < this.cellCountX; x++) {
                    this.matrix[y][x] = 0;
                }
            }
            this.applesEaten = 0;
            this.RaiseAppleEatenEvent();
            this.snake = new Snake(cellCountX, cellCountY);
            this.apple = new Apple(Math.round(cellCountX * 0.75), Math.round(cellCountY * 0.75));
        }
        Object.defineProperty(Board.prototype, "Matrix", {
            get: function () {
                return this.matrix;
            },
            enumerable: false,
            configurable: true
        });
        Board.prototype.Initialise = function () {
            this.applesEaten = 0;
            this.RaiseAppleEatenEvent();
            this.snake.Initialise();
            this.apple.Initialise();
            this.UpdateMatrix();
        };
        Board.prototype.Update = function () {
            this.snake.Update();
            this.UpdateMatrix();
        };
        Board.prototype.UpdateMatrix = function () {
            //Blank the matrix before performing update
            for (var y = 0; y < this.cellCountY; y++) {
                for (var x = 0; x < this.cellCountX; x++) {
                    this.matrix[y][x] = 0;
                }
            }
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
            //Update the matrix with the current position of the snake and apple
            this.matrix[snakePosition.currentY][snakePosition.currentX] = 1;
            this.matrix[applePosition.currentY][applePosition.currentX] = 2;
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