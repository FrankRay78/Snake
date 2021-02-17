
import HighScoresProviderInterface = require('./HighScoresProviderInterface');
import HighScore = require('./HighScore');

/* 
 * A dummy implementation of a high scores provider for testing purposes
 */
class HighScoresMemoryProvider implements HighScoresProviderInterface {

    private scores: HighScore[];

    get MaxHighScoreCount(): number {
        return 10;
    }

    constructor() {
        this.scores = [];

        //TODO: replace the following hardcoded logic with a parameter on the constructor that accepts a default pre-seed of high scores

        //Pre-seeds
        this.scores.push(new HighScore("FDR", 10));
        this.scores.push(new HighScore("HGR", 7));
        this.scores.push(new HighScore("SRR", 2));

        //this.scores.push(new HighScore("A", 1));
        //this.scores.push(new HighScore("B", 1));
        //this.scores.push(new HighScore("C", 1));
        //this.scores.push(new HighScore("D", 1));
        //this.scores.push(new HighScore("E", 1));
        //this.scores.push(new HighScore("F", 1));
        //this.scores.push(new HighScore("G", 1));
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