import AbstractModel from '../Abstracts/model';

class GameSettingsModel extends AbstractModel {
    constructor() {
        super();
        this.properties = {
            score: 0,
            level: 3,
            cellCount: 10,
            isPlaying: true,
            startSpeed: 150,
            availableSpeeds: [100, 125, 150, 175, 200, 225, 250, 275, 300],
            startingDirection: 'right',
            snakeStartingPosition: [
                {x: 1, y: 2},
                {x: 2, y: 2},
                {x: 3, y: 2},
            ],
        };
    }

    updateSettings(settings) {
        this.set('cellCount', settings.cellCount);
        this.set('startSpeed', settings.startSpeed);
        this.set('level', settings.level);
        this.fireEvent('updatedSettings');
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
