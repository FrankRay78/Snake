define(["require", "exports", "./HighScore"], function (require, exports, HighScore) {
    "use strict";
    /*
     * A dummy implementation of a high scores provider for testing purposes
     * Basically an in-memory database (aka array) stored locally on the client side
     */
    class HighScoresMemoryProvider {
        constructor(scores = null) {
            this.scores = [];
            this.MaxHighScoreCount = 10; //default
            if (scores)
                scores.forEach(s => this.scores.push(s));
        }
        GetHighScores() {
            //Selete the top X scores out of the underlying scores array
            return this.scores.sort((a, b) => {
                return b.PlayerScore - a.PlayerScore;
            }).slice(0, this.MaxHighScoreCount);
        }
        ;
        LoadHighScores() {
            let highScores = this.GetHighScores();
            if (this.HighScoresHandler)
                this.HighScoresHandler(highScores);
        }
        ;
        SaveHighScore(initials, score) {
            if (initials && initials.length > 0 && initials.length < 4) {
                //Initials and score are valid
                initials = initials.toUpperCase();
                //Make sure the initials and score aren't already in the high scores
                const highScores = this.GetHighScores();
                for (let i = 0; i < highScores.length; i++) {
                    const highScore = highScores[i];
                    if (highScore.PlayerInitials === initials && highScore.PlayerScore === score) {
                        //Already exists so return
                        return;
                    }
                }
                this.scores.push(new HighScore(initials, score));
                //Prompt listeners to handle an updated high scores list
                this.LoadHighScores();
            }
        }
        ;
    }
    return HighScoresMemoryProvider;
});
//# sourceMappingURL=HighScoresMemoryProvider.js.map