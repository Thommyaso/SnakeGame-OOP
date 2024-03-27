import AbstractView from '../Abstracts/view';

class Canvas extends AbstractView {
    constructor(model) {
        super(model);

        this._rootEl = document.querySelector('#canvas');
        this.ctx = this.rootEl.getContext('2d');
        this.canvasBorderLength = 500;
        this.nrOfRows = 10;
        this.blockBorderLength = this.canvasBorderLength / this.nrOfRows;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasBorderLength, this.canvasBorderLength);
    }

    drawBlockOnCanvas(params, color = 'black') {
        const x = params.x * this.blockBorderLength;
        const y = params.y * this.blockBorderLength;

        console.log(x, y);
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, this.blockBorderLength, this.blockBorderLength);
    }

    render() {
        this.rootEl.width = this.canvasBorderLength;
        this.rootEl.height = this.canvasBorderLength;
    }
}

export default Canvas;
