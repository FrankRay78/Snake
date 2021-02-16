
import HighScoresProviderInterface = require('./HighScoresProviderInterface');
import HighScore = require('./HighScore');

/* 
 * A dummy implementation of a high scores provider for testing purposes
 */
class HighScoresDummyProvider implements HighScoresProviderInterface {

    private scores: HighScore[];

    constructor() {
        this.scores = [];

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
        }).slice(0, 10);
    };

    public IsHighScore(score: number): boolean {

        if (!score || score <= 0)
            return false;


        const highScores = this.GetHighScores();


        if (highScores.length < 10)
            return true;

        //Check if the high score really does cut it
        if (score > highScores[highScores.length - 1].PlayerScore)
            return true;

        return false;
    };

    SaveHighScore(initials: string, score: number) {

        if (this.IsHighScore(score)) {

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
        }
    };
}

export = HighScoresDummyProvider;