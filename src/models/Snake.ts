
import SnakeDirection = require('./SnakeDirection');
import Apple = require('./Apple');

class Snake {

    private readonly GameOverMessage: string = 'Game Over';

    public onAppleEaten?: (applesEaten: number) => void;
    private applesEaten: number;

    //nb. zero based
    private currentX: number;
    private currentY: number;

    private direction: SnakeDirection;

    set Direction(newDirection: SnakeDirection) {
        this.direction = newDirection;
    }

    get Position() {
        return { direction: this.direction, currentX: this.currentX, currentY: this.currentY };
    }

    private length: number;

    get Length() {
        return this.length;
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
        this.length = 1;

        //Initial starting position for the snake
        this.currentX = this.startingX;
        this.currentY = this.startingY;

        //Move right initially
        this.direction = this.startingDirection;
    }

    Update(): void {

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

                this.applesEaten += 1;
                this.length += this.growIncrement;

                //Raise apple eaten event

                this.RaiseAppleEatenEvent();
            }
        }
    }

    private RaiseAppleEatenEvent(): void {
        if (this.onAppleEaten)
            this.onAppleEaten(this.applesEaten);
    }
};

export = Snake;
