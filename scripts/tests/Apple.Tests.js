define(["require", "exports", "../models/Apple"], function (require, exports, Apple) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const appleX = 5;
    const appleY = 5;
    test('Apple is placed on the board', () => {
        const apple = new Apple(appleX, appleY);
        apple.Initialise();
        expect(apple.Position.currentX).toBe(appleX);
        expect(apple.Position.currentY).toBe(appleY);
    });
    test('Apple can be moved', () => {
        const apple = new Apple(appleX, appleY);
        apple.Initialise();
        expect(apple.Position.currentX).toBe(appleX);
        expect(apple.Position.currentY).toBe(appleY);
        //Move the apple to a new location
        apple.SetPosition(1, 1);
        expect(apple.Position.currentX).toBe(1);
        expect(apple.Position.currentY).toBe(1);
    });
    test('Apple can be initialised after moving', () => {
        const apple = new Apple(appleX, appleY);
        apple.Initialise();
        expect(apple.Position.currentX).toBe(appleX);
        expect(apple.Position.currentY).toBe(appleY);
        //Move the apple to a new location
        apple.SetPosition(1, 1);
        expect(apple.Position.currentX).toBe(1);
        expect(apple.Position.currentY).toBe(1);
        apple.Initialise();
        expect(apple.Position.currentX).toBe(appleX);
        expect(apple.Position.currentY).toBe(appleY);
    });
});
//# sourceMappingURL=Apple.Tests.js.map