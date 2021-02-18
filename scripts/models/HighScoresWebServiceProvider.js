define(["require", "exports", "../../dist/axios/axios"], function (require, exports, axios) {
    "use strict";
    /*
     * A webservice implementation of a high scores provider
     */
    class HighScoresWebServiceProvider {
        get MaxHighScoreCount() {
            return 10;
        }
        constructor() {
        }
        GetHighScores() {
            let highScores = [];
            axios.get('http://localhost/SnakeWebAPI/api/Snake/GetHighScores')
                .then(function (response) {
                // handle success
                if (response && response.status === 200 && response.data && response.data.length > 0) {
                    //TODO: convert JSON to objects
                    //ref: https://stackoverflow.com/questions/22875636/how-do-i-cast-a-json-object-to-a-typescript-class
                    //highScores = response.data;
                }
            });
            return highScores;
        }
        ;
        SaveHighScore(initials, score) {
            //TODO
        }
        ;
    }
    return HighScoresWebServiceProvider;
});
//# sourceMappingURL=HighScoresWebServiceProvider.js.map