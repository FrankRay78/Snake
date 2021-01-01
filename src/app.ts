
enum SnakeDirection {
    Up = 1,
    Down,
    Left,
    Right,
}

class Snake {

    private readonly GameOverMessage: string = 'Game Over';

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

    private matrix;
    public readonly snake: Snake;

    get Matrix(): [][] {
        return this.matrix;
    }

    constructor(public cellCountX = 20, public cellCountY = 20) {

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
        this.Draw();

        //Show play arrow
        this.DrawPlayArrow();
    }

    Start() {
        if (this.isRunning) return;

        //Draw the board in its starting state
        this.board.Initialise();
        this.Draw();

        this.timerToken = setInterval(() => {

            try {

                this.board.Update();

                this.Draw();

            } catch (e) {

                this.Stop();


                //Show game over message

                const context = this.canvas.getContext('2d');

                context.fillStyle = 'magenta';
                context.font = '48px serif';
                context.fillText(e.message, this.canvas.offsetWidth * 0.1, this.canvas.offsetHeight * 0.2);


                //Show play arrow
                this.DrawPlayArrow();
            }


        }, 200);

        this.isRunning = true;
    }

    Stop() {
        clearTimeout(this.timerToken);

        this.isRunning = false;
    }

    GetBoardDimensions() {

        const matrix = this.board.Matrix;

        //nb. assume a normalised array (ie. the second dimension is never jagged)
        const cellCountY = matrix.length;
        const cellCountX = matrix[0].length;

        const cellWidth = this.canvas.offsetWidth / cellCountX;
        const cellHeight = this.canvas.offsetHeight / cellCountY;

        return { cellCountX: cellCountX, cellCountY: cellCountY, cellWidth: cellWidth, cellHeight: cellHeight };
    }

    GetSnakeCoordinates() {

        const dimensions = this.GetBoardDimensions();

        const snakePosition = this.board.snake.SnakePosition;
        const snakeDirection = this.board.snake.Direction;


        //nb. the following coordinates refer to the top, left hand side of the current cell the snake's head resides in
        const snakeCoordinatesX = snakePosition.currentX * dimensions.cellWidth;
        const snakeCoordinatesY = snakePosition.currentY * dimensions.cellHeight;

        return { snakeDirection: snakeDirection, snakeCoordinatesX: snakeCoordinatesX, snakeCoordinatesY: snakeCoordinatesY};
    }

    Draw(): void {

        const dimensions = this.GetBoardDimensions();

        const context = this.canvas.getContext('2d');

        for (let y = 0; y < dimensions.cellCountY; y++) {
            for (let x = 0; x < dimensions.cellCountX; x++) {

                if (this.board.Matrix[y][x] === 0) {

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

                    context.fillRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);

                    //TODO: lineTo(x, y) ?

                    context.strokeStyle = 'DarkGrey';
                    context.lineWidth = 1;
                    context.strokeRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
                }
                else {

                    //NON-EMPTY CELL

                    context.fillStyle = 'green';
                    context.fillRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
                }
            }
        }


        //DARK BORDER AROUND THE WHOLE BOARD

        context.strokeStyle = 'DarkGrey';
        context.lineWidth = 1;
        context.strokeRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    }

    DrawPlayArrow(): void {
        const context = this.canvas.getContext('2d');

        const arrowStartX = (this.canvas.offsetWidth / 2) - 25;
        const arrowStartY = (this.canvas.offsetHeight / 2) - 25;

        context.fillStyle = 'black';

        context.beginPath();
        context.moveTo(arrowStartX, arrowStartY);
        context.lineTo(arrowStartX, arrowStartX + 50);
        context.lineTo(arrowStartX + 50, arrowStartX + 25);
        context.closePath();
        context.fill();
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


        const snakeCoordinates = this.GetSnakeCoordinates();

        //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = mouseEvent.clientX - rect.left;
        const mouseY = mouseEvent.clientY - rect.top;


        let newDirection: SnakeDirection = snakeCoordinates.snakeDirection;

        switch (snakeCoordinates.snakeDirection) {
            case SnakeDirection.Up:

                if (mouseX < snakeCoordinates.snakeCoordinatesX)
                    newDirection = SnakeDirection.Left;
                else if (mouseX > snakeCoordinates.snakeCoordinatesX)
                    newDirection = SnakeDirection.Right;

                break;

            case SnakeDirection.Down:

                if (mouseX < snakeCoordinates.snakeCoordinatesX)
                    newDirection = SnakeDirection.Left;
                else if (mouseX > snakeCoordinates.snakeCoordinatesX)
                    newDirection = SnakeDirection.Right;

                break;

            case SnakeDirection.Left:

                if (mouseY < snakeCoordinates.snakeCoordinatesY)
                    newDirection = SnakeDirection.Up;
                else if (mouseY > snakeCoordinates.snakeCoordinatesY)
                    newDirection = SnakeDirection.Down;

                break;

            case SnakeDirection.Right:

                if (mouseY < snakeCoordinates.snakeCoordinatesY)
                    newDirection = SnakeDirection.Up;
                else if (mouseY > snakeCoordinates.snakeCoordinatesY)
                    newDirection = SnakeDirection.Down;

                break;

            default:
                //should never happen
                throw new Error();
        }

        this.board.snake.Direction = newDirection;
    }

    Touch(touchEvent: TouchEvent): void {
        if (!this.isRunning) return;

        touchEvent.preventDefault();
        const touches = touchEvent.changedTouches;
        const touch = touches[touches.length - 1];


        const snakeCoordinates = this.GetSnakeCoordinates();

        //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = touch.pageX - rect.left;
        const mouseY = touch.pageY - rect.top;


        let newDirection: SnakeDirection = snakeCoordinates.snakeDirection;

        switch (snakeCoordinates.snakeDirection) {
            case SnakeDirection.Up:

                if (mouseX < snakeCoordinates.snakeCoordinatesX)
                    newDirection = SnakeDirection.Left;
                else if (mouseX > snakeCoordinates.snakeCoordinatesX)
                    newDirection = SnakeDirection.Right;

                break;

            case SnakeDirection.Down:

                if (mouseX < snakeCoordinates.snakeCoordinatesX)
                    newDirection = SnakeDirection.Left;
                else if (mouseX > snakeCoordinates.snakeCoordinatesX)
                    newDirection = SnakeDirection.Right;

                break;

            case SnakeDirection.Left:

                if (mouseY < snakeCoordinates.snakeCoordinatesY)
                    newDirection = SnakeDirection.Up;
                else if (mouseY > snakeCoordinates.snakeCoordinatesY)
                    newDirection = SnakeDirection.Down;

                break;

            case SnakeDirection.Right:

                if (mouseY < snakeCoordinates.snakeCoordinatesY)
                    newDirection = SnakeDirection.Up;
                else if (mouseY > snakeCoordinates.snakeCoordinatesY)
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

    canvas.addEventListener("touchstart", (e: TouchEvent) => game.Touch(e));

    document.addEventListener("keydown", (e: KeyboardEvent) => game.KeyPress(e.keyCode));
};
