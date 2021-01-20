define(["require", "exports", "./SnakeDirection"], function (require, exports, SnakeDirection) {
    "use strict";
    class Snake {
        constructor(boardDimensionX, boardDimensionY, startingDirection, startingX, startingY, apple) {
            this.boardDimensionX = boardDimensionX;
            this.boardDimensionY = boardDimensionY;
            this.startingDirection = startingDirection;
            this.startingX = startingX;
            this.startingY = startingY;
            this.apple = apple;
            this.GameOverMessage = 'Game Over';
        }
        set Direction(newDirection) {
            this.direction = newDirection;
        }
        get Position() {
            return { direction: this.direction, currentX: this.currentX, currentY: this.currentY };
        }
        Initialise() {
            this.applesEaten = 0;
            //Initial starting position for the snake
            this.currentX = this.startingX;
            this.currentY = this.startingY;
            //Move right initially
            this.direction = this.startingDirection;
        }
        Update() {
            //Update the position of the snake
            switch (this.direction) {
                case SnakeDirection.Up:
                    if (this.currentY === 0)
                        throw new Error(this.GameOverMessage);
                    this.currentY = this.currentY - 1;
                    break;
                case SnakeDirection.Down:
                    if (this.currentY + 1 === this.boardDimensionY)
                        throw new Error(this.GameOverMessage);
                    this.currentY = this.currentY + 1;
                    break;
                case SnakeDirection.Left:
                    if (this.currentX === 0)
                        throw new Error(this.GameOverMessage);
                    this.currentX = this.currentX - 1;
                    break;
                case SnakeDirection.Right:
                    if (this.currentX + 1 === this.boardDimensionX)
                        throw new Error(this.GameOverMessage);
                    this.currentX = this.currentX + 1;
                    break;
                default:
                    //should never happen
                    throw new Error();
            }
            //Check if the snake has eaten an apple
            if (this.apple) {
                const snakePosition = this.Position;
                const applePosition = this.apple.Position;
                if (snakePosition.currentX === applePosition.currentX &&
                    snakePosition.currentY === applePosition.currentY) {
                    //SNAKE HAS EATEN THE APPLE
                    this.applesEaten = this.applesEaten + 1;
                    //Raise apple eaten event
                    this.RaiseAppleEatenEvent();
                }
            }
        }
        RaiseAppleEatenEvent() {
            if (this.onAppleEaten)
                this.onAppleEaten(this.applesEaten);
        }
    }
    ;
    return Snake;
});
//# sourceMappingURL=Snake.js.map