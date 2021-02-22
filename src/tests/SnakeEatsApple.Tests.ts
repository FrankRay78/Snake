
import Apple = require('../models/Apple');
import Snake = require('../models/Snake');
import SnakeDirection = require('../models/SnakeDirection');

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

test('Snake can change direction 180 degress when starting out', () => {

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, snakeGrowIncrement, null);

    snake.Initialise();

    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);
    expect(snake.HeadPosition.currentX).toBe(snakeX);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
    expect(snake.Length).toBe(1);

    snake.Update();

    expect(snake.HeadPosition.currentX).toBe(snakeX + 1);
    expect(snake.HeadPosition.currentY).toBe(snakeY);

    snake.Direction = SnakeDirection.Left;
    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);

    snake.Update();

    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Left);
    expect(snake.HeadPosition.currentX).toBe(snakeX);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
});

test('Snake cannot change direction 180 degress once it has grown', () => {

    //Place the apple on the board just in front of the snake

    const apple = new Apple(snakeX + 1, snakeY);

    apple.Initialise();

    expect(apple.Position.currentX).toBe(snakeX + 1);
    expect(apple.Position.currentY).toBe(snakeY);


    //Place the snake on the board

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, snakeGrowIncrement, apple);

    const appleEatenCallback = jest.fn();
    snake.onAppleEaten = appleEatenCallback;

    snake.Initialise();

    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);
    expect(snake.HeadPosition.currentX).toBe(snakeX);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
    expect(snake.Length).toBe(1);


    //Snake eats the apple here
    snake.Update(); 
    expect(snake.HeadPosition.currentX).toBe(snakeX + 1);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
    expect(appleEatenCallback).toBeCalled();


    snake.Update();
    expect(snake.HeadPosition.currentX).toBe(snakeX + 2);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
    expect(snake.Length).toBe(2);

    snake.Direction = SnakeDirection.Left;
    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);

    snake.Update();
    expect(snake.HeadPosition.currentX).toBe(snakeX + 3);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
    expect(snake.Length).toBe(3);

    snake.Direction = SnakeDirection.Left;
    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);

    snake.Update();
    expect(snake.HeadPosition.currentX).toBe(snakeX + 4);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
    expect(snake.Length).toBe(3);

    snake.Direction = SnakeDirection.Up; 
    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);

    //Prevent the snake from going back on itself within an update cycle
    //ie. the going right - up - left bug reported here: https://github.com/FrankRay78/Snake/issues/2
    snake.Direction = SnakeDirection.Left;
    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);

    snake.Update();
    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Up);
    expect(snake.HeadPosition.currentX).toBe(snakeX + 4);
    expect(snake.HeadPosition.currentY).toBe(snakeY - 1);
    expect(snake.Length).toBe(3);
});