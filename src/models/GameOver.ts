
class GameOver extends Error {

    private score;

    //The number of apples eaten by the snake at game over
    get Score() {
        return this.score;
    }

    constructor(score: number) {
        super('Game Over');

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, GameOver.prototype);

        this.score = score;
    }
}

export = GameOver;