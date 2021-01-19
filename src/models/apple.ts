
class Apple {

    //nb. zero based
    public currentX: number;
    public currentY: number;

    get Position() {
        return { currentX: this.currentX, currentY: this.currentY };
    }

    constructor(private startingX: number, private startingY: number) {
    }

    Initialise(): void {

        //Initial starting position for the apple
        this.currentX = this.startingX;
        this.currentY = this.startingY;
    }
}

export = Apple;