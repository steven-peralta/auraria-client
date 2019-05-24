import network from './network.js';

export default class Action {
    constructor(name, data = {}) {
        this.name = name;
        this.socketId = network.socketId;
        this.data = data;
    }

    toString() {
        return JSON.stringify(this);
    }
}