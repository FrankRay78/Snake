define(["require", "exports"], function (require, exports) {
    "use strict";
    class GameRenderer {
        constructor(canvas, game) {
            this.canvas = canvas;
            this.game = game;
        }
        GetBoardDimensions() {
            //nb. assume a normalised array (ie. the second dimension is never jagged)
            const boardDimensionY = this.game.boardDimensionY;
            const boardDimensionX = this.game.boardDimensionX;
            const cellWidth = this.canvas.offsetWidth / boardDimensionX;
            const cellHeight = this.canvas.offsetHeight / boardDimensionY;
            return { boardDimensionX: boardDimensionX, boardDimensionY: boardDimensionY, cellWidth: cellWidth, cellHeight: cellHeight };
        }
        Draw() {
            const context = this.canvas.getContext('2d');
            const dimensions = this.GetBoardDimensions();
            const applePosition = this.game.apple.Position;
            for (let y = 0; y < dimensions.boardDimensionY; y++) {
                for (let x = 0; x < dimensions.boardDimensionX; x++) {
                    if (this.game.snake.SnakeOverlapsWith(x, y)) {
                        const snakeHeadPosition = this.game.snake.HeadPosition;
                        if (y === snakeHeadPosition.currentY &&
                            x === snakeHeadPosition.currentX) {
                            //SNAKE HEAD CELL
                            context.fillStyle = 'green';
                            context.fillRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
                        }
                        else {
                            //SNAKE BODY CELL
                            context.fillStyle = 'lightgreen';
                            context.fillRect(x * dimensions.cellWidth, y * dimensions.cellHeight, dimensions.cellWidth, dimensions.cellHeight);
                        }
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
        }
        DrawPlayArrow() {
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
        DrawGameOver() {
            const context = this.canvas.getContext('2d');
            context.globalAlpha = 0.1;
            context.fillStyle = "Magenta";
            context.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
            context.globalAlpha = 1;
            context.fillStyle = 'Indigo';
            context.font = '48px bold Arial';
            context.fillText('Game Over', this.canvas.offsetWidth * 0.12, this.canvas.offsetHeight * 0.2);
        }
    }
    ;
    return GameRenderer;
});
//# sourceMappingURL=GameRenderer.js.map