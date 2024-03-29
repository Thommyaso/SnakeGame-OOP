import AbstractView from '../Abstracts/view';

class Canvas extends AbstractView {
    constructor(model) {
        super(model);

        this.ctx = null;
        this.playfieldLength = 500;
        this.nrOfRows = 10;
        this.blockBorderLength = this.playfieldLength / this.nrOfRows;
        this.canvasBorderWidth = 7;
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
            const borderSide = borderSegments[key];
            const xValue = borderSide.x;
            const yValue = borderSide.y;

            if (key === 'corners') {
                borderSide.forEach((corner) => {
                    const coordX = corner.x === 9 ? farSideBorderPoint : 0;
                    const coordY = corner.y === 9 ? farSideBorderPoint : 0;

                    this.ctx.fillRect(coordX, coordY, this.canvasBorderWidth, this.canvasBorderWidth);
                });
            } else if (Array.isArray(xValue)) {
                const coordY = yValue === 9 ? farSideBorderPoint : 0;

                xValue.forEach((x) => {
                    const coordX = x * this.blockBorderLength + this.canvasBorderWidth;

                    this.ctx.fillStyle = 'black';
                    this.ctx.fillRect(coordX, coordY, this.blockBorderLength, this.canvasBorderWidth);
                });
            } else if (Array.isArray(yValue)) {
                const coordX = xValue === 9 ? farSideBorderPoint : 0;

                yValue.forEach((y) => {
                    const coordY = y * this.blockBorderLength + this.canvasBorderWidth;

                    this.ctx.fillStyle = 'black';
                    this.ctx.fillRect(coordX, coordY, this.canvasBorderWidth, this.blockBorderLength);
                });
            }
        }
    }

    render() {
        const canvas = document.createElement('canvas');
        canvas.width = this.totalCanvasFieldLength;
        canvas.height = this.totalCanvasFieldLength;
        this.rootEl = canvas;
        this.ctx = this.rootEl.getContext('2d');
    }
}

export default Canvas;
