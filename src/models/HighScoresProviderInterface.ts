
import HighScore = require('./HighScore');

interface HighScoresProviderInterface {
    GetHighScores(): HighScore[];
    SaveHighScore(initials: string, score: number): void;
}

export = HighScoresProviderInterface;
