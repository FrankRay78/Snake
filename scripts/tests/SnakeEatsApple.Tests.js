define(["require", "exports", "../models/Apple", "../models/Snake", "../models/SnakeDirection"], function (require, exports, Apple, Snake, SnakeDirection) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const boardDimension = { X: 10, Y: 10 };
    const appleX = 7;
    const appleY = 5;
    const snakeX = 5;
    const snakeY = 5;
    const snakeGrowIncrement = 2;
    test('Snake eats apple', () => {
        //Place apple and snake on the board
        const apple = new Apple(appleX, appleY);
        apple.Initialise();
        expect(apple.Position.currentX).toBe(appleX);
        expect(apple.Position.currentY).toBe(appleY);
        const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, snakeGrowIncrement, apple);
        const appleEatenCallback = jest.fn();
        snake.onAppleEaten = appleEatenCallback;
        snake.Initialise();
        expect(snake.Position.direction).toBe(SnakeDirection.Right);
        expect(snake.Position.currentX).toBe(snakeX);
        expect(snake.Position.currentY).toBe(snakeY);
        //Move the snake to eat the apple
        snake.Update();
        snake.Update();
        expect(appleEatenCallback).toBeCalled();
        expect(snake.Length).toBe(snakeGrowIncrement + 1);
    });
});
//# sourceMappingURL=SnakeEatsApple.Tests.js.map