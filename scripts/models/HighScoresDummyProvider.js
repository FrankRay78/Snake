define(["require", "exports", "./HighScore"], function (require, exports, HighScore) {
    "use strict";
    /*
     * A dummy implementation of a high scores provider for testing purposes
     */
    class HighScoresDummyProvider {
        GetHighScores() {
            let highScores = [];
            highScores.push(new HighScore("FDR", 10));
            highScores.push(new HighScore("HGR", 7));
            highScores.push(new HighScore("SRR", 2));
            return highScores;
        }
        ;
        IsHighScore(score) {
            return (score >= 5);
        }
        ;
        SaveHighScore(initials, score) {
            //do nothing
        }
        ;
    }
    return HighScoresDummyProvider;
});
//# sourceMappingURL=HighScoresDummyProvider.js.map