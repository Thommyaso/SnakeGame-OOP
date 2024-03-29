import AbstractController from '../Abstracts/controller';

class GameController extends AbstractController {
    constructor(canvas, snakeModel, foodModel, borderModel) {
        super();
        this.canvas = canvas;
        this.snakeModel = snakeModel;
        this.foodModel = foodModel;
        this.borderModel = borderModel;
        this.currentDirection = ['right'];
        this.interval = setInterval(() => {
            this.renderGame();
        }, 300);

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
                        console.log(event.key);
                }
            }
        });

    }

    isMovingHorizontally() {
        const horizontalTravel = ['left', 'right'];

        return horizontalTravel.includes(this.currentDirection[0]);
    }

    nextHeadPosition() {
        const snakeBody = this.snakeModel.get('bodySegments');
        const newSegment = {...snakeBody.at(-1)};
        const lastIndex = this.canvas.nrOfRows - 1;

        switch (this.currentDirection[0]) {
            case 'up':
                if (newSegment.y > 0) {
                    newSegment.y -= 1;
                } else {
                    newSegment.y = lastIndex;
                }
                break;
            case 'down':
                if (newSegment.y < lastIndex) {
                    newSegment.y += 1;
                } else {
                    newSegment.y = 0;
                }
                break;
            case 'left':
                if (newSegment.x > 0) {
                    newSegment.x -= 1;
                } else {
                    newSegment.x = lastIndex;
                }
                break;
            case 'right':
                if (newSegment.x < lastIndex) {
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

    detectFoodConsumption() {
        const foodCoords = this.foodModel.get('coordinates');

        return this.collisionPrediction(this.nextHeadPosition(), foodCoords);
    }

    detectSnakeColision() {
        const snakeBody = this.snakeModel.get('bodySegments');

        let hasColided = false;

        snakeBody.forEach((segment) => {
            if (this.collisionPrediction(this.nextHeadPosition(), segment)) {
                hasColided = true;
            }
        });
        return hasColided;
    }

    detectBorderCollision() {
        const snakeBody = this.snakeModel.get('bodySegments');
        const head = snakeBody.at(-1);
        const allBorders = this.borderModel.get('borderSegments');
        const maxIndex = this.canvas.nrOfRows - 1;

        let borderCollision = false;

        for (const key in allBorders) {
            if (key === this.currentDirection[0]) {
                const array = allBorders[key];

                switch (key) {
                    case 'left' :
                        array.forEach((borderPoint) => {
                            if (this.collisionPrediction(head, {x: 0, y: borderPoint})) {
                                borderCollision = true;
                            }
                        });
                        break;
                    case 'right' :
                        array.forEach((borderPoint) => {
                            if (this.collisionPrediction(head, {x: maxIndex, y: borderPoint})) {
                                borderCollision = true;
                            }
                        });
                        break;
                    case 'up' :
                        array.forEach((borderPoint) => {
                            if (this.collisionPrediction(head, {x: borderPoint, y: 0})) {
                                borderCollision = true;
                            }
                        });
                        break;
                    case 'down' :
                        array.forEach((borderPoint) => {
                            if (this.collisionPrediction(head, {x: borderPoint, y: maxIndex})) {
                                borderCollision = true;
                            }
                        });
                        break;
                    default:
                        borderCollision = false;
                }
            }
        }

        return borderCollision;
    }

    renderGame() {
        const snakeBody = this.snakeModel.get('bodySegments');
        const foodCoords = this.foodModel.get('coordinates');

        if (this.currentDirection.length > 1) {
            this.currentDirection.shift();
        }

        if (this.detectSnakeColision() || this.detectBorderCollision()) {
            clearInterval(this.interval);

            return;
        } else if (this.detectFoodConsumption()) {
            this.snakeModel.addSnakeSegment(foodCoords);
            this.foodModel.generateFood(snakeBody);
        } else {
            this.snakeModel.updateSnakePosition(this.nextHeadPosition());
            this.canvas.drawBlockOnCanvas(foodCoords, this.foodModel.get('color'));
        }
    }
}

export default GameController;
