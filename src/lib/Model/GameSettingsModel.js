import AbstractModel from '../Abstracts/model';

class GameSettingsModel extends AbstractModel {
    constructor() {
        super();
        this.properties = {
            score: 0,
            isPlaying: true,
            startSpeed: 300,
            startingDirection: 'right',
            snakeStartingPosition: [
                {x: 1, y: 2},
                {x: 2, y: 2},
                {x: 3, y: 2},
            ],
        };
    }

    updateScore() {
        const oldScore = this.get('score');
        const newScore = oldScore + 1;
        this.set('score', newScore);
        this.fireEvent('updatedScore');
    }

    resetScore() {
        this.set('score', 0);
        this.fireEvent('updatedScore');
    }

}
export default GameSettingsModel;
