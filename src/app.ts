
class Snake {

    //nb. not zero based
    private cellCountX: number;
    private cellCountY: number;

    //nb. zero based
    private currentX: number;
    private currentY: number;

    constructor(private matrix) {

        //nb. assume a normalised array (ie. the second dimension is never jagged)
        this.cellCountY = matrix.length;
        this.cellCountX = matrix[0].length;
    }

    Initialise(): void {

        //Initial starting position for the snake
        this.currentX = Math.round(this.cellCountX / 2) - 1;
        this.currentY = Math.round(this.cellCountY / 2) - 1;

        this.matrix[this.currentY][this.currentX] = 1;
    }

    Update(): void {

        if (this.currentX + 1 === this.cellCountX)
            throw new Error('Game over');


        //Move right initially

        if (this.currentX < this.cellCountX - 1) {

            this.matrix[this.currentY][this.currentX] = 0; //clear previous position

            this.currentX = this.currentX + 1;

            this.matrix[this.currentY][this.currentX] = 1;
        }
    }
};

class Board {

    private matrix;
    private readonly snake: Snake;

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
};



window.onload = () => {

    const canvas = document.getElementById('board') as HTMLCanvasElement;

    const game = new Game(canvas);

    canvas.addEventListener("click", (e: Event) => game.Start());
};
