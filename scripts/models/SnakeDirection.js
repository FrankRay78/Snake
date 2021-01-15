define(["require", "exports"], function (require, exports) {
    "use strict";
    var SnakeDirection;
    (function (SnakeDirection) {
        SnakeDirection[SnakeDirection["Up"] = 1] = "Up";
        SnakeDirection[SnakeDirection["Down"] = 2] = "Down";
        SnakeDirection[SnakeDirection["Left"] = 3] = "Left";
        SnakeDirection[SnakeDirection["Right"] = 4] = "Right";
    })(SnakeDirection || (SnakeDirection = {}));
    return SnakeDirection;
});
//# sourceMappingURL=SnakeDirection.js.map