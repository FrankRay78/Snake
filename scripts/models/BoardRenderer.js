define(["require", "exports"], function (require, exports) {
    "use strict";
    var BoardRenderer = /** @class */ (function () {
        function BoardRenderer(board, canvas) {
            this.board = board;
            this.canvas = canvas;
        }
        BoardRenderer.prototype.GetBoardDimensions = function () {
            //nb. assume a normalised array (ie. the second dimension is never jagged)
            var cellCountY = this.board.cellCountY;
            var cellCountX = this.board.cellCountX;
            var cellWidth = this.canvas.offsetWidth / cellCountX;
            var cellHeight = this.canvas.offsetHeight / cellCountY;
            return { cellCountX: cellCountX, cellCountY: cellCountY, cellWidth: cellWidth, cellHeight: cellHeight };
        };
        BoardRenderer.prototype.Draw = function () {
            var context = this.canvas.getContext('2d');
            var dimensions = this.GetBoardDimensions();
            var snakePosition = this.board.snake.Position;
            var applePosition = this.board.apple.Position;
            for (var y = 0; y < dimensions.cellCountY; y++) {
                for (var x = 0; x < dimensions.cellCountX; x++) {
                    if (y === snakePosition.currentY &&
                        x === snakePosition.currentX) {
                        //SNAKE CELL
                        context.fillStyle = 'green';
                        context.fillRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
                    }
                    else if (y === applePosition.currentY &&
                        x === applePosition.currentX) {
                        //APPLE CELL
                        context.fillStyle = 'red';
                        context.fillRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
                    }
                    else {
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
                        context.strokeStyle = 'DarkGrey';
                        context.lineWidth = 1;
                        context.strokeRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
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
            context.globalAlpha = 0.1;
            context.fillStyle = "Magenta";
            context.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
            context.globalAlpha = 1;
            context.fillStyle = 'Indigo';
            context.font = '48px bold Arial';
            context.fillText('Game Over', this.canvas.offsetWidth * 0.12, this.canvas.offsetHeight * 0.2);
        };
        return BoardRenderer;
    }());
    ;
    return BoardRenderer;
});
//# sourceMappingURL=BoardRenderer.js.map