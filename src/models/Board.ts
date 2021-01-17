
import Apple = require('./Apple');
import Snake = require('./Snake');

class Board {

    public readonly snake: Snake;
    public readonly apple: Apple;

    constructor(public cellCountX = 15, public cellCountY = 15) {

        this.apple = new Apple(Math.round(cellCountX * 0.75), Math.round(cellCountY * 0.75));
        this.snake = new Snake(cellCountX, cellCountY, this.apple);

        this.snake.onAppleEaten = (applesEaten: number) => {

            //Update the game score
            document.getElementById('appleCount').innerText = applesEaten.toString();

            //Set a new position for the next apple
            this.PlaceNextApple();
        }
    }

    Initialise(): void {

        this.snake.Initialise();
        this.apple.Initialise();
    }

    private PlaceNextApple(): void {

        const snakePosition = this.snake.Position;

        //Set a new location for the apple

        let x;
        let y;

        do {
            //Find a new location for the apple which is 1). on the board and 2). not on the snake

            x = this.randomIntFromInterval(0, this.cellCountX - 1);
            y = this.randomIntFromInterval(0, this.cellCountY - 1);

        } while (
            x === snakePosition.currentX &&
            y === snakePosition.currentY);

        //Move the apple to the new location
        this.apple.currentX = x;
        this.apple.currentY = y;
    }

    //ref: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    private randomIntFromInterval(min, max): number { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};

export = Board;