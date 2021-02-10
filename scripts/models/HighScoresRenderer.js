define(["require", "exports"], function (require, exports) {
    "use strict";
    class HighScoresRenderer {
        constructor(highScoresProvider) {
            this.highScoresProvider = highScoresProvider;
        }
        UpdateHighScores() {
            if (this.highScoresProvider) {
                const highScores = this.highScoresProvider.GetHighScores();
                if (highScores && highScores.length > 0) {
                    //Display the existing high scores
                    const htmlRows = highScores.map((d) => {
                        return '<tr><td>' + d.PlayerInitials + '</td><td>' + d.PlayerScore + '</td></tr>';
                    });
                    //Show the high scores table
                    document.getElementById('NoHighScores').style.display = "none";
                    document.getElementById('HighScores-TableBody').innerHTML = htmlRows.join('');
                    document.getElementById('HighScores-Table').style.display = "table";
                }
                else {
                    //Ignore the exceptional case where all high scores 
                    //may be deleted whilst the user is playing the game
                }
            }
        }
        ;
    }
    return HighScoresRenderer;
});
//# sourceMappingURL=HighScoresRenderer.js.map