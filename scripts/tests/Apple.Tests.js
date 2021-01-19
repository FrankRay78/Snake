define(["require", "exports", "../models/Apple"], function (require, exports, Apple) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    test('Apple is placed on the board', () => {
        const apple = new Apple(10, 10);
        apple.Initialise();
        expect(apple.Position.currentX).toBeGreaterThanOrEqual(0);
        expect(apple.Position.currentX).toBeLessThanOrEqual(9);
        expect(apple.Position.currentY).toBeGreaterThanOrEqual(0);
        expect(apple.Position.currentY).toBeLessThanOrEqual(9);
    });
    test('Apple can be moved', () => {
        const apple = new Apple(10, 10);
        apple.Initialise();
        //Require the default starting position not to be the same as the hardcoded move below
        expect(apple.Position.currentX).not.toBe(1);
        expect(apple.Position.currentY).not.toBe(1);
        //Move the apple to a new location
        apple.currentX = 1;
        apple.currentY = 1;
        expect(apple.Position.currentX).toBe(1);
        expect(apple.Position.currentY).toBe(1);
    });
    test('Apple can be initialised after moving', () => {
        const apple = new Apple(10, 10);
        apple.Initialise();
        //Require the default starting position not to be the same as the hardcoded move below
        expect(apple.Position.currentX).not.toBe(1);
        expect(apple.Position.currentY).not.toBe(1);
        //cache the apples's starting position for use later
        const appleX = apple.Position.currentX;
        const appleY = apple.Position.currentY;
        //Move the apple to a new location
        apple.currentX = 1;
        apple.currentY = 1;
        expect(apple.Position.currentX).toBe(1);
        expect(apple.Position.currentY).toBe(1);
        apple.Initialise();
        expect(apple.Position.currentX).toBe(appleX);
        expect(apple.Position.currentY).toBe(appleY);
    });
});
//# sourceMappingURL=Apple.Tests.js.map