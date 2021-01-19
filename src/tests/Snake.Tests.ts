
import Snake = require('../models/Snake');
import SnakeDirection = require('../models/SnakeDirection');

test('Snake is placed on the board', () => {

    const snake = new Snake(10, 10, null);

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Right);
});

test('Snake moves right', () => {

    const snake = new Snake(10, 10, null);

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Right);

    //cache the snake's starting position for use later
    const snakeX = snake.Position.currentX;
    const snakeY = snake.Position.currentY;

    snake.Update();

    expect(snake.Position.currentX).toBe(snakeX + 1);
    expect(snake.Position.currentY).toBe(snakeY);

    snake.Update();

    expect(snake.Position.currentX).toBe(snakeX + 2);
    expect(snake.Position.currentY).toBe(snakeY);
});

test('Snake moves up', () => {

    const snake = new Snake(10, 10, null);

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Right);

    snake.Direction = SnakeDirection.Up;

    expect(snake.Position.direction).toBe(SnakeDirection.Up);

    //cache the snake's starting position for use later
    const snakeX = snake.Position.currentX;
    const snakeY = snake.Position.currentY;

    snake.Update();

    expect(snake.Position.currentX).toBe(snakeX);
    expect(snake.Position.currentY).toBe(snakeY - 1); //nb. moving "Up" is actually decrementing the Y value

    snake.Update();

    expect(snake.Position.currentX).toBe(snakeX);
    expect(snake.Position.currentY).toBe(snakeY - 2);
});

test('Snake falls off board', () => {

    const snake = new Snake(10, 10, null);

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Right);

    expect(() => {

        let counter = 0;

        do {

            //Keep updating until the snake falls off the edge
            snake.Update();

            counter += 1;
        } while (counter < 1000) //Restrict the number of tries to ensure we never get stuck in an endless loop

    }).toThrow();
});

test('Snake can be initialised after moving', () => {

    const snake = new Snake(10, 10, null);

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Right);

    //cache the snake's starting position for use later
    const snakeX = snake.Position.currentX;
    const snakeY = snake.Position.currentY;

    snake.Update();
    snake.Direction = SnakeDirection.Up;
    snake.Update();

    expect(snake.Position.currentX).not.toEqual(snakeX);
    expect(snake.Position.currentY).not.toEqual(snakeY);


    //Initialise the snake an ensure it goes back to the starting position

    snake.Initialise();
    expect(snake.Position.direction).toBe(SnakeDirection.Right);
    expect(snake.Position.currentX).toEqual(snakeX);
    expect(snake.Position.currentY).toEqual(snakeY);
});