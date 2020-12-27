
class Snake {

    constructor(public startingX = 5, public startingY = 5) {
    }

    Draw(canvas: HTMLCanvasElement): void {

        return; //DO NOTHING FOR NOW

        const context = canvas.getContext('2d');

        context.strokeStyle = 'green';
        context.fillRect(canvas.offsetWidth / 2, canvas.offsetHeight / 2, 20, 20);
    }
};

class Board {

    private matrix;

    constructor(public cellDimension = 10, public cellCountX = 10, public cellCountY = 10) {

        //Initialse the underlying matrix
        //ref: https://stackoverflow.com/questions/8301400/how-do-you-easily-create-empty-matrices-javascript
        this.matrix = [];
        for (let y = 0; y < this.cellCountY; y++) {
            this.matrix[y] = [];
            for (let x = 0; x < this.cellCountX; x++) {
                this.matrix[y][x] = 0;
            }
        }

        this.matrix[4][4] = 1;
    }

    Draw(canvas: HTMLCanvasElement): void {

        const context = canvas.getContext('2d');

        const cellWidth = canvas.offsetWidth / this.cellCountX;
        const cellHeight = canvas.offsetHeight / this.cellCountY;

        for (let y = 0; y < this.cellCountY; y++) {
            for (let x = 0; x < this.cellCountX; x++) {

                if (this.matrix[y][x] === 0) {

                    //Empty cell
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

    //private readonly context: CanvasRenderingContext2D;
    private readonly board: Board;
    private readonly snake: Snake;
    timerToken: number;

    constructor(public canvas: HTMLCanvasElement) {

        this.board = new Board();
        this.snake = new Snake();

        //if (canvas.getContext) {
        //    window.requestAnimationFrame(() => this.Draw());
        //}
    }

    Draw(): void {
        //nb. Draw will only get called if the canvas has a context

        this.board.Draw(this.canvas);
        this.snake.Draw(this.canvas);

        //window.requestAnimationFrame(() => this.Draw());
    }

    Start() {
        this.timerToken = setInterval(() => this.Draw(), 500);
    }

    Stop() {
        clearTimeout(this.timerToken);
    }
};



//window.onload = function() {
window.onload = () => {

    const canvas = document.getElementById('board') as HTMLCanvasElement;

    const game = new Game(canvas);

    game.Start();

    //canvas.click(() => alert('hello'));
    canvas.addEventListener("click", (e: Event) => alert('TODO: start the snake moving'));
};
