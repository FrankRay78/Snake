define(["require", "exports", "../../dist/axios/axios"], function (require, exports, axios) {
    "use strict";
    /*
     * A webservice implementation of a high scores provider
     */
    class HighScoresWebServiceProvider {
        constructor(GetHighScoresURL, SaveHighScoreURL) {
            this.GetHighScoresURL = GetHighScoresURL;
            this.SaveHighScoreURL = SaveHighScoreURL;
            this.MaxHighScoreCount = 10; //default, same value also hardcoded in the web api
        }
        LoadHighScores() {
            //Pass in the HighScoresHandler as required by the JS async / promise nature of the axios call
            //https://stackoverflow.com/questions/44231366/how-to-set-variable-outside-axios-get
            //https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
            this.internalLoadHighScores(this.HighScoresHandler);
        }
        internalLoadHighScores(responseHandler) {
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
        SaveHighScore(initials, score) {
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
        }
        ;
    }
    return HighScoresWebServiceProvider;
});
//# sourceMappingURL=HighScoresWebServiceProvider.js.map