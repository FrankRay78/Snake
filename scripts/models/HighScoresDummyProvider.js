define(["require", "exports", "./HighScore"], function (require, exports, HighScore) {
    "use strict";
    /*
     * A dummy implementation of a high scores provider for testing purposes
     */
    class HighScoresDummyProvider {
        constructor() {
            this.highScores = [];
            //Pre-seeds
            this.highScores.push(new HighScore("FDR", 10));
            this.highScores.push(new HighScore("HGR", 7));
            this.highScores.push(new HighScore("SRR", 2));
        }
        GetHighScores() {
            return this.highScores;
        }
        ;
        IsHighScore(score) {
            //always allow the score to be added
            return true;
        }
        ;
        SaveHighScore(initials, score) {
            this.highScores.push(new HighScore(initials, score));
        }
        ;
    }
    return HighScoresDummyProvider;
});
//# sourceMappingURL=HighScoresDummyProvider.js.map