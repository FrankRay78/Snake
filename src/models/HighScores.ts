﻿
import HighScoresProviderInterface = require('./HighScoresProviderInterface');
import HighScore = require('./HighScore');

class HighScores {

    //Local cache of the most recently fetched high scores
    private highScores: HighScore[];

    private highScoresProvider: HighScoresProviderInterface;

    constructor(highScoresProvider: HighScoresProviderInterface) {

        if (!highScoresProvider)
            throw new Error("highScoresProvider cannot be null");

        this.highScores = [];

        this.highScoresProvider = highScoresProvider;

        this.highScoresProvider.HighScoresHandler = (highScores: HighScore[]) => {

            //High scores have been returned from the provider

            this.highScores = highScores;

            this.DrawHighScores();
        };

        //Initial fetch of the high scores
        this.highScoresProvider.LoadHighScores();
    }

    public IsHighScore(score: number): boolean {

        if (!score || score <= 0)
            return false;

        if (this.highScores.length < this.highScoresProvider.MaxHighScoreCount)
            return true;

        //Check if the high score really does cut it
        if (score > this.highScores[this.highScores.length - 1].PlayerScore)
            return true;

        return false;
    };

    public SaveHighScore(initials: string, score: number) {

        //Firstly validate initials and score

        if (score && this.IsHighScore(score)) {

            if (initials) {

                initials = initials.toUpperCase().trim();

                if (initials.length > 0 && initials.length < 4) {

                    //Make sure the initials and score aren't already in the high scores

                    for (let i = 0; i < this.highScores.length; i++) {

                        const highScore = this.highScores[i];

                        if (highScore.PlayerInitials === initials && highScore.PlayerScore === score) {

                            //Already exists so return
                            return;
                        }
                    }


                    this.highScoresProvider.SaveHighScore(initials, score);
                }
            }
        }
    };

    public DrawHighScores(): void {

        if (typeof document !== 'undefined' && document !== null) {

            if (this.highScores && this.highScores.length > 0) {

                //Display the existing high scores

                const htmlRows = this.highScores.map((d) => {
                    return '<tr><td>' + d.PlayerInitials + '</td><td>' + d.PlayerScore + '</td></tr>'
                });

                //Show the high scores table
                document.getElementById('NoHighScores').style.display = "none";
                document.getElementById('HighScores-TableBody').innerHTML = htmlRows.join('');
                document.getElementById('HighScores-Table').style.display = "table";
            }
            else {

                //Hide the high scores table
                document.getElementById('NoHighScores').style.display = "block";
                document.getElementById('HighScores-Table').style.display = "none";
            }
        }
    }
}

export = HighScores;