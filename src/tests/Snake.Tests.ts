
import Snake = require('../models/Snake');
import SnakeDirection = require('../models/SnakeDirection');

test('Snake has a starting position', () => {

    const snake = new Snake(10, 10, null);

    snake.Initialise();

    expect(snake.Position.direction).toBe(SnakeDirection.Right);
});