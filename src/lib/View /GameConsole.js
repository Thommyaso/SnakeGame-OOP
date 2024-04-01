import AbstractView from '../Abstracts/view';

class GameConsole extends AbstractView {
    constructor(model) {
        super(model);

        this.startBtn = null;
        this.scoreBoard = null;
    }

    showScore() {
        this.scoreBoard.innerText = this.model.get('score');
    }

    startBtnEvent(event) {
        event.preventDefault();
        this.model.set('isPlaying', true);
        this.model.fireEvent('gameActivated', this.model.get('startSpeed'));
    }

    render() {
        const rootEl = document.createElement('div');
        const startBtn = document.createElement('button');
        const scoreBoard = document.createElement('div');

        scoreBoard.innerText = this.model.get('score');
        this.scoreBoard = scoreBoard;
        this.model.addObserver('updatedScore', this.showScore.bind(this));

        rootEl.classList.add('gameConsole');
        this.rootEl = rootEl;

        startBtn.classList.add('startBtn');
        startBtn.innerText = 'Start Game';
        this.startBtn = startBtn;
        this.startBtn.addEventListener('click', this.startBtnEvent.bind(this));

        this.rootEl.append(this.startBtn, this.scoreBoard);
    }
}

export default GameConsole;
