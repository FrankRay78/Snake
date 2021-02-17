
import HighScoresProviderInterface = require('./HighScoresProviderInterface');
import HighScore = require('./HighScore');
import axios = require('../../dist/axios/axios');

/* 
 * A webservice implementation of a high scores provider
 */
class HighScoresWebServiceProvider implements HighScoresProviderInterface {

    constructor() {
    }

    public GetHighScores(): HighScore[] {

        let highScores: HighScore[] = [];

        axios.get('http://localhost/SnakeWebAPI/api/Snake/GetHighScores')
            .then(function (response) {

                // handle success

                if (response && response.status === 200 && response.data && response.data.length > 0) {

                    //TODO: convert JSON to objects
                    //highScores = response.data;
                }
            })

        return highScores;
    };

    SaveHighScore(initials: string, score: number) {
        //TODO
    };
}

export = HighScoresWebServiceProvider;