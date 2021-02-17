
import HighScoresProviderInterface = require('../models/HighScoresProviderInterface');
import HighScoresMemoryProvider = require('../models/HighScoresMemoryProvider');
import HighScores = require('../models/HighScores');


test('Save high score using memory provider', () => {

    const highScoresProvider: HighScoresProviderInterface = new HighScoresMemoryProvider();

    const initialScores = highScoresProvider.GetHighScores();

    //nb. assumes the following data is acceptable and the score is worthy of the top 10
    highScoresProvider.SaveHighScore('XYZ', 20);

    const updatedScores = highScoresProvider.GetHighScores();

    expect(updatedScores.length).toEqual(initialScores.length + 1);

    const savedHighScore = updatedScores.findIndex(x => {
        x.PlayerInitials === 'XYZ' && x.PlayerScore === 20
    });

    expect(savedHighScore).not.toBeNull();
});