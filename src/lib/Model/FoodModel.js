import AbstractModel from '../Abstracts/model';

class FoodModel extends AbstractModel {
    constructor() {
        super();

        this.properties = {
            coordinates: {
                x: null,
                y: null,
            },
        };

    }

    _getRandomPoint() {
        const randomPoint = {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10),
        };
        return randomPoint;
    }

    _checkIfSpaceIsAvailable(takenSpaces, generatedCoordinates) {
        let isAvailable = true;
        takenSpaces.forEach((space) => {
            if (space.x === generatedCoordinates.x && space.y === generatedCoordinates.y) {
                isAvailable = false;
            }
        });
        return isAvailable;
    }

    generateFood(snakeBody) {
        let randomPoint = this._getRandomPoint();

        do {
            randomPoint = this._getRandomPoint();
        } while (!this._checkIfSpaceIsAvailable(snakeBody, randomPoint));

        this.set('coordinates', randomPoint);
    }

    static createFoodModel(snakeBody) {
        const foodModel = new FoodModel();

        foodModel.generateFood(snakeBody);
        return foodModel;
    }
}

export default FoodModel;
