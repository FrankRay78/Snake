
import HighScoresProviderInterface = require('../models/HighScoresProviderInterface');
import HighScoresMemoryProvider = require('../models/HighScoresMemoryProvider');
import HighScore = require('../models/HighScore');


test('Save high score using empty memory provider', () => {

    let initialScores: HighScore[];
    let updatedScores: HighScore[];

    const highScoresProvider: HighScoresProviderInterface = new HighScoresMemoryProvider();

    highScoresProvider.HighScoresHandler = (highScores: HighScore[]) => { initialScores = highScores; };
    highScoresProvider.LoadHighScores();

    expect(initialScores.length).toEqual(0);

    highScoresProvider.HighScoresHandler = (highScores: HighScore[]) => { updatedScores = highScores; };
    highScoresProvider.SaveHighScore('XYZ', 20);

    expect(updatedScores.length).toEqual(initialScores.length + 1);

    const savedHighScore = updatedScores.findIndex(x => {
        x.PlayerInitials === 'XYZ' && x.PlayerScore === 20
    });

    expect(savedHighScore).not.toBeNull();
});

test('Save high score using pre-seeded memory provider', () => {

    const preseededScores = [
        new HighScore("FDR", 10),
        new HighScore("HGR", 7),
        new HighScore("SRR", 2)
    ];

    let initialScores: HighScore[];
    let updatedScores: HighScore[];

    const highScoresProvider: HighScoresProviderInterface = new HighScoresMemoryProvider(preseededScores);

    highScoresProvider.HighScoresHandler = (highScores: HighScore[]) => { initialScores = highScores; };
    highScoresProvider.LoadHighScores();

    expect(initialScores.length).toEqual(preseededScores.length);

    highScoresProvider.HighScoresHandler = (highScores: HighScore[]) => { updatedScores = highScores; };
    highScoresProvider.SaveHighScore('XYZ', 20);

    expect(updatedScores.length).toEqual(initialScores.length + 1);

    const savedHighScore = updatedScores.findIndex(x => {
        x.PlayerInitials === 'XYZ' && x.PlayerScore === 20
    });

    expect(savedHighScore).not.toBeNull();
});

test('Save lots of increasing high scores but memory provider limits result set to highScoresProvider.MaxHighScoreCount', () => {

    const highScoresProvider: HighScoresProviderInterface = new HighScoresMemoryProvider();

    highScoresProvider.HighScoresHandler = null;
    
    for (let i = 1; i <= 100; i++) {

        //Save
        highScoresProvider.SaveHighScore('XYZ', i);
    }

    highScoresProvider.HighScoresHandler = (highScores: HighScore[]) => {
        expect(highScores.length).toEqual(highScoresProvider.MaxHighScoreCount);

        expect(highScores[0].PlayerScore).toEqual(100);
        expect(highScores[1].PlayerScore).toEqual(99);
        expect(highScores[2].PlayerScore).toEqual(98);
        expect(highScores[3].PlayerScore).toEqual(97);
        expect(highScores[4].PlayerScore).toEqual(96);
        expect(highScores[5].PlayerScore).toEqual(95);
        expect(highScores[6].PlayerScore).toEqual(94);
        expect(highScores[7].PlayerScore).toEqual(93);
        expect(highScores[8].PlayerScore).toEqual(92);
        expect(highScores[9].PlayerScore).toEqual(91);
    };

    //Fetch
    highScoresProvider.LoadHighScores();
});


