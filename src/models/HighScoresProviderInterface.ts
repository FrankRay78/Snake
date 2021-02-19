
import HighScore = require('./HighScore');

interface HighScoresProviderInterface {
    MaxHighScoreCount: number;
    LoadHighScores(): void;
    HighScoresHandler: (highScores: HighScore[]) => void;
    SaveHighScore(initials: string, score: number): void;
}

export = HighScoresProviderInterface;
