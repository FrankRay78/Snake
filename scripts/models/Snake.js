define(["require", "exports", "./SnakeDirection"], function (require, exports, SnakeDirection) {
    "use strict";
    var Snake = /** @class */ (function () {
        function Snake(cellCountX, cellCountY, apple) {
            this.cellCountX = cellCountX;
            this.cellCountY = cellCountY;
            this.apple = apple;
            this.GameOverMessage = 'Game Over';
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
            this.applesEaten = 0;
            this.RaiseAppleEatenEvent();
            //Initial starting position for the snake
            this.currentX = Math.round(this.cellCountX / 2) - 1;
            this.currentY = Math.round(this.cellCountY / 2) - 1;
            //Move right initially
            this.direction = SnakeDirection.Right;
        };
        Snake.prototype.Update = function () {
            //Update the position of the snake
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
            //Check if the snake has eaten an apple
            var snakePosition = this.Position;
            var applePosition = this.apple.Position;
            if (snakePosition.currentX === applePosition.currentX &&
                snakePosition.currentY === applePosition.currentY) {
                //SNAKE HAS EATEN THE APPLE
                this.applesEaten = this.applesEaten + 1;
                //Raise apple eaten event
                this.RaiseAppleEatenEvent();
            }
        };
        Snake.prototype.RaiseAppleEatenEvent = function () {
            if (this.onAppleEaten)
                this.onAppleEaten(this.applesEaten);
        };
        return Snake;
    }());
    ;
    return Snake;
});
//# sourceMappingURL=Snake.js.map