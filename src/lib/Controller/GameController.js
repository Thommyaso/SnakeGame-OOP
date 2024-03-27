import AbstractController from '../Abstracts/controller';

class GameController extends AbstractController {
    constructor(canvas, snakeModel, foodModel) {
        super();
        this.canvas = canvas;
        this.snakeModel = snakeModel;
        this.foodModel = foodModel;
        this.currentDirection = ['right'];

        window.addEventListener('keydown', (event) => {
            if (this.currentDirection.length <= 3) {
                switch (event.key) {
                    case 'ArrowLeft':
                        if (this.currentDirection.at(-1) !== ('right')) {
                            this.currentDirection.push('left');
                        }
                        break;
                    case 'ArrowRight':
                        if (this.currentDirection.at(-1) !== ('left')) {
                            this.currentDirection.push('right');
                        }
                        break;
                    case 'ArrowUp':
                        if (this.currentDirection.at(-1) !== ('down')) {
                            this.currentDirection.push('up');
                        }
                        break;
                    case 'ArrowDown':
                        if (this.currentDirection.at(-1) !== ('up')) {
                            this.currentDirection.push('down');
                        }
                        break;
                    default:
                        console.log('fuck');
                }
            }
        });

        setInterval(() => {
            if (this.currentDirection.length > 1) {
                this.currentDirection.shift();
            }
            this.snakeModel.updateSnakePosition(this.currentDirection[0]);
            this.canvas.drawBlockOnCanvas(this.foodModel.get('coordinates'));
        }, 300);
    }
}

export default GameController;
