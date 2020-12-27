var Snake = /** @class */ (function () {
    function Snake(startingX, startingY) {
        if (startingX === void 0) { startingX = 5; }
        if (startingY === void 0) { startingY = 5; }
        this.startingX = startingX;
        this.startingY = startingY;
    }
    Snake.prototype.Draw = function (canvas) {
        return; //DO NOTHING FOR NOW
        var context = canvas.getContext('2d');
        context.strokeStyle = 'green';
        context.fillRect(canvas.offsetWidth / 2, canvas.offsetHeight / 2, 20, 20);
    };
    return Snake;
}());
;
var Board = /** @class */ (function () {
    function Board(cellDimension, cellCountX, cellCountY) {
        if (cellDimension === void 0) { cellDimension = 10; }
        if (cellCountX === void 0) { cellCountX = 10; }
        if (cellCountY === void 0) { cellCountY = 10; }
        this.cellDimension = cellDimension;
        this.cellCountX = cellCountX;
        this.cellCountY = cellCountY;
        //Initialse the underlying matrix
        //ref: https://stackoverflow.com/questions/8301400/how-do-you-easily-create-empty-matrices-javascript
        this.matrix = [];
        for (var y = 0; y < this.cellCountY; y++) {
            this.matrix[y] = [];
            for (var x = 0; x < this.cellCountX; x++) {
                this.matrix[y][x] = 0;
            }
        }
        this.matrix[4][4] = 1;
    }
    Board.prototype.Draw = function (canvas) {
        var context = canvas.getContext('2d');
        var cellWidth = canvas.offsetWidth / this.cellCountX;
        var cellHeight = canvas.offsetHeight / this.cellCountY;
        for (var y = 0; y < this.cellCountY; y++) {
            for (var x = 0; x < this.cellCountX; x++) {
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
    };
    return Board;
}());
;
var Game = /** @class */ (function () {
    function Game(canvas) {
        this.canvas = canvas;
        this.board = new Board();
        this.snake = new Snake();
        //if (canvas.getContext) {
        //    window.requestAnimationFrame(() => this.Draw());
        //}
    }
    Game.prototype.Draw = function () {
        //nb. Draw will only get called if the canvas has a context
        this.board.Draw(this.canvas);
        this.snake.Draw(this.canvas);
        //window.requestAnimationFrame(() => this.Draw());
    };
    Game.prototype.Start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.Draw(); }, 500);
    };
    Game.prototype.Stop = function () {
        clearTimeout(this.timerToken);
    };
    return Game;
}());
;
//window.onload = function() {
window.onload = function () {
    var canvas = document.getElementById('board');
    var game = new Game(canvas);
    game.Start();
    //canvas.click(() => alert('hello'));
    canvas.addEventListener("click", function (e) { return alert('TODO: start the snake moving'); });
};
//# sourceMappingURL=app.js.map