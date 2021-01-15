define(["require", "exports", "./models/Game"], function (require, exports, Game) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.onload = function () {
        var canvas = document.getElementById('board');
        var game = new Game(canvas);
        canvas.addEventListener("click", function () { return game.Start(); }, false);
        document.addEventListener("keydown", function (e) { return game.KeyPress(e.keyCode); }, false);
        canvas.addEventListener("mousedown", function (e) {
            //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
            var rect = canvas.getBoundingClientRect();
            var mouseX = e.clientX - rect.left;
            var mouseY = e.clientY - rect.top;
            game.MouseDown(mouseX, mouseY);
        }, false);
        //ref: http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
        canvas.addEventListener("touchstart", function (touchEvent) {
            touchEvent.preventDefault();
            if (!game.IsRunning) {
                //nb. the click event above doesn't fire on mobile devices
                //so we need another way to start the game on the first touch (if not already running)
                game.Start();
                return;
            }
            var touches = touchEvent.changedTouches;
            var touch = touches[touches.length - 1];
            //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
            var rect = canvas.getBoundingClientRect();
            var touchX = touch.pageX - rect.left;
            var touchY = touch.pageY - rect.top;
            game.Touch(touchX, touchY);
        }, false);
    };
});
//# sourceMappingURL=app.js.map