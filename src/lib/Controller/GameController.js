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
            this.renderGame();
        }, 300);
    }

    isMovingHorizontally() {
        const horizontalTravel = ['left', 'right'];

        return horizontalTravel.includes(this.currentDirection[0]);
    }

    nextHeadPosition() {
        const snakeBody = this.snakeModel.get('bodySegments');
        const newSegment = {...snakeBody.at(-1)};

        switch (this.currentDirection[0]) {
            case 'up':
                if (newSegment.y > 0) {
                    newSegment.y -= 1;
                } else {
                    newSegment.y = 9;
                }
                break;
            case 'down':
                if (newSegment.y < 9) {
                    newSegment.y += 1;
                } else {
                    newSegment.y = 0;
                }
                break;
            case 'left':
                if (newSegment.x > 0) {
                    newSegment.x -= 1;
                } else {
                    newSegment.x = 9;
                }
                break;
            case 'right':
                if (newSegment.x < 9) {
                    newSegment.x += 1;
                } else {
                    newSegment.x = 0;
                }
                break;
            default:
                console.error('unknown command');
        }

        return newSegment;
    }

    collisionPrediction(movingObj, stationaryObj) {
        if (movingObj.y === stationaryObj.y && this.isMovingHorizontally()) {
            switch (this.currentDirection[0]) {
                case 'right':
                    return movingObj.x === stationaryObj.x;
                case 'left':
                    return movingObj.x === stationaryObj.x;
                default:
                    return false;
            }
        } else if (movingObj.x === stationaryObj.x && !this.isMovingHorizontally()) {
            switch (this.currentDirection[0]) {
                case 'down':
                    return movingObj.y === stationaryObj.y;
                case 'up':
                    return movingObj.y === stationaryObj.y;
                default:
                    return false;
            }
        }
        return false;
    }

    renderGame() {
        const snakeBody = this.snakeModel.get('bodySegments');
        const foodCoords = this.foodModel.get('coordinates');

        if (this.currentDirection.length > 1) {
            this.currentDirection.shift();
        }
        if (this.collisionPrediction(this.nextHeadPosition(), foodCoords)) {
            this.snakeModel.addSnakeSegment(foodCoords);
            this.foodModel.generateFood(snakeBody);
        } else {
            this.snakeModel.updateSnakePosition(this.nextHeadPosition());
            this.canvas.drawBlockOnCanvas(foodCoords);
        }
    }
}

export default GameController;
