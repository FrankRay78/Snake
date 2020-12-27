var Snake = /** @class */ (function () {
    function Snake(startingX, startingY) {
        if (startingX === void 0) { startingX = 5; }
        if (startingY === void 0) { startingY = 5; }
        this.startingX = startingX;
        this.startingY = startingY;
    }
    Snake.prototype.Draw = function (canvas) {
        var context = canvas.getContext('2d');
        context.strokeStyle = 'green';
        context.fillRect(canvas.offsetWidth / 2, canvas.offsetHeight / 2, 20, 20);
    };
    return Snake;
}());
;
var Board = /** @class */ (function () {
    function Board(cellCountX, cellCountY) {
        if (cellCountX === void 0) { cellCountX = 10; }
        if (cellCountY === void 0) { cellCountY = 10; }
        this.cellCountX = cellCountX;
        this.cellCountY = cellCountY;
    }
    Board.prototype.Draw = function (canvas) {
        var context = canvas.getContext('2d');
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.strokeRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
    return Board;
}());
;
var Game = /** @class */ (function () {
    //timerToken: number;
    function Game(canvas) {
        var _this = this;
        this.canvas = canvas;
        this.board = new Board();
        this.snake = new Snake();
        if (canvas.getContext) {
            window.requestAnimationFrame(function () { return _this.Draw(); });
        }
    }
    Game.prototype.Draw = function () {
        //nb. Draw will only get called if the canvas has a context
        var _this = this;
        this.board.Draw(this.canvas);
        this.snake.Draw(this.canvas);
        window.requestAnimationFrame(function () { return _this.Draw(); });
    };
    return Game;
}());
;
//window.onload = function() {
window.onload = function () {
    var canvas = document.getElementById('board');
    var game = new Game(canvas);
    //canvas.click(() => alert('hello'));
    canvas.addEventListener("click", function (e) { return alert('hello'); });
};
//# sourceMappingURL=app.js.map