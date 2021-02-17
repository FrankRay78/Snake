
import HighScore = require('./HighScore');

interface HighScoresProviderInterface {
    MaxHighScoreCount: number;
    GetHighScores(): HighScore[];
    SaveHighScore(initials: string, score: number): void;
}

export = HighScoresProviderInterface;
