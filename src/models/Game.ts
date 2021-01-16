
import SnakeDirection = require('./SnakeDirection');
import Board = require('./Board');
import BoardRenderer = require('./BoardRenderer');

class Game {

    private readonly board: Board;
    private readonly boardRenderer: BoardRenderer;
    private timerToken: number | undefined;
    private isRunning: boolean;

    get IsRunning(): boolean {
        return this.isRunning;
    }


    constructor(canvas: HTMLCanvasElement) {

        this.isRunning = false;

        this.board = new Board();
        this.boardRenderer = new BoardRenderer(this.board, canvas);


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

                this.board.snake.Update();

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

    private GetSnakeCoordinates() {

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

export = Game;