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
        this.GameOverMessage = 'Game Over';
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
    function Board(cellCountX, cellCountY) {
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
        this.snake = new Snake(this.matrix);
    }
    Object.defineProperty(Board.prototype, "Matrix", {
        get: function () {
            return this.matrix;
        },
        enumerable: false,
        configurable: true
    });
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
    return Board;
}());
;
var Game = /** @class */ (function () {
    function Game(canvas) {
        this.canvas = canvas;
        this.isRunning = false;
        this.board = new Board();
        //Draw the board in its starting state
        this.board.Initialise();
        this.Draw();
    }
    Game.prototype.Start = function () {
        var _this = this;
        if (this.isRunning)
            return;
        //Draw the board in its starting state
        this.board.Initialise();
        this.Draw();
        this.timerToken = setInterval(function () {
            try {
                _this.board.Update();
                _this.Draw();
            }
            catch (e) {
                _this.Stop();
                //Show game over message
                var context = _this.canvas.getContext('2d');
                context.fillStyle = 'magenta';
                context.font = '48px serif';
                context.fillText(e.message, _this.canvas.offsetWidth * 0.1, _this.canvas.offsetHeight * 0.2);
            }
        }, 200);
        this.isRunning = true;
    };
    Game.prototype.Stop = function () {
        clearTimeout(this.timerToken);
        this.isRunning = false;
    };
    Game.prototype.Draw = function () {
        var matrix = this.board.Matrix;
        //nb. assume a normalised array (ie. the second dimension is never jagged)
        var cellCountY = matrix.length;
        var cellCountX = matrix[0].length;
        var cellWidth = this.canvas.offsetWidth / cellCountX;
        var cellHeight = this.canvas.offsetHeight / cellCountY;
        var context = this.canvas.getContext('2d');
        for (var y = 0; y < cellCountY; y++) {
            for (var x = 0; x < cellCountX; x++) {
                if (matrix[y][x] === 0) {
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
        var matrix = this.board.Matrix;
        //nb. assume a normalised array (ie. the second dimension is never jagged)
        var cellCountY = matrix.length;
        var cellCountX = matrix[0].length;
        var cellWidth = this.canvas.offsetWidth / cellCountX;
        var cellHeight = this.canvas.offsetHeight / cellCountY;
        var snakePosition = this.board.snake.SnakePosition;
        var snakeDirection = this.board.snake.Direction;
        //nb. the following coordinates refer to the top, left hand side of the current cell the snake's head resides in
        var snakeCoordinatesX = snakePosition.currentX * cellWidth;
        var snakeCoordinatesY = snakePosition.currentY * cellHeight;
        //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        var rect = this.canvas.getBoundingClientRect();
        var mouseX = mouseEvent.clientX - rect.left;
        var mouseY = mouseEvent.clientY - rect.top;
        var newDirection = snakeDirection;
        switch (snakeDirection) {
            case SnakeDirection.Up:
                if (mouseX < snakeCoordinatesX)
                    newDirection = SnakeDirection.Left;
                else if (mouseX > snakeCoordinatesX)
                    newDirection = SnakeDirection.Right;
                break;
            case SnakeDirection.Down:
                if (mouseX < snakeCoordinatesX)
                    newDirection = SnakeDirection.Left;
                else if (mouseX > snakeCoordinatesX)
                    newDirection = SnakeDirection.Right;
                break;
            case SnakeDirection.Left:
                if (mouseY < snakeCoordinatesY)
                    newDirection = SnakeDirection.Up;
                else if (mouseY > snakeCoordinatesY)
                    newDirection = SnakeDirection.Down;
                break;
            case SnakeDirection.Right:
                if (mouseY < snakeCoordinatesY)
                    newDirection = SnakeDirection.Up;
                else if (mouseY > snakeCoordinatesY)
                    newDirection = SnakeDirection.Down;
                break;
            default:
                //should never happen
                throw new Error();
        }
        this.board.snake.Direction = newDirection;
    };
    Game.prototype.Touch = function (touchEvent) {
        if (!this.isRunning)
            return;
        touchEvent.preventDefault();
        var touches = touchEvent.changedTouches;
        var touch = touches[touches.length - 1];
        var matrix = this.board.Matrix;
        //nb. assume a normalised array (ie. the second dimension is never jagged)
        var cellCountY = matrix.length;
        var cellCountX = matrix[0].length;
        var cellWidth = this.canvas.offsetWidth / cellCountX;
        var cellHeight = this.canvas.offsetHeight / cellCountY;
        var snakePosition = this.board.snake.SnakePosition;
        var snakeDirection = this.board.snake.Direction;
        //nb. the following coordinates refer to the top, left hand side of the current cell the snake's head resides in
        var snakeCoordinatesX = snakePosition.currentX * cellWidth;
        var snakeCoordinatesY = snakePosition.currentY * cellHeight;
        //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        var rect = this.canvas.getBoundingClientRect();
        var mouseX = touch.pageX - rect.left;
        var mouseY = touch.pageY - rect.top;
        var newDirection = snakeDirection;
        switch (snakeDirection) {
            case SnakeDirection.Up:
                if (mouseX < snakeCoordinatesX)
                    newDirection = SnakeDirection.Left;
                else if (mouseX > snakeCoordinatesX)
                    newDirection = SnakeDirection.Right;
                break;
            case SnakeDirection.Down:
                if (mouseX < snakeCoordinatesX)
                    newDirection = SnakeDirection.Left;
                else if (mouseX > snakeCoordinatesX)
                    newDirection = SnakeDirection.Right;
                break;
            case SnakeDirection.Left:
                if (mouseY < snakeCoordinatesY)
                    newDirection = SnakeDirection.Up;
                else if (mouseY > snakeCoordinatesY)
                    newDirection = SnakeDirection.Down;
                break;
            case SnakeDirection.Right:
                if (mouseY < snakeCoordinatesY)
                    newDirection = SnakeDirection.Up;
                else if (mouseY > snakeCoordinatesY)
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
    canvas.addEventListener("touchstart", function (e) { return game.Touch(e); });
    document.addEventListener("keydown", function (e) { return game.KeyPress(e.keyCode); });
};
//# sourceMappingURL=app.js.map