
//https://stackoverflow.com/questions/35405412/how-to-use-npm-installed-requirejs-for-browser
//https://stackoverflow.com/questions/20079464/whats-the-correct-way-to-use-requirejs-with-typescript
//https://requirejs.org/docs/start.html#examples
//https://devblogs.microsoft.com/visualstudio/using-requirejs-with-visual-studio/

class Apple {

    //nb. zero based
    public currentX: number;
    public currentY: number;

    get Position() {
        return { currentX: this.currentX, currentY: this.currentY };
    }

    constructor(private startingX: number, private startingY: number) {
        this.currentX = startingX;
        this.currentY = startingY;
    }

    Initialise(): void {
        this.currentX = this.startingX;
        this.currentY = this.startingY;
    }
}

export = Apple;