var Greeter = /** @class */ (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
}());
var Board = /** @class */ (function () {
    function Board(canvas, cellCountX, cellCountY) {
        var _this = this;
        this.canvas = canvas;
        this.cellCountX = cellCountX;
        this.cellCountY = cellCountY;
        if (canvas.getContext) {
            this.context = canvas.getContext('2d');
            window.requestAnimationFrame(function () { return _this.Draw(); });
        }
    }
    Board.prototype.GetCanvasDimenions = function () {
        return { width: this.canvas.offsetWidth, height: this.canvas.offsetHeight };
    };
    Board.prototype.Draw = function () {
        var dimensions = this.GetCanvasDimenions();
        //this.context.fillStyle = 'orange';
        //this.context.fillRect(0, 0, dimensions.width, dimensions.height);
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.strokeRect(0, 0, dimensions.width, dimensions.height);
    };
    return Board;
}());
;
//window.onload = function() {
window.onload = function () {
    //var el = document.getElementById('content');
    //var greeter = new Greeter(el);
    //greeter.start();
    var canvas = document.getElementById('board');
    var board = new Board(canvas, 10, 10);
};
//# sourceMappingURL=app.js.map