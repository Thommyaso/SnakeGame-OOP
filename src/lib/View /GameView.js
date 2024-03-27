import AbstractView from '../Abstracts/view';
import SnakeModel from '../Model/SnakeModel';
import Canvas from '../View /Canvas';
import GameController from '../Controller/GameController';
import FoodModel from '../Model/FoodModel';

class GameView extends AbstractView {
    constructor(model) {
        super(model);
        this.canvas = new Canvas();
        this.snakeModel = new SnakeModel();
        this.foodModel = FoodModel.createFoodModel(this.snakeModel.get('bodySegments'));

        this.gameController = new GameController(this.canvas, this.snakeModel, this.foodModel);
    }

    drawSnake() {
        const snakeColor = this.snakeModel.get('color');

        this.canvas.clearCanvas();
        this.snakeModel.get('bodySegments').forEach((segment) => {
            this.canvas.drawBlockOnCanvas(segment, snakeColor);
        });
    }

    updateCanvas() {
        this.drawSnake();
        this.canvas.drawBlockOnCanvas(this.foodModel.get('coordinates'));
    }

    render() {
        this.canvas.render();
        this.snakeModel.addObserver('snakeMovement', () => {
            this.drawSnake();
        });
        this.drawSnake();
        this.canvas.drawBlockOnCanvas(this.foodModel.get('coordinates'));
    }
}

export default GameView;
