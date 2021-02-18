
import HighScoresProviderInterface = require('../models/HighScoresProviderInterface');
import HighScoresMemoryProvider = require('../models/HighScoresMemoryProvider');
import HighScore = require('../models/HighScore');
import HighScores = require('../models/HighScores');

test('HighScores.IsHighScore using empty memory provider', () => {

    const highScoresProvider: HighScoresProviderInterface = new HighScoresMemoryProvider();

    const highScores = new HighScores(highScoresProvider);

    expect(highScores.IsHighScore(1)).toBe(true);
    expect(highScores.IsHighScore(3)).toBe(true);
    expect(highScores.IsHighScore(50)).toBe(true);
    expect(highScores.IsHighScore(150)).toBe(true);
    expect(highScores.IsHighScore(1000)).toBe(true);

    //Populate the highScores with 101 --> 110 inclusive
    for (let i = 1; i <= highScoresProvider.MaxHighScoreCount; i++) {

        //Save
        highScores.SaveHighScore('XYZ', i + 100);
    }

    expect(highScores.IsHighScore(1)).toBe(false);
    expect(highScores.IsHighScore(3)).toBe(false);
    expect(highScores.IsHighScore(50)).toBe(false);
    expect(highScores.IsHighScore(150)).toBe(true);
    expect(highScores.IsHighScore(1000)).toBe(true);
});

test('HighScores.IsHighScore using pre-seeded memory provider', () => {

    const preseededScores = [
        new HighScore("A", 11),
        new HighScore("B", 10),
        new HighScore("C", 9),
        new HighScore("D", 8),
        new HighScore("E", 7),
        new HighScore("F", 6),
        new HighScore("G", 5),
        new HighScore("H", 4),
        new HighScore("I", 3),
        new HighScore("J", 2),
        new HighScore("K", 1)
    ]

    const highScoresProvider: HighScoresProviderInterface = new HighScoresMemoryProvider(preseededScores);

    const highScores = new HighScores(highScoresProvider);

    expect(highScores.IsHighScore(1)).toBe(false); //is not greater than the lowest high scores returned by the highScoresProvider
    expect(highScores.IsHighScore(3)).toBe(true);
    expect(highScores.IsHighScore(50)).toBe(true);
    expect(highScores.IsHighScore(150)).toBe(true);
    expect(highScores.IsHighScore(1000)).toBe(true);
});

