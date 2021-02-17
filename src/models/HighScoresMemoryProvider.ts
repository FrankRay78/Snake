
import HighScoresProviderInterface = require('./HighScoresProviderInterface');
import HighScore = require('./HighScore');

/* 
 * A dummy implementation of a high scores provider for testing purposes
 */
class HighScoresMemoryProvider implements HighScoresProviderInterface {

    private scores: HighScore[];

    public MaxHighScoreCount: number;

    constructor(scores: HighScore[] = null) {

        this.scores = [];

        this.MaxHighScoreCount = 10; //default

        if (scores)
            scores.forEach(s => this.scores.push(s));
    }

    public GetHighScores(): HighScore[] {

        //Return the top 10 scores
        return this.scores.sort((a, b): number => {
            return b.PlayerScore - a.PlayerScore
        }).slice(0, this.MaxHighScoreCount);
    };

    SaveHighScore(initials: string, score: number) {

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
        }
    };
}

export = HighScoresMemoryProvider;