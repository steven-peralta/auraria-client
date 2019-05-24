export default class Action {
    constructor(name, socketID, data = {}) {
        this.name = name;
        this.socketID = socketID;
        this.data = data;
    }

    toString() {
        return JSON.stringify(this);
    }
}