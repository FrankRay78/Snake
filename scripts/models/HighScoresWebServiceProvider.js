define(["require", "exports", "../../dist/axios/axios"], function (require, exports, axios) {
    "use strict";
    /*
     * A webservice implementation of a high scores provider
     */
    class HighScoresWebServiceProvider {
        constructor() {
            this.GetHighScoresURL = 'http://localhost/SnakeWebAPI/api/Snake/GetHighScores';
            this.SaveHighScoreURL = 'http://localhost/SnakeWebAPI/api/Snake/SaveHighScore'; //?initials=XYZ&score=12
        }
        get MaxHighScoreCount() {
            return 10;
        }
        GetHighScores() {
            let highScores = [];
            axios.get(this.GetHighScoresURL)
                .then(function (response) {
                // handle success
                if (response && response.status === 200 && response.data && response.data.length > 0) {
                    //TODO: the follow logic is fundamentally wrong and won't work as the axios call above is async, refactor this method/class accordingly 
                    highScores = response.data;
                }
            }, function (error) {
                console.log(error);
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