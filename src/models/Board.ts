
import Apple = require('./Apple');
import Snake = require('./Snake');

class Board {

    public onAppleEaten?: (applesEaten: number) => void;
    private applesEaten: number;

    public readonly snake: Snake;
    public readonly apple: Apple;

    constructor(public cellCountX = 15, public cellCountY = 15) {

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

        this.UpdateBoard();
    }

    Update(): void {

        this.snake.Update();

        this.UpdateBoard();
    }

    private UpdateBoard(): void {

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