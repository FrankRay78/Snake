define(["require", "exports", "./SnakeDirection", "./Board", "./BoardRenderer"], function (require, exports, SnakeDirection, Board, BoardRenderer) {
    "use strict";
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
    return Game;
});
//# sourceMappingURL=Game.js.map