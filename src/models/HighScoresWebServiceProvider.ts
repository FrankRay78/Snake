
import HighScoresProviderInterface = require('./HighScoresProviderInterface');
import HighScore = require('./HighScore');
import axios = require('../../dist/axios/axios');

/* 
 * A webservice implementation of a high scores provider
 */
class HighScoresWebServiceProvider implements HighScoresProviderInterface {

    public MaxHighScoreCount: number;

    public HighScoresHandler: (highScores: HighScore[]) => void;

    constructor(public GetHighScoresURL: string, public SaveHighScoreURL: string) {

        this.MaxHighScoreCount = 10; //default, same value also hardcoded in the web api
    }

    public LoadHighScores(): void {

        //Pass in the HighScoresHandler as required by the JS async / promise nature of the axios call
        //https://stackoverflow.com/questions/44231366/how-to-set-variable-outside-axios-get
        //https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

        this.internalLoadHighScores(this.HighScoresHandler);
    }

    public internalLoadHighScores(responseHandler: (highScores: HighScore[]) => void): void {

        axios.get(this.GetHighScoresURL)
            .then(function (response) {

                // handle success

                if (response && response.status === 200 && response.data && response.data.length > 0) {

                    responseHandler(response.data);
                }
            }, function (error) {
                console.log(error);
            });
    }

    public SaveHighScore(initials: string, score: number) {

        if (initials && initials.length > 0 && initials.length < 4 && score > 0) {

            //Initials and score are valid

            initials = initials.toUpperCase();


            axios.post(this.SaveHighScoreURL, {
                initials: initials,
                score: score
            })
                .then(function (response) {

                    // handle success

                    if (response && response.status === 200) {

                        //Fetch the latest high scores and trigger the handler
                        this.LoadHighScores();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
}

export = HighScoresWebServiceProvider;