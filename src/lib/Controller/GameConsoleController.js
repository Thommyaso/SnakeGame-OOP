import AbstractView from '../Abstracts/view';

class GameConsoleController extends AbstractView {
    constructor(model) {
        super(model);
    }

    setupStartSettings(size, speed, level) {
        this.model.updateSettings({cellCount: size, startSpeed: speed, level: level});
        this.model.set('isPlaying', true);
        this.model.fireEvent('gameActivated', this.model.get('startSpeed'));
    }
}

export default GameConsoleController;
