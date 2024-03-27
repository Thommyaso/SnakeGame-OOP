import AbstractController from '../Abstracts/controller';

class GameController extends AbstractController {
    constructor(canvas, snakeModel) {
        super();
        this.canvas = canvas;
        this.snakeModel = snakeModel;
        this.currentDirection = 'right';

        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    if (this.currentDirection !== 'right') {
                        this.currentDirection = 'left';
                    }
                    break;
                case 'ArrowRight':
                    if (this.currentDirection !== 'left') {
                        this.currentDirection = 'right';
                    }
                    break;
                case 'ArrowUp':
                    if (this.currentDirection !== 'down') {
                        this.currentDirection = 'up';
                    }
                    break;
                case 'ArrowDown':
                    if (this.currentDirection !== 'up') {
                        this.currentDirection = 'down';
                    }
                    break;
                default:
                    console.log('fuck');
            }
            this.snakeModel.updateSnakePosition(this.currentDirection);
        });
    }
}

export default GameController;
