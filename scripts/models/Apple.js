define(["require", "exports"], function (require, exports) {
    "use strict";
    class Apple {
        constructor(cellCountX, cellCountY) {
            this.cellCountX = cellCountX;
            this.cellCountY = cellCountY;
        }
        get Position() {
            return { currentX: this.currentX, currentY: this.currentY };
        }
        Initialise() {
            //Initial starting position for the apple
            this.currentX = Math.round(this.cellCountX * 0.75);
            this.currentY = Math.round(this.cellCountY * 0.75);
        }
    }
    return Apple;
});
//# sourceMappingURL=Apple.js.map