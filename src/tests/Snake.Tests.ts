
import Snake = require('../models/Snake');
import SnakeDirection = require('../models/SnakeDirection');

const boardDimension = { X: 10, Y: 10 };
const snakeX = 5;
const snakeY = 5;
const snakeGrowIncrement = 2;

test('Snake is placed on the board', () => {

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, snakeGrowIncrement, null);

    snake.Initialise();

    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);
    expect(snake.HeadPosition.currentX).toBe(snakeX);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
    expect(snake.Length).toBe(1);
});

test('Snake moves right', () => {

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, snakeGrowIncrement, null);

    snake.Initialise();

    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);
    expect(snake.HeadPosition.currentX).toBe(snakeX);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
    expect(snake.Length).toBe(1);

    snake.Update();

    expect(snake.HeadPosition.currentX).toBe(snakeX + 1);
    expect(snake.HeadPosition.currentY).toBe(snakeY);

    snake.Update();

    expect(snake.HeadPosition.currentX).toBe(snakeX + 2);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
});

test('Snake moves up', () => {

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Up, snakeX, snakeY, snakeGrowIncrement, null);

    snake.Initialise();

    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Up);
    expect(snake.HeadPosition.currentX).toBe(snakeX);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
    expect(snake.Length).toBe(1);

    snake.Update();

    expect(snake.HeadPosition.currentX).toBe(snakeX);
    expect(snake.HeadPosition.currentY).toBe(snakeY - 1); //nb. moving "Up" is actually decrementing the Y value

    snake.Update();

    expect(snake.HeadPosition.currentX).toBe(snakeX);
    expect(snake.HeadPosition.currentY).toBe(snakeY - 2);
});

test('Snake can change direction', () => {

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, snakeGrowIncrement, null);

    snake.Initialise();

    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);
    expect(snake.HeadPosition.currentX).toBe(snakeX);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
    expect(snake.Length).toBe(1);

    snake.Update();
    snake.Update();

    expect(snake.HeadPosition.currentX).toBe(snakeX + 2);
    expect(snake.HeadPosition.currentY).toBe(snakeY);

    snake.Direction = SnakeDirection.Down;
    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right); //nb. the new direction isn't applied until the next Update()

    snake.Update();
    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Down);
    snake.Update();

    expect(snake.HeadPosition.currentX).toBe(snakeX + 2);
    expect(snake.HeadPosition.currentY).toBe(snakeY + 2);
});

test('Snake falls off board', () => {

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, snakeGrowIncrement, null);

    snake.Initialise();

    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);
    expect(snake.HeadPosition.currentX).toBe(snakeX);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
    expect(snake.Length).toBe(1);

    expect(() => {

        let counter = 0;

        do {

            //Keep updating until the snake falls off the edge
            snake.Update();

            counter += 1;
        } while (counter < 1000) //Restrict the number of tries to ensure we never get stuck in an endless loop

    }).toThrow();

    //nb. if we ever exit the function here, then the test will fail
});

test('Snake can be initialised after moving', () => {

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, snakeGrowIncrement, null);

    snake.Initialise();

    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);
    expect(snake.HeadPosition.currentX).toBe(snakeX);
    expect(snake.HeadPosition.currentY).toBe(snakeY);
    expect(snake.Length).toBe(1);

    snake.Update();
    snake.Direction = SnakeDirection.Down;
    snake.Update();

    expect(snake.HeadPosition.currentX).not.toEqual(snakeX);
    expect(snake.HeadPosition.currentY).not.toEqual(snakeY);


    //Initialise the snake and ensure it goes back to its starting configuration

    snake.Initialise();

    expect(snake.HeadPosition.direction).toBe(SnakeDirection.Right);
    expect(snake.HeadPosition.currentX).toEqual(snakeX);
    expect(snake.HeadPosition.currentY).toEqual(snakeY);
    expect(snake.Length).toBe(1);
});