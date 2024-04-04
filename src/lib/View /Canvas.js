import AbstractView from '../Abstracts/view';

class Canvas extends AbstractView {
    constructor(model, borderModel) {
        super(model);

        this.ctx = null;
        this.playfieldLength = 500;
        this.cellCount = null;
        this.blockBorderLength = null;
        this.canvasBorderWidth = 7;
        this.totalCanvasFieldLength = null;
        this.borderModel = borderModel;
    }

    setVariables() {
        this.cellCount = this.model.get('cellCount');
        this.blockBorderLength = this.playfieldLength / this.cellCount;
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
        const farSideBorderPoint = this.blockBorderLength * this.cellCount + this.canvasBorderWidth;

        borderSegments.horizontalBorder.forEach((x, index) => {
            if (x === true) {
                const coordX = index * this.blockBorderLength + this.canvasBorderWidth;

                this.ctx.fillStyle = 'black';
                this.ctx.fillRect(coordX, 0, this.blockBorderLength, this.canvasBorderWidth);
                this.ctx.fillRect(coordX, farSideBorderPoint, this.blockBorderLength, this.canvasBorderWidth);
            }
        });
        borderSegments.verticalBorder.forEach((y, index) => {
            if (y === true) {
                const coordY = index * this.blockBorderLength + this.canvasBorderWidth;

                this.ctx.fillStyle = 'black';
                this.ctx.fillRect(0, coordY, this.canvasBorderWidth, this.blockBorderLength);
                this.ctx.fillRect(farSideBorderPoint, coordY, this.canvasBorderWidth, this.blockBorderLength);
            }
        });
    }

    updateCanvas() {
        this.setVariables();
        this.ctx.clearRect(0, 0, this.totalCanvasFieldLength, this.totalCanvasFieldLength);
        this.drawBorderOnCanvas(this.borderModel.get('borderSegments'));
    }

    render() {
        this.setVariables();
        const canvas = document.createElement('canvas');
        canvas.classList.add('canvas');
        canvas.width = this.totalCanvasFieldLength;
        canvas.height = this.totalCanvasFieldLength;
        this.rootEl = canvas;
        this.ctx = this.rootEl.getContext('2d');
    }
}

export default Canvas;
