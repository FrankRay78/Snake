
class Snake {

    constructor(public startingX = 5, public startingY = 5) {
    }

    Draw(canvas: HTMLCanvasElement): void {
        const context = canvas.getContext('2d');

        context.strokeStyle = 'green';
        context.fillRect(canvas.offsetWidth / 2, canvas.offsetHeight / 2, 20, 20);
    }
};

class Board {

    constructor(public cellCountX = 10, public cellCountY = 10) {
    }

    Draw(canvas: HTMLCanvasElement): void {
        const context = canvas.getContext('2d');

        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.strokeRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    }
};

class Game {

    //private readonly context: CanvasRenderingContext2D;
    private readonly board: Board;
    private readonly snake: Snake;
    //timerToken: number;

    constructor(public canvas: HTMLCanvasElement) {

        this.board = new Board();
        this.snake = new Snake();

        if (canvas.getContext) {
            window.requestAnimationFrame(() => this.Draw());
        }
    }

    Draw(): void {
        //nb. Draw will only get called if the canvas has a context

        this.board.Draw(this.canvas);
        this.snake.Draw(this.canvas);

        window.requestAnimationFrame(() => this.Draw());
    }

    //start() {
    //    this.timerToken = setInterval(() => this.Draw(), 500);
    //}

    //stop() {
    //    clearTimeout(this.timerToken);
    //}
};



//window.onload = function() {
window.onload = () => {

    const canvas = document.getElementById('board') as HTMLCanvasElement;

    const game = new Game(canvas);

    //canvas.click(() => alert('hello'));
    canvas.addEventListener("click", (e: Event) => alert('hello'));
};
