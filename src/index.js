import './style.scss';
import Canvas from './lib/View /Canvas';

const canvas = new Canvas();
canvas.render();

const params = {
    x: 10,
    y: 0,
    width: 300,
    height: 100,
};

canvas.drawOnCanvas(params, 'green');
