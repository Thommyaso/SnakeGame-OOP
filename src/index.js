import './bootstrap.scss';
import './style.scss';
import GameView from './lib/View/GameView';
import GameSettingsModel from './lib/Model/GameSettingsModel';

const gameSettingsModel = new GameSettingsModel();
const gameView = new GameView(gameSettingsModel);

gameView.render();
