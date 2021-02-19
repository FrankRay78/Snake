
import HighScoresProviderInterface = require('./HighScoresProviderInterface');
import HighScore = require('./HighScore');
import axios = require('../../dist/axios/axios');

/* 
 * A webservice implementation of a high scores provider
 */
class HighScoresWebServiceProvider implements HighScoresProviderInterface {

    private GetHighScoresURL = 'http://localhost/SnakeWebAPI/api/Snake/GetHighScores';
    private SaveHighScoreURL = 'http://localhost/SnakeWebAPI/api/Snake/SaveHighScore'; //?initials=XYZ&score=12

    public MaxHighScoreCount: number;

    public HighScoresHandler: (highScores: HighScore[]) => void;

    constructor() {

        this.MaxHighScoreCount = 10; //default, same value also hardcoded in the web api
    }

    public LoadHighScores(): void {
    }

    //public GetHighScores(): HighScore[] {

    //    let highScores: HighScore[] = [];

    //    axios.get(this.GetHighScoresURL)
    //        .then(function (response) {

    //            // handle success

    //            if (response && response.status === 200 && response.data && response.data.length > 0) {

    //                //TODO: the follow logic is fundamentally wrong and won't work as the axios call above is async, refactor this method/class accordingly

    //                highScores = response.data;
    //            }
    //        }, function (error) {
    //            console.log(error);
    //        });

    //    return highScores;
    //};

    public SaveHighScore(initials: string, score: number) {
        //TODO
    };
}

export = HighScoresWebServiceProvider;