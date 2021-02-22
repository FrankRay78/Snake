
import Game = require('./models/Game');
import HighScoresProviderInterface = require('./models/HighScoresProviderInterface');
import HighScoresMemoryProvider = require('./models/HighScoresMemoryProvider');
import HighScoresWebServiceProvider = require('./models/HighScoresWebServiceProvider');
import HighScore = require('./models/HighScore');
import HighScores = require('./models/HighScores');

window.onload = () => {

    const canvas = document.getElementById('board') as HTMLCanvasElement;

    const game = new Game(canvas);


    /*
    * Game high scores
    */

    //Load the correct high scores provider here:
    const highScoresProvider: HighScoresProviderInterface = new HighScoresMemoryProvider(
        [
            new HighScore("FDR", 10),
            new HighScore("HGR", 7),
            new HighScore("SRR", 2)
        ]
        );
    //const highScoresProvider: HighScoresProviderInterface = new HighScoresWebServiceProvider(
    //    'http://frankray.net/SnakeWebAPI/api/Snake/GetHighScores',
    //    'http://frankray.net/SnakeWebAPI/api/Snake/SaveHighScore'
    //);

    const highScores = new HighScores(highScoresProvider);

    highScores.DrawHighScores();

    game.GameOverHandler = (score: number) => {

        //Game over handler

        if (highScores.IsHighScore(score)) {

            //Show the player initial modal dialog

            (document.getElementById('txtPlayerInitials') as HTMLInputElement).value = '';

            //HACK: Bootstrap 5 modal
            //for some reason beyond my ability, the only way I can get the bootstrap 5 modal to behave properly
            //is to manipulate it from javascript on the html page which is marshalled through the jQuery language!!
            //ref: https://stackoverflow.com/questions/62111962/in-vs-code-can-i-validate-my-javascript-but-ignore-a-specific-typescript-error
            // @ts-ignore
            OpenModalDialog();
        }
    };

    document.getElementById('playerInitialsModal').addEventListener('shown.bs.modal', function () {
        document.getElementById('txtPlayerInitials').focus();
    })

    document.getElementById("btnSaveHighScore").onclick = () => {

        //Save high score handler

        const initials = (document.getElementById('txtPlayerInitials') as HTMLInputElement).value;
        const score = Number((document.getElementById('appleCount') as HTMLSpanElement).innerText);

        highScores.SaveHighScore(initials, score);
        highScores.DrawHighScores();

        //HACK: Bootstrap 5 modal (SEE COMMENT ABOVE)
        // @ts-ignore
        CloseModalDialog();
    };


    /*
     * Game event handlers
     */

    canvas.addEventListener("click", () => game.Start(), false);

    document.addEventListener("keydown", (e: KeyboardEvent) => game.KeyPress(e.keyCode), false);

    canvas.addEventListener("mousedown", (e: MouseEvent) => {

        //ref: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        game.MouseDown(mouseX, mouseY);
    }, false);

    //ref: http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
    canvas.addEventListener("touchstart", (touchEvent: TouchEvent) => {

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

