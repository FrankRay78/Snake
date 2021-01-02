﻿
class Apple {

    //nb. zero based
    public currentX: number;
    public currentY: number;

    get Position() {
        return { currentX: this.currentX, currentY: this.currentY };
    }

    constructor(private startingX: number, private startingY: number) {
        this.currentX = startingX;
        this.currentY = startingY;
    }

    Initialise(): void {
        this.currentX = this.startingX;
        this.currentY = this.startingY;
    }
}

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

class BoardRenderer {

    private readonly board: Board;
    private readonly canvas: HTMLCanvasElement;

    constructor(board: Board, canvas: HTMLCanvasElement) {
        this.board = board;
        this.canvas = canvas;
    }

    public GetBoardDimensions() {

        const matrix = this.board.Matrix;

        //nb. assume a normalised array (ie. the second dimension is never jagged)
        const cellCountY = matrix.length;
        const cellCountX = matrix[0].length;

        const cellWidth = this.canvas.offsetWidth / cellCountX;
        const cellHeight = this.canvas.offsetHeight / cellCountY;

        return { cellCountX: cellCountX, cellCountY: cellCountY, cellWidth: cellWidth, cellHeight: cellHeight };
    }

    public Draw(): void {

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
                else if (this.board.Matrix[y][x] === 1) {

                    //SNAKE CELL

                    context.fillStyle = 'green';
                    context.fillRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
                }
                else if (this.board.Matrix[y][x] === 2) {

                    //APPLE CELL

                    context.fillStyle = 'red';
                    context.fillRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
                }
            }
        }

        //DARK BORDER AROUND THE WHOLE BOARD

        context.strokeStyle = 'DarkGrey';
        context.lineWidth = 1;
        context.strokeRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    }

    public DrawPlayArrow(): void {
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

    public DrawGameOver(): void {
        const context = this.canvas.getContext('2d');

        context.fillStyle = 'magenta';
        context.font = '48px serif';
        context.fillText('Game Over', this.canvas.offsetWidth * 0.1, this.canvas.offsetHeight * 0.2);
    }
};

class Game {

    private readonly board: Board;
    private readonly boardRenderer: BoardRenderer;
    private timerToken: number | undefined;
    private isRunning: boolean;


    constructor(canvas: HTMLCanvasElement) {

        this.isRunning = false;

        this.board = new Board();
        this.boardRenderer = new BoardRenderer(this.board, canvas);

        this.board.onAppleEaten = (applesEaten: number) => {

            //Update the game score
            document.getElementById('appleCount').innerText = applesEaten.toString();
        }

        this.board.Initialise();

        //Draw the board in its starting state
        this.boardRenderer.Draw();
        this.boardRenderer.DrawPlayArrow();
    }

    Start() {

        if (this.isRunning) return;


        this.board.Initialise();

        this.boardRenderer.Draw();

        this.timerToken = setInterval(() => {

            try {

                //Update the board and redraw it to the canvas on each timer tick

                this.board.Update();

                this.boardRenderer.Draw();

            } catch (e) {

                this.Stop();

                this.boardRenderer.DrawGameOver();

                this.boardRenderer.DrawPlayArrow();
            }


        }, 200);

        this.isRunning = true;
    }

    Stop() {

        if (!this.isRunning) return;


        clearTimeout(this.timerToken);

        this.isRunning = false;
    }

    GetSnakeCoordinates() {

        const dimensions = this.boardRenderer.GetBoardDimensions();

        const snakePosition = this.board.snake.Position;

        //nb. the following coordinates refer to the top, left hand side of the current cell the snake's head resides in
        const snakeCoordinatesX = snakePosition.currentX * dimensions.cellWidth;
        const snakeCoordinatesY = snakePosition.currentY * dimensions.cellHeight;

        return { snakeDirection: snakePosition.direction, snakeCoordinatesX: snakeCoordinatesX, snakeCoordinatesY: snakeCoordinatesY };
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

    MouseDown(mouseX: number, mouseY: number): void {

        if (!this.isRunning) return;


        const snakeCoordinates = this.GetSnakeCoordinates();

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

    Touch(mouseX: number, mouseY: number): void {

        if (!this.isRunning) return;


        const snakeCoordinates = this.GetSnakeCoordinates();

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

    canvas.addEventListener("click", () => game.Start());

    //ref: http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
    canvas.addEventListener("mousedown", (e: MouseEvent) => {

        //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        game.MouseDown(mouseX, mouseY);
    });

    canvas.addEventListener("touchstart", (touchEvent: TouchEvent) => {

        touchEvent.preventDefault();
        const touches = touchEvent.changedTouches;
        const touch = touches[touches.length - 1];

        //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        const rect = canvas.getBoundingClientRect();
        const touchX = touch.pageX - rect.left;
        const touchY = touch.pageY - rect.top;

        game.Touch(touchX, touchY);
    });

    document.addEventListener("keydown", (e: KeyboardEvent) => game.KeyPress(e.keyCode));
};
