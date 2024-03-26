import AbstractObserver from './observer';
import logger from '../utils/logger';

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
            const error = new Error(`Property "${key}" not found`);
            logger.error(error);
            throw error;
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
