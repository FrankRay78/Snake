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
var BoardRenderer = /** @class */ (function () {
    function BoardRenderer(board, canvas) {
        this.board = board;
        this.canvas = canvas;
    }
    BoardRenderer.prototype.GetBoardDimensions = function () {
        var matrix = this.board.Matrix;
        //nb. assume a normalised array (ie. the second dimension is never jagged)
        var cellCountY = matrix.length;
        var cellCountX = matrix[0].length;
        var cellWidth = this.canvas.offsetWidth / cellCountX;
        var cellHeight = this.canvas.offsetHeight / cellCountY;
        return { cellCountX: cellCountX, cellCountY: cellCountY, cellWidth: cellWidth, cellHeight: cellHeight };
    };
    BoardRenderer.prototype.Draw = function () {
        var dimensions = this.GetBoardDimensions();
        var context = this.canvas.getContext('2d');
        for (var y = 0; y < dimensions.cellCountY; y++) {
            for (var x = 0; x < dimensions.cellCountX; x++) {
                if (this.board.Matrix[y][x] === 0) {
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
                    context.fillRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
                    //TODO: lineTo(x, y) ?
                    context.strokeStyle = 'DarkGrey';
                    context.lineWidth = 1;
                    context.strokeRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
                }
                else {
                    //NON-EMPTY CELL
                    context.fillStyle = 'green';
                    context.fillRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
                }
            }
        }
        //DARK BORDER AROUND THE WHOLE BOARD
        context.strokeStyle = 'DarkGrey';
        context.lineWidth = 1;
        context.strokeRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    };
    BoardRenderer.prototype.DrawPlayArrow = function () {
        var context = this.canvas.getContext('2d');
        var arrowStartX = (this.canvas.offsetWidth / 2) - 25;
        var arrowStartY = (this.canvas.offsetHeight / 2) - 25;
        context.fillStyle = 'black';
        context.beginPath();
        context.moveTo(arrowStartX, arrowStartY);
        context.lineTo(arrowStartX, arrowStartX + 50);
        context.lineTo(arrowStartX + 50, arrowStartX + 25);
        context.closePath();
        context.fill();
    };
    BoardRenderer.prototype.DrawGameOver = function () {
        var context = this.canvas.getContext('2d');
        context.fillStyle = 'magenta';
        context.font = '48px serif';
        context.fillText('Game Over', this.canvas.offsetWidth * 0.1, this.canvas.offsetHeight * 0.2);
    };
    return BoardRenderer;
}());
;
var Game = /** @class */ (function () {
    function Game(canvas) {
        this.isRunning = false;
        this.board = new Board();
        this.boardRenderer = new BoardRenderer(this.board, canvas);
        this.board.Initialise();
        //Draw the board in its starting state
        this.boardRenderer.Draw();
        this.boardRenderer.DrawPlayArrow();
    }
    Game.prototype.Start = function () {
        var _this = this;
        if (this.isRunning)
            return;
        this.board.Initialise();
        this.boardRenderer.Draw();
        this.timerToken = setInterval(function () {
            try {
                _this.board.Update();
                _this.boardRenderer.Draw();
            }
            catch (e) {
                _this.Stop();
                _this.boardRenderer.DrawGameOver();
                _this.boardRenderer.DrawPlayArrow();
            }
        }, 200);
        this.isRunning = true;
    };
    Game.prototype.Stop = function () {
        clearTimeout(this.timerToken);
        this.isRunning = false;
    };
    Game.prototype.GetSnakeCoordinates = function () {
        var dimensions = this.boardRenderer.GetBoardDimensions();
        var snakePosition = this.board.snake.SnakePosition;
        var snakeDirection = this.board.snake.Direction;
        //nb. the following coordinates refer to the top, left hand side of the current cell the snake's head resides in
        var snakeCoordinatesX = snakePosition.currentX * dimensions.cellWidth;
        var snakeCoordinatesY = snakePosition.currentY * dimensions.cellHeight;
        return { snakeDirection: snakeDirection, snakeCoordinatesX: snakeCoordinatesX, snakeCoordinatesY: snakeCoordinatesY };
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
    Game.prototype.MouseDown = function (mouseX, mouseY) {
        if (!this.isRunning)
            return;
        var snakeCoordinates = this.GetSnakeCoordinates();
        var newDirection = snakeCoordinates.snakeDirection;
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
        this.board.snake.Direction = newDirection;
    };
    Game.prototype.Touch = function (mouseX, mouseY) {
        if (!this.isRunning)
            return;
        var snakeCoordinates = this.GetSnakeCoordinates();
        var newDirection = snakeCoordinates.snakeDirection;
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
    canvas.addEventListener("mousedown", function (e) {
        //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
        game.MouseDown(mouseX, mouseY);
    });
    canvas.addEventListener("touchstart", function (touchEvent) {
        touchEvent.preventDefault();
        var touches = touchEvent.changedTouches;
        var touch = touches[touches.length - 1];
        //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        var rect = canvas.getBoundingClientRect();
        var touchX = touch.pageX - rect.left;
        var touchY = touch.pageY - rect.top;
        game.Touch(touchX, touchY);
    });
    document.addEventListener("keydown", function (e) { return game.KeyPress(e.keyCode); });
};
//# sourceMappingURL=app.js.map