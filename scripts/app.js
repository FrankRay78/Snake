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
        this.GameOverMessage = 'Game over - click the board to try again';
        //nb. assume a normalised array (ie. the second dimension is never jagged)
        this.cellCountY = matrix.length;
        this.cellCountX = matrix[0].length;
    }
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
        }
        //Update the matrix with the new position of the snake
        this.matrix[this.currentY][this.currentX] = 1;
    };
    Snake.prototype.KeyPress = function (newDirection) {
        this.direction = newDirection;
    };
    return Snake;
}());
;
var Board = /** @class */ (function () {
    function Board(cellDimension, cellCountX, cellCountY) {
        if (cellDimension === void 0) { cellDimension = 10; }
        if (cellCountX === void 0) { cellCountX = 20; }
        if (cellCountY === void 0) { cellCountY = 20; }
        this.cellDimension = cellDimension;
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
        //console.log(this.matrix);
    };
    Board.prototype.Draw = function (canvas) {
        var context = canvas.getContext('2d');
        var cellWidth = canvas.offsetWidth / this.cellCountX;
        var cellHeight = canvas.offsetHeight / this.cellCountY;
        for (var y = 0; y < this.cellCountY; y++) {
            for (var x = 0; x < this.cellCountX; x++) {
                if (this.matrix[y][x] === 0) {
                    //Empty cell
                    context.fillStyle = 'white';
                    context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                    context.strokeStyle = 'DarkGrey';
                    context.lineWidth = 1;
                    context.strokeRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                }
                else {
                    //Non-empty cell
                    context.fillStyle = 'purple';
                    context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                }
            }
        }
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
        this.board.Draw(this.canvas);
    }
    Game.prototype.Start = function () {
        var _this = this;
        if (this.isRunning)
            return;
        //Draw the board in its starting state
        this.board.Initialise();
        this.board.Draw(this.canvas);
        this.timerToken = setInterval(function () {
            try {
                _this.board.Update();
                _this.board.Draw(_this.canvas);
            }
            catch (e) {
                _this.Stop();
                alert(e.message);
            }
        }, 500);
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
        this.board.snake.KeyPress(newDirection);
    };
    return Game;
}());
;
window.onload = function () {
    var canvas = document.getElementById('board');
    var game = new Game(canvas);
    canvas.addEventListener("click", function (e) { return game.Start(); });
    document.addEventListener("keydown", function (e) { return game.KeyPress(e.keyCode); });
};
//# sourceMappingURL=app.js.map