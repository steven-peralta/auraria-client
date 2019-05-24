import WebSocketAsPromised from 'websocket-as-promised';
import config from './config';
import EventEmitter from 'eventemitter3';
import pako from 'pako';

const events = new EventEmitter();

const errorCodes = [
    /* error code 0 */               'OK',               // received when the request was successfully acknowledged by the server
    /* error code 1... and so on */  'Bad request',      // received when there is an error in the request format
                                     'Unauthorized',     // received when the client has no permission to make that request
                                     'Server error',     // received when something goes wrong when processing the request
];

let network = {};
network.protocol = config.connction.secure? 'wss' : 'ws';
network.url = `${network.protocol}://${config.connection.ip}:${config.connection.port}`;
network.isConnected = false;
network.socket = new WebSocketAsPromised(network.url, {
    packMessage: request => btoa(pako.deflate(JSON.stringify(request), { to: 'string' })),
    unpackMessage: response => JSON.parse(pako.deflate(atob(response), { to: 'string' })),
    timeout: config.connection.timeout
});
network.socketId = null;
network.onUnpackedMessage.addListener(response => onResponse(response));

const requests = {
    MAP: {request: 'map', id: network.socketId},
    SOCKET_ID: {request: 'socket_id'},
    ENTITIES: {request: 'entities', id: network.socketId},
    action: (action) => { return {request: 'action', data: Object.assign({}, action)} }
};

events.on('socket_id', (data) => {
    network.socketId = data.id;
    network.isConnected = true;
});

function connect() {
    try {
        network.socket.open().then(() => request(requests.SOCKET_ID));
    } catch (err) {
        console.error(err);
    }
}

function disconnect() {
    try {
        network.socket.close().then(() => {
            network.isConnected = false;
            network.socketId = null;
        });
    } catch (err) {
        console.error(err);
    }
}

function request(r) {
    network.socket.send(r);
}

function dispatch(action) {
    network.socket.send(requests.action(action));
}

function onResponse(response) {
    if (response.error !== 0)
        console.error("A problem occurred when receiving a message from the server: " + errorCodes[response.error]);
    else
        events.emit(response.type, response.data);
}

export default network;
export {
    connect,
    dispatch,
    request
};

/*
anatomy of a client request:
{
    type: String        // the name of the type of request
    socketId: String    // the id of the socket making the request (when a socket is requesting an ID this will be undefined)
    data: Object        // any additional data (optional)
}

anatomy of a server response: (it is possible to receive server responses if the client did not particularly ask for them)
{
    type: String    // the name of the type of response
    error: int      // the error code (will be 0 if successful)
    data: Object    // payload data
 */