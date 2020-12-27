class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

class Snake {

    private readonly context: CanvasRenderingContext2D;

    constructor(public canvas: HTMLCanvasElement, public cellX: number, public cellY: number) {

        if (canvas.getContext) {
            this.context = canvas.getContext('2d');

            window.requestAnimationFrame(() => this.Draw());
        }
    }

    private GetCanvasDimenions() {
        return { width: this.canvas.offsetWidth, height: this.canvas.offsetHeight };
    }

    Draw(): void {
        const dimensions = this.GetCanvasDimenions();

        //this.context.fillStyle = 'orange';
        //this.context.fillRect(0, 0, dimensions.width, dimensions.height);

        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.strokeRect(0, 0, dimensions.width, dimensions.height);
    }
};

class Board {

    private readonly context: CanvasRenderingContext2D;

    constructor(public canvas: HTMLCanvasElement, public cellCountX: number, public cellCountY: number) {

        if (canvas.getContext) {
            this.context = canvas.getContext('2d');

            window.requestAnimationFrame(() => this.Draw());
        }
    }

    private GetCanvasDimenions() {
        return { width: this.canvas.offsetWidth, height: this.canvas.offsetHeight };
    }

    Draw(): void {
        const dimensions = this.GetCanvasDimenions();

        //this.context.fillStyle = 'orange';
        //this.context.fillRect(0, 0, dimensions.width, dimensions.height);

        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.strokeRect(0, 0, dimensions.width, dimensions.height);
    }
};

class Game {

    private readonly context: CanvasRenderingContext2D;
    private readonly board: Board;
    private readonly snake: Snake;
    timerToken: number;

    constructor(public canvas: HTMLCanvasElement, public cellCountX: number, public cellCountY: number) {

        this.board = new Board(canvas, 10, 10);
        this.snake = new Snake(canvas, 5, 5);

        if (canvas.getContext) {
            this.context = canvas.getContext('2d');

            window.requestAnimationFrame(() => this.Draw());
        }
    }

    Draw(): void {
        this.board.Draw(context);
        this.snake.Draw(context);
    }

    start() {
        this.timerToken = setInterval(() => this.Draw(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }
};



//window.onload = function() {
window.onload = () => {
    //var el = document.getElementById('content');
    //var greeter = new Greeter(el);
    //greeter.start();

    const canvas = document.getElementById('board') as HTMLCanvasElement;

    const game = new Game(canvas);
};
