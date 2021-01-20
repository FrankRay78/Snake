
import Apple = require('../models/Apple');
import Snake = require('../models/Snake');
import SnakeDirection = require('../models/SnakeDirection');

const boardDimension = { X: 10, Y: 10 };
const appleX = 7;
const appleY = 5;
const snakeX = 5;
const snakeY = 5;

test('Snake eats apple', () => {

    //Place apple and snake on the board

    const apple = new Apple(appleX, appleY);

    apple.Initialise();

    expect(apple.Position.currentX).toBe(appleX);
    expect(apple.Position.currentY).toBe(appleY);

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, apple);

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
});

