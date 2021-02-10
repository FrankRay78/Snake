
import HighScoresProviderInterface = require('./HighScoresProviderInterface');
import HighScore = require('./HighScore');

/* 
 * A dummy implementation of a high scores provider for testing purposes
 */
class HighScoresDummyProvider implements HighScoresProviderInterface {

    private highScores: HighScore[];

    constructor() {
        this.highScores = [];

        //Pre-seeds
        this.highScores.push(new HighScore("FDR", 10));
        this.highScores.push(new HighScore("HGR", 7));
        this.highScores.push(new HighScore("SRR", 2));
    }

    public GetHighScores(): HighScore[] {
        return this.highScores;
    };

    public IsHighScore(score: number): boolean {
        //always allow the score to be added
        return true;
    };

    SaveHighScore(initials: string, score: number) {
        this.highScores.push(new HighScore(initials, score));
    };
}

export = HighScoresDummyProvider;