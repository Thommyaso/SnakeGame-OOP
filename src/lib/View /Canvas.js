import AbstractView from '../Abstracts/view';

class Canvas extends AbstractView {
    constructor(model) {
        super(model);

        this._rootEl = document.querySelector('#canvas');
        this.canvasBorder = 500;
        this.ctx = this.rootEl.getContext('2d');
    }

    drawOnCanvas(params, color = 'black') {
        const {x, y, width, height} = params;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    render() {
        this.rootEl.width = this.canvasBorder;
        this.rootEl.height = this.canvasBorder;
    }
}

export default Canvas;
