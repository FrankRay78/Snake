define(["require", "exports", "../models/HighScoresMemoryProvider", "../models/HighScore"], function (require, exports, HighScoresMemoryProvider, HighScore) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    test('Save high score using empty memory provider', () => {
        const highScoresProvider = new HighScoresMemoryProvider();
        const initialScores = highScoresProvider.GetHighScores();
        expect(initialScores.length).toEqual(0);
        highScoresProvider.SaveHighScore('XYZ', 20);
        const updatedScores = highScoresProvider.GetHighScores();
        expect(updatedScores.length).toEqual(initialScores.length + 1);
        const savedHighScore = updatedScores.findIndex(x => {
            x.PlayerInitials === 'XYZ' && x.PlayerScore === 20;
        });
        expect(savedHighScore).not.toBeNull();
    });
    test('Save high score using pre-seeded memory provider', () => {
        const preseededScores = [
            new HighScore("FDR", 10),
            new HighScore("HGR", 7),
            new HighScore("SRR", 2)
        ];
        const highScoresProvider = new HighScoresMemoryProvider(preseededScores);
        const initialScores = highScoresProvider.GetHighScores();
        expect(initialScores.length).toEqual(preseededScores.length);
        highScoresProvider.SaveHighScore('XYZ', 20);
        const updatedScores = highScoresProvider.GetHighScores();
        expect(updatedScores.length).toEqual(initialScores.length + 1);
        const savedHighScore = updatedScores.findIndex(x => {
            x.PlayerInitials === 'XYZ' && x.PlayerScore === 20;
        });
        expect(savedHighScore).not.toBeNull();
    });
    test('Save lots of increasing high scores but memory provider limits result set to highScoresProvider.MaxHighScoreCount', () => {
        const highScoresProvider = new HighScoresMemoryProvider();
        for (let i = 1; i <= 100; i++) {
            //Save
            highScoresProvider.SaveHighScore('XYZ', i);
            //Fetch
            const highScores = highScoresProvider.GetHighScores();
            //Assert
            if (i <= highScoresProvider.MaxHighScoreCount)
                expect(highScores.length).toEqual(i);
            else
                expect(highScores.length).toEqual(highScoresProvider.MaxHighScoreCount);
            expect(highScores[0].PlayerScore).toBe(i);
        }
    });
});
//# sourceMappingURL=HighScores.Tests.js.map