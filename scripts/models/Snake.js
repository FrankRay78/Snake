define(["require", "exports", "./SnakeDirection", "./SnakePosition"], function (require, exports, SnakeDirection, SnakePosition) {
    "use strict";
    class Snake {
        constructor(boardDimensionX, boardDimensionY, startingDirection, startingX, startingY, growIncrement, apple) {
            this.boardDimensionX = boardDimensionX;
            this.boardDimensionY = boardDimensionY;
            this.startingDirection = startingDirection;
            this.startingX = startingX;
            this.startingY = startingY;
            this.growIncrement = growIncrement;
            this.apple = apple;
            this.GameOverMessage = 'Game Over';
        }
        set Direction(newDirection) {
            this.direction = newDirection;
        }
        get Length() {
            return this.snakeHeadAndBody.length;
        }
        get HeadPosition() {
            return { direction: this.direction, currentX: this.snakeHeadAndBody[0].X, currentY: this.snakeHeadAndBody[0].Y };
        }
        SnakeOverlapsWith(x, y) {
            let i;
            for (i = 0; i < this.snakeHeadAndBody.length; i += 1) {
                if (this.snakeHeadAndBody[i].X === x && this.snakeHeadAndBody[i].Y === y)
                    return true;
            }
            return false;
        }
        Initialise() {
            this.applesEaten = 0;
            this.growthRequired = 0;
            //Initial starting position for the snake
            this.snakeHeadAndBody = [];
            this.snakeHeadAndBody.push(new SnakePosition(this.startingX, this.startingY));
            //Move right initially
            this.direction = this.startingDirection;
        }
        Update() {
            //Update the position of the snake
            switch (this.direction) {
                case SnakeDirection.Up:
                    if (this.HeadPosition.currentY === 0)
                        throw new Error(this.GameOverMessage);
                    if (this.SnakeOverlapsWith(this.HeadPosition.currentX, this.HeadPosition.currentY - 1))
                        throw new Error(this.GameOverMessage);
                    this.UpdateSnakeGrowIfRequired(this.HeadPosition.currentX, this.HeadPosition.currentY - 1);
                    break;
                case SnakeDirection.Down:
                    if (this.HeadPosition.currentY + 1 === this.boardDimensionY)
                        throw new Error(this.GameOverMessage);
                    if (this.SnakeOverlapsWith(this.HeadPosition.currentX, this.HeadPosition.currentY + 1))
                        throw new Error(this.GameOverMessage);
                    this.UpdateSnakeGrowIfRequired(this.HeadPosition.currentX, this.HeadPosition.currentY + 1);
                    break;
                case SnakeDirection.Left:
                    if (this.HeadPosition.currentX === 0)
                        throw new Error(this.GameOverMessage);
                    if (this.SnakeOverlapsWith(this.HeadPosition.currentX - 1, this.HeadPosition.currentY))
                        throw new Error(this.GameOverMessage);
                    this.UpdateSnakeGrowIfRequired(this.HeadPosition.currentX - 1, this.HeadPosition.currentY);
                    break;
                case SnakeDirection.Right:
                    if (this.HeadPosition.currentX + 1 === this.boardDimensionX)
                        throw new Error(this.GameOverMessage);
                    if (this.SnakeOverlapsWith(this.HeadPosition.currentX + 1, this.HeadPosition.currentY))
                        throw new Error(this.GameOverMessage);
                    this.UpdateSnakeGrowIfRequired(this.HeadPosition.currentX + 1, this.HeadPosition.currentY);
                    break;
                default:
                    //should never happen
                    throw new Error();
            }
            //Check if the snake has eaten an apple
            if (this.apple) {
                const snakePosition = this.HeadPosition;
                const applePosition = this.apple.Position;
                if (snakePosition.currentX === applePosition.currentX &&
                    snakePosition.currentY === applePosition.currentY) {
                    //SNAKE HAS EATEN THE APPLE
                    this.applesEaten += 1;
                    this.growthRequired += this.growIncrement;
                    //Raise apple eaten event
                    this.RaiseAppleEatenEvent();
                }
            }
        }
        UpdateSnakeGrowIfRequired(newHeadX, newHeadY) {
            if (this.growthRequired > 0) {
                //Add a new head location at the front of the array and leave all other body elements as is (ie. growing the snake's length from the head)
                this.snakeHeadAndBody.unshift(new SnakePosition(newHeadX, newHeadY));
                this.growthRequired -= 1;
            }
            else {
                //Add a new head location at the front of the array and remove the last body element (ie. the snake moves forward one cell)
                this.snakeHeadAndBody.unshift(new SnakePosition(newHeadX, newHeadY));
                this.snakeHeadAndBody.pop();
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