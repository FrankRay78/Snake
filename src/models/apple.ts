﻿
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