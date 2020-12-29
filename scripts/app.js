var Snake = /** @class */ (function () {
    function Snake(matrix) {
        this.matrix = matrix;
        //nb. assume a normalised array (ie. the second dimension is never jagged)
        this.cellCountY = matrix.length;
        this.cellCountX = matrix[0].length;
    }
    Snake.prototype.Initialise = function () {
        //Initial starting position for the snake
        this.currentX = Math.round(this.cellCountX / 2) - 1;
        this.currentY = Math.round(this.cellCountY / 2) - 1;
        this.matrix[this.currentY][this.currentX] = 1;
    };
    Snake.prototype.Update = function () {
        if (this.currentX + 1 === this.cellCountX)
            throw new Error('Game over');
        //Move right initially
        if (this.currentX < this.cellCountX - 1) {
            this.matrix[this.currentY][this.currentX] = 0; //clear previous position
            this.currentX = this.currentX + 1;
            this.matrix[this.currentY][this.currentX] = 1;
        }
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
    return Game;
}());
;
window.onload = function () {
    var canvas = document.getElementById('board');
    var game = new Game(canvas);
    canvas.addEventListener("click", function (e) { return game.Start(); });
};
//# sourceMappingURL=app.js.map