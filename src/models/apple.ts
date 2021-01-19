
class Apple {

    //nb. zero based
    public currentX: number;
    public currentY: number;

    get Position() {
        return { currentX: this.currentX, currentY: this.currentY };
    }

    constructor(private cellCountX: number, private cellCountY: number) {
    }

    Initialise(): void {

        //Initial starting position for the apple
        this.currentX = Math.round(this.cellCountX * 0.75);
        this.currentY = Math.round(this.cellCountY * 0.75)
    }
}

export = Apple;