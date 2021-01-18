define(["require", "exports", "../models/Snake", "../models/SnakeDirection"], function (require, exports, Snake, SnakeDirection) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    test('Snake has a starting position', () => {
        const snake = new Snake(10, 10, null);
        snake.Initialise();
        expect(snake.Position.direction).toBe(SnakeDirection.Right);
    });
});
//# sourceMappingURL=Snake.Test.js.map