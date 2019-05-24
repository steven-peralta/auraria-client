import WebSocketAsPromised from 'websocket-as-promised';
import {config} from './config';
import Action from './Action';

let network = {};
network.protocol = config.connction.secure? 'wss' : 'ws';
network.url = `${network.protocol}://${config.connection.ip}:${config.connection.port}`;
network.isConnected = false;
network.socket = new WebSocketAsPromised(network.url, {
    packMessage: data => JSON.stringify(data),
    unpackMessage: message => JSON.parse(message),
    attachRequestId: (data, requestId) => Object.assign({id: requestId}, data),
    extractRequestId: data => data && data.id
});

async function connect() {
    try {
        await network.socket.open();
        network.isConnected = true;
    } catch (err) {
        console.error(err);
    }
}

async function dispatch(action) {
    if (typeof action === 'object') {
        let result = await response()
    }
}

export default network;
export {
    connect,
    dispatch
};