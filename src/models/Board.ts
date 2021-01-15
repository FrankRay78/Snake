
import Apple = require('./Apple');
import Snake = require('./Snake');

class Board {

    public onAppleEaten?: (applesEaten: number) => void;
    private applesEaten: number;

    private matrix;
    public readonly snake: Snake;
    public readonly apple: Apple;

    get Matrix(): [][] {
        return this.matrix;
    }

    constructor(public cellCountX = 15, public cellCountY = 15) {

        //Initialse the underlying matrix
        //ref: https://stackoverflow.com/questions/8301400/how-do-you-easily-create-empty-matrices-javascript
        //nb. will always be a normalised array (ie. the second dimension is never jagged)
        this.matrix = [];
        for (let y = 0; y < this.cellCountY; y++) {
            this.matrix[y] = [];
            for (let x = 0; x < this.cellCountX; x++) {
                this.matrix[y][x] = 0;
            }
        }

        this.applesEaten = 0;
        this.RaiseAppleEatenEvent();

        this.snake = new Snake(cellCountX, cellCountY);
        this.apple = new Apple(Math.round(cellCountX * 0.75), Math.round(cellCountY * 0.75));
    }

    Initialise(): void {

        this.applesEaten = 0;
        this.RaiseAppleEatenEvent();

        this.snake.Initialise();
        this.apple.Initialise();

        this.UpdateMatrix();
    }

    Update(): void {

        this.snake.Update();

        this.UpdateMatrix();
    }

    private UpdateMatrix(): void {

        //Blank the matrix before performing update
        for (let y = 0; y < this.cellCountY; y++) {
            for (let x = 0; x < this.cellCountX; x++) {
                this.matrix[y][x] = 0;
            }
        }

        const snakePosition = this.snake.Position;
        let applePosition = this.apple.Position;

        if (snakePosition.currentX === applePosition.currentX &&
            snakePosition.currentY === applePosition.currentY) {

            //SNAKE HAS EATEN THE APPLE

            this.applesEaten = this.applesEaten + 1;

            //Raise apple eaten event

            this.RaiseAppleEatenEvent();

            //Set a new location for the apple

            let x;
            let y;

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
    }

    private RaiseAppleEatenEvent(): void {
        if (this.onAppleEaten)
            this.onAppleEaten(this.applesEaten);
    }

    //ref: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    private randomIntFromInterval(min, max): number { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};

export = Board;