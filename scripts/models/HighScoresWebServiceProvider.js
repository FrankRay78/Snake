define(["require", "exports", "../../dist/axios/axios"], function (require, exports, axios) {
    "use strict";
    /*
     * A webservice implementation of a high scores provider
     */
    class HighScoresWebServiceProvider {
        constructor() {
        }
        GetHighScores() {
            let highScores = [];
            axios.get('http://localhost/SnakeWebAPI/api/Snake/GetHighScores')
                .then(function (response) {
                // handle success
                if (response && response.status === 200 && response.data && response.data.length > 0) {
                    //TODO: convert JSON to objects
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