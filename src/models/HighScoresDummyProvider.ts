
import HighScoresProviderInterface = require('./HighScoresProviderInterface');
import HighScore = require('./HighScore');

/* 
 * A dummy implementation of a high scores provider for testing purposes
 */
class HighScoresDummyProvider implements HighScoresProviderInterface {

    public GetHighScores(): HighScore[] {

        let highScores = [];

        highScores.push(new HighScore("FDR", 10));
        highScores.push(new HighScore("HGR", 7));
        highScores.push(new HighScore("SRR", 2));

        return highScores;
    };

    public IsHighScore(score: number): boolean {
        return (score >= 5);
    };

    SaveHighScore(initials: string, score: number) {
        //do nothing
    };
}

export = HighScoresDummyProvider;