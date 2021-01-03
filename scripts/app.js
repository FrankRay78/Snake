var Apple = /** @class */ (function () {
    function Apple(startingX, startingY) {
        this.startingX = startingX;
        this.startingY = startingY;
        this.currentX = startingX;
        this.currentY = startingY;
    }
    Object.defineProperty(Apple.prototype, "Position", {
        get: function () {
            return { currentX: this.currentX, currentY: this.currentY };
        },
        enumerable: false,
        configurable: true
    });
    Apple.prototype.Initialise = function () {
        this.currentX = this.startingX;
        this.currentY = this.startingY;
    };
    return Apple;
}());
var SnakeDirection;
(function (SnakeDirection) {
    SnakeDirection[SnakeDirection["Up"] = 1] = "Up";
    SnakeDirection[SnakeDirection["Down"] = 2] = "Down";
    SnakeDirection[SnakeDirection["Left"] = 3] = "Left";
    SnakeDirection[SnakeDirection["Right"] = 4] = "Right";
})(SnakeDirection || (SnakeDirection = {}));
var Snake = /** @class */ (function () {
    function Snake(cellCountX, cellCountY) {
        this.GameOverMessage = 'Game Over';
        this.cellCountX = cellCountX;
        this.cellCountY = cellCountY;
    }
    Object.defineProperty(Snake.prototype, "Direction", {
        set: function (newDirection) {
            this.direction = newDirection;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "Position", {
        get: function () {
            return { direction: this.direction, currentX: this.currentX, currentY: this.currentY };
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
    };
    return Snake;
}());
;
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
                else if (this.board.Matrix[y][x] === 1) {
                    //SNAKE CELL
                    context.fillStyle = 'green';
                    context.fillRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
                }
                else if (this.board.Matrix[y][x] === 2) {
                    //APPLE CELL
                    context.fillStyle = 'red';
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
        this.board.onAppleEaten = function (applesEaten) {
            //Update the game score
            document.getElementById('appleCount').innerText = applesEaten.toString();
        };
        this.board.Initialise();
        //Draw the board in its starting state
        this.boardRenderer.Draw();
        this.boardRenderer.DrawPlayArrow();
    }
    Object.defineProperty(Game.prototype, "IsRunning", {
        get: function () {
            return this.isRunning;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.Start = function () {
        var _this = this;
        if (this.isRunning)
            return;
        this.board.Initialise();
        this.boardRenderer.Draw();
        this.timerToken = setInterval(function () {
            try {
                //Update the board and redraw it to the canvas on each timer tick
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
        if (!this.isRunning)
            return;
        clearTimeout(this.timerToken);
        this.isRunning = false;
    };
    Game.prototype.GetSnakeCoordinates = function () {
        var dimensions = this.boardRenderer.GetBoardDimensions();
        var snakePosition = this.board.snake.Position;
        //nb. the following coordinates refer to the top, left hand side of the current cell the snake's head resides in
        var snakeCoordinatesX = snakePosition.currentX * dimensions.cellWidth;
        var snakeCoordinatesY = snakePosition.currentY * dimensions.cellHeight;
        return { snakeDirection: snakePosition.direction, snakeCoordinatesX: snakeCoordinatesX, snakeCoordinatesY: snakeCoordinatesY };
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
    canvas.addEventListener("click", function () { return game.Start(); }, false);
    document.addEventListener("keydown", function (e) { return game.KeyPress(e.keyCode); }, false);
    canvas.addEventListener("mousedown", function (e) {
        //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;
        game.MouseDown(mouseX, mouseY);
    }, false);
    //ref: http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
    canvas.addEventListener("touchstart", function (touchEvent) {
        touchEvent.preventDefault();
        if (!game.IsRunning) {
            //nb. the click event above doesn't fire on mobile devices
            //so we need another way to start the game on the first touch (if not already running)
            game.Start();
            return;
        }
        var touches = touchEvent.changedTouches;
        var touch = touches[touches.length - 1];
        //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        var rect = canvas.getBoundingClientRect();
        var touchX = touch.pageX - rect.left;
        var touchY = touch.pageY - rect.top;
        game.Touch(touchX, touchY);
    }, false);
};
//# sourceMappingURL=app.js.map