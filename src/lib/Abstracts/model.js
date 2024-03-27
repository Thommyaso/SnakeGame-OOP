import AbstractObserver from './observer';

class AbstractModel extends AbstractObserver {
    constructor() {
        if (new.target === AbstractModel) {
            throw new TypeError('Cannot instantiate abstract class directly');
        }
        super();
        this.properties = {};
    }

    get(key) {
        if (!(key in this.properties)) {
            const error = `Property "${key}" not found`;
            console.error(error);
        } else {
            return this.properties[key];
        }
    }

    set(key, value) {
        this.properties[key] = value;
    }

    removeKey(key) {
        delete this.properties[key];
        this.fireEvent('removedKey');
    }

    cleanCollection() {
        this.properties = {};
    }
}

export default AbstractModel;
