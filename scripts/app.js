define(["require", "exports", "./models/Game"], function (require, exports, Game) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //const axios = require('axios').default;
    window.onload = () => {
        const canvas = document.getElementById('board');
        const game = new Game(canvas);
        canvas.addEventListener("click", () => game.Start(), false);
        document.addEventListener("keydown", (e) => game.KeyPress(e.keyCode), false);
        canvas.addEventListener("mousedown", (e) => {
            //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            game.MouseDown(mouseX, mouseY);
        }, false);
        //ref: http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
        canvas.addEventListener("touchstart", (touchEvent) => {
            touchEvent.preventDefault();
            if (!game.IsRunning) {
                //nb. the click event above doesn't fire on mobile devices
                //so we need another way to start the game on the first touch (if not already running)
                game.Start();
                return;
            }
            const touches = touchEvent.changedTouches;
            const touch = touches[touches.length - 1];
            //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
            const rect = canvas.getBoundingClientRect();
            const touchX = touch.pageX - rect.left;
            const touchY = touch.pageY - rect.top;
            game.Touch(touchX, touchY);
        }, false);
    };
});
//# sourceMappingURL=app.js.map