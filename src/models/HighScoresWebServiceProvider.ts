
import HighScoresProviderInterface = require('./HighScoresProviderInterface');
import HighScore = require('./HighScore');
import axios = require('../../dist/axios/axios');

/* 
 * A webservice implementation of a high scores provider
 */
class HighScoresWebServiceProvider implements HighScoresProviderInterface {

    get MaxHighScoreCount(): number {
        return 10;
    }

    constructor() {
    }

    public GetHighScores(): HighScore[] {

        let highScores: HighScore[] = [];

        axios.get('http://localhost/SnakeWebAPI/api/Snake/GetHighScores')
            .then(function (response) {

                // handle success

                if (response && response.status === 200 && response.data && response.data.length > 0) {

                    //TODO: convert JSON to objects
                    //ref: https://stackoverflow.com/questions/22875636/how-do-i-cast-a-json-object-to-a-typescript-class
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