
import Game = require('./models/Game');
import HighScoresProviderInterface = require('./models/HighScoresProviderInterface');
import HighScoresDummyProvider = require('./models/HighScoresDummyProvider');
//import axios = require('../dist/axios/axios');

window.onload = () => {

    const canvas = document.getElementById('board') as HTMLCanvasElement;

    const game = new Game(canvas);


    //Game high scores

    //nb. the high score tab is hidden in the html by default and will only be shown / high scores enabled
    //if the highScoresProvider variable below has been initialised (ie. there is a working high scores provider)

    let highScoresProvider: HighScoresProviderInterface;

    highScoresProvider = new HighScoresDummyProvider();

    if (highScoresProvider) {

        const highScores = highScoresProvider.GetHighScores();

        if (highScores && highScores.length > 0) {

            //Display the existing high scores

            const htmlRows = highScores.map((d) => {
                return '<tr><td>' + d.PlayerInitials + '</td><td>' + d.PlayerScore + '</td></tr>'
            });

            //Show the high scores table
            document.getElementById('NoHighScores').style.display = "none";
            document.getElementById('HighScores-TableBody').innerHTML = htmlRows.join('');
            document.getElementById('HighScores-Table').style.display = "table";
        }

        //Show the high scores tab
        document.getElementById('highscores-nav-item').removeAttribute('style');
        document.getElementById('highscores-tab-pane').removeAttribute('style');
    }


    //axios.get('http://localhost/SnakeWebAPI/api/Snake/GetHighScores')
    //    .then(function (response) {

    //        // handle success

    //        if (response && response.status === 200 && response.data && response.data.length > 0) {

    //            //TODO: Cache high scores for use later

    //            const a: number[] = [];
    //            const aSorted = a.sort((a, b) => a - b);
    //            console.log(aSorted);

    //            const tableBody = document.getElementById('HighScores-TableBody');

    //            const htmlRows = response.data.map((d) => {
    //                return '<tr><td>' + d.PlayerInitials + '</td><td>' + d.PlayerScore + '</td></tr>'
    //            });

    //            tableBody.innerHTML = htmlRows.join('');

    //            document.getElementById('HighScores-Table').style.display = "table";

    //            document.getElementById('NoHighScores').style.display = "none";
    //        }
    //    })


    //Game event handlers

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
