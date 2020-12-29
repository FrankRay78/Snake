
enum SnakeDirection {
    Up = 1,
    Down,
    Left,
    Right,
}

class Snake {

    private readonly GameOverMessage: string = 'Game over - click the board to try again';

    //nb. not zero based
    private cellCountX: number;
    private cellCountY: number;

    //nb. zero based
    private currentX: number;
    private currentY: number;

    private direction: SnakeDirection;

    constructor(private matrix) {

        //nb. assume a normalised array (ie. the second dimension is never jagged)
        this.cellCountY = matrix.length;
        this.cellCountX = matrix[0].length;
    }

    Initialise(): void {

        //Initial starting position for the snake
        this.currentX = Math.round(this.cellCountX / 2) - 1;
        this.currentY = Math.round(this.cellCountY / 2) - 1;

        //Move right initially
        this.direction = SnakeDirection.Right;

        this.matrix[this.currentY][this.currentX] = 1;
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
        }


        //Update the matrix with the new position of the snake

        this.matrix[this.currentY][this.currentX] = 1;
    }

    KeyPress(newDirection: SnakeDirection): void {
        this.direction = newDirection;
    }
};

class Board {

    private matrix;
    public readonly snake: Snake;

    constructor(public cellDimension = 10, public cellCountX = 20, public cellCountY = 20) {

        //Initialse the underlying matrix
        //ref: https://stackoverflow.com/questions/8301400/how-do-you-easily-create-empty-matrices-javascript
        this.matrix = [];
        for (let y = 0; y < this.cellCountY; y++) {
            this.matrix[y] = [];
            for (let x = 0; x < this.cellCountX; x++) {
                this.matrix[y][x] = 0;
            }
        }

        this.snake = new Snake(this.matrix);
    }

    Initialise(): void {

        //Blank the matrix before initialising
        for (let y = 0; y < this.cellCountY; y++) {
            for (let x = 0; x < this.cellCountX; x++) {
                this.matrix[y][x] = 0;
            }
        }

        this.snake.Initialise();
    }

    Update(): void {

        //Blank the matrix before performing update
        for (let y = 0; y < this.cellCountY; y++) {
            for (let x = 0; x < this.cellCountX; x++) {
                this.matrix[y][x] = 0;
            }
        }

        this.snake.Update();

        //console.log(this.matrix);
    }

    Draw(canvas: HTMLCanvasElement): void {

        const context = canvas.getContext('2d');

        const cellWidth = canvas.offsetWidth / this.cellCountX;
        const cellHeight = canvas.offsetHeight / this.cellCountY;

        for (let y = 0; y < this.cellCountY; y++) {
            for (let x = 0; x < this.cellCountX; x++) {

                if (this.matrix[y][x] === 0) {

                    //Empty cell

                    context.fillStyle = 'white';
                    context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);

                    context.strokeStyle = 'DarkGrey';
                    context.lineWidth = 1;
                    context.strokeRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                }
                else {

                    //Non-empty cell
                    context.fillStyle = 'purple';
                    context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                }
            }
        }
    }
};

class Game {

    private readonly board: Board;
    private timerToken: number;
    private isRunning: boolean;


    constructor(public canvas: HTMLCanvasElement) {

        this.isRunning = false;

        this.board = new Board();

        //Draw the board in its starting state
        this.board.Initialise();
        this.board.Draw(this.canvas);
    }

    Start() {
        if (this.isRunning) return;

        //Draw the board in its starting state
        this.board.Initialise();
        this.board.Draw(this.canvas);

        this.timerToken = setInterval(() => {

            try {

                this.board.Update();

                this.board.Draw(this.canvas);

            } catch (e) {

                this.Stop();

                alert(e.message);
            }


        }, 500);

        this.isRunning = true;
    }

    Stop() {
        clearTimeout(this.timerToken);

        this.isRunning = false;
    }

    KeyPress(keyCode: number): void {
        if (!this.isRunning) return;

        if (keyCode < 37 || keyCode > 40) return;


        let newDirection: SnakeDirection;

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

        this.board.snake.KeyPress(newDirection);
    }
};



window.onload = () => {

    const canvas = document.getElementById('board') as HTMLCanvasElement;

    const game = new Game(canvas);

    canvas.addEventListener("click", (e: Event) => game.Start());

    document.addEventListener("keydown", (e: KeyboardEvent) => game.KeyPress(e.keyCode));
};
