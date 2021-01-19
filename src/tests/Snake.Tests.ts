
import Snake = require('../models/Snake');
import SnakeDirection = require('../models/SnakeDirection');

const boardDimension = { X: 10, Y: 10 };
const snakeX = 5;
const snakeY = 5;

test('Snake is placed on the board', () => {

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, null);

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Right);
    expect(snake.Position.currentX).toBe(snakeX);
    expect(snake.Position.currentY).toBe(snakeY);
});

test('Snake moves right', () => {

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, null);

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Right);
    expect(snake.Position.currentX).toBe(snakeX);
    expect(snake.Position.currentY).toBe(snakeY);

    snake.Update();

    expect(snake.Position.currentX).toBe(snakeX + 1);
    expect(snake.Position.currentY).toBe(snakeY);

    snake.Update();

    expect(snake.Position.currentX).toBe(snakeX + 2);
    expect(snake.Position.currentY).toBe(snakeY);
});

test('Snake moves up', () => {

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Up, snakeX, snakeY, null);

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Up);
    expect(snake.Position.currentX).toBe(snakeX);
    expect(snake.Position.currentY).toBe(snakeY);

    snake.Update();

    expect(snake.Position.currentX).toBe(snakeX);
    expect(snake.Position.currentY).toBe(snakeY - 1); //nb. moving "Up" is actually decrementing the Y value

    snake.Update();

    expect(snake.Position.currentX).toBe(snakeX);
    expect(snake.Position.currentY).toBe(snakeY - 2);
});

test('Snake can change direction', () => {

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, null);

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Right);
    expect(snake.Position.currentX).toBe(snakeX);
    expect(snake.Position.currentY).toBe(snakeY);

    snake.Update();
    snake.Update();

    expect(snake.Position.currentX).toBe(snakeX + 2);
    expect(snake.Position.currentY).toBe(snakeY);

    snake.Direction = SnakeDirection.Down;
    expect(snake.Position.direction).toBe(SnakeDirection.Down);

    snake.Update();
    snake.Update();

    expect(snake.Position.currentX).toBe(snakeX + 2);
    expect(snake.Position.currentY).toBe(snakeY + 2);
});

test('Snake falls off board', () => {

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, null);

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Right);
    expect(snake.Position.currentX).toBe(snakeX);
    expect(snake.Position.currentY).toBe(snakeY);

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

    const snake = new Snake(boardDimension.X, boardDimension.Y, SnakeDirection.Right, snakeX, snakeY, null);

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Right);
    expect(snake.Position.currentX).toBe(snakeX);
    expect(snake.Position.currentY).toBe(snakeY);

    snake.Update();
    snake.Direction = SnakeDirection.Down;
    snake.Update();

    expect(snake.Position.currentX).not.toEqual(snakeX);
    expect(snake.Position.currentY).not.toEqual(snakeY);


    //Initialise the snake and ensure it goes back to the starting position

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Right);
    expect(snake.Position.currentX).toEqual(snakeX);
    expect(snake.Position.currentY).toEqual(snakeY);
});