import AbstractView from '../Abstracts/view';
import SnakeModel from '../Model/SnakeModel';
import Canvas from '../View /Canvas';
import GameController from '../Controller/GameController';
import FoodModel from '../Model/FoodModel';
import BorderModel from '../Model/BorderModel';
import GameConsole from './GameConsole';

class GameView extends AbstractView {
    constructor(model) {
        super(model);
        this.rootEl = document.querySelector('#game');
        this.canvas = new Canvas();
        this.snakeModel = new SnakeModel();
        this.borderModel = new BorderModel();
        this.foodModel = FoodModel.createFoodModel(this.snakeModel.get('bodySegments'), this.canvas.nrOfRows);
        this.gameController = new GameController(this.model, this.canvas, {
            snakeModel: this.snakeModel,
            foodModel: this.foodModel,
            borderModel: this.borderModel,
        });
        this.gameConsole = new GameConsole(this.model);

        document.addEventListener('keydown', this.keyboardControl.bind(this));
    }

    keyboardControl(event) {
        if (this.gameController.currentDirection.length <= 3) {
            switch (event.key) {
                case 'ArrowLeft':
                    if (this.gameController.currentDirection.at(-1) !== ('right')) {
                        this.gameController.currentDirection.push('left');
                    }
                    break;
                case 'ArrowRight':
                    if (this.gameController.currentDirection.at(-1) !== ('left')) {
                        this.gameController.currentDirection.push('right');
                    }
                    break;
                case 'ArrowUp':
                    if (this.gameController.currentDirection.at(-1) !== ('down')) {
                        this.gameController.currentDirection.push('up');
                    }
                    break;
                case 'ArrowDown':
                    if (this.gameController.currentDirection.at(-1) !== ('up')) {
                        this.gameController.currentDirection.push('down');
                    }
                    break;
                default:
                    console.log(event.key);
            }
        }
    }

    drawSnake() {
        const snakeColor = this.snakeModel.get('color');

        this.canvas.clearGameArea();
        this.snakeModel.get('bodySegments').forEach((segment) => {
            this.canvas.drawBlockOnCanvas(segment, snakeColor);
        });
    }

    updateCanvas() {
        this.drawSnake();
        this.canvas.drawBlockOnCanvas(this.foodModel.get('coordinates'));
    }

    render() {
        this.gameConsole.render();
        this.rootEl.appendChild(this.gameConsole.rootEl);
        this.model.addObserver('gameActivated', this.gameController.setStartingConditions.bind(this.gameController));

        this.canvas.render();
        this.rootEl.appendChild(this.canvas.rootEl);
        this.snakeModel.addObserver('snakeMovement', () => {
            this.drawSnake();
        });
        this.canvas.drawBorderOnCanvas(this.borderModel.get('borderSegments'));
        this.drawSnake();
    }
}

export default GameView;
