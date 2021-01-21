define(["require", "exports", "../models/Apple", "../models/Snake", "../models/SnakeDirection"], function (require, exports, Apple, Snake, SnakeDirection) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const boardDimension = { X: 100, Y: 100 }; //big board to make sure the snake doesn't fall off!
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
        expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);
        expect(snake.HeadPosition.currentX).toBe(snakeX);
        expect(snake.HeadPosition.currentY).toBe(snakeY);
        expect(snake.Length).toBe(1);
        //Move the snake to eat the apple
        snake.Update();
        snake.Update();
        expect(appleEatenCallback).toBeCalled();
        snake.Update();
        expect(snake.Length).toBe(2);
        snake.Update();
        expect(snake.Length).toBe(3); //snake is fully grown here
        snake.Update();
        snake.Update();
        snake.Update();
        expect(snake.Length).toBe(3);
        //Move the apple to a new location
        apple.SetPosition(snake.HeadPosition.currentX + 1, snake.HeadPosition.currentY);
        snake.Update();
        expect(appleEatenCallback).toBeCalled();
        snake.Update();
        expect(snake.Length).toBe(4);
        snake.Update();
        expect(snake.Length).toBe(5); //snake is fully grown here
        snake.Update();
        snake.Update();
        snake.Update();
        expect(snake.Length).toBe(5);
        //Initialise the snake and ensure it goes back to its starting configuration
        snake.Initialise();
        expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);
        expect(snake.HeadPosition.currentX).toEqual(snakeX);
        expect(snake.HeadPosition.currentY).toEqual(snakeY);
        expect(snake.Length).toBe(1);
    });
});
//# sourceMappingURL=SnakeEatsApple.Tests.js.map