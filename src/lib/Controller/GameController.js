import AbstractController from '../Abstracts/controller';

class GameController extends AbstractController {
    constructor(model, canvas, gameElements) {
        super(model);
        this.canvas = canvas;
        this.snakeModel = gameElements.snakeModel;
        this.foodModel = gameElements.foodModel;
        this.borderModel = gameElements.borderModel;
        this.currentDirection = [];
        this.interval = null;

        this.startInterval = this.startInterval.bind(this);
    }

    setStartingConditions(timing) {
        clearInterval(this.interval);
        this.model.resetScore();
        this.currentDirection = [this.model.get('startingDirection')];
        this.snakeModel.set('bodySegments', [...this.model.get('snakeStartingPosition')]);
        this.startInterval(timing);
        this.foodModel.generateFood(this.snakeModel.get('bodySegments'));
    }

    startInterval(timing) {
        this.interval = setInterval(() => {
            this.renderGame();
        }, timing);
    }

    isMovingHorizontally() {
        const horizontalTravel = ['left', 'right'];

        return horizontalTravel.includes(this.currentDirection[0]);
    }

    nextHeadPosition() {
        const snakeBody = this.snakeModel.get('bodySegments');
        const newSegment = {...snakeBody.at(-1)};
        const lastIndex = this.model.get('cellCount') - 1;

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
        const lastIndex = this.model.get('cellCount') - 1;

        let hasColided = false;

        switch (this.currentDirection[0]) {
            case 'left':
                if (head.x === 0) {
                    hasColided = allBorders.verticalBorder[head.y];
                }
                break;
            case 'right':
                if (head.x === lastIndex) {
                    hasColided = allBorders.verticalBorder[head.y];
                }
                break;
            case 'up':
                if (head.y === 0) {
                    hasColided = allBorders.horizontalBorder[head.x];
                }
                break;
            case 'down':
                if (head.y === lastIndex) {
                    hasColided = allBorders.horizontalBorder[head.x];
                }
                break;
            default :
                hasColided = false;
        }
        return hasColided;
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
            this.model.updateScore();
            this.snakeModel.addSnakeSegment(foodCoords);
            this.foodModel.generateFood(snakeBody);
        } else {
            this.snakeModel.updateSnakePosition(this.nextHeadPosition());
            this.canvas.drawBlockOnCanvas(foodCoords, this.foodModel.get('color'));
        }
    }
}

export default GameController;
