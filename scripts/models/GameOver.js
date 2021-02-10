define(["require", "exports"], function (require, exports) {
    "use strict";
    class GameOver extends Error {
        constructor(score) {
            super('Game Over');
            // Set the prototype explicitly.
            Object.setPrototypeOf(this, GameOver.prototype);
            this.score = score;
        }
        //The number of apples eaten by the snake at game over
        get Score() {
            return this.score;
        }
    }
    return GameOver;
});
//# sourceMappingURL=GameOver.js.map