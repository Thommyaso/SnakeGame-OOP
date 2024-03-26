class AbstractObserver {
    constructor() {
        if (new.target === AbstractObserver) {
            throw new TypeError('Cannot instantiate abstract class directly');
        }

        this.events = {};
    }

    addObserver(eventName, callback) {
        if (!(eventName in this.events)) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);
    }

    removeObserver(eventName) {
        delete this.events[eventName];
    }

    fireEvent(eventName, data) {
        if (Array.isArray(this.events[eventName])) {
            const observers = [...this.events[eventName]];
            observers.forEach((observer) => {
                observer(data);
            });
        }
    }
}

export default AbstractObserver;

