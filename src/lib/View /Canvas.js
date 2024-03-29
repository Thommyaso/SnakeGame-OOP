import AbstractView from '../Abstracts/view';

class Canvas extends AbstractView {
    constructor(model) {
        super(model);

        this._rootEl = document.querySelector('#canvas');
        this.ctx = this.rootEl.getContext('2d');
        this.playfieldLength = 500;
        this.nrOfRows = 10;
        this.blockBorderLength = this.playfieldLength / this.nrOfRows;
        this.canvasBorderWidth = 30;
        this.totalCanvasFieldLength = this.playfieldLength + 2 * this.canvasBorderWidth;
    }

    clearGameArea() {
        this.ctx.clearRect(this.canvasBorderWidth, this.canvasBorderWidth, this.playfieldLength, this.playfieldLength);
    }

    drawBlockOnCanvas(params, color = 'black') {
        const x = params.x * this.blockBorderLength + this.canvasBorderWidth;
        const y = params.y * this.blockBorderLength + this.canvasBorderWidth;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, this.blockBorderLength, this.blockBorderLength);
    }

    drawBorderOnCanvas(borderSegments) {
        const farSideBorderPoint = this.blockBorderLength * 10 + this.canvasBorderWidth;
        for (const key in borderSegments) {
            switch (key) {
                case 'left':
                    borderSegments[key].forEach((y) => {
                        const coordY = y * this.blockBorderLength + this.canvasBorderWidth;
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(0, coordY, this.canvasBorderWidth, this.blockBorderLength);
                    });
                    break;
                case 'right':
                    borderSegments[key].forEach((y) => {
                        const coordY = y * this.blockBorderLength + this.canvasBorderWidth;
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(farSideBorderPoint, coordY, this.canvasBorderWidth, this.blockBorderLength);
                    });
                    break;
                case 'down':
                    borderSegments[key].forEach((x) => {
                        const coordX = x * this.blockBorderLength + this.canvasBorderWidth;
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(coordX, farSideBorderPoint, this.blockBorderLength, this.canvasBorderWidth);
                    });
                    break;
                case 'up':
                    borderSegments[key].forEach((x) => {
                        const coordX = x * this.blockBorderLength + this.canvasBorderWidth;
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(coordX, 0, this.blockBorderLength, this.canvasBorderWidth);
                    });
                    break;
                case 'corners':
                    borderSegments[key].forEach((coords) => {
                        const coordX = coords.x === 9 ? this.blockBorderLength * 10 + this.canvasBorderWidth : 0;
                        const coordY = coords.y === 9 ? this.blockBorderLength * 10 + this.canvasBorderWidth : 0;

                        this.ctx.fillRect(coordX, coordY, this.blockBorderLength, this.canvasBorderWidth);
                    });
                    break;
                default:
                    return;
            }
        }
    }

    render() {
        this.rootEl.width = this.totalCanvasFieldLength;
        this.rootEl.height = this.totalCanvasFieldLength;
    }
}

export default Canvas;
