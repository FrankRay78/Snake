var SnakeDirection;
(function (SnakeDirection) {
    SnakeDirection[SnakeDirection["Up"] = 1] = "Up";
    SnakeDirection[SnakeDirection["Down"] = 2] = "Down";
    SnakeDirection[SnakeDirection["Left"] = 3] = "Left";
    SnakeDirection[SnakeDirection["Right"] = 4] = "Right";
})(SnakeDirection || (SnakeDirection = {}));
var Snake = /** @class */ (function () {
    function Snake(matrix) {
        this.matrix = matrix;
        this.GameOverMessage = '<b style="color: magenta">Game Over</b> - Click the board to try again';
        //nb. assume a normalised array (ie. the second dimension is never jagged)
        this.cellCountY = matrix.length;
        this.cellCountX = matrix[0].length;
    }
    Object.defineProperty(Snake.prototype, "SnakePosition", {
        get: function () {
            return { currentX: this.currentX, currentY: this.currentY };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "Direction", {
        get: function () {
            return this.direction;
        },
        set: function (newDirection) {
            this.direction = newDirection;
        },
        enumerable: false,
        configurable: true
    });
    Snake.prototype.Initialise = function () {
        //Initial starting position for the snake
        this.currentX = Math.round(this.cellCountX / 2) - 1;
        this.currentY = Math.round(this.cellCountY / 2) - 1;
        //Move right initially
        this.direction = SnakeDirection.Right;
        this.matrix[this.currentY][this.currentX] = 1;
    };
    Snake.prototype.Update = function () {
        switch (this.direction) {
            case SnakeDirection.Up:
                if (this.currentY === 0)
                    throw new Error(this.GameOverMessage);
                this.currentY = this.currentY - 1;
                break;
            case SnakeDirection.Down:
                if (this.currentY + 1 === this.cellCountY)
                    throw new Error(this.GameOverMessage);
                this.currentY = this.currentY + 1;
                break;
            case SnakeDirection.Left:
                if (this.currentX === 0)
                    throw new Error(this.GameOverMessage);
                this.currentX = this.currentX - 1;
                break;
            case SnakeDirection.Right:
                if (this.currentX + 1 === this.cellCountX)
                    throw new Error(this.GameOverMessage);
                this.currentX = this.currentX + 1;
                break;
            default:
                //should never happen
                throw new Error();
        }
        //Update the matrix with the new position of the snake
        this.matrix[this.currentY][this.currentX] = 1;
    };
    return Snake;
}());
;
var Board = /** @class */ (function () {
    function Board(canvas, cellCountX, cellCountY) {
        if (cellCountX === void 0) { cellCountX = 20; }
        if (cellCountY === void 0) { cellCountY = 20; }
        this.cellCountX = cellCountX;
        this.cellCountY = cellCountY;
        //Initialse the underlying matrix
        //ref: https://stackoverflow.com/questions/8301400/how-do-you-easily-create-empty-matrices-javascript
        this.matrix = [];
        for (var y = 0; y < this.cellCountY; y++) {
            this.matrix[y] = [];
            for (var x = 0; x < this.cellCountX; x++) {
                this.matrix[y][x] = 0;
            }
        }
        this.canvas = canvas;
        this.snake = new Snake(this.matrix);
    }
    Board.prototype.Initialise = function () {
        //Blank the matrix before initialising
        for (var y = 0; y < this.cellCountY; y++) {
            for (var x = 0; x < this.cellCountX; x++) {
                this.matrix[y][x] = 0;
            }
        }
        this.snake.Initialise();
    };
    Board.prototype.Update = function () {
        //Blank the matrix before performing update
        for (var y = 0; y < this.cellCountY; y++) {
            for (var x = 0; x < this.cellCountX; x++) {
                this.matrix[y][x] = 0;
            }
        }
        this.snake.Update();
    };
    Board.prototype.GetCellDimensions = function () {
        return { cellWidth: this.canvas.offsetWidth / this.cellCountX, cellHeight: this.canvas.offsetHeight / this.cellCountY };
    };
    Board.prototype.Draw = function () {
        var context = this.canvas.getContext('2d');
        var cellDimensions = this.GetCellDimensions();
        var cellWidth = cellDimensions.cellWidth;
        var cellHeight = cellDimensions.cellHeight;
        for (var y = 0; y < this.cellCountY; y++) {
            for (var x = 0; x < this.cellCountX; x++) {
                if (this.matrix[y][x] === 0) {
                    //EMPTY CELL
                    //alternating chequered backgrounds
                    if (y % 2 === 0) {
                        if (x % 2 === 0)
                            context.fillStyle = 'white';
                        else
                            context.fillStyle = 'lightgrey';
                    }
                    else {
                        if (x % 2 === 0)
                            context.fillStyle = 'lightgrey';
                        else
                            context.fillStyle = 'white';
                    }
                    context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                    //TODO: lineTo(x, y) ?
                    context.strokeStyle = 'DarkGrey';
                    context.lineWidth = 1;
                    context.strokeRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                }
                else {
                    //NON-EMPTY CELL
                    context.fillStyle = 'green';
                    context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                }
            }
        }
        //DARK BORDER AROUND THE WHOLE BOARD
        context.strokeStyle = 'DarkGrey';
        context.lineWidth = 1;
        context.strokeRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    };
    return Board;
}());
;
var Game = /** @class */ (function () {
    function Game(canvas) {
        this.isRunning = false;
        this.board = new Board(canvas);
        //Draw the board in its starting state
        this.board.Initialise();
        this.board.Draw();
    }
    Game.prototype.Start = function () {
        var _this = this;
        if (this.isRunning)
            return;
        //Draw the board in its starting state
        this.board.Initialise();
        this.board.Draw();
        this.timerToken = setInterval(function () {
            try {
                var instructions = document.getElementById('instructions');
                instructions.innerText = "Move the snake around the board";
                _this.board.Update();
                _this.board.Draw();
            }
            catch (e) {
                _this.Stop();
                var instructions = document.getElementById('instructions');
                instructions.innerHTML = e.message;
            }
        }, 200);
        this.isRunning = true;
    };
    Game.prototype.Stop = function () {
        clearTimeout(this.timerToken);
        this.isRunning = false;
    };
    Game.prototype.KeyPress = function (keyCode) {
        if (!this.isRunning)
            return;
        if (keyCode < 37 || keyCode > 40)
            return;
        var newDirection;
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
        this.board.snake.Direction = newDirection;
    };
    Game.prototype.MouseDown = function (mouseEvent) {
        if (!this.isRunning)
            return;
        var snakePosition = this.board.snake.SnakePosition;
        var cellDimensions = this.board.GetCellDimensions();
        var snakeDirection = this.board.snake.Direction;
        //nb. the following coordinates refer to the top, left hand side of the current cell the snake's head resides in
        var snakeCoordinatesX = snakePosition.currentX * cellDimensions.cellWidth;
        var snakeCoordinatesY = snakePosition.currentY * cellDimensions.cellHeight;
        var newDirection = snakeDirection;
        switch (snakeDirection) {
            case SnakeDirection.Up:
                break;
            case SnakeDirection.Down:
                break;
            case SnakeDirection.Left:
                break;
            case SnakeDirection.Right:
                //TODO: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
                if (mouseEvent.clientY < snakeCoordinatesY)
                    newDirection = SnakeDirection.Up;
                else if (mouseEvent.clientY > snakeCoordinatesY)
                    newDirection = SnakeDirection.Down;
                break;
            default:
                //should never happen
                throw new Error();
        }
        this.board.snake.Direction = newDirection;
    };
    return Game;
}());
;
window.onload = function () {
    var canvas = document.getElementById('board');
    var game = new Game(canvas);
    canvas.addEventListener("click", function (e) { return game.Start(); });
    //ref: http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
    canvas.addEventListener("mousedown", function (e) { return game.MouseDown(e); });
    document.addEventListener("keydown", function (e) { return game.KeyPress(e.keyCode); });
};
//# sourceMappingURL=app.js.map