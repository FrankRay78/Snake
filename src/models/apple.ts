
class Apple {

    //nb. zero based
    private currentX: number;
    private currentY: number;

    get Position() {
        return { currentX: this.currentX, currentY: this.currentY };
    }

    SetPosition(currentX: number, currentY: number) {
        this.currentX = currentX;
        this.currentY = currentY;
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