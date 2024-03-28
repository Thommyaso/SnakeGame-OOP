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

    addSnakeSegment(coordinates) {
        const snakeBody = this.get('bodySegments');

        snakeBody.push(coordinates);
        this.fireEvent('snakeMovement', snakeBody);
    }

    updateSnakePosition(newSegment) {
        const snakeBody = this.get('bodySegments');

        snakeBody.shift();
        snakeBody.push(newSegment);
        this.fireEvent('snakeMovement', snakeBody);
    }
}

export default SnakeModel;
