class AbstractController {
    constructor(model) {
        if (new.target === AbstractController) {
            throw new TypeError('Cannot instantiate abstract class directly');
        }

        this._model = model;
    }

    get model() {
        return this._model;
    }

    set model(newModel) {
        this._model = newModel;
    }
}

export default AbstractController;

