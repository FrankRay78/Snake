define(["require", "exports"], function (require, exports) {
    "use strict";
    var BoardRenderer = /** @class */ (function () {
        function BoardRenderer(board, canvas) {
            this.board = board;
            this.canvas = canvas;
        }
        BoardRenderer.prototype.GetBoardDimensions = function () {
            var matrix = this.board.Matrix;
            //nb. assume a normalised array (ie. the second dimension is never jagged)
            var cellCountY = matrix.length;
            var cellCountX = matrix[0].length;
            var cellWidth = this.canvas.offsetWidth / cellCountX;
            var cellHeight = this.canvas.offsetHeight / cellCountY;
            return { cellCountX: cellCountX, cellCountY: cellCountY, cellWidth: cellWidth, cellHeight: cellHeight };
        };
        BoardRenderer.prototype.Draw = function () {
            var dimensions = this.GetBoardDimensions();
            var context = this.canvas.getContext('2d');
            for (var y = 0; y < dimensions.cellCountY; y++) {
                for (var x = 0; x < dimensions.cellCountX; x++) {
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
                                context.fillStyle = 'lightgrey';
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
        };
        BoardRenderer.prototype.DrawPlayArrow = function () {
            var context = this.canvas.getContext('2d');
            var arrowStartX = (this.canvas.offsetWidth / 2) - 25;
            var arrowStartY = (this.canvas.offsetHeight / 2) - 25;
            context.fillStyle = 'black';
            context.beginPath();
            context.moveTo(arrowStartX, arrowStartY);
            context.lineTo(arrowStartX, arrowStartX + 50);
            context.lineTo(arrowStartX + 50, arrowStartX + 25);
            context.closePath();
            context.fill();
        };
        BoardRenderer.prototype.DrawGameOver = function () {
            var context = this.canvas.getContext('2d');
            context.fillStyle = 'magenta';
            context.font = '48px serif';
            context.fillText('Game Over', this.canvas.offsetWidth * 0.1, this.canvas.offsetHeight * 0.2);
        };
        return BoardRenderer;
    }());
    ;
    return BoardRenderer;
});
//# sourceMappingURL=BoardRenderer.js.map