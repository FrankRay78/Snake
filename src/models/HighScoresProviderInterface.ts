
import HighScore = require('./HighScore');

interface HighScoresProviderInterface {
    GetHighScores(): HighScore[];
    IsHighScore(score: number): boolean;
    SaveHighScore(initials: string, score: number): void;
}

export = HighScoresProviderInterface;
