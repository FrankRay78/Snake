define(["require", "exports"], function (require, exports) {
    "use strict";
    class Apple {
        constructor(startingX, startingY) {
            this.startingX = startingX;
            this.startingY = startingY;
        }
        get Position() {
            return { currentX: this.currentX, currentY: this.currentY };
        }
        SetPosition(currentX, currentY) {
            this.currentX = currentX;
            this.currentY = currentY;
        }
        Initialise() {
            //Initial starting position for the apple
            this.currentX = this.startingX;
            this.currentY = this.startingY;
        }
    }
    return Apple;
});
//# sourceMappingURL=Apple.js.map