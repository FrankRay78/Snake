define(["require", "exports"], function (require, exports) {
    "use strict";
    var Apple = /** @class */ (function () {
        function Apple(startingX, startingY) {
            this.startingX = startingX;
            this.startingY = startingY;
            this.currentX = startingX;
            this.currentY = startingY;
        }
        Object.defineProperty(Apple.prototype, "Position", {
            get: function () {
                return { currentX: this.currentX, currentY: this.currentY };
            },
            enumerable: false,
            configurable: true
        });
        Apple.prototype.Initialise = function () {
            this.currentX = this.startingX;
            this.currentY = this.startingY;
        };
        return Apple;
    }());
    return Apple;
});
//# sourceMappingURL=Apple.js.map