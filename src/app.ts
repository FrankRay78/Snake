
enum SnakeDirection {
    Up = 1,
    Down,
    Left,
    Right,
}

class Snake {

    private readonly GameOverMessage: string = '<b style="color: magenta">Game Over</b> - Click the board to try again';

    //nb. not zero based
    private cellCountX: number;
    private cellCountY: number;

    //nb. zero based
    private currentX: number;
    private currentY: number;

    get SnakePosition() {
        return { currentX: this.currentX, currentY: this.currentY };
    }

    private direction: SnakeDirection;

    get Direction(): SnakeDirection {
        return this.direction;
    }
    set Direction(newDirection: SnakeDirection) {
        this.direction = newDirection;
    }

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
                throw new Error();
        }


        //Update the matrix with the new position of the snake

        this.matrix[this.currentY][this.currentX] = 1;
    }
};

class Board {

    private readonly canvas: HTMLCanvasElement;
    private matrix;
    public readonly snake: Snake;

    constructor(canvas: HTMLCanvasElement, public cellCountX = 20, public cellCountY = 20) {

        //Initialse the underlying matrix
        //ref: https://stackoverflow.com/questions/8301400/how-do-you-easily-create-empty-matrices-javascript
        this.matrix = [];
        for (let y = 0; y < this.cellCountY; y++) {
            this.matrix[y] = [];
            for (let x = 0; x < this.cellCountX; x++) {
                this.matrix[y][x] = 0;
            }
        }

        this.canvas = canvas;
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
    }

    GetCellDimensions() {
        return { cellWidth: this.canvas.offsetWidth / this.cellCountX, cellHeight: this.canvas.offsetHeight / this.cellCountY };
    }

    Draw(): void {

        const context = this.canvas.getContext('2d');

        const cellDimensions = this.GetCellDimensions();
        const cellWidth = cellDimensions.cellWidth;
        const cellHeight = cellDimensions.cellHeight;

        for (let y = 0; y < this.cellCountY; y++) {
            for (let x = 0; x < this.cellCountX; x++) {

                if (this.matrix[y][x] === 0) {

                    //EMPTY CELL

                    //alternating chequered backgrounds

                    if (y % 2 === 0) {
                        if (x % 2 === 0)
                            context.fillStyle = 'white';
                        else
                            context.fillStyle = 'lightgrey';
                    }
                    else {
                        if (x % 2 === 0)
                            context.fillStyle = 'lightgrey'
                        else
                            context.fillStyle = 'white';
                    }
                    
                    context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);

                    //TODO: lineTo(x, y) ?

                    context.strokeStyle = 'DarkGrey';
                    context.lineWidth = 1;
                    context.strokeRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                }
                else {

                    //NON-EMPTY CELL

                    context.fillStyle = 'green';
                    context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                }
            }
        }


        //DARK BORDER AROUND THE WHOLE BOARD

        context.strokeStyle = 'DarkGrey';
        context.lineWidth = 1;
        context.strokeRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    }
};

class Game {

    private readonly board: Board;
    private timerToken: number;
    private isRunning: boolean;


    constructor(canvas: HTMLCanvasElement) {

        this.isRunning = false;

        this.board = new Board(canvas);

        //Draw the board in its starting state
        this.board.Initialise();
        this.board.Draw();
    }

    Start() {
        if (this.isRunning) return;

        //Draw the board in its starting state
        this.board.Initialise();
        this.board.Draw();

        this.timerToken = setInterval(() => {

            try {

                const instructions = document.getElementById('instructions') as HTMLParagraphElement;
                instructions.innerText = "Move the snake around the board";

                this.board.Update();

                this.board.Draw();

            } catch (e) {

                this.Stop();

                const instructions = document.getElementById('instructions') as HTMLParagraphElement;
                instructions.innerHTML = e.message;
            }


        }, 200);

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

        this.board.snake.Direction = newDirection;
    }

    MouseDown(mouseEvent: MouseEvent): void {
        if (!this.isRunning) return;

        const snakePosition = this.board.snake.SnakePosition;
        const cellDimensions = this.board.GetCellDimensions();
        const snakeDirection = this.board.snake.Direction;

        //nb. the following coordinates refer to the top, left hand side of the current cell the snake's head resides in
        const snakeCoordinatesX = snakePosition.currentX * cellDimensions.cellWidth;
        const snakeCoordinatesY = snakePosition.currentY * cellDimensions.cellHeight;


        let newDirection: SnakeDirection = snakeDirection;

        switch (snakeDirection) {
            case SnakeDirection.Up:

                break;

            case SnakeDirection.Down:

                break;

            case SnakeDirection.Left:

                break;

            case SnakeDirection.Right:

                //TODO: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas

                if (mouseEvent.clientY < snakeCoordinatesY)
                    newDirection = SnakeDirection.Up;
                else if (mouseEvent.clientY > snakeCoordinatesY)
                    newDirection = SnakeDirection.Down;

                break;

            default:
                //should never happen
                throw new Error();
        }

        this.board.snake.Direction = newDirection;
    }
};



window.onload = () => {

    const canvas = document.getElementById('board') as HTMLCanvasElement;

    const game = new Game(canvas);

    canvas.addEventListener("click", (e: Event) => game.Start());

    //ref: http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
    canvas.addEventListener("mousedown", (e: MouseEvent) => game.MouseDown(e));

    document.addEventListener("keydown", (e: KeyboardEvent) => game.KeyPress(e.keyCode));
};
