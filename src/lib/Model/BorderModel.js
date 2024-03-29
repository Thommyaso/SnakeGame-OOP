import AbstractModel from '../Abstracts/model';

class BorderModel extends AbstractModel {
    constructor() {
        super();

        this.properties = {
            borderSegments: {
                left: {x: 0, y: [0, 1, 2, 3, 6, 7, 8, 9]},
                right: {x: 9, y: [0, 1, 2, 3, 6, 7, 8, 9]},
                up: {y: 0, x: [0, 1, 2, 3, 6, 7, 8, 9]},
                down: {y: 9, x: [0, 1, 2, 3, 6, 7, 8, 9]},
                corners: [{x: 0, y: 0}, {x: 9, y: 0}, {x: 0, y: 9}, {x: 9, y: 9}],
            },
            borderCorners: {
                topLeft: {x: 0, y: 0},
                topRight: {x: 0, y: 9},
                bottomLeft: {x: 9, y: 0},
                bottomRight: {x: 9, y: 9},
            },
        };
    }
}

export default BorderModel;
