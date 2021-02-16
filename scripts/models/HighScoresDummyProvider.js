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
            //Return the top 10 scores
            return this.highScores.sort((a, b) => {
                return b.PlayerScore - a.PlayerScore;
            }).slice(0, 9);
        }
        ;
        IsHighScore(score) {
            //Accept all scores greater than 0
            return (score && score > 0);
        }
        ;
        SaveHighScore(initials, score) {
            if (this.IsHighScore(score) &&
                initials && initials.length > 0 &&
                initials.length < 4) {
                //Valid initials and score
                this.highScores.push(new HighScore(initials.toUpperCase(), score));
            }
        }
        ;
    }
    return HighScoresDummyProvider;
});
//# sourceMappingURL=HighScoresDummyProvider.js.map