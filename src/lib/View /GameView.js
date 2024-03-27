import AbstractView from '../Abstracts/view';
import SnakeModel from '../Model/SnakeModel';
import Canvas from '../View /Canvas';
import GameController from '../Controller/GameController';

class GameView extends AbstractView {
    constructor(model) {
        super(model);
        this.canvas = new Canvas();
        this.snakeModel = new SnakeModel();
        this.gameController = new GameController(this.canvas, this.snakeModel);
    }

    drawSnake() {
        const snakeColor = this.snakeModel.get('color');

        this.canvas.clearCanvas();
        this.snakeModel.get('bodySegments').forEach((segment) => {
            this.canvas.drawBlockOnCanvas(segment, snakeColor);
        });
    }

    render() {
        this.canvas.render();
        this.snakeModel.addObserver('snakeMovement', (a) => {
            console.log(a);
            this.drawSnake();
        });
        this.drawSnake();
    }
}

export default GameView;
