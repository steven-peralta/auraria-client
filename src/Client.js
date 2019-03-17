import io from 'socket.io-client';

export default class Client {
    constructor(opts) {
        let options = {
            connectTo: 'http://127.0.0.1:8080',
            socketOpts: {},
            ...opts
        };

        this.connectTo = options.connectTo;
        this.socketOpts = options.socketOpts;
        this.socket = io(this.connectTo);
    }


}