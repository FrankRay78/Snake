
import SnakeDirection = require('./SnakeDirection');

class Snake {

    private readonly GameOverMessage: string = 'Game Over';

    //nb. not zero based
    private cellCountX: number;
    private cellCountY: number;

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

    constructor(cellCountX: number, cellCountY: number) {
        this.cellCountX = cellCountX;
        this.cellCountY = cellCountY;
    }

    Initialise(): void {

        //Initial starting position for the snake
        this.currentX = Math.round(this.cellCountX / 2) - 1;
        this.currentY = Math.round(this.cellCountY / 2) - 1;

        //Move right initially
        this.direction = SnakeDirection.Right;
    }

    Update(): void {

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
    }
};

export = Snake;
