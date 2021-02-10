
import Game = require('./models/Game');
import HighScoresProviderInterface = require('./models/HighScoresProviderInterface');
import HighScoresDummyProvider = require('./models/HighScoresDummyProvider');
import HighScoresWebServiceProvider = require('./models/HighScoresWebServiceProvider');
import HighScoresRenderer = require('./models/HighScoresRenderer');

window.onload = () => {

    const canvas = document.getElementById('board') as HTMLCanvasElement;

    const game = new Game(canvas);

    let highScoresProvider: HighScoresProviderInterface;

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

        //Wire up the game over handler
        game.GameOverHandler = (score: number) => {

            highScoresProvider.SaveHighScore("ADM", score);

            highScoresRenderer.UpdateHighScores();
        };
    }


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

