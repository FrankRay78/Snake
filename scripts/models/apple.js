//https://stackoverflow.com/questions/35405412/how-to-use-npm-installed-requirejs-for-browser
//https://stackoverflow.com/questions/20079464/whats-the-correct-way-to-use-requirejs-with-typescript
//https://requirejs.org/docs/start.html#examples
//https://devblogs.microsoft.com/visualstudio/using-requirejs-with-visual-studio/
define(["require", "exports"], function (require, exports) {
    "use strict";
    class Apple {
        constructor(startingX, startingY) {
            this.startingX = startingX;
            this.startingY = startingY;
            this.currentX = startingX;
            this.currentY = startingY;
        }
        get Position() {
            return { currentX: this.currentX, currentY: this.currentY };
        }
        Initialise() {
            this.currentX = this.startingX;
            this.currentY = this.startingY;
        }
    }
    return Apple;
});
//# sourceMappingURL=apple.js.map