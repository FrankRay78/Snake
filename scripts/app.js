define(["require", "exports", "./models/Game", "./models/HighScoresDummyProvider", "./models/HighScoresRenderer"], function (require, exports, Game, HighScoresDummyProvider, HighScoresRenderer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.onload = () => {
        const canvas = document.getElementById('board');
        const game = new Game(canvas);
        let highScoresProvider;
        //Load the correct high scores provider here: (nb. can also be left blank)
        highScoresProvider = new HighScoresDummyProvider();
        //highScoresProvider = new HighScoresWebServiceProvider();
        const highScoresRenderer = new HighScoresRenderer(highScoresProvider);
        /*
         * Game high scores
         */
        if (highScoresProvider) {
            //nb. the high score tab is hidden in the html by default and will only be shown / high scores enabled
            //if the highScoresProvider variable below has been initialised (ie. there is a working high scores provider)
            highScoresRenderer.UpdateHighScores();
            //Show the high scores tab
            document.getElementById('highscores-nav-item').removeAttribute('style');
            document.getElementById('highscores-tab-pane').removeAttribute('style');
            //game.GameOverHandler = (score: number) => {
            //    //Game over handler
            //    if (highScoresProvider.IsHighScore(score)) {
            //        //Show the player initial modal dialog
            //        (document.getElementById('txtPlayerInitials') as HTMLInputElement).value = '';
            //        //https://stackoverflow.com/questions/62827002/bootstrap-v5-manually-call-a-modal-mymodal-show-not-working-vanilla-javascrip
            //        const myModal = new bootstrap.Modal(document.getElementById("playerInitialsModal"));
            //        myModal.show();
            //    }
            //};
            //document.getElementById("btnSaveHighScore").click = () => {
            //    //Save high score handler
            //    const initials = (document.getElementById('txtPlayerInitials') as HTMLInputElement).value;
            //    const score = Number((document.getElementById('appleCount') as HTMLSpanElement).innerText);
            //    highScoresProvider.SaveHighScore(initials, score);
            //    highScoresRenderer.UpdateHighScores();
            //};
        }
        /*
         * Game event handlers
         */
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