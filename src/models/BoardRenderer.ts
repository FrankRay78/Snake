
import Board = require('./Board');

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

export = BoardRenderer;