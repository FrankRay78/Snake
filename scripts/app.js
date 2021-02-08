define(["require", "exports", "./models/Game", "../dist/axios/axios"], function (require, exports, Game, axios) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.onload = () => {
        axios.get('http://localhost/SnakeWebAPI/api/Snake123/GetHighScores')
            .then(function (response) {
            // handle success
            if (response && response.status === 200 && response.data && response.data.length > 0) {
                const tableBody = document.getElementById('HighScores-TableBody');
                const htmlRows = response.data.map((d) => {
                    return '<tr><td>' + d.PlayerInitials + '</td><td>' + d.PlayerScore + '</td></tr>';
                });
                tableBody.innerHTML = htmlRows.join('');
                document.getElementById('HighScores-Table').style.display = "table";
                document.getElementById('NoHighScores').style.display = "none";
            }
        });
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