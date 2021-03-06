﻿
import SnakeDirection = require('./SnakeDirection');
import SnakePosition = require('./SnakePosition');
import Apple = require('./Apple');
import GameOver = require('./GameOver');

class Snake {

    public onAppleEaten?: (applesEaten: number) => void;
    private applesEaten: number;
    private growthRequired: number;

    private directionOnNextUpdate: SnakeDirection; //a user event 
    private direction: SnakeDirection;

    set Direction(newDirection: SnakeDirection) {

        if (this.Length === 1) {

            //Always allow the snake to change direction 180 degrees before it's started growing (ie. single cell)
            this.directionOnNextUpdate = newDirection;
        }
        else {

            //Prevent any 180 degree changes if the snake already has a tail

            switch (this.direction) {
                case SnakeDirection.Up:
                    if (newDirection === SnakeDirection.Down) return;
                    break;

                case SnakeDirection.Down:
                    if (newDirection === SnakeDirection.Up) return;
                    break;

                case SnakeDirection.Left:
                    if (newDirection === SnakeDirection.Right) return;
                    break;

                case SnakeDirection.Right:
                    if (newDirection === SnakeDirection.Left) return;
                    break;

                default:
            }

            //We're still here so all good to update the direction
            this.directionOnNextUpdate = newDirection;
        }
    }

    private snakeHeadAndBody: SnakePosition[];

    get Length() {
        return this.snakeHeadAndBody.length;
    }

    get HeadPosition() {
        return { direction: this.direction, currentX: this.snakeHeadAndBody[0].X, currentY: this.snakeHeadAndBody[0].Y };
    }

    public SnakeOverlapsWith(x: number, y: number): boolean {

        let i;
        for (i = 0; i < this.snakeHeadAndBody.length; i += 1) {
            if (this.snakeHeadAndBody[i].X === x && this.snakeHeadAndBody[i].Y === y)
                return true;
        }

        return false;
    }

    constructor(
        private boardDimensionX: number,
        private boardDimensionY: number,
        private startingDirection: SnakeDirection,
        private startingX: number,
        private startingY: number,
        private growIncrement: number,
        public apple: Apple | null) {
    }

    Initialise(): void {

        this.applesEaten = 0;
        this.growthRequired = 0;

        //Initial starting position for the snake
        this.snakeHeadAndBody = [];
        this.snakeHeadAndBody.push(new SnakePosition(this.startingX, this.startingY)); 

        //Move right initially
        this.direction = this.startingDirection;
        this.directionOnNextUpdate = this.startingDirection;
    }

    Update(): void {

        //Account for any user requested change of direction before performing the snake update
        this.direction = this.directionOnNextUpdate;


        //Update the position of the snake

        switch (this.direction) {
            case SnakeDirection.Up:

                if (this.HeadPosition.currentY === 0)
                    throw new GameOver(this.applesEaten);

                if (this.SnakeOverlapsWith(this.HeadPosition.currentX, this.HeadPosition.currentY - 1))
                    throw new GameOver(this.applesEaten);

                this.UpdateSnakeGrowIfRequired(this.HeadPosition.currentX, this.HeadPosition.currentY - 1);

                break;

            case SnakeDirection.Down:

                if (this.HeadPosition.currentY + 1 === this.boardDimensionY)
                    throw new GameOver(this.applesEaten);

                if (this.SnakeOverlapsWith(this.HeadPosition.currentX, this.HeadPosition.currentY + 1))
                    throw new GameOver(this.applesEaten);

                this.UpdateSnakeGrowIfRequired(this.HeadPosition.currentX, this.HeadPosition.currentY + 1);

                break;

            case SnakeDirection.Left:

                if (this.HeadPosition.currentX === 0)
                    throw new GameOver(this.applesEaten);

                if (this.SnakeOverlapsWith(this.HeadPosition.currentX - 1, this.HeadPosition.currentY))
                    throw new GameOver(this.applesEaten);

                this.UpdateSnakeGrowIfRequired(this.HeadPosition.currentX - 1, this.HeadPosition.currentY);

                break;

            case SnakeDirection.Right:

                if (this.HeadPosition.currentX + 1 === this.boardDimensionX)
                    throw new GameOver(this.applesEaten);

                if (this.SnakeOverlapsWith(this.HeadPosition.currentX + 1, this.HeadPosition.currentY))
                    throw new GameOver(this.applesEaten);

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

    private UpdateSnakeGrowIfRequired(newHeadX: number, newHeadY: number) {

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

    private RaiseAppleEatenEvent(): void {
        if (this.onAppleEaten)
            this.onAppleEaten(this.applesEaten);
    }
};

export = Snake;
