import AbstractView from '../Abstracts/view';
import GameConsoleController from '../Controller/GameConsoleController';
import levels from '../../levels';

class GameConsole extends AbstractView {
    constructor(model) {
        super(model);

        this.controller = new GameConsoleController(model);
        this.sizeInput = null;
        this.speedSetting = null;
        this.scoreBoard = null;
        this.levelSetting = null;
    }

    renderSizeOptions() {
        const div = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');

        const validateNumber = (event) => {
            const input = event.target;
            const value = parseInt(input.value);
            const min = parseInt(input.min);
            const max = parseInt(input.max);

            if (!isNaN(value)) {
                if (value < min) {
                    input.value = min;
                } else if (value > max) {
                    input.value = max;
                }
            }
        };

        div.classList.add('sizeInput');

        label.for = 'sizeInput';
        label.classList.add('label');
        label.innerText = 'board size:';

        input.type = 'number';
        input.id = 'sizeInput';
        input.classList.add('input');
        input.required = true;
        input.value = 10;
        input.min = 10;
        input.max = 99;
        input.addEventListener('change', validateNumber);

        this.sizeInput = input;

        div.append(label, this.sizeInput);
        return div;
    }

    renderLevelOptions() {
        const div = document.createElement('div');
        const select = document.createElement('select');
        const borderOptions = levels.borders;
        const label = document.createElement('label');

        label.for = 'speedSelector';
        label.classList.add('label');
        label.innerText = 'level:';
        select.id = 'speedSelector';
        select.classList.add('input');


        for (const option in borderOptions) {
            const opt = document.createElement('option');

            opt.innerText = option;
            select.append(opt);
        }

        div.append(label, select);
        this.levelSetting = select;

        return div;
    }

    renderStartOptions() {
        const div = document.createElement('div');
        const select = document.createElement('select');
        const speeds = this.model.get('availableSpeeds');
        const label = document.createElement('label');

        label.for = 'speedSelector';
        label.classList.add('label');
        label.innerText = 'speed:';
        select.id = 'speedSelector';
        select.classList.add('input');

        speeds.forEach((option) => {
            const li = document.createElement('option');

            li.innerText = option;
            select.append(li);
        });

        div.append(label, select);
        this.speedSetting = select;

        return div;
    }

    renderOptionsSettingsContainer() {
        const div = document.createElement('div');
        const optionsContainer = document.createElement('div');
        const startBtn = document.createElement('button');
        const sizeOptionsHtml = this.renderSizeOptions();
        const speedOptions = this.renderStartOptions();
        const levelSettings = this.renderLevelOptions();

        startBtn.classList.add('btn', 'btn-primary');
        startBtn.innerText = 'Start Game';
        startBtn.addEventListener('click', this.startBtnEvent.bind(this));

        optionsContainer.classList.add('optionsContainer');
        optionsContainer.append(
            sizeOptionsHtml,
            speedOptions,
            levelSettings,
        );

        div.classList.add('controlBoard');
        div.append(
            optionsContainer,
            startBtn,
        );

        return div;
    }

    showScore() {
        this.scoreBoard.innerText = `score: ${this.model.get('score')}`;
    }

    startBtnEvent(event) {
        event.preventDefault();
        this.controller.setupStartSettings(
            parseInt(this.sizeInput.value),
            parseInt(this.speedSetting.value),
            parseInt(this.levelSetting.value),
        );
    }

    render() {
        const optionBoard = this.renderOptionsSettingsContainer();
        const rootEl = document.createElement('div');
        const scoreBoard = document.createElement('h1');

        scoreBoard.classList.add('scoreBoard');
        scoreBoard.innerText = `score: ${this.model.get('score')}`;
        this.scoreBoard = scoreBoard;
        this.model.addObserver('updatedScore', this.showScore.bind(this));

        rootEl.classList.add('gameConsole');
        this.rootEl = rootEl;

        this.rootEl.append(optionBoard, this.scoreBoard);
    }
}

export default GameConsole;
