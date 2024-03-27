import AbstractModel from '../Abstracts/model';

class SnakeModel extends AbstractModel {
    constructor() {
        super();
        this.properties = {
            color: 'blue',
            bodySegments: [
                {x: 1, y: 2},
                {x: 2, y: 2},
                {x: 3, y: 2},
            ],
        };
    }

    updateSnakePosition(direction) {
        const snakeBody = this.get('bodySegments');
        const newSegment = {...snakeBody[snakeBody.length - 1]};

        switch (direction) {
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
                console.error('unknownCommand');
        }

        snakeBody.shift();
        snakeBody.push(newSegment);
        this.fireEvent('snakeMovement', snakeBody);
    }
}

export default SnakeModel;
