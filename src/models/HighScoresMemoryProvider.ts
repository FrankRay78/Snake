
import HighScoresProviderInterface = require('./HighScoresProviderInterface');
import HighScore = require('./HighScore');

/* 
 * A dummy implementation of a high scores provider for testing purposes
 * Basically an in-memory database (aka array) stored locally on the client side
 */
class HighScoresMemoryProvider implements HighScoresProviderInterface {

    //All previously saved scores, from which the top X are returned from
    private scores: HighScore[];

    public MaxHighScoreCount: number;

    public HighScoresHandler: (highScores: HighScore[]) => void;

    constructor(scores: HighScore[] = null) {

        this.scores = [];

        this.MaxHighScoreCount = 10; //default

        if (scores)
            scores.forEach(s => this.scores.push(s));
    }

    private GetHighScores(): HighScore[] {

        //Selete the top X scores out of the underlying scores array
        return this.scores.sort((a, b): number => {
            return b.PlayerScore - a.PlayerScore
        }).slice(0, this.MaxHighScoreCount);
    };

    public LoadHighScores(): void {

        let highScores = this.GetHighScores();

        if (this.HighScoresHandler)
            this.HighScoresHandler(highScores);
    };

    public SaveHighScore(initials: string, score: number) {

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
    };
}

export = HighScoresMemoryProvider;