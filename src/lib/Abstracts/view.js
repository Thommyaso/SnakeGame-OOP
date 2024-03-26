class AbstractView {
    constructor(model) {
        if (new.target === AbstractView) {
            throw new TypeError('Cannot instantiate abstract class directly');
        }

        this._model = model;
        this._rootEl = null;
        this._controller = null;
    }

    get model() {
        return this._model;
    }

    set model(newModel) {
        this._model = newModel;
    }

    get controller() {
        return this._controller;
    }

    set controller(newController) {
        this._controller = newController;
    }

    get rootEl() {
        return this._rootEl;
    }

    set rootEl(newRootEll) {
        this._rootEl = newRootEll;
    }

    render() {
        // set up in child class
    }
}

export default AbstractView;
